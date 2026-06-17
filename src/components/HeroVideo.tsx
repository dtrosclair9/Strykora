'use client'

import { useEffect, useRef } from 'react'

interface HeroVideoProps {
  src: string
  poster?: string
}

export default function HeroVideo({ src, poster }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.playsInline = true
    v.muted = true
    v.loop = true
    const play = () => v.play().catch(() => {})
    if (v.readyState >= 2) play()
    else v.addEventListener('loadeddata', play, { once: true })
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={ref}
        className="absolute inset-0 w-full h-full object-cover scale-105"
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* readability overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-bg/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30 mask-fade-bottom" aria-hidden="true" />
    </div>
  )
}
