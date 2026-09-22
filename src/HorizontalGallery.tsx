import { useCallback, useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

import './HorizontalGallery.css'

type HorizontalGalleryItem = {
  image: string
  text: string
}

type HorizontalGalleryProps = {
  items: HorizontalGalleryItem[]
  onImageClick?: (index: number, item: HorizontalGalleryItem) => void
}

export default function HorizontalGallery({
  items,
  onImageClick,
}: HorizontalGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    moved: false,
  })
  const suppressClickRef = useRef(false)
  const suppressTimerRef = useRef<number | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const handleWheel = (event: WheelEvent) => {
      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY
      if (!delta) return
      event.preventDefault()
      track.scrollLeft += delta
    }

    track.addEventListener('wheel', handleWheel, { passive: false })
    return () => track.removeEventListener('wheel', handleWheel)
  }, [])

  useEffect(
    () => () => {
      if (suppressTimerRef.current !== null) {
        window.clearTimeout(suppressTimerRef.current)
      }
    },
    [],
  )

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return
      const track = trackRef.current
      if (!track) return

      dragRef.current = {
        active: true,
        pointerId: event.pointerId,
        startX: event.clientX,
        startScroll: track.scrollLeft,
        moved: false,
      }
      track.setPointerCapture?.(event.pointerId)
    },
    [],
  )

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      const track = trackRef.current
      if (!drag.active || !track) return

      const deltaX = event.clientX - drag.startX
      if (Math.abs(deltaX) > 8) drag.moved = true
      track.scrollLeft = drag.startScroll - deltaX
    },
    [],
  )

  const handlePointerUp = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      const track = trackRef.current
      if (!drag.active) return

      drag.active = false
      suppressClickRef.current = drag.moved
      if (track?.releasePointerCapture) {
        try {
          track.releasePointerCapture(event.pointerId)
        } catch {
          // The pointer may already have been released by the browser.
        }
      }

      if (suppressTimerRef.current !== null) {
        window.clearTimeout(suppressTimerRef.current)
      }
      suppressTimerRef.current = window.setTimeout(() => {
        suppressClickRef.current = false
      }, 140)
    },
    [],
  )

  const handleCardClick = useCallback(
    (index: number, item: HorizontalGalleryItem) => {
      if (suppressClickRef.current) return
      onImageClick?.(index, item)
    },
    [onImageClick],
  )

  return (
    <div
      ref={trackRef}
      className="horizontal-gallery"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      role="region"
      aria-label="横向项目图片画廊"
    >
      {items.map((item, index) => (
        <button
          key={`${item.text}-${index}`}
          type="button"
          className="horizontal-gallery__card"
          onClick={() => handleCardClick(index, item)}
          aria-label={item.text}
        >
          <span className="horizontal-gallery__media">
            <img src={item.image} alt={item.text} draggable={false} />
          </span>
          <span className="horizontal-gallery__caption">{item.text}</span>
        </button>
      ))}
    </div>
  )
}
