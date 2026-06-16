'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { services, industries, site } from '@/config/site'

type Dropdown = 'services' | 'industries' | null

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<Dropdown>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const linkClass = (active: boolean) =>
    `text-sm font-medium transition-colors ${active ? 'text-text' : 'text-text-muted hover:text-text'}`

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${site.name} — home`}>
            <Image
              src="/images/strykora-icon.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="font-display font-bold text-lg tracking-tight">{site.name}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            <Link href="/" className={`px-3 py-2 ${linkClass(pathname === '/')}`}>
              Home
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('services')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`px-3 py-2 inline-flex items-center gap-1 ${linkClass(pathname.startsWith('/services'))}`}
                aria-expanded={openDropdown === 'services'}
                aria-haspopup="true"
              >
                Services
                <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'services' && (
                <div className="absolute top-full left-0 pt-2 w-72">
                  <div className="bg-bg-elevated border border-border rounded-xl p-2 shadow-2xl shadow-black/40">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="block px-4 py-3 rounded-lg hover:bg-bg-card transition-colors"
                      >
                        <div className="flex items-baseline justify-between">
                          <span className="font-medium text-text">{s.title}</span>
                          <span className="text-[10px] uppercase tracking-wider text-text-dim">0{s.priority}</span>
                        </div>
                        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{s.eyebrow}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown('industries')}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`px-3 py-2 inline-flex items-center gap-1 ${linkClass(pathname.startsWith('/industries'))}`}
                aria-expanded={openDropdown === 'industries'}
                aria-haspopup="true"
              >
                Industries
                <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === 'industries' && (
                <div className="absolute top-full left-0 pt-2 w-72">
                  <div className="bg-bg-elevated border border-border rounded-xl p-2 shadow-2xl shadow-black/40">
                    {industries.map((i) => (
                      <Link
                        key={i.slug}
                        href={`/industries/${i.slug}`}
                        className="block px-4 py-3 rounded-lg hover:bg-bg-card transition-colors"
                      >
                        <div className="font-medium text-text">{i.title}</div>
                        <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{i.short.split('.')[0]}.</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/case-studies" className={`px-3 py-2 ${linkClass(pathname.startsWith('/case-studies'))}`}>
              Case Studies
            </Link>
            <Link href="/about" className={`px-3 py-2 ${linkClass(pathname === '/about')}`}>
              About
            </Link>
            <Link href="/contact" className={`px-3 py-2 ${linkClass(pathname === '/contact')}`}>
              Contact
            </Link>
            <a
              href={`tel:${site.phoneRaw}`}
              className="ml-3 btn-primary !py-2 !px-4 text-sm"
              aria-label={`Call ${site.name} at ${site.phoneDisplay}`}
            >
              {site.phoneDisplay}
            </a>
          </nav>

          <button
            className="lg:hidden p-2 -mr-2 text-text"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <nav className="lg:hidden pb-6 pt-2 border-t border-border" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1 pt-2">
              <Link href="/" className="px-2 py-3 text-text font-medium">Home</Link>
              <details className="group">
                <summary className="px-2 py-3 text-text font-medium cursor-pointer flex items-center justify-between">
                  Services
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pl-4 mt-1 mb-2 space-y-1">
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="block px-2 py-2 text-sm text-text-muted hover:text-text">
                      {s.title}
                    </Link>
                  ))}
                </div>
              </details>
              <details className="group">
                <summary className="px-2 py-3 text-text font-medium cursor-pointer flex items-center justify-between">
                  Industries
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="pl-4 mt-1 mb-2 space-y-1">
                  {industries.map((i) => (
                    <Link key={i.slug} href={`/industries/${i.slug}`} className="block px-2 py-2 text-sm text-text-muted hover:text-text">
                      {i.title}
                    </Link>
                  ))}
                </div>
              </details>
              <Link href="/case-studies" className="px-2 py-3 text-text font-medium">Case Studies</Link>
              <Link href="/about" className="px-2 py-3 text-text font-medium">About</Link>
              <Link href="/contact" className="px-2 py-3 text-text font-medium">Contact</Link>
              <a href={`tel:${site.phoneRaw}`} className="mt-3 btn-primary justify-center">
                Call {site.phoneDisplay}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
