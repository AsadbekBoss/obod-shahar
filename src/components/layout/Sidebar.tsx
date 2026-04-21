'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Trash2,
  Truck,
  Users,
  ShieldCheck,
  BarChart3,
  LogOut,
  Building2,
  ChevronLeft,
  ChartNoAxesCombined,
} from 'lucide-react'

const navGroups = [
  {
    section: 'Overview',
    items: [{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    section: 'Management',
    items: [
      { href: '/trash-bins', label: 'Trash Bins', icon: Trash2 },
      { href: '/fleet', label: 'Fleet', icon: Truck },
      { href: '/drivers', label: 'Drivers', icon: Users },
      { href: '/admins', label: 'Admins', icon: ShieldCheck },
    ],
  },
  {
    section: 'Insights',
    items: [
      { href: '/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/system-reports', label: 'System Reports', icon: ChartNoAxesCombined },
    ],
  },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-screen p-2.5 z-[100] transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Ichki konteyner - Dark Gradient */}
      <div className='relative flex h-full flex-col overflow-hidden rounded-[22px] bg-gradient-to-br from-[var(--color-sidebar-from)] to-[var(--color-sidebar-to)] px-3.5 py-5 shadow-2xl shadow-black/25'>
        {/* Logo qismi */}
        <div
          className={`flex items-center mb-4 pb-5 border-b border-white/10 overflow-hidden ${
            collapsed ? 'justify-center' : 'justify-start gap-2.5 px-1.5'
          }`}
        >
          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20'>
            <Building2 size={18} className='text-white' />
          </div>

          {!collapsed && (
            <div className='flex flex-col overflow-hidden whitespace-nowrap'>
              <span className='text-[13.5px] font-extrabold text-white tracking-tight'>
                Obod Shahar
              </span>
              <span className='text-[9.5px] font-semibold text-white/50 uppercase tracking-wider'>
                Infrastructure Authority
              </span>
            </div>
          )}
        </div>

        {/* Navigatsiya linklari */}
        <nav className='flex-1 overflow-y-auto overflow-x-hidden flex flex-col no-scrollbar'>
          {navGroups.map((group) => (
            <div key={group.section} className='mb-2'>
              {!collapsed && (
                <div className='px-2.5 py-3.5 text-[9.5px] font-bold uppercase tracking-widest text-white/30'>
                  {group.section}
                </div>
              )}
              {collapsed && <div className='h-2.5' />}

              <div className='flex flex-col gap-0.5'>
                {group.items.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href)
                  return (
                    <Link
                      key={href}
                      href={href}
                      title={collapsed ? label : undefined}
                      className={`relative flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition-all duration-200 group ${
                        collapsed ? 'justify-center py-2.5' : 'justify-start'
                      } ${
                        active
                          ? 'bg-[var(--color-sidebar-active-bg)] text-[var(--color-sidebar-text-active)] border border-white/15 font-bold'
                          : 'text-[var(--color-sidebar-text)] font-medium hover:bg-white/5'
                      }`}
                    >
                      {active && !collapsed && (
                        <span className='absolute -left-3.5 top-1/2 h-5.5 w-1 -translate-y-1/2 rounded-r bg-[var(--color-success)]' />
                      )}

                      <Icon size={18} strokeWidth={active ? 2.2 : 1.75} className='shrink-0' />

                      {!collapsed && <span className='truncate'>{label}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Pastki qism - Logout */}
        <div className='mt-auto border-t border-white/10 pt-3'>
          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-2.5 rounded-xl text-[13px] font-medium text-white/55 transition-colors hover:bg-white/5 hover:text-white ${
              collapsed ? 'justify-center py-2.5' : 'px-2.5 py-2 justify-start'
            }`}
          >
            <LogOut size={15} strokeWidth={1.75} className='shrink-0' />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Toggle tugmasi (Sidebar chetida) */}
      <button
        onClick={onToggle}
        className='absolute top-1/2 -right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-outline-variant)] bg-[var(--color-surface-container-lowest)] text-[var(--color-on-surface-variant)] shadow-md transition-all hover:scale-110 z-20'
        style={{ transform: `translateY(-50%) rotate(${collapsed ? '180deg' : '0deg'})` }}
      >
        <ChevronLeft size={13} />
      </button>
    </aside>
  )
}
