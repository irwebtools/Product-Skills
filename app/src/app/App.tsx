import { AuthLoadingScreen, LoginPage } from '@/pages/login'
import { SettingsPage } from '@/pages/settings'
import { useAuth } from '@/shared/auth'

function AppRoutes() {
  const { session, loading } = useAuth()

  if (loading) {
    return <AuthLoadingScreen />
  }

  if (!session) {
    return <LoginPage />
  }

  return <SettingsPage />
}

export function App() {
  return <AppRoutes />
}
