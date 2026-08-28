import { CheckCircle2, RotateCcw } from 'lucide-react'

import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import { Separator } from '@/shared/ui/separator'
import { Switch } from '@/shared/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { settingsNavItems } from '@/shared/config'
import { SettingsPresetsPanel } from './SettingsPresetsPanel'
import { useSettingsState } from '../model/use-settings-state'

function SettingRow({
  label,
  description,
  children,
}: {
  label: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <Label className="text-sm font-medium">{label}</Label>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div className="w-full sm:max-w-xs">{children}</div>
    </div>
  )
}

export function SystemSettingsPage() {
  const {
    settings,
    updateSetting,
    saveSettings,
    resetSettings,
    applySettings,
    hasChanges,
    status,
  } = useSettingsState()

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-2 sm:hidden">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Settings
        </p>
        <h2 className="text-2xl font-semibold text-foreground">System Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure platform-wide preferences, security, and maintenance options.
        </p>
      </div>

      <div className="hidden items-start justify-between gap-4 sm:flex">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-foreground">System Settings</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Configure platform-wide preferences, security, and maintenance options.
          </p>
        </div>
        {status === 'saved' ? (
          <Badge variant="success" className="shrink-0">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Changes saved
          </Badge>
        ) : null}
        {status === 'applied' ? (
          <Badge variant="success" className="shrink-0">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Preset applied
          </Badge>
        ) : null}
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 sm:grid-cols-4">
          {settingsNavItems.map((item) => (
            <TabsTrigger key={item.id} value={item.id} className="text-xs sm:text-sm">
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic information and platform behavior for your admin dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SettingRow
                label="Site name"
                description="Displayed in the browser title and header."
              >
                <Input
                  value={settings.siteName}
                  onChange={(event) =>
                    updateSetting('siteName', event.target.value)
                  }
                />
              </SettingRow>
              <Separator />
              <SettingRow
                label="Site description"
                description="Short summary shown on login and welcome screens."
              >
                <Input
                  value={settings.siteDescription}
                  onChange={(event) =>
                    updateSetting('siteDescription', event.target.value)
                  }
                />
              </SettingRow>
              <Separator />
              <SettingRow label="Timezone" description="Default timezone for reports.">
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => updateSetting('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                    <SelectItem value="ict">ICT (Indochina Time)</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <Separator />
              <SettingRow label="Language" description="Default language for new users.">
                <Select
                  value={settings.language}
                  onValueChange={(value) => updateSetting('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="vi">Vietnamese</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <Separator />
              <SettingRow
                label="Maintenance mode"
                description="Temporarily disable access for non-admin users."
              >
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) =>
                    updateSetting('maintenanceMode', checked)
                  }
                  aria-label="Toggle maintenance mode"
                />
              </SettingRow>
              <Separator />
              <SettingRow
                label="Public registration"
                description="Allow new users to sign up without an invite."
              >
                <Switch
                  checked={settings.publicRegistration}
                  onCheckedChange={(checked) =>
                    updateSetting('publicRegistration', checked)
                  }
                  aria-label="Toggle public registration"
                />
              </SettingRow>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage authentication, session policies, and account protection.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SettingRow
                label="Two-factor authentication"
                description="Require 2FA for all admin accounts."
              >
                <Switch
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    updateSetting('twoFactorAuth', checked)
                  }
                  aria-label="Toggle two-factor authentication"
                />
              </SettingRow>
              <Separator />
              <SettingRow
                label="Email notifications"
                description="Send alerts for suspicious login activity."
              >
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    updateSetting('emailNotifications', checked)
                  }
                  aria-label="Toggle email notifications"
                />
              </SettingRow>
              <Separator />
              <SettingRow
                label="Session timeout"
                description="Automatically sign out inactive users."
              >
                <Select
                  value={settings.sessionTimeout}
                  onValueChange={(value) => updateSetting('sessionTimeout', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <Separator />
              <SettingRow
                label="Password policy"
                description="Minimum requirements for user passwords."
              >
                <Select
                  value={settings.passwordPolicy}
                  onValueChange={(value) => updateSetting('passwordPolicy', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="strong">Strong (12+ with symbols)</SelectItem>
                    <SelectItem value="enterprise">
                      Enterprise (rotation every 90 days)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
              <CardDescription>
                Backup schedules, log retention, and system health preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SettingRow
                label="Automatic backups"
                description="Create scheduled backups of application data."
              >
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) =>
                    updateSetting('autoBackup', checked)
                  }
                  aria-label="Toggle automatic backups"
                />
              </SettingRow>
              <Separator />
              <SettingRow
                label="Backup frequency"
                description="How often backups should run."
              >
                <Select
                  value={settings.backupFrequency}
                  onValueChange={(value) => updateSetting('backupFrequency', value)}
                  disabled={!settings.autoBackup}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <Separator />
              <SettingRow
                label="Log retention"
                description="Number of days to keep system logs."
              >
                <Select
                  value={settings.logRetention}
                  onValueChange={(value) => updateSetting('logRetention', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select retention" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Settings</CardTitle>
              <CardDescription>
                Default roles and onboarding behavior for new team members.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SettingRow
                label="Default user role"
                description="Role assigned to newly registered users."
              >
                <Select
                  value={settings.defaultUserRole}
                  onValueChange={(value) => updateSetting('defaultUserRole', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </SettingRow>
              <Separator />
              <SettingRow
                label="Invite-only access"
                description="Require an invitation before users can join."
              >
                <Switch
                  checked={settings.inviteOnly}
                  onCheckedChange={(checked) => updateSetting('inviteOnly', checked)}
                  aria-label="Toggle invite-only access"
                />
              </SettingRow>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <SettingsPresetsPanel
        currentSettings={settings}
        onApplyPreset={applySettings}
      />

      <div className="sticky bottom-0 -mx-4 flex flex-col-reverse gap-3 border-t border-border bg-background/95 px-4 py-4 backdrop-blur sm:static sm:mx-0 sm:flex-row sm:justify-end sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
        <Button
          variant="outline"
          onClick={resetSettings}
          disabled={!hasChanges}
          className="w-full sm:w-auto"
        >
          <RotateCcw className="h-4 w-4" />
          Reset changes
        </Button>
        <Button
          onClick={saveSettings}
          disabled={!hasChanges}
          className="w-full sm:w-auto"
        >
          Save changes
        </Button>
      </div>
    </div>
  )
}
