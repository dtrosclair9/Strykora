'use client'

import { useEffect, useRef } from 'react'

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

  useEffect(() => {
    if (initialized.current) return

    const init = () => {
      if (!window.MNI) return
      try {
        new window.MNI.Widgets.Member(ELEMENT_ID, {
          member: MEMBER_ID,
          styleTemplate:
            '#@id{text-align:center;position:relative}#@id .mn-widget-member-name{font-weight:700;color:#94A3B8}#@id .mn-widget-member-logo{max-width:100%;max-height:90px;height:auto;width:auto;margin:0 auto;filter:brightness(1.05)}',
        }).create()
        initialized.current = true
      } catch {
        /* widget unavailable */
      }
    }

    if (window.MNI) {
      init()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', init, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.addEventListener('load', init, { once: true })
    document.head.appendChild(script)
  }, [])

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="eyebrow text-xs">Proud member</p>
      <div id={ELEMENT_ID} className="text-text-muted text-xs leading-tight max-w-[180px]" />
    </div>
  )
}
