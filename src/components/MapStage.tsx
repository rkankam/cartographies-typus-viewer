import { useEffect, useMemo, useRef, useState } from 'react'
import { MAP_CANVAS, MAP_IMAGE_URL, type Chapter } from '../data/chapters'
import { useMapTransform } from '../hooks/useMapTransform'
import { FocusIndicator } from './FocusIndicator'
import { MapImage } from './MapImage'
import { StageControls } from './StageControls'

interface MapStageProps {
  chapter: Chapter
  chapterIndex: number
  exploreMode: boolean
  onExploreModeChange: (value: boolean) => void
  onOverview: () => void
  resetKey: number
}

interface PointerRecord {
  x: number
  y: number
}

function distanceBetween(a: PointerRecord, b: PointerRecord) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

export function MapStage({
  chapter,
  chapterIndex,
  exploreMode,
  onExploreModeChange,
  onOverview,
  resetKey,
}: MapStageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const pointerPositionsRef = useRef(new Map<number, PointerRecord>())
  const dragPointerIdRef = useRef<number | null>(null)
  const lastPointRef = useRef<PointerRecord | null>(null)
  const pinchDistanceRef = useRef<number | null>(null)
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = frameRef.current
    if (!element) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) {
        return
      }
      setStageSize({ width: entry.contentRect.width, height: entry.contentRect.height })
    })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const { transform, focusRect, panBy, zoomTo, resetManual, maxScale, minScale } = useMapTransform({
    zone: chapter.zone,
    stageSize,
    chapterIndex,
    exploreMode,
    resetKey,
    onExploreModeChange,
  })

  const transformStyle = useMemo(
    () => `translate(${transform.translateX}%, ${transform.translateY}%) scale(${transform.scale})`,
    [transform.scale, transform.translateX, transform.translateY],
  )

  const resetPointerState = () => {
    dragPointerIdRef.current = null
    lastPointRef.current = null
    pinchDistanceRef.current = null
    pointerPositionsRef.current.clear()
  }

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if ((event.target as HTMLElement).closest('button')) {
      return
    }

    if (event.pointerType === 'mouse') {
      if (event.button !== 0) {
        return
      }

      dragPointerIdRef.current = event.pointerId
      lastPointRef.current = { x: event.clientX, y: event.clientY }
      event.currentTarget.setPointerCapture(event.pointerId)
      event.preventDefault()
      return
    }

    if (event.pointerType === 'touch') {
      pointerPositionsRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
      if (pointerPositionsRef.current.size >= 2) {
        const values = [...pointerPositionsRef.current.values()]
        pinchDistanceRef.current = distanceBetween(values[0], values[1])
        lastPointRef.current = {
          x: (values[0].x + values[1].x) / 2,
          y: (values[0].y + values[1].y) / 2,
        }
        event.preventDefault()
      }
    }
  }

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.pointerType === 'mouse') {
      if (dragPointerIdRef.current !== event.pointerId || !lastPointRef.current) {
        return
      }

      const deltaX = event.clientX - lastPointRef.current.x
      const deltaY = event.clientY - lastPointRef.current.y
      lastPointRef.current = { x: event.clientX, y: event.clientY }
      if (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
        panBy(deltaX, deltaY)
      }
      return
    }

    if (event.pointerType !== 'touch') {
      return
    }

    if (!pointerPositionsRef.current.has(event.pointerId)) {
      return
    }

    pointerPositionsRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointerPositionsRef.current.size < 2) {
      return
    }

    const values = [...pointerPositionsRef.current.values()]
    const first = values[0]
    const second = values[1]
    const midpoint = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 }
    const distance = distanceBetween(first, second)

    if (lastPointRef.current) {
      panBy(midpoint.x - lastPointRef.current.x, midpoint.y - lastPointRef.current.y)
    }

    if (pinchDistanceRef.current) {
      const scaleRatio = distance / pinchDistanceRef.current
      zoomTo(transform.scale * scaleRatio)
    }

    lastPointRef.current = midpoint
    pinchDistanceRef.current = distance
    event.preventDefault()
  }

  const handlePointerEnd: React.PointerEventHandler<HTMLDivElement> = (event) => {
    if (event.pointerType === 'mouse') {
      if (dragPointerIdRef.current === event.pointerId) {
        dragPointerIdRef.current = null
        lastPointRef.current = null
      }
      return
    }

    if (event.pointerType === 'touch') {
      pointerPositionsRef.current.delete(event.pointerId)
      if (pointerPositionsRef.current.size < 2) {
        pinchDistanceRef.current = null
        lastPointRef.current = null
      }
    }
  }

  const latestScaleRef = useRef(transform.scale)
  latestScaleRef.current = transform.scale
  const zoomToRef = useRef(zoomTo)
  zoomToRef.current = zoomTo

  useEffect(() => {
    const element = stageRef.current
    if (!element) {
      return
    }

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const nextScale = latestScaleRef.current + (event.deltaY < 0 ? 0.18 : -0.18)
      zoomToRef.current(nextScale)
    }

    element.addEventListener('wheel', handleWheel, { passive: false })
    return () => element.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(() => resetPointerState, [chapterIndex, resetKey])

  return (
    <section className="relative lg:flex lg:h-[calc(100svh-56px)] lg:w-[63%] lg:flex-col lg:overflow-hidden lg:border-r lg:border-museum-border">
      <div className="z-20 h-[50vh] min-h-[45vh] max-h-[55vh] bg-museum-bg lg:static lg:h-full lg:min-h-0 lg:max-h-none">
        <div className="h-full p-3 md:p-4 lg:h-full lg:p-6">
          <div
            ref={stageRef}
            className="relative h-full overflow-hidden bg-museum-image-bg"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onPointerLeave={handlePointerEnd}
            style={{ touchAction: 'pan-y' }}
          >
            <div
              ref={frameRef}
              className="absolute left-1/2 top-1/2 w-full max-w-full -translate-x-1/2 -translate-y-1/2"
              style={{ aspectRatio: `${MAP_CANVAS.width} / ${MAP_CANVAS.height}` }}
            >
              <MapImage src={MAP_IMAGE_URL} transform={transformStyle} />
              <FocusIndicator rect={focusRect} />
            </div>
            <StageControls
              canReturnToFocus={exploreMode}
              onOverview={onOverview}
              onReturnToFocus={resetManual}
            />
          </div>
        </div>
      </div>
      <div className="sr-only">Zoom manuel entre {minScale}× et {maxScale}×.</div>
    </section>
  )
}
