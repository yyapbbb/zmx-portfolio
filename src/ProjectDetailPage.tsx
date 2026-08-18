import { ArrowLeft } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import AccordionGallery from './AccordionGallery'
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
  const lastCardClickRef = useRef<{ index: number; time: number } | null>(null)
  const galleryItems = useMemo(
    () =>
      Array.from({ length: 6 }, (_, index) => {
        const source =
          LIFE_WALL_ITEMS[(detail.imageStart + index) % LIFE_WALL_ITEMS.length]
        return {
          image: source.image,
          label: `${detail.title} ${String(index + 1).padStart(2, '0')}`,
          link: undefined,
        }
      }),
    [detail],
  )

  const imageItems = useMemo(
    () =>
      galleryItems.map((item) => ({
        image: item.image,
        text: item.label,
      })),
    [galleryItems],
  )

  const handleCardClick = (index: number) => {
    const now = performance.now()
    const lastClick = lastCardClickRef.current
    if (!lastClick || lastClick.index !== index || now - lastClick.time > 450) {
      lastCardClickRef.current = { index, time: now }
      return
    }
    lastCardClickRef.current = null
    setActiveImageIndex(index)
  }

  if (activeImageIndex != null) {
    return (
      <ImageDetailPage
        images={imageItems}
        onBack={() => setActiveImageIndex(null)}
      />
    )
  }

  return (
    <main className="page-enter relative min-h-screen overflow-hidden bg-[#080908]">
      <div className="absolute inset-x-0 bottom-0 top-24 z-0 flex items-center justify-center px-5 py-6 sm:px-10 md:px-14">
        <AccordionGallery
          items={galleryItems}
          height={560}
          accentColor="#f0863f"
          overlayColor="#070508"
          textColor="#ffffff"
          expandRatio={0.5}
          gap={12}
          radius={14}
          parallax={0.45}
          tilt={7}
          grayscale
          onItemClick={handleCardClick}
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
