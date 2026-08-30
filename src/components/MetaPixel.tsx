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

/** Paths that count as a lead. The thanks page is only reachable after a successful form post. */
const LEAD_PATHS = new Set(['/free-audit/thanks'])

const PIXEL_ID = site.metaPixelId

/**
 * Meta Pixel base code. Fires PageView on first load and on every client-side
 * route change, and a Lead event on the audit thank-you page. The inline snippet
 * handles the hard-load case (including a direct hit on the thanks page); the
 * pathname effect handles in-app navigation and skips the initial mount so the
 * two never double-fire.
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
    if (LEAD_PATHS.has(pathname)) window.fbq('track', 'Lead')
  }, [pathname])

  if (!PIXEL_ID) return null

  const leadPaths = JSON.stringify(Array.from(LEAD_PATHS))

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');
if(${leadPaths}.indexOf(window.location.pathname.replace(/\\/$/,''))!==-1){fbq('track','Lead');}
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
