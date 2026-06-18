interface HeroVideoProps {
  src: string
  poster?: string
}

export default function HeroVideo({ src, poster }: HeroVideoProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover scale-105"
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
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
