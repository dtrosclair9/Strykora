'use client'

import { useRef, ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  as?: keyof JSX.IntrinsicElements
  className?: string
  stagger?: boolean
}

export default function Reveal({
  children,
  delay = 0,
  y = 30,
  duration = 0.8,
  as: Tag = 'div',
  className = '',
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const target = stagger ? ref.current.children : ref.current
      gsap.from(target, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger: stagger ? 0.08 : 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      })
    },
    { scope: ref }
  )

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
