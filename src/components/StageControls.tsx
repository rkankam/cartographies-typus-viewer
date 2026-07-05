interface StageControlsProps {
  canReturnToFocus: boolean
  onOverview: () => void
  onReturnToFocus: () => void
}

function controlClassName() {
  return 'font-sans text-[0.72rem] uppercase tracking-[0.16em] text-museum-dark-grey border border-museum-border bg-museum-bg/88 px-3 py-2 transition-colors duration-150 hover:border-museum-border-dark hover:text-museum-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-museum-black'
}

export function StageControls({ canReturnToFocus, onOverview, onReturnToFocus }: StageControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-start gap-2 md:bottom-5 md:left-5">
      <button type="button" className={controlClassName()} onClick={onOverview}>
        ⛶ Vue complète
      </button>
      {canReturnToFocus ? (
        <button type="button" className={controlClassName()} onClick={onReturnToFocus}>
          ↩ Revenir au focus
        </button>
      ) : null}
    </div>
  )
}
