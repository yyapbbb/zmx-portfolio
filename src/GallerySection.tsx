import { ChevronRight } from 'lucide-react'
import StrataImage from './StrataImage'
import type { StrataSite } from './strata'

type GallerySectionProps = {
  sites: StrataSite[]
  onOpen: (site: StrataSite) => void
}

export default function GallerySection({ sites, onOpen }: GallerySectionProps) {
  return (
    <section
      id="strata"
      className="strata-module relative overflow-hidden bg-[#0a0b0a] px-5 py-20 sm:px-10 md:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <h2
            className="module-title-eng pointer-events-none absolute -top-7 left-0 z-0 select-none whitespace-nowrap text-[15vw] font-extrabold uppercase leading-[0.8] tracking-[-0.04em] text-transparent"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.14)' }}
            aria-hidden="true"
          >
            FIELD NOTES
          </h2>
          <div className="gallery-head-inner relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e8702a]">
                野外档案
              </p>
              <h2 className="font-playfair mt-3 text-4xl font-normal italic leading-none text-white sm:text-5xl md:text-6xl">
                石头里的故事
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              六种地质构造，六种地球写日记的方式：沉积、火山灰、贝壳与冷却的熔岩。
            </p>
          </div>
        </div>

        <div className="gallery-grid mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <button
              key={site.id}
              onClick={() => onOpen(site)}
              className="gallery-card group relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-[#151612] text-left transition-all hover:border-white/25 hover:shadow-xl hover:shadow-black/60"
            >
              <div className="gallery-card-media absolute inset-0 overflow-hidden">
                <StrataImage
                  src={site.image}
                  alt={site.title}
                  fallback={site.fallback}
                  imageClassName="gallery-card-img"
                />
              </div>
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/90" />
              <div className="absolute inset-x-0 bottom-0 z-[2] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  {site.period}
                </p>
                <h3 className="font-playfair mt-2 text-2xl font-normal italic leading-tight text-white">
                  {site.title}
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-white/75 transition-colors group-hover:text-[#f0863f]">
                  <span>{site.place}</span>
                  <ChevronRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
