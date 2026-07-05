import { forwardRef } from 'react'
import type { Chapter } from '../data/chapters'
import { SOURCE_CREDIT } from '../data/chapters'
import { ChapterHeading } from './ChapterHeading'
import { ChapterNav } from './ChapterNav'
import { ChapterText } from './ChapterText'

interface ReaderPanelProps {
  chapter: Chapter
  chapters: Chapter[]
  activeIndex: number
  onPrev: () => void
  onNext: () => void
  onGoTo: (index: number) => void
}

export const ReaderPanel = forwardRef<HTMLElement, ReaderPanelProps>(function ReaderPanel(
  { chapter, chapters, activeIndex, onPrev, onNext, onGoTo },
  ref,
) {
  return (
    <section
      ref={ref}
      className="min-w-0 px-4 pb-12 pt-8 lg:flex lg:h-[calc(100svh-56px)] lg:w-[37%] lg:flex-col lg:overflow-y-auto lg:px-8 lg:py-10"
    >
      <ChapterHeading number={chapter.number} title={chapter.title} />
      <div className="lg:hidden">
        <h2 className="font-serif text-[1.75rem] leading-[1.08] text-museum-black">{chapter.title}</h2>
      </div>
      <div className="mt-6 lg:mt-8">
        <ChapterText text={chapter.text} microNote={chapter.microNote} />
      </div>
      <div className="hidden lg:mt-auto lg:block lg:pt-10">
        <ChapterNav
          chapters={chapters}
          activeIndex={activeIndex}
          onPrev={onPrev}
          onNext={onNext}
          onGoTo={onGoTo}
        />
      </div>
      <footer className="mt-8 border-t border-museum-border pt-4 font-sans text-[0.7rem] uppercase tracking-[0.16em] text-museum-grey lg:mt-10">
        {SOURCE_CREDIT}
      </footer>
    </section>
  )
})
