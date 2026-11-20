'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { site } from '@/config/site'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/** Paths where a Lead can fire. Opening one directly or refreshing it must NOT count, so a
 * Lead also needs the one-time flag a form sets right after a successful submit. */
const LEAD_PATHS = new Set(['/free-audit/thanks', '/9-questions/thanks'])
const LEAD_FLAG = 'strykora-lead-submitted'

/** Called by a funnel form after /api/lead succeeds, just before it routes to the thanks page. */
export function markLeadSubmitted() {
  try {
    sessionStorage.setItem(LEAD_FLAG, '1')
  } catch {
    // Storage blocked (private mode): the Lead goes untracked rather than double-counted.
  }
}

function consumeLeadFlag(): boolean {
  try {
    if (sessionStorage.getItem(LEAD_FLAG) !== '1') return false
    sessionStorage.removeItem(LEAD_FLAG)
    return true
  } catch {
    return false
  }
}

const PIXEL_ID = site.metaPixelId

/**
 * Meta Pixel base code. Fires PageView on first load and on every client-side
 * route change. A Lead fires only on a thanks page AND only once per real form
 * submit (the flag is consumed by whichever fires first: the pathname effect on
 * in-app navigation, or the inline snippet if the pixel loads after the redirect).
 */
export default function MetaPixel() {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!window.fbq) return
    window.fbq('track', 'PageView')
    if (LEAD_PATHS.has(pathname) && consumeLeadFlag()) window.fbq('track', 'Lead')
  }, [pathname])

  if (!PIXEL_ID) return null

  const leadPaths = JSON.stringify(Array.from(LEAD_PATHS))

  return (
    <>
      <Script id="meta-pixel" strategy="lazyOnload">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');
try{if(${leadPaths}.indexOf(window.location.pathname.replace(/\\/$/,''))!==-1&&sessionStorage.getItem('${LEAD_FLAG}')==='1'){sessionStorage.removeItem('${LEAD_FLAG}');fbq('track','Lead');}}catch(e){}
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
