import { useCallback, useEffect, useRef, useState } from 'react'
import { chapters } from '../data/chapters'
import { useActiveChapter } from '../hooks/useActiveChapter'
import { useKeyboardNav } from '../hooks/useKeyboardNav'
import { Header } from './Header'
import { MapStage } from './MapStage'
import { ReaderPanel } from './ReaderPanel'

function mobileBarButtonClassName(disabled: boolean) {
  return [
    'px-2 py-1 font-sans text-[0.78rem] uppercase tracking-[0.18em] transition-colors duration-150',
    disabled ? 'text-museum-light-grey' : 'text-museum-dark-grey hover:text-museum-black',
  ].join(' ')
}

export function GuidedViewer() {
  const { activeChapterIndex, goTo, next, prev } = useActiveChapter(chapters.length)
  const [exploreMode, setExploreMode] = useState(false)
  const [resetKey, setResetKey] = useState(0)
  const readerPanelRef = useRef<HTMLElement>(null)
  const stickyHeadRef = useRef<HTMLDivElement>(null)
  const stickyBarRef = useRef<HTMLDivElement>(null)

  const activeChapter = chapters[activeChapterIndex]

  const scrollMobileTextToTop = useCallback(() => {
    if (window.innerWidth >= 1024) {
      readerPanelRef.current?.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const stickyHeadHeight = stickyHeadRef.current?.getBoundingClientRect().height ?? 0
    const targetTop = (readerPanelRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY - stickyHeadHeight
    window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'auto' })
  }, [])

  useEffect(() => {
    scrollMobileTextToTop()
  }, [activeChapterIndex, scrollMobileTextToTop])

  const resetToOverview = useCallback(() => {
    goTo(0)
    setExploreMode(false)
    setResetKey((current) => current + 1)
  }, [goTo])

  const handleGoTo = useCallback(
    (index: number) => {
      goTo(index)
      setExploreMode(false)
    },
    [goTo],
  )

  const handleNext = useCallback(() => {
    next()
    setExploreMode(false)
  }, [next])

  const handlePrev = useCallback(() => {
    prev()
    setExploreMode(false)
  }, [prev])

  useKeyboardNav({ onPrev: handlePrev, onNext: handleNext, onReset: resetToOverview })

  return (
    <div className="min-h-svh bg-museum-bg lg:h-svh lg:overflow-hidden">
      <Header />
      <main className="mx-auto max-w-[1600px] lg:flex lg:h-[calc(100svh-56px)] lg:overflow-hidden">
        <div className="lg:contents">
          <div ref={stickyHeadRef} className="sticky top-0 z-30 bg-museum-bg lg:contents">
            <MapStage
              chapter={activeChapter}
              chapterIndex={activeChapterIndex}
              exploreMode={exploreMode}
              onExploreModeChange={setExploreMode}
              onOverview={resetToOverview}
              resetKey={resetKey}
            />

            <div
              ref={stickyBarRef}
              className="border-b border-museum-border bg-museum-bg px-4 py-3 shadow-[0_1px_0_rgba(26,26,26,0.04)] lg:hidden"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="min-w-0 truncate font-sans text-[0.76rem] uppercase tracking-[0.16em] text-museum-dark-grey">
                  <span className="text-museum-red">{String(activeChapter.number).padStart(2, '0')} / 07</span> · {activeChapter.title}
                </p>
                <div className="flex items-center gap-1">
                  <button type="button" className={mobileBarButtonClassName(activeChapterIndex === 0)} disabled={activeChapterIndex === 0} onClick={handlePrev}>
                    ←
                  </button>
                  <button
                    type="button"
                    className={mobileBarButtonClassName(activeChapterIndex === chapters.length - 1)}
                    disabled={activeChapterIndex === chapters.length - 1}
                    onClick={handleNext}
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2" aria-label="Rail mobile des chapitres">
                {chapters.map((chapter, index) => {
                  const isActive = index === activeChapterIndex
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      title={chapter.title}
                      aria-label={`Aller au chapitre ${chapter.number}`}
                      className="flex items-center gap-2"
                      onClick={() => handleGoTo(index)}
                    >
                      <span
                        className={[
                          'block rounded-full border',
                          isActive
                            ? 'h-2.5 w-2.5 border-museum-red bg-museum-red'
                            : 'h-2 w-2 border-museum-light-grey bg-museum-light-grey/40',
                        ].join(' ')}
                      />
                      {index < chapters.length - 1 ? <span className="h-px w-3 bg-museum-border-dark" /> : null}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <ReaderPanel
            ref={readerPanelRef}
            chapter={activeChapter}
            chapters={chapters}
            activeIndex={activeChapterIndex}
            onPrev={handlePrev}
            onNext={handleNext}
            onGoTo={handleGoTo}
          />
        </div>
      </main>
    </div>
  )
}
