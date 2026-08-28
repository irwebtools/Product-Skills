import { LoaderCircle } from 'lucide-react'

export function AuthLoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-center">
        <LoaderCircle
          className="h-8 w-8 animate-spin text-primary"
          aria-hidden
        />
        <p className="text-sm text-muted-foreground">Restoring your session…</p>
      </div>
    </div>
  )
}
