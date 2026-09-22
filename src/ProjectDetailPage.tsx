import { ArrowLeft } from 'lucide-react'
import { useMemo, useState } from 'react'
import HorizontalGallery from './HorizontalGallery'
import ImageDetailPage from './ImageDetailPage'
import { LIFE_WALL_ITEMS } from './lifeImages'
import type { ProjectDetail } from './projectDetails'

type ProjectDetailPageProps = {
  detail: ProjectDetail
  onBack: () => void
}

export default function ProjectDetailPage({
  detail,
  onBack,
}: ProjectDetailPageProps) {
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
    return (
      <ImageDetailPage
        images={galleryItems}
        onBack={() => setActiveImageIndex(null)}
      />
    )
  }

  return (
    <main className="page-enter relative min-h-screen overflow-hidden bg-[#080908]">
      <div className="absolute inset-0 z-0">
        <HorizontalGallery
          items={galleryItems}
          onImageClick={(index) => setActiveImageIndex(index)}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-black/10 to-black/10" />
      <div className="pointer-events-none absolute bottom-6 left-5 z-10 sm:left-10 md:left-16">
        <button
          aria-label="返回项目"
          onClick={onBack}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
        >
          <ArrowLeft size={16} />
        </button>
      </div>
    </main>
  )
}
