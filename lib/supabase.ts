import { createClient } from '@supabase/supabase-js'

// Try environment variables first, fallback to hardcoded values for testing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tptzziuyxrhlvzizydyu.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdHp6aXV5eHJobHZ6aXp5ZHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1OTQ3ODksImV4cCI6MjA2MDE3MDc4OX0.wb2enR3_Nn3A4COFLvJLuBbExQQN2z3cueuqPKy3mKc'

// Debug logging
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Present' : 'Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file and ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 