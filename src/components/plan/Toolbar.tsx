import { useRef, useState } from 'react'
import { MonthPicker } from './MonthPicker'
import type { Plan, Unit } from '@/types'

type Aspect = 'A' | 'B'

interface ToolbarProps {
  plan: Plan
  unit: Unit
  aspect: Aspect
  prefsEditMode: boolean
  gaRunning: boolean
  onAspectChange: (a: Aspect) => void
  onPrefsEditModeChange: (v: boolean) => void
  onGenerate: () => void
  onRegenerate: () => void
  onExportJson: () => void
  onExportEncryptedLink: () => void
  onImport: (file: File) => void
  onPrint: () => void
  onMonthChange: (year: number, month: number) => void
}

export function Toolbar({
  plan,
  aspect,
  prefsEditMode,
  gaRunning,
  onAspectChange,
  onPrefsEditModeChange,
  onGenerate,
  onRegenerate,
  onExportJson,
  onExportEncryptedLink,
  onImport,
  onPrint,
  onMonthChange,
}: ToolbarProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [exportOpen, setExportOpen] = useState(false)

  const hasAssignments = plan.assignments.some((a) => a.doctorId)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) onImport(file)
    e.target.value = ''
  }

  return (
    <div className="toolbar no-print" role="toolbar" aria-label="Pasek narzędzi planu">
      <MonthPicker year={plan.year} month={plan.month} onChange={onMonthChange} />

      <div className="toolbar-sep" />

      {!prefsEditMode && (
        <button
          className="btn btn-success"
          onClick={hasAssignments ? onRegenerate : onGenerate}
          disabled={gaRunning}
        >
          {gaRunning ? '⏳ Generowanie…' : hasAssignments ? '🔄 Regeneruj' : '⚡ Generuj'}
        </button>
      )}

      <button
        className={`btn ${prefsEditMode ? 'btn-warning' : 'btn-secondary'}`}
        onClick={() => onPrefsEditModeChange(!prefsEditMode)}
      >
        {prefsEditMode ? '✏️ Preferencje lekarzy ON' : '✏️ Preferencje lekarzy'}
      </button>

      <div className="toolbar-spacer" />

      <div className="btn-group" role="group" aria-label="Aspekt">
        <button
          className={`btn ${aspect === 'A' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onAspectChange('A')}
        >
          📋 Przypisania
        </button>
        <button
          className={`btn ${aspect === 'B' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onAspectChange('B')}
        >
          🏥 Piony
        </button>
      </div>

      <div className="toolbar-sep" />

      <div className="dropdown" style={{ position: 'relative' }}>
        <button className="btn btn-secondary" onClick={() => setExportOpen((v) => !v)}>
          📤 Eksport ▾
        </button>
        {exportOpen && (
          <div className="dropdown-menu" onMouseLeave={() => setExportOpen(false)}>
            <button className="dropdown-item" onClick={() => { onExportJson(); setExportOpen(false) }}>
              JSON
            </button>
            <button className="dropdown-item" onClick={() => { onExportEncryptedLink(); setExportOpen(false) }}>
              Zaszyfrowany link
            </button>
          </div>
        )}
      </div>

      <button className="btn btn-secondary" onClick={() => fileRef.current?.click()}>
        📥 Import
      </button>
      <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleFileChange} />

      <button className="btn btn-secondary" onClick={onPrint}>
        🖨️ Drukuj
      </button>
    </div>
  )
}
