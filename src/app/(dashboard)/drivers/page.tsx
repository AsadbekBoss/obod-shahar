'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import StatusBadge from '@/components/ui/StatusBadge'
import Pagination from '@/components/ui/Pagination'
import Link from 'next/link'
import { Plus, Search, Pencil, Trash2, Truck, User, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

const drivers = [
  {
    id: 'javohir-doniyorov',
    name: 'Javohir Doniyorov',
    uid: 'OS-7729-D',
    vehicle: 'TASH 01 777 AA',
    status: 'active' as const,
  },
  {
    id: 'alisher-mirzo',
    name: 'Alisher Mirzo',
    uid: 'OS-8104-D',
    vehicle: null,
    status: 'resting' as const,
  },
  {
    id: 'nigora-sobirova',
    name: 'Nigora Sobirova',
    uid: 'OS-3391-D',
    vehicle: 'TASH 10 902 ZA',
    status: 'offline' as const,
  },
  {
    id: 'rustam-azimov',
    name: 'Rustam Azimov',
    uid: 'OS-1225-D',
    vehicle: 'TASH 01 444 BB',
    status: 'active' as const,
  },
  {
    id: 'dilshod-karimov',
    name: 'Dilshod Karimov',
    uid: 'OS-0042-D',
    vehicle: '01 A 777 AA',
    status: 'active' as const,
  },
  {
    id: 'elena-rodionova',
    name: 'Elena Rodionova',
    uid: 'OS-2291-D',
    vehicle: '01 B 223 BB',
    status: 'active' as const,
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    uid: 'OS-4412-D',
    vehicle: null,
    status: 'resting' as const,
  },
  {
    id: 'artem-sokolov',
    name: 'Artem Sokolov',
    uid: 'OS-5531-D',
    vehicle: '01 C 445 CC',
    status: 'active' as const,
  },
]

export default function DriversPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const filtered = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.uid.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='flex flex-col flex-1 bg-slate-50/50 min-h-screen'>
      <Header
        title='Drivers Management'
        subtitle='Manage and monitor municipal transportation staff'
      />

      <div className='p-4 md:p-8 flex-1 flex flex-col gap-8'>
        {/* Toolbar Section */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
          <div>
            <h2 className='font-black text-slate-900 text-3xl tracking-tight'>Driver Directory</h2>
            <p className='text-sm font-medium text-slate-500 mt-1'>
              Active personnel database for Samarkand Municipal Fleet
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <div className='relative group'>
              <Search
                size={16}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors'
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search by name or ID...'
                className='pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl outline-none w-full md:w-64 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm'
              />
            </div>
            <Link
              href='/drivers/new'
              className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-95'
            >
              <UserPlus size={16} /> Register
            </Link>
          </div>
        </div>

        {/* Main Table Card */}
        <div className='bg-white/70 backdrop-blur-xl rounded-3xl flex-1 flex flex-col border border-white shadow-2xl shadow-slate-200/60 overflow-hidden'>
          <div className='overflow-x-auto'>
            {/* min-w berish orqali elementlar bir-biriga minishib ketishini oldini olamiz */}
            <table className='w-full text-left min-w-[850px] border-collapse'>
              <thead>
                <tr className='bg-slate-50/80 border-b border-slate-100'>
                  <th className='px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest w-[80px]'>
                    Photo
                  </th>
                  <th className='px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest min-w-[220px]'>
                    Personnel Details
                  </th>
                  <th className='px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest w-[200px]'>
                    Current Vehicle
                  </th>
                  <th className='px-6 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest w-[150px]'>
                    Status
                  </th>
                  <th className='px-6 py-5 w-[100px]'></th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-50'>
                {filtered.map((d) => (
                  <tr
                    key={d.id}
                    onClick={() => router.push(`/drivers/${d.id}`)}
                    className='group hover:bg-blue-50/40 transition-all cursor-pointer'
                  >
                    <td className='px-6 py-4'>
                      <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-white shadow-sm group-hover:scale-105 transition-transform shrink-0'>
                        <User
                          size={22}
                          className='text-slate-400 group-hover:text-blue-500 transition-colors'
                        />
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='font-bold text-slate-900 group-hover:text-blue-600 transition-colors'>
                        {d.name}
                      </div>
                      <div className='text-[10px] font-black text-slate-400 uppercase tracking-tight mt-0.5'>
                        Badge ID: {d.uid}
                      </div>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      {d.vehicle ? (
                        <div className='flex items-center gap-2.5'>
                          <div className='p-1.5 bg-blue-50 rounded-lg text-blue-600 shrink-0'>
                            <Truck size={14} />
                          </div>
                          <span className='text-sm font-bold text-slate-700'>{d.vehicle}</span>
                        </div>
                      ) : (
                        <span className='text-[11px] font-bold text-slate-300 italic tracking-wide'>
                          Awaiting Assignment
                        </span>
                      )}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <StatusBadge status={d.status} />
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0'>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className='p-2 rounded-xl hover:bg-white hover:shadow-md text-slate-400 hover:text-blue-600 transition-all'
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className='p-2 rounded-xl hover:bg-white hover:shadow-md text-slate-400 hover:text-red-500 transition-all'
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className='mt-auto px-8 py-6 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30'>
            <div className='flex items-center gap-2 shrink-0'>
              <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
              <span className='text-xs font-bold text-slate-500 uppercase tracking-widest'>
                Showing {filtered.length} of 520 Staff Members
              </span>
            </div>
            <Pagination current={page} total={52} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
