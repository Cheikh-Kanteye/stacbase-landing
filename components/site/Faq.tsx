'use client'

import { useState, type CSSProperties } from 'react'
import { Plus } from './icons'
import s from './Faq.module.css'

/** Questions dépliables, communes à toutes les pages du site. */
export function Faq({ items }: { items: readonly (readonly [string, string])[] }) {
  const [open, setOpen] = useState(0)
  return (
    <div className={s.faq}>
      {items.map(([q, a], i) => {
        const on = open === i
        return (
          <div key={q} className={s.item} data-open={on || undefined} data-reveal style={{ '--d': `${i * 70}ms` } as CSSProperties}>
            <button type='button' aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}>
              {q}
              <span>
                <Plus size={16} />
              </span>
            </button>
            <div className={s.body}>
              <div>
                <p>{a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
