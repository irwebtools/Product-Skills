import { useCallback, useState } from 'react'

import { defaultSettings, type SystemSettings } from './system-settings'

export function useSettingsState(initialSettings: SystemSettings = defaultSettings) {
  const [settings, setSettings] = useState<SystemSettings>(initialSettings)
  const [savedSettings, setSavedSettings] =
    useState<SystemSettings>(initialSettings)
  const [status, setStatus] = useState<'idle' | 'saved' | 'reset' | 'applied'>(
    'idle',
  )

  const updateSetting = useCallback(
    <K extends keyof SystemSettings>(key: K, value: SystemSettings[K]) => {
      setSettings((current) => ({ ...current, [key]: value }))
      setStatus('idle')
    },
    [],
  )

  const saveSettings = useCallback(() => {
    setSavedSettings(settings)
    setStatus('saved')
  }, [settings])

  const resetSettings = useCallback(() => {
    setSettings(savedSettings)
    setStatus('reset')
  }, [savedSettings])

  const applySettings = useCallback((nextSettings: SystemSettings) => {
    setSettings(nextSettings)
    setSavedSettings(nextSettings)
    setStatus('applied')
  }, [])

  const hasChanges =
    JSON.stringify(settings) !== JSON.stringify(savedSettings)

  return {
    settings,
    updateSetting,
    saveSettings,
    resetSettings,
    applySettings,
    hasChanges,
    status,
  }
}
