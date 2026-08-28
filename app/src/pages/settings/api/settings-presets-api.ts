import { supabase } from '@/shared/api'
import type { SystemSettings } from '../model/system-settings'
import type { Tables } from '@/shared/api'

export type SettingsPreset = {
  id: string
  user_id: string
  name: string
  settings: SystemSettings
  created_at: string
  updated_at: string
}

function isSystemSettings(value: unknown): value is SystemSettings {
  if (!value || typeof value !== 'object') {
    return false
  }

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.siteName === 'string' &&
    typeof candidate.siteDescription === 'string' &&
    typeof candidate.timezone === 'string' &&
    typeof candidate.language === 'string' &&
    typeof candidate.maintenanceMode === 'boolean' &&
    typeof candidate.publicRegistration === 'boolean' &&
    typeof candidate.emailNotifications === 'boolean' &&
    typeof candidate.twoFactorAuth === 'boolean' &&
    typeof candidate.sessionTimeout === 'string' &&
    typeof candidate.passwordPolicy === 'string' &&
    typeof candidate.autoBackup === 'boolean' &&
    typeof candidate.backupFrequency === 'string' &&
    typeof candidate.logRetention === 'string' &&
    typeof candidate.defaultUserRole === 'string' &&
    typeof candidate.inviteOnly === 'boolean'
  )
}

function mapPreset(row: Tables<'settings_presets'>): SettingsPreset {
  if (!isSystemSettings(row.settings)) {
    throw new Error('Preset settings payload is invalid.')
  }

  return {
    id: row.id,
    user_id: row.user_id,
    name: row.name,
    settings: row.settings,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }
}

export async function listSettingsPresets(): Promise<SettingsPreset[]> {
  const { data, error } = await supabase
    .from('settings_presets')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []).map(mapPreset)
}

export async function createSettingsPreset(
  name: string,
  settings: SystemSettings,
): Promise<SettingsPreset> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError) {
    throw new Error(userError.message)
  }

  if (!user) {
    throw new Error('You must be signed in to save presets.')
  }

  const { data, error } = await supabase
    .from('settings_presets')
    .insert({
      name: name.trim(),
      settings,
      user_id: user.id,
    })
    .select('*')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return mapPreset(data)
}

export async function updateSettingsPreset(
  id: string,
  updates: { name?: string; settings?: SystemSettings },
): Promise<SettingsPreset> {
  const { data, error } = await supabase
    .from('settings_presets')
    .update(updates)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return mapPreset(data)
}

export async function deleteSettingsPreset(id: string): Promise<void> {
  const { error } = await supabase.from('settings_presets').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}
