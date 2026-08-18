import { useState } from 'react'
import { Mountain } from 'lucide-react'

type StrataImageProps = {
  src: string
  alt: string
  fallback: string
  iconClassName?: string
  eager?: boolean
  imageClassName?: string
}

export default function StrataImage({
  src,
  alt,
  fallback,
  iconClassName = '',
  eager = false,
  imageClassName = '',
}: StrataImageProps) {
  const [failed, setFailed] = useState(false)

  return (
    <>
      <div
        className={`absolute inset-0 z-0 bg-center bg-cover bg-no-repeat ${imageClassName}`}
        style={{ backgroundImage: fallback }}
        aria-hidden="true"
      >
        <Mountain
          className={`absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-white/15 ${iconClassName}`}
          strokeWidth={1.2}
        />
      </div>
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          onError={() => setFailed(true)}
          className={`absolute inset-0 z-0 h-full w-full object-cover ${imageClassName}`}
        />
      )}
    </>
  )
}
