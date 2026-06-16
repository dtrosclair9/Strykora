'use client'

import { ReactNode, Children } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
  as?: 'div' | 'section' | 'p' | 'span' | 'ul' | 'ol' | 'header' | 'article' | 'aside'
  className?: string
  stagger?: boolean
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
  as = 'div',
  className = '',
  stagger = false,
}: RevealProps) {
  // motion.div, motion.section, motion.p, etc. all exist on motion
  const MotionTag = motion[as] as React.ComponentType<HTMLMotionProps<typeof as>>

  if (stagger) {
    const items = Children.toArray(children)
    return (
      <MotionTag
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
        transition={{ staggerChildren: 0.08, delayChildren: delay }}
        variants={{ hidden: {}, visible: {} }}
      >
        {items.map((child, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y },
              visible: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
            }}
          >
            {child}
          </motion.div>
        ))}
      </MotionTag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -10% 0px' }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  )
}
