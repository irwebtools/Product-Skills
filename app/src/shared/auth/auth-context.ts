import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

export type SignUpResult = {
  needsEmailConfirmation: boolean
}

export type AuthContextValue = {
  session: Session | null
  user: User | null
  loading: boolean
  authError: string | null
  clearAuthError: () => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<SignUpResult>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
