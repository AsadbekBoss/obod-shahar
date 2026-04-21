'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav' // Yangi komponent

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className='min-h-screen bg-[var(--color-surface-container-lowest)]'>
      {/* Desktop uchun Sidebar - Faqat o'rtacha va katta ekranlarda ko'rinadi */}
      <div className='hidden md:block'>
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Mobil uchun pastki navigatsiya - Faqat kichik ekranlarda ko'rinadi */}
      <div className='md:hidden'>
        <MobileNav />
      </div>

      {/* Asosiy kontent qismi */}
      <main
        className={`flex min-h-screen flex-col gap-4 p-2.5 pb-24 md:pb-6 transition-all duration-300 ease-in-out ${
          // Mobil qurilmada (md dan kichik) margin-left 0 bo'ladi
          collapsed ? 'md:ml-[92px]' : 'md:ml-[280px]'
        } ml-0`}
      >
        {children}
      </main>
    </div>
  )
}
