'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Révèle au défilement tout élément `[data-reveal]` (et les titres `.words`)
 * de la page. Pose `data-motion` sur <html> : sans lui, rien n'est caché.
 * Rejoue l'observation quand `dep` change (langue), pour les nouveaux nœuds.
 */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return
    const root = document.documentElement
    root.setAttribute('data-motion', '')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    )
    document.querySelectorAll('[data-reveal]:not(.is-in), .words:not(.is-in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}

/** Un titre dont les mots montent un par un. */
export function Words({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <span className='words' style={{ '--d': `${delay}ms` } as CSSProperties} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className='w' style={{ '--i': i } as CSSProperties} aria-hidden>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}

/** Un nombre qui compte jusqu'à sa valeur quand il entre à l'écran. */
export function CountUp({ value, locale, suffix = '', prefix = '' }: { value: number; locale: string; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced() || !('IntersectionObserver' in window)) return
    setShown(0)
    let raf = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const duration = 1800
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(2, -10 * t)
        setShown(Math.round(value * (t === 1 ? 1 : eased)))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref} aria-label={`${prefix}${value.toLocaleString(locale)}${suffix}`}>
      <span aria-hidden>
        {prefix}
        {shown.toLocaleString(locale)}
        {suffix}
      </span>
    </span>
  )
}

/**
 * Onglets qui avancent seuls (pause au survol ou dès que l'utilisateur
 * choisit). La barre de progression de l'onglet actif suit `duration`.
 */
export function useAutoTabs<T extends HTMLElement = HTMLDivElement>(count: number, duration = 6000) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [manual, setManual] = useState(false)
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const running = visible && !paused && !manual && !reduced()
  useEffect(() => {
    if (!running) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % count), duration)
    return () => window.clearTimeout(id)
  }, [running, active, count, duration])

  return {
    ref,
    active,
    running,
    select: (i: number) => {
      setManual(true)
      setActive(i)
    },
    hover: { onMouseEnter: () => setPaused(true), onMouseLeave: () => setPaused(false) },
  }
}

/**
 * Valeur 0 → 1 selon la traversée de l'élément dans la fenêtre, écrite dans
 * la variable CSS `--p` (aucun rendu React à chaque image).
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced()) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const h = window.innerHeight
      const p = Math.min(1, Math.max(0, (h - r.top) / (h + r.height * 0.5)))
      el.style.setProperty('--p', p.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return ref
}

export function Marquee({ children, speed = 38 }: { children: ReactNode; speed?: number }) {
  return (
    <div className='marquee' style={{ '--marquee-speed': `${speed}s` } as CSSProperties}>
      <div className='marquee-track'>{children}</div>
      <div className='marquee-track' aria-hidden>
        {children}
      </div>
    </div>
  )
}

/**
 * Fondu enchaîné directionnel : quand `id` change, l'ancien contenu sort d'un
 * côté pendant que le nouveau entre de l'autre (sens donné par `dir`). Les
 * deux sont empilés dans la même cellule de grille : pas de saut de mise en
 * page pendant l'échange.
 */
export function Swap({ id, dir = 1, children, className = '' }: { id: string | number; dir?: number; children: ReactNode; className?: string }) {
  const [lastId, setLastId] = useState(id)
  const [prev, setPrev] = useState<{ id: string | number; node: ReactNode } | null>(null)
  const node = useRef(children)
  if (id !== lastId) {
    setPrev({ id: lastId, node: node.current })
    setLastId(id)
  }
  node.current = children

  useEffect(() => {
    if (!prev) return
    const t = window.setTimeout(() => setPrev(null), 600)
    return () => window.clearTimeout(t)
  }, [prev])

  return (
    <div className={`swap ${className}`} style={{ '--dir': dir } as CSSProperties}>
      {prev ? (
        <div key={`out-${prev.id}`} className='swap-out' aria-hidden inert>
          {prev.node}
        </div>
      ) : null}
      <div key={`in-${id}`} className='swap-in'>
        {children}
      </div>
    </div>
  )
}
