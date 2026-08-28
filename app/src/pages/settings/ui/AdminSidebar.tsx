import type { LucideIcon } from 'lucide-react'
import { X } from 'lucide-react'

import { mainNavItems } from '@/shared/config'
import { cn } from '@/shared/lib/cn'

type AdminSidebarProps = {
  mobileOpen: boolean
  onMobileClose: () => void
}

function NavLink({
  icon: Icon,
  label,
  active,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'bg-sidebar-active text-sidebar-active-foreground'
          : 'text-sidebar-foreground hover:bg-muted hover:text-foreground',
      )}
      aria-current={active ? 'page' : undefined}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden />
      <span>{label}</span>
    </button>
  )
}

export function AdminSidebar({ mobileOpen, onMobileClose }: AdminSidebarProps) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 lg:hidden',
          mobileOpen ? 'block' : 'hidden',
        )}
        onClick={onMobileClose}
        aria-hidden
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-sidebar transition-transform lg:static lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              AD
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Admin Panel</p>
              <p className="text-xs text-muted-foreground">System Settings</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-md p-1 text-muted-foreground hover:bg-muted lg:hidden"
            onClick={onMobileClose}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4" aria-label="Main">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Menu
          </p>
          {mainNavItems.map((item) => (
            <NavLink
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={item.active}
            />
          ))}
        </nav>

        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-muted p-3">
            <p className="text-xs font-medium text-foreground">Need help?</p>
            <p className="mt-1 text-xs text-muted-foreground">
              View documentation for system configuration.
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
