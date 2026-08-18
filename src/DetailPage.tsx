import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import StrataImage from './StrataImage'
import type { StrataSite } from './strata'

type DetailPageProps = {
  site: StrataSite
  index: number
  total: number
  onBack: () => void
  onNext: () => void
}

export default function DetailPage({
  site,
  index,
  total,
  onBack,
  onNext,
}: DetailPageProps) {
  return (
    <main className="page-enter relative min-h-screen overflow-hidden bg-[#080908]">
      <StrataImage
        src={site.image}
        alt={site.title}
        fallback={site.fallback}
        iconClassName="h-16 w-16 text-white/15"
        eager
      />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/35 to-black/15" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end px-5 pb-20 pt-32 sm:px-10 md:px-16 lg:pb-24">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f0863f]">
            {site.period}
          </p>
          <h1 className="font-playfair mt-4 text-5xl font-normal italic leading-[0.95] text-white sm:text-7xl md:text-8xl">
            {site.title}
          </h1>
          <p className="mt-6 flex items-center gap-2 text-sm font-medium text-white/70">
            <MapPin size={16} />
            {site.place}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {site.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
            >
              <ArrowLeft size={17} />
              返回画廊
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 rounded-full bg-[#e8702a] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#d2611f] hover:shadow-lg hover:shadow-[#e8702a]/30 active:scale-95"
            >
              下一个记录
              <span className="text-white/70">
                {index + 1}/{total}
              </span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
