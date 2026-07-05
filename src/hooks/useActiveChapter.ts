import { useCallback, useState } from 'react'

export function useActiveChapter(total: number) {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      setActiveChapterIndex(Math.max(0, Math.min(index, total - 1)))
    },
    [total],
  )

  const next = useCallback(() => {
    setActiveChapterIndex((current) => Math.min(current + 1, total - 1))
  }, [total])

  const prev = useCallback(() => {
    setActiveChapterIndex((current) => Math.max(current - 1, 0))
  }, [])

  return { activeChapterIndex, goTo, next, prev }
}
