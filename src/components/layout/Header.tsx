'use client'

import Link from 'next/link'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className='sticky top-[10px] z-50 mx-[10px] mt-[10px] flex items-center justify-between rounded-[22px] border border-white/70 bg-white/76 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur-[14px] md:px-6'>
      {/* Chap tomon: Sarlavha va Subtitr */}
      <div className='min-w-0 flex-1'>
        <h1 className='truncate text-base font-extrabold leading-tight text-[var(--color-on-surface)] md:text-lg'>
          {title}
        </h1>
        {subtitle && (
          <p className='truncate text-[10px] text-[var(--color-on-surface-variant)] md:text-[11px] mt-0.5'>
            {subtitle}
          </p>
        )}
      </div>

      {/* O'ng tomon: Profil qismi */}
      <div className='ml-4 flex items-center gap-3'>
        <Link
          href='/profile'
          className='group flex items-center gap-2.5 transition-opacity hover:opacity-80'
        >
          {/* Matnli qism - Mobil qurilmalarda yashiriladi, m-ekranda chiqadi */}
          <div className='hidden text-right sm:block'>
            <div className='text-xs font-bold text-[var(--color-on-surface)] leading-none'>
              Administrator
            </div>
            <div className='mt-1 text-[9px] text-[var(--color-on-surface-variant)] leading-none md:text-[10px]'>
              Samarkand R. Administration
            </div>
          </div>

          {/* Avatar */}
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] text-[13px] font-extrabold text-white shadow-sm outline outline-2 outline-offset-2 outline-transparent group-hover:outline-[var(--color-primary)]/20 transition-all'>
            A
          </div>
        </Link>
      </div>
    </header>
  )
}
