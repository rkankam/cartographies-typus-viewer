import { useEffect, useMemo, useState } from 'react'
import type { ChapterZone } from '../data/chapters'
import { MAP_CANVAS } from '../data/chapters'

const MIN_SCALE = 1
const MAX_SCALE = 3
const TARGET_FILL = 0.75

export interface StageSize {
  width: number
  height: number
}

export interface MapTransform {
  scale: number
  translateX: number
  translateY: number
}

export interface FocusRect {
  left: number
  top: number
  width: number
  height: number
}

interface UseMapTransformOptions {
  zone: ChapterZone
  stageSize: StageSize
  chapterIndex: number
  exploreMode: boolean
  resetKey: number
  onExploreModeChange: (value: boolean) => void
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function computeBaseTransform(zone: ChapterZone): MapTransform {
  if (
    zone.x === 0 &&
    zone.y === 0 &&
    zone.width === MAP_CANVAS.width &&
    zone.height === MAP_CANVAS.height
  ) {
    return { scale: 1, translateX: 0, translateY: 0 }
  }

  const widthRatio = zone.width / MAP_CANVAS.width
  const heightRatio = zone.height / MAP_CANVAS.height
  const centerX = (zone.x + zone.width / 2) / MAP_CANVAS.width
  const centerY = (zone.y + zone.height / 2) / MAP_CANVAS.height

  const scaleFromWidth = TARGET_FILL / widthRatio
  const scaleFromHeight = TARGET_FILL / heightRatio
  const scale = clamp(Math.min(scaleFromWidth, scaleFromHeight), MIN_SCALE, MAX_SCALE)

  return {
    scale,
    translateX: (0.5 - centerX) * 100,
    translateY: (0.5 - centerY) * 100,
  }
}

function clampTransform(transform: MapTransform): MapTransform {
  const range = ((transform.scale - 1) / 2) * 100
  return {
    scale: clamp(transform.scale, MIN_SCALE, MAX_SCALE),
    translateX: clamp(transform.translateX, -range, range),
    translateY: clamp(transform.translateY, -range, range),
  }
}

export function useMapTransform({
  zone,
  stageSize,
  chapterIndex,
  exploreMode,
  resetKey,
  onExploreModeChange,
}: UseMapTransformOptions) {
  const [manualOffset, setManualOffset] = useState({ x: 0, y: 0 })
  const [manualScale, setManualScale] = useState<number | null>(null)

  useEffect(() => {
    setManualOffset({ x: 0, y: 0 })
    setManualScale(null)
    onExploreModeChange(false)
  }, [chapterIndex, resetKey, onExploreModeChange])

  const baseTransform = useMemo(() => computeBaseTransform(zone), [zone])

  const effectiveTransform = useMemo(() => {
    const scale = manualScale ?? baseTransform.scale
    return clampTransform({
      scale,
      translateX: baseTransform.translateX + manualOffset.x,
      translateY: baseTransform.translateY + manualOffset.y,
    })
  }, [baseTransform, manualOffset.x, manualOffset.y, manualScale])

  const focusRect = useMemo<FocusRect | null>(() => {
    if (baseTransform.scale === 1 || exploreMode || stageSize.width === 0 || stageSize.height === 0) {
      return null
    }

    const width = clamp((zone.width / MAP_CANVAS.width) * baseTransform.scale * 100, 12, 92)
    const height = clamp((zone.height / MAP_CANVAS.height) * baseTransform.scale * 100, 12, 92)

    return {
      left: 50 - width / 2,
      top: 50 - height / 2,
      width,
      height,
    }
  }, [baseTransform.scale, exploreMode, stageSize.height, stageSize.width, zone.height, zone.width])

  const panBy = (deltaXPx: number, deltaYPx: number) => {
    if (stageSize.width === 0 || stageSize.height === 0) {
      return
    }

    setManualOffset((current) => {
      const next = {
        x: current.x + (deltaXPx / stageSize.width) * 100,
        y: current.y + (deltaYPx / stageSize.height) * 100,
      }

      const clamped = clampTransform({
        scale: manualScale ?? baseTransform.scale,
        translateX: baseTransform.translateX + next.x,
        translateY: baseTransform.translateY + next.y,
      })

      return {
        x: clamped.translateX - baseTransform.translateX,
        y: clamped.translateY - baseTransform.translateY,
      }
    })

    onExploreModeChange(true)
  }

  const zoomTo = (scale: number) => {
    const nextScale = clamp(scale, MIN_SCALE, MAX_SCALE)
    const clamped = clampTransform({
      scale: nextScale,
      translateX: baseTransform.translateX + manualOffset.x,
      translateY: baseTransform.translateY + manualOffset.y,
    })

    setManualScale(clamped.scale)
    setManualOffset({
      x: clamped.translateX - baseTransform.translateX,
      y: clamped.translateY - baseTransform.translateY,
    })
    onExploreModeChange(
      Math.abs(clamped.scale - baseTransform.scale) > 0.001 ||
        Math.abs(clamped.translateX - baseTransform.translateX) > 0.001 ||
        Math.abs(clamped.translateY - baseTransform.translateY) > 0.001,
    )
  }

  const resetManual = () => {
    setManualOffset({ x: 0, y: 0 })
    setManualScale(null)
    onExploreModeChange(false)
  }

  return {
    transform: effectiveTransform,
    baseTransform,
    focusRect,
    resetManual,
    panBy,
    zoomTo,
    minScale: MIN_SCALE,
    maxScale: MAX_SCALE,
  }
}
