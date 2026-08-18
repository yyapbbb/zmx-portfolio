import { ArrowLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import CircularGallery from './CircularGallery'
import ImageDetailPage from './ImageDetailPage'
import { LIFE_WALL_ITEMS } from './lifeImages'
import type { WorkDetail } from './workDetails'

type WorkDetailPageProps = {
  detail: WorkDetail
  onBack: () => void
}

export default function WorkDetailPage({ detail, onBack }: WorkDetailPageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches,
  )
  const galleryItems = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => {
        const source =
          LIFE_WALL_ITEMS[(detail.imageStart + index) % LIFE_WALL_ITEMS.length]
        return {
          image: source.image,
          text: `${detail.title} ${String(index + 1).padStart(2, '0')}`,
        }
      }),
    [detail],
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  if (activeImageIndex != null) {
    const activeImage = galleryItems[activeImageIndex]
    if (activeImage) {
      return (
        <ImageDetailPage
          images={galleryItems}
          onBack={() => setActiveImageIndex(null)}
        />
      )
    }
  }

  return (
    <main className="page-enter relative min-h-screen overflow-hidden bg-[#080908]">
      <div className="absolute inset-0 z-0">
        <CircularGallery
          items={galleryItems}
          bend={isMobile ? -1.7 : -2.4}
          imageScale={isMobile ? 0.52 : 0.72}
          textColor="#ffffff"
          borderRadius={isMobile ? 0.04 : 0.06}
          font={isMobile ? '500 18px Inter' : '600 26px Inter'}
          scrollSpeed={isMobile ? 1.1 : 1.4}
          scrollEase={isMobile ? 0.12 : 0.09}
          onImageClick={(index) => setActiveImageIndex(index)}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col justify-end px-5 pb-20 pt-32 sm:px-10 md:px-16 lg:pb-24">
        <button
          aria-label="返回工作"
          onClick={onBack}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
        >
          <ArrowLeft size={16} />
        </button>
      </div>
    </main>
  )
}
