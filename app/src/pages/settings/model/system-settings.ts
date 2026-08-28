export type SystemSettings = {
  siteName: string
  siteDescription: string
  timezone: string
  language: string
  maintenanceMode: boolean
  publicRegistration: boolean
  emailNotifications: boolean
  twoFactorAuth: boolean
  sessionTimeout: string
  passwordPolicy: string
  autoBackup: boolean
  backupFrequency: string
  logRetention: string
  defaultUserRole: string
  inviteOnly: boolean
}

export const defaultSettings: SystemSettings = {
  siteName: 'Admin Dashboard',
  siteDescription: 'Manage your platform configuration and preferences.',
  timezone: 'utc',
  language: 'en',
  maintenanceMode: false,
  publicRegistration: true,
  emailNotifications: true,
  twoFactorAuth: false,
  sessionTimeout: '30',
  passwordPolicy: 'strong',
  autoBackup: true,
  backupFrequency: 'daily',
  logRetention: '90',
  defaultUserRole: 'viewer',
  inviteOnly: false,
}
