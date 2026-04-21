'use client'

import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  label: string
  value: string | number
  trend?: { value: string; up: boolean }
  note?: string
  accent?: boolean
  icon?: ReactNode
}

export default function KPICard({ label, value, trend, note, accent, icon }: KPICardProps) {
  return (
    <div
      className={`relative flex flex-col gap-3 overflow-hidden rounded-[22px] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:p-6 ${
        accent
          ? 'border-white/20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] text-white shadow-xl shadow-blue-500/20'
          : 'border-white/70 bg-white/82 backdrop-blur-md shadow-lg shadow-slate-900/5'
      }`}
    >
      {/* Sarlavha va Ikonka */}
      <div className='flex items-center justify-between'>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider md:text-[11px] ${
            accent ? 'text-white/75' : 'text-[var(--color-on-surface-variant)]'
          }`}
        >
          {label}
        </span>
        {icon && (
          <div className={accent ? 'text-white/70' : 'text-[var(--color-on-surface-variant)]'}>
            {icon}
          </div>
        )}
      </div>

      {/* Qiymat (Value) */}
      <div
        className={`text-3xl font-extrabold leading-none tracking-tight md:text-4xl ${
          accent ? 'text-white' : 'text-[var(--color-on-surface)]'
        }`}
        style={{ fontFamily: 'var(--font-headline)' }}
      >
        {value}
      </div>

      {/* Trend va Izoh */}
      {(trend || note) && (
        <div
          className={`flex items-center flex-wrap gap-1.5 text-[11px] md:text-xs ${
            accent ? 'text-white/75' : 'text-[var(--color-on-surface-variant)]'
          }`}
        >
          {trend && (
            <div className='flex items-center gap-1'>
              {trend.up ? (
                <TrendingUp size={14} className={accent ? 'text-white' : 'text-green-600'} />
              ) : (
                <TrendingDown size={14} className='text-red-500' />
              )}
              <span
                className={`font-bold ${
                  trend.up ? (accent ? 'text-white' : 'text-green-600') : 'text-red-500'
                }`}
              >
                {trend.value}
              </span>
            </div>
          )}

          {trend && note && <span className='opacity-40'>|</span>}

          {note && <span className='font-medium'>{note}</span>}
        </div>
      )}

      {accent && (
        <div className='absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl' />
      )}
    </div>
  )
}
