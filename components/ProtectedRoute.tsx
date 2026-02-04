import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../lib/auth-context'
import { DEFAULT_ROLE, getDefaultRouteForRole, isRouteAllowed } from '../lib/role-access'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, role } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
    if (!loading && user) {
      const activeRole = role || DEFAULT_ROLE
      const path = router.pathname
      if (!isRouteAllowed(activeRole, path)) {
        const fallback = getDefaultRouteForRole(activeRole)
        if (fallback !== path) {
          router.replace(fallback)
        }
      }
    }
  }, [user, loading, router, role])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
} 