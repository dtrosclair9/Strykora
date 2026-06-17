'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface HeroVideoProps {
  src: string
  poster: string
  alt?: string
}

export default function HeroVideo({ src, poster, alt = '' }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    // Defer video loading until after the page has painted and become interactive.
    // The poster image carries the LCP; the video loads in the background and fades in.
    const idle = (cb: () => void) => {
      if ('requestIdleCallback' in window) {
        ;(window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(cb)
      } else {
        setTimeout(cb, 1200)
      }
    }

    idle(() => {
      const v = videoRef.current
      if (!v) return
      v.muted = true
      v.playsInline = true
      v.loop = true
      v.preload = 'auto'
      v.src = src
      const handleCanPlay = () => {
        setVideoReady(true)
        v.play().catch(() => {})
      }
      v.addEventListener('canplay', handleCanPlay, { once: true })
      v.load()
    })
  }, [src])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Poster as LCP — instant, lightweight */}
      <Image
        src={poster}
        alt={alt}
        fill
        className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ${
          videoReady ? 'opacity-0' : 'opacity-100'
        }`}
        sizes="100vw"
        priority
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-700 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-hidden="true"
      />
      {/* readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-bg/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30 mask-fade-bottom" aria-hidden="true" />
    </div>
  )
}
