'use client'

import { useEffect, useRef, useState } from 'react'

// Thibodaux Chamber of Commerce member badge widget.
// Provided by ChamberMaster (MNI Widgets).
const MEMBER_ID = 4185
const ELEMENT_ID = 'mni-membership-639118691517231109'
const SCRIPT_SRC = 'https://thibodauxchamber.chambermaster.com/Content/Script/Member.js'

declare global {
  interface Window {
    MNI?: {
      Widgets: {
        Member: new (
          targetId: string,
          options: { member: number; styleTemplate?: string },
        ) => { create: () => void }
      }
    }
  }
}

export default function ChamberBadge() {
  const initialized = useRef(false)
  const badge = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const target = badge.current
    if (!target) return

    const updateVisibility = () => {
      const hasLogo = Array.from(target.querySelectorAll('img')).some((image) => image.naturalWidth > 0)
      const text = document.createTreeWalker(target, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => node.textContent?.trim() && !node.parentElement?.closest('script, style, template')
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT,
      })
      setReady(hasLogo || Boolean(text.nextNode()))
    }
    const contentObserver = new MutationObserver(updateVisibility)
    contentObserver.observe(target, { childList: true, characterData: true, subtree: true })
    target.addEventListener('load', updateVisibility, true)
    updateVisibility()

    const init = () => {
      if (initialized.current || !window.MNI) return
      try {
        new window.MNI.Widgets.Member(ELEMENT_ID, {
          member: MEMBER_ID,
          styleTemplate:
            '#@id{position:relative;line-height:1.45}#@id .mn-widget-member-name{font-weight:700;color:inherit}#@id .mn-widget-member-logo{max-width:100%;max-height:72px;height:auto;width:auto}',
        }).create()
        initialized.current = true
      } catch {
        /* widget unavailable */
      }
    }

    let script: HTMLScriptElement | null = null
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()

      if (window.MNI) {
        init()
        return
      }

      script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
      if (script) {
        script.addEventListener('load', init, { once: true })
        return
      }

      script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      script.addEventListener('load', init, { once: true })
      document.head.appendChild(script)
    }, { rootMargin: '300px' })

    observer.observe(target)

    return () => {
      observer.disconnect()
      contentObserver.disconnect()
      target.removeEventListener('load', updateVisibility, true)
      script?.removeEventListener('load', init)
    }
  }, [])

  return (
    <div className="chamber-badge" data-ready={ready}>
      <p className="eyebrow">Proud member</p>
      <div ref={badge} id={ELEMENT_ID} className="chamber-badge-widget" />
    </div>
  )
}
