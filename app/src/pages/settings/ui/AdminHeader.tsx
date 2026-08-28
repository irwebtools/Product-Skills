import { LogOut, Menu } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/shared/ui/avatar'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useAuth } from '@/shared/auth'

type AdminHeaderProps = {
  onMenuClick: () => void
}

function getInitials(email: string | undefined) {
  if (!email) {
    return 'AD'
  }

  const [localPart] = email.split('@')
  return localPart.slice(0, 2).toUpperCase()
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 sm:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <div className="hidden min-w-0 flex-1 sm:block">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Settings
        </p>
        <h1 className="truncate text-lg font-semibold text-foreground">
          System Settings
        </h1>
      </div>

      <div className="relative ml-auto hidden max-w-xs flex-1 md:block">
        <Input placeholder="Search settings..." aria-label="Search settings" />
      </div>

      <div className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
        {user?.email}
      </div>

      <Avatar className="h-9 w-9">
        <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
      </Avatar>

      <Button
        variant="outline"
        size="sm"
        onClick={() => void signOut()}
        aria-label="Sign out"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Sign out</span>
      </Button>
    </header>
  )
}
