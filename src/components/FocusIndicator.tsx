import type { FocusRect } from '../hooks/useMapTransform'

const SHOW_FOCUS_INDICATOR = false

interface FocusIndicatorProps {
  rect: FocusRect | null
}

export function FocusIndicator({ rect }: FocusIndicatorProps) {
  if (!SHOW_FOCUS_INDICATOR || !rect) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute border border-museum-red"
      style={{
        left: `${rect.left}%`,
        top: `${rect.top}%`,
        width: `${rect.width}%`,
        height: `${rect.height}%`,
      }}
    />
  )
}
