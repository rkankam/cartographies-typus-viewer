import type { Chapter } from '../data/chapters'

interface ChapterNavProps {
  chapters: Chapter[]
  activeIndex: number
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
}

function navButtonClassName(disabled: boolean) {
  return [
    'border border-museum-border px-3 py-2 font-sans text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-150',
    disabled
      ? 'cursor-not-allowed text-museum-light-grey'
      : 'text-museum-dark-grey hover:border-museum-border-dark hover:text-museum-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-museum-black',
  ].join(' ')
}

export function ChapterNav({ chapters, activeIndex, onPrev, onNext, onGoTo }: ChapterNavProps) {
  return (
    <div className="space-y-4">
      <div className="hidden items-center gap-3 lg:flex">
        <button type="button" className={navButtonClassName(activeIndex === 0)} onClick={onPrev} disabled={activeIndex === 0}>
          ← Précédent
        </button>
        <button
          type="button"
          className={navButtonClassName(activeIndex === chapters.length - 1)}
          onClick={onNext}
          disabled={activeIndex === chapters.length - 1}
        >
          Suivant →
        </button>
      </div>
      <div className="flex items-center gap-2" aria-label="Rail des chapitres">
        {chapters.map((chapter, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={chapter.id}
              type="button"
              title={chapter.title}
              aria-label={`Chapitre ${chapter.number} : ${chapter.title}`}
              aria-current={isActive ? 'step' : undefined}
              className="group flex items-center gap-2 focus-visible:outline-none"
              onClick={() => onGoTo(index)}
            >
              <span
                className={[
                  'block rounded-full border transition-colors duration-150',
                  isActive
                    ? 'h-2.5 w-2.5 border-museum-red bg-museum-red'
                    : 'h-2 w-2 border-museum-light-grey bg-museum-light-grey/40 group-hover:border-museum-grey group-hover:bg-museum-light-grey',
                ].join(' ')}
              />
              {index < chapters.length - 1 ? <span className="h-px w-4 bg-museum-border-dark" aria-hidden="true" /> : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}
