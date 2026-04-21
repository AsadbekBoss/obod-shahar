'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import FillLevelBar from '@/components/ui/FillLevelBar'
import Pagination from '@/components/ui/Pagination'
import { Filter, ArrowUpDown, Search, Plus, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const bins = [
  {
    id: 'BIN-10294',
    location: 'Gulistan Mahalla',
    sub: 'Block B, Near Central Park Entrance',
    fill: 92,
    status: 'full' as const,
  },
  {
    id: 'BIN-10342',
    location: 'Navoiy District',
    sub: 'Amir Temur Street, Bus Stop #12',
    fill: 45,
    status: 'medium' as const,
  },
  {
    id: 'BIN-10551',
    location: 'Chilonzor Mahalla',
    sub: 'School No. 4, North Side Gate',
    fill: 12,
    status: 'empty' as const,
  },
  {
    id: 'BIN-10883',
    location: 'Yunusobod District',
    sub: 'Mega Planet Shopping Center, Loading Dock',
    fill: 78,
    status: 'medium' as const,
  },
  {
    id: 'BIN-10991',
    location: 'Mirzo Ulugbek',
    sub: 'Near University Main Gate',
    fill: 55,
    status: 'medium' as const,
  },
  {
    id: 'BIN-11024',
    location: 'Sergeli District',
    sub: 'Bus Terminal, Platform 3',
    fill: 8,
    status: 'empty' as const,
  },
  {
    id: 'BIN-11156',
    location: 'Shaykhontohur',
    sub: 'Bazaar East Entrance',
    fill: 97,
    status: 'full' as const,
  },
  {
    id: 'BIN-11289',
    location: 'Almazar District',
    sub: 'Railway Station Road',
    fill: 34,
    status: 'medium' as const,
  },
  {
    id: 'BIN-11301',
    location: 'Bektemir District',
    sub: 'Industrial Zone, Gate 2',
    fill: 71,
    status: 'medium' as const,
  },
  {
    id: 'BIN-11445',
    location: 'Uchtepa District',
    sub: 'Park Central, East Path',
    fill: 18,
    status: 'empty' as const,
  },
  {
    id: 'BIN-11589',
    location: 'Kibray District',
    sub: 'Market Street 12',
    fill: 89,
    status: 'full' as const,
  },
  {
    id: 'BIN-11703',
    location: 'Bostanliq District',
    sub: 'Community Center Entrance',
    fill: 42,
    status: 'medium' as const,
  },
  {
    id: 'BIN-11812',
    location: 'Zangiota District',
    sub: 'Highway A-380, KM 14',
    fill: 63,
    status: 'medium' as const,
  },
  {
    id: 'BIN-11934',
    location: 'Qibray District',
    sub: 'Hospital Complex, Block A',
    fill: 5,
    status: 'empty' as const,
  },
  {
    id: 'BIN-12055',
    location: 'Toshkent District',
    sub: 'Airport Road Junction',
    fill: 91,
    status: 'full' as const,
  },
]

const PAGE_SIZE = 15

export default function TrashBinsPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const filtered = bins.filter(
    (b) =>
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className='flex flex-col flex-1 min-h-screen'>
      <Header title='Trash Bin Management' subtitle='Real-time infrastructure monitoring' />

      <div className='p-4 md:p-8 flex-1 flex flex-col gap-6'>
        {/* KPI Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[
            { label: 'Total Bins', value: '1,428', note: '+12% this month', theme: 'primary' },
            { label: 'Full Bins', value: '42', note: 'Immediate collection', theme: 'tertiary' },
            { label: 'Empty Bins', value: '856', note: 'Ready for usage', theme: 'primary' },
          ].map((k) => (
            <div
              key={k.label}
              className={`rounded-[22px] p-5 border border-white/70 bg-white/82 backdrop-blur-md shadow-lg shadow-slate-900/5 border-l-4 ${
                k.theme === 'tertiary'
                  ? 'border-l-[var(--color-tertiary)]'
                  : 'border-l-[var(--color-primary)]'
              }`}
            >
              <div className='text-[10px] font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)] mb-1'>
                {k.label}
              </div>
              <div
                className={`text-3xl md:text-4xl font-extrabold font-headline ${
                  k.theme === 'tertiary'
                    ? 'text-[var(--color-tertiary)]'
                    : k.label === 'Empty Bins'
                      ? 'text-[var(--color-primary)]'
                      : 'text-[var(--color-on-surface)]'
                }`}
              >
                {k.value}
              </div>
              <div className='text-[11px] mt-1 text-[var(--color-on-surface-variant)] font-medium'>
                {k.note}
              </div>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div className='rounded-[22px] flex-1 flex flex-col bg-white/82 backdrop-blur-md border border-white/70 shadow-xl shadow-slate-900/10 overflow-hidden'>
          {/* Toolbar */}
          <div className='flex flex-col md:flex-row md:items-center justify-between px-5 py-4 gap-4 border-b border-[var(--color-outline-variant)]'>
            <div className='flex flex-wrap items-center gap-2'>
              <button className='flex items-center gap-2 text-[11px] font-bold px-3 py-2 rounded-xl bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)] transition-colors'>
                <Filter size={14} /> Filter
              </button>
              <button className='flex items-center gap-2 text-[11px] font-bold px-3 py-2 rounded-xl bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)] transition-colors'>
                <ArrowUpDown size={14} /> Sort
              </button>
              <div className='relative flex-1 md:flex-none'>
                <Search
                  size={14}
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]'
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Quick search...'
                  className='pl-9 pr-4 py-2 text-xs rounded-xl outline-none w-full md:w-56 bg-[var(--color-surface-container-low)] text-[var(--color-on-surface)] focus:ring-2 ring-[var(--color-primary)]/20 transition-all'
                />
              </div>
            </div>

            <div className='flex items-center justify-between md:justify-end gap-4'>
              <span className='text-[11px] font-medium text-[var(--color-on-surface-variant)] hidden sm:inline'>
                {filtered.length} Bins total
              </span>
              <button
                onClick={() => router.push('/trash-bins/new')}
                className='flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg shadow-blue-600/20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-container)] active:scale-95 transition-transform'
              >
                <Plus size={14} /> <span className='hidden sm:inline'>New Bin</span>
                <span className='sm:hidden'>Add</span>
              </button>
            </div>
          </div>

          {/* Scrollable Table Area */}
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[700px]'>
              <thead>
                <tr className='bg-[var(--color-surface-container-high)]/50'>
                  {['Bin ID', 'Location Details', 'Fill Level', 'Status', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className='px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[var(--color-on-surface-variant)]'
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-[var(--color-outline-variant)]'>
                {paged.map((bin) => (
                  <tr
                    key={bin.id}
                    onClick={() => router.push(`/trash-bins/${bin.id}`)}
                    className='group transition-colors hover:bg-[var(--color-primary)]/[0.03] cursor-pointer'
                  >
                    <td className='px-6 py-4'>
                      <span className='font-bold text-xs text-[var(--color-primary)]'>
                        #{bin.id}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-xs font-bold text-[var(--color-on-surface)]'>
                        {bin.location}
                      </div>
                      <div className='text-[10px] text-[var(--color-on-surface-variant)] mt-0.5 line-clamp-1'>
                        {bin.sub}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <FillLevelBar percent={bin.fill} />
                    </td>
                    <td className='px-6 py-4'>
                      <StatusBadge status={bin.status} />
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1'>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className='p-2 rounded-lg hover:bg-white text-[var(--color-on-surface-variant)] shadow-sm transition-all active:scale-90'
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className='p-2 rounded-lg hover:bg-red-50 text-[var(--color-tertiary)] shadow-sm transition-all active:scale-90'
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Area */}
          <div className='flex items-center justify-between px-6 py-4 border-t border-[var(--color-outline-variant)] bg-white/30'>
            <button className='text-[11px] font-bold text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors disabled:opacity-30'>
              Previous
            </button>
            <Pagination current={page} total={totalPages || 1} onPageChange={setPage} />
            <button className='text-[11px] font-bold text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors disabled:opacity-30'>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
