'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import Pagination from '@/components/ui/Pagination'
import { Plus, Search, Pencil, Trash2, User } from 'lucide-react'

const admins = [
  {
    id: 'ADM-2024-001',
    name: 'Elena Rodionova',
    region: 'Samarkand City',
    status: 'active' as const,
  },
  { id: 'ADM-2024-042', name: 'Marcus Chen', region: 'Pastdargom', status: 'active' as const },
  { id: 'ADM-2023-812', name: 'Sarah Jenkins', region: 'Urgut', status: 'inactive' as const },
  { id: 'ADM-2024-109', name: 'Priya Sharma', region: 'Bulungur', status: 'active' as const },
  { id: 'ADM-2024-215', name: 'Jasur Umarov', region: 'Kattakurgan', status: 'active' as const },
  {
    id: 'ADM-2024-318',
    name: 'Aziza Toshmatova',
    region: 'Samarkand City',
    status: 'active' as const,
  },
]

export default function AdminsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const filtered = admins.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.region.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='flex flex-col flex-1 min-h-screen'>
      <Header title='Administrator Management' />

      <div className='p-4 md:p-8 flex-1 flex flex-col gap-6'>
        {/* Title & Actions Row */}
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
          <h2
            className='font-headline font-bold text-xl md:text-2xl'
            style={{ color: 'var(--color-on-surface)' }}
          >
            Administrator Directory
          </h2>

          <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3'>
            <div className='relative flex-1 sm:flex-none'>
              <Search
                size={14}
                className='absolute left-3 top-1/2 -translate-y-1/2'
                style={{ color: 'var(--color-on-surface-variant)' }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search name or ID...'
                className='pl-9 pr-3 py-2.5 text-xs rounded-xl outline-none w-full sm:w-64 transition-all focus:ring-2 focus:ring-primary/20'
                style={{
                  backgroundColor: 'var(--color-surface-container-low)',
                  color: 'var(--color-on-surface)',
                }}
              />
            </div>
            <button
              className='flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white whitespace-nowrap active:scale-95 transition-transform'
              style={{
                background:
                  'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))',
              }}
            >
              <Plus size={14} /> Register New Admin
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div
          className='rounded-2xl flex-1 flex flex-col overflow-hidden'
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.70)',
            boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
          }}
        >
          {/* Scrollable Wrapper */}
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[800px]'>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-surface-container-high)' }}>
                  {['PHOTO', 'NAME & ID', 'REGION', 'STATUS', 'ACTIONS'].map((h) => (
                    <th
                      key={h}
                      className='text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest'
                      style={{ color: 'var(--color-on-surface-variant)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    className='border-b transition-colors hover:bg-primary/[0.04]'
                    style={{ borderColor: 'var(--color-outline-variant)' }}
                  >
                    <td className='px-6 py-4'>
                      <div
                        className='w-10 h-10 rounded-xl flex items-center justify-center shrink-0'
                        style={{
                          background:
                            'linear-gradient(135deg, var(--color-surface-container), var(--color-surface-container-high))',
                        }}
                      >
                        <User size={18} style={{ color: 'var(--color-on-surface-variant)' }} />
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div
                        className='font-bold text-xs'
                        style={{ color: 'var(--color-on-surface)' }}
                      >
                        {a.name}
                      </div>
                      <div
                        className='text-[10px] mt-1 font-medium'
                        style={{ color: 'var(--color-on-surface-variant)' }}
                      >
                        ID: {a.id}
                      </div>
                    </td>
                    <td
                      className='px-6 py-4 text-xs font-medium'
                      style={{ color: 'var(--color-on-surface)' }}
                    >
                      {a.region}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex'>
                        <StatusBadge status={a.status} />
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1'>
                        <button
                          className='p-2 rounded-lg hover:bg-black/5 transition-colors'
                          style={{ color: 'var(--color-on-surface-variant)' }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className='p-2 rounded-lg hover:bg-red-50 transition-colors'
                          style={{ color: 'var(--color-tertiary)' }}
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

          {/* Footer / Pagination */}
          <div
            className='flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t mt-auto'
            style={{ borderColor: 'var(--color-outline-variant)' }}
          >
            <span
              className='text-xs font-medium'
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              Showing <span className='text-black'>1-{filtered.length}</span> of 24 Administrators
            </span>
            <div className='scale-90 sm:scale-100'>
              <Pagination current={page} total={3} onPageChange={setPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
