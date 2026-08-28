import { useState } from 'react'

import { AdminHeader } from './AdminHeader'
import { AdminSidebar } from './AdminSidebar'
import { SystemSettingsPage } from './SystemSettingsPage'

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6">
          <SystemSettingsPage />
        </main>
      </div>
    </div>
  )
}
