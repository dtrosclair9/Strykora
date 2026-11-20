'use client'

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type NavItem = {
  href: string
  label: string
  children?: { href: string; label: string; description?: string }[]
}

type SiteNavigationProps = {
  items: NavItem[]
  phoneHref: string
  phoneLabel: string
}

type OpenDropdown = { href: string; mode: 'hover' | 'click' }
const hoverQuery = '(min-width: 1024px) and (any-hover: hover) and (any-pointer: fine)'

function canHover(event: ReactPointerEvent) {
  return event.pointerType !== 'touch' && window.matchMedia(hoverQuery).matches
}

export default function SiteNavigation({ items, phoneHref, phoneLabel }: SiteNavigationProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdown, setDropdown] = useState<OpenDropdown | null>(null)
  const container = useRef<HTMLDivElement>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const dropdownButtons = useRef<Record<string, HTMLButtonElement | null>>({})
  const closeTimer = useRef<number>(undefined)

  const cancelClose = useCallback(() => {
    window.clearTimeout(closeTimer.current)
  }, [])

  const close = useCallback(() => {
    cancelClose()
    setMenuOpen(false)
    setDropdown(null)
  }, [cancelClose])

  useEffect(close, [close, pathname])
  useEffect(() => cancelClose, [cancelClose])

  useEffect(() => {
    if (!menuOpen && !dropdown) return

    function handleOutsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) close()
    }

    document.addEventListener('pointerdown', handleOutsidePointer)
    return () => document.removeEventListener('pointerdown', handleOutsidePointer)
  }, [close, menuOpen, dropdown])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    desktop.addEventListener('change', close)
    return () => desktop.removeEventListener('change', close)
  }, [close])

  function openOnHover(href: string, event: ReactPointerEvent<HTMLLIElement>) {
    if (!canHover(event)) return
    const focused = document.activeElement?.closest('.site-submenu')
    if (focused && !event.currentTarget.contains(focused)) return
    cancelClose()
    setDropdown((open) => open?.href === href ? open : { href, mode: 'hover' })
  }

  function closeAfterHover(href: string, event: ReactPointerEvent<HTMLLIElement>) {
    if (!canHover(event)) return
    const item = event.currentTarget
    cancelClose()
    closeTimer.current = window.setTimeout(() => {
      if (item.contains(document.activeElement)) return
      setDropdown((open) => open?.href === href && open.mode === 'hover' ? null : open)
    }, 160)
  }

  return (
    <div
      ref={container}
      className="site-nav-controls"
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) close()
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return
        if (dropdown) {
          cancelClose()
          dropdownButtons.current[dropdown.href]?.focus()
          setDropdown(null)
        } else if (menuOpen) {
          menuButton.current?.focus()
          close()
        } else {
          return
        }
        event.preventDefault()
      }}
    >
      <button
        ref={menuButton}
        type="button"
        className="site-menu-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Menu'}
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        onClick={() => {
          setMenuOpen(!menuOpen)
          setDropdown(null)
        }}
      >
        <span className="site-menu-icon" aria-hidden="true" />
      </button>
      <nav id="site-nav" className="site-nav" aria-label="Main navigation" data-open={menuOpen}>
        <ul className="site-nav-list">
          {items.map(({ href, label, children }, index) => {
            const isOpen = dropdown?.href === href
            const panelId = `site-submenu-${index}`
            const active = pathname === href || pathname?.startsWith(`${href}/`)

            return (
              <li
                key={href}
                onPointerEnter={children ? (event) => openOnHover(href, event) : undefined}
                onPointerLeave={children ? (event) => closeAfterHover(href, event) : undefined}
                onBlur={children ? (event) => {
                  if (event.currentTarget.contains(event.relatedTarget)) return
                  setDropdown((open) => open?.href === href ? null : open)
                } : undefined}
              >
                {children ? (
                  <>
                    <button
                      ref={(node) => { dropdownButtons.current[href] = node }}
                      type="button"
                      className="site-nav-link"
                      data-active={active}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        cancelClose()
                        setDropdown((open) => open?.href === href && open.mode === 'click'
                          ? null
                          : { href, mode: 'click' })
                      }}
                    >
                      {label}<span className="site-chevron" aria-hidden="true" />
                    </button>
                    <ul id={panelId} className="site-submenu" hidden={!isOpen}>
                      {children.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} prefetch={false} onClick={close} aria-current={pathname === item.href ? 'page' : undefined}>
                            {item.label}
                            {item.description && <span className="hidden lg:block">{item.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={href}
                    className="site-nav-link"
                    data-active={active}
                    prefetch={false}
                    onClick={close}
                    aria-current={pathname === href ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                )}
              </li>
            )
          })}
          <li>
            <a className="btn-primary site-nav-phone" href={phoneHref}>
              <span className="lg:hidden">Call </span>{phoneLabel}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
