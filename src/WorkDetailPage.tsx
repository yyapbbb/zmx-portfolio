import { ArrowLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import HorizontalGallery from './HorizontalGallery'
import ImageDetailPage from './ImageDetailPage'
import { LIFE_WALL_ITEMS } from './lifeImages'
import type { WorkDetail } from './workDetails'

type WorkDetailPageProps = {
  detail: WorkDetail
  onBack: () => void
}

const MASONRY_HEIGHTS = [400, 250, 600, 320, 500, 360]

export default function WorkDetailPage({ detail, onBack }: WorkDetailPageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
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

  if (activeImageIndex != null) {
    const activeImage = galleryItems[activeImageIndex]
    if (activeImage) {
      return (
        <ImageDetailPage
          images={galleryItems}
          masonryHeights={MASONRY_HEIGHTS}
          onBack={() => setActiveImageIndex(null)}
        />
      )
    }
  }

  return (
    <main className="page-enter relative min-h-screen overflow-hidden bg-[#080908]">
      <div className="absolute inset-0 z-0">
        <HorizontalGallery
          items={galleryItems}
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
