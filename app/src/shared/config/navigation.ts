import {
  BarChart3,
  LayoutDashboard,
  Package,
  Settings,
  Users,
} from 'lucide-react'

export type NavItem = {
  id: string
  label: string
  icon: typeof LayoutDashboard
  href: string
  active?: boolean
}

export const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '#' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '#' },
  { id: 'customers', label: 'Customers', icon: Users, href: '#' },
  { id: 'products', label: 'Products', icon: Package, href: '#' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '#', active: true },
]

export const settingsNavItems = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'users', label: 'User Settings' },
] as const

export type SettingsTabId = (typeof settingsNavItems)[number]['id']
