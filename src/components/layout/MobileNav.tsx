'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Trash2,
  Truck,
  Users,
  Menu,
  ShieldCheck,
  BarChart3,
  ChartNoAxesCombined,
  X,
} from 'lucide-react'

export default function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Tashqariga bosilganda menyuni yopish
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Asosiy ko'rinib turadigan linklar
  const mainItems = [
    { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { href: '/trash-bins', label: 'Bins', icon: Trash2 },
    { href: '/fleet', label: 'Fleet', icon: Truck },
    { href: '/drivers', label: 'Drivers', icon: Users },
  ]

  // "More" menyusi ichidagi qo'shimcha linklar
  const moreItems = [
    { href: '/admins', label: 'Admins', icon: ShieldCheck },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/system-reports', label: 'Reports', icon: ChartNoAxesCombined },
  ]

  return (
    <nav className='fixed bottom-4 left-4 right-4 z-[100] flex h-16 items-center justify-around rounded-2xl border border-white/20 bg-slate-900/90 px-2 shadow-2xl backdrop-blur-xl'>
      {/* Asosiy Linklar */}
      {mainItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className='flex flex-col items-center gap-1 transition-transform active:scale-90'
          >
            <div
              className={`rounded-xl p-2 transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40' : 'text-white/60'}`}
            >
              <Icon size={20} />
            </div>
            <span className={`text-[10px] font-medium ${active ? 'text-white' : 'text-white/50'}`}>
              {label}
            </span>
          </Link>
        )
      })}

      {/* "More" tugmasi va uning menyusi */}
      <div className='relative' ref={menuRef}>
        {/* Ochiladigan menyu (Popup) */}
        {isOpen && (
          <div className='absolute bottom-20 right-0 w-48 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200'>
            <div className='flex flex-col p-2'>
              <div className='px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white/40'>
                Management
              </div>
              {moreItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${pathname === item.href ? 'bg-blue-600/20 text-blue-400' : 'text-white/70 hover:bg-white/5'}`}
                >
                  <item.icon size={18} />
                  <span className='text-xs font-medium'>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* More/Close tugmasi */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex flex-col items-center gap-1 transition-all ${isOpen ? 'text-blue-400' : 'text-white/60'}`}
        >
          <div className={`p-2 rounded-xl transition-colors ${isOpen ? 'bg-blue-600/20' : ''}`}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
          <span className='text-[10px] font-medium opacity-50'>{isOpen ? 'Close' : 'More'}</span>
        </button>
      </div>
    </nav>
  )
}
