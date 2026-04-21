'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  current: number
  total: number
  onPageChange: (page: number) => void
}

export default function Pagination({ current, total, onPageChange }: PaginationProps) {
  const pages: (number | '...')[] = []

  // Sahifalarni hisoblash mantiqi
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i)
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }

  return (
    <div className='flex items-center justify-center gap-1.5 md:gap-2 py-4'>
      {/* Orqaga tugmasi */}
      <button
        onClick={() => onPageChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className='flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:bg-[var(--color-surface-container)] disabled:opacity-30 disabled:hover:bg-transparent text-[var(--color-on-surface-variant)]'
        aria-label='Previous page'
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      {/* Sahifa raqamlari */}
      <div className='flex items-center gap-1'>
        {pages.map((p, i) =>
          p === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className='flex h-9 w-8 items-center justify-center text-sm font-bold text-[var(--color-on-surface-variant)] opacity-50'
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-[13px] font-bold transition-all duration-200 ${
                current === p
                  ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20 scale-105'
                  : 'text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)]'
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      {/* Oldinga tugmasi */}
      <button
        onClick={() => onPageChange(Math.min(total, current + 1))}
        disabled={current === total}
        className='flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:bg-[var(--color-surface-container)] disabled:opacity-30 disabled:hover:bg-transparent text-[var(--color-on-surface-variant)]'
        aria-label='Next page'
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}
