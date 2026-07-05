import { useState } from 'react'

interface MapImageProps {
  src: string
  transform: string
}

export function MapImage({ src, transform }: MapImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  return (
    <>
      {status !== 'loaded' && (
        <div className="absolute inset-0 flex items-center justify-center bg-museum-image-bg font-sans text-[0.72rem] uppercase tracking-[0.18em] text-museum-grey">
          {status === 'error' ? 'Image indisponible' : 'Chargement…'}
        </div>
      )}
      <img
        src={src}
        alt="Typus Orbis Terrarum — Abraham Ortelius, 1570"
        className="map-canvas absolute inset-0 h-full w-full object-cover pointer-events-none"
        style={{ transform }}
        draggable={false}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </>
  )
}
