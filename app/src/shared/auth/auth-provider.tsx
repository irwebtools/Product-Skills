import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'

import { AuthContext } from '@/shared/auth/auth-context'
import { supabase } from '@/shared/api'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) {
        return
      }

      if (error) {
        setAuthError(error.message)
      }

      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const clearAuthError = useCallback(() => {
    setAuthError(null)
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setAuthError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      throw new Error(error.message)
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    setAuthError(null)
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      throw new Error(error.message)
    }

    return {
      needsEmailConfirmation: data.session === null,
    }
  }, [])

  const signOut = useCallback(async () => {
    setAuthError(null)
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new Error(error.message)
    }
  }, [])

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      authError,
      clearAuthError,
      signIn,
      signUp,
      signOut,
    }),
    [session, loading, authError, clearAuthError, signIn, signUp, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
