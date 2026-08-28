import { useCallback, useEffect, useState } from 'react'

import {
  createSettingsPreset,
  deleteSettingsPreset,
  listSettingsPresets,
  updateSettingsPreset,
  type SettingsPreset,
} from '../api/settings-presets-api'
import type { SystemSettings } from '../model/system-settings'

type PresetsStatus = 'idle' | 'loading' | 'saving' | 'error'

export function useSettingsPresets() {
  const [presets, setPresets] = useState<SettingsPreset[]>([])
  const [status, setStatus] = useState<PresetsStatus>('loading')
  const [error, setError] = useState<string | null>(null)

  const refreshPresets = useCallback(async () => {
    setStatus('loading')
    setError(null)

    try {
      const nextPresets = await listSettingsPresets()
      setPresets(nextPresets)
      setStatus('idle')
    } catch (loadError) {
      setStatus('error')
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Unable to load presets.',
      )
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    void listSettingsPresets()
      .then((nextPresets) => {
        if (cancelled) {
          return
        }

        setPresets(nextPresets)
        setStatus('idle')
        setError(null)
      })
      .catch((loadError: unknown) => {
        if (cancelled) {
          return
        }

        setStatus('error')
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load presets.',
        )
      })

    return () => {
      cancelled = true
    }
  }, [])

  const createPreset = useCallback(
    async (name: string, settings: SystemSettings) => {
      setStatus('saving')
      setError(null)

      try {
        const created = await createSettingsPreset(name, settings)
        setPresets((current) => [created, ...current])
        setStatus('idle')
        return created
      } catch (createError) {
        setStatus('error')
        const message =
          createError instanceof Error
            ? createError.message
            : 'Unable to create preset.'
        setError(message)
        throw createError
      }
    },
    [],
  )

  const renamePreset = useCallback(async (id: string, name: string) => {
    setStatus('saving')
    setError(null)

    try {
      const updated = await updateSettingsPreset(id, { name: name.trim() })
      setPresets((current) =>
        current.map((preset) => (preset.id === id ? updated : preset)),
      )
      setStatus('idle')
      return updated
    } catch (renameError) {
      setStatus('error')
      const message =
        renameError instanceof Error
          ? renameError.message
          : 'Unable to rename preset.'
      setError(message)
      throw renameError
    }
  }, [])

  const removePreset = useCallback(async (id: string) => {
    setStatus('saving')
    setError(null)

    try {
      await deleteSettingsPreset(id)
      setPresets((current) => current.filter((preset) => preset.id !== id))
      setStatus('idle')
    } catch (deleteError) {
      setStatus('error')
      const message =
        deleteError instanceof Error
          ? deleteError.message
          : 'Unable to delete preset.'
      setError(message)
      throw deleteError
    }
  }, [])

  return {
    presets,
    status,
    error,
    refreshPresets,
    createPreset,
    renamePreset,
    removePreset,
    isLoading: status === 'loading',
    isSaving: status === 'saving',
  }
}
