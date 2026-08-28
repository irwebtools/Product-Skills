import { LoaderCircle, Pencil, Trash2, Upload } from 'lucide-react'
import { useState } from 'react'

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
import type { SettingsPreset } from '../api/settings-presets-api'
import { useSettingsPresets } from '../model/use-settings-presets'
import type { SystemSettings } from '../model/system-settings'

type SettingsPresetsPanelProps = {
  currentSettings: SystemSettings
  onApplyPreset: (settings: SystemSettings) => void
}

export function SettingsPresetsPanel({
  currentSettings,
  onApplyPreset,
}: SettingsPresetsPanelProps) {
  const {
    presets,
    error,
    createPreset,
    renamePreset,
    removePreset,
    isLoading,
    isSaving,
  } = useSettingsPresets()
  const [newPresetName, setNewPresetName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [actionError, setActionError] = useState<string | null>(null)

  async function handleCreatePreset() {
    const trimmedName = newPresetName.trim()

    if (!trimmedName) {
      setActionError('Enter a name for the preset.')
      return
    }

    setActionError(null)

    try {
      await createPreset(trimmedName, currentSettings)
      setNewPresetName('')
    } catch {
      // Error state is handled in the hook.
    }
  }

  async function handleRenamePreset(preset: SettingsPreset) {
    const trimmedName = editingName.trim()

    if (!trimmedName) {
      setActionError('Preset name cannot be empty.')
      return
    }

    setActionError(null)

    try {
      await renamePreset(preset.id, trimmedName)
      setEditingId(null)
      setEditingName('')
    } catch {
      // Error state is handled in the hook.
    }
  }

  async function handleDeletePreset(id: string) {
    setActionError(null)

    try {
      await removePreset(id)

      if (editingId === id) {
        setEditingId(null)
        setEditingName('')
      }
    } catch {
      // Error state is handled in the hook.
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings Presets</CardTitle>
        <CardDescription>
          Save, load, rename, and delete your personal configuration presets.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1 space-y-2">
            <Label htmlFor="preset-name">Save current settings as preset</Label>
            <Input
              id="preset-name"
              placeholder="e.g. Production defaults"
              value={newPresetName}
              onChange={(event) => setNewPresetName(event.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              onClick={() => void handleCreatePreset()}
              disabled={isSaving}
            >
              Save preset
            </Button>
          </div>
        </div>

        {error || actionError ? (
          <p className="rounded-md border border-destructive/20 bg-red-50 px-3 py-2 text-sm text-destructive">
            {actionError ?? error}
          </p>
        ) : null}

        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
            Loading presets…
          </div>
        ) : presets.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-4 py-6 text-sm text-muted-foreground">
            No presets yet. Save your current configuration to create one.
          </p>
        ) : (
          <ul className="space-y-3">
            {presets.map((preset) => (
              <li
                key={preset.id}
                className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  {editingId === preset.id ? (
                    <Input
                      value={editingName}
                      onChange={(event) => setEditingName(event.target.value)}
                      aria-label={`Rename ${preset.name}`}
                    />
                  ) : (
                    <p className="truncate font-medium text-foreground">
                      {preset.name}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Updated {new Date(preset.updated_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {editingId === preset.id ? (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => void handleRenamePreset(preset)}
                        disabled={isSaving}
                      >
                        Save name
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null)
                          setEditingName('')
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => onApplyPreset(preset.settings)}
                      >
                        <Upload className="h-4 w-4" />
                        Apply
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(preset.id)
                          setEditingName(preset.name)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                        Rename
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        onClick={() => void handleDeletePreset(preset.id)}
                        disabled={isSaving}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
