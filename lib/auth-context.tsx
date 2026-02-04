import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from './supabase'
import { DEFAULT_ROLE, Role } from './role-access'

const ROLE_BY_EMAIL: Record<string, Role> = {
  "pemohon@gmail.com": "Pemohon",
  "operasi@gmail.com": "LPPS Pegawai Operasi",
  "spsb@gmail.com": "SPSB",
  "pengurus@gmail.com": "LPPS Pengurus Besar",
  "kewangan@gmail.com": "LPPS Kewangan",
  "jkdm@gmail.com": "JKDM",
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  role: Role
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [role, setRoleState] = useState<Role>(DEFAULT_ROLE)

  const resolveRole = (email?: string | null) => {
    if (!email) return DEFAULT_ROLE
    return ROLE_BY_EMAIL[email.toLowerCase()] ?? DEFAULT_ROLE
  }

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setRoleState(resolveRole(session?.user?.email))
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setRoleState(resolveRole(session?.user?.email))
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    loading,
    role,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 