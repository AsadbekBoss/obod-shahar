'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import KPICard from '@/components/ui/KPICard'
import StatusBadge from '@/components/ui/StatusBadge'
import Pagination from '@/components/ui/Pagination'
import Link from 'next/link'
import { Plus, Filter, Search, Pencil, Trash2, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'

const vehicles = [
  {
    plate: '01 A 777 AA',
    model: 'ISUZU MAN 18.290',
    capacity: 'CAMRV-01',
    mahalla: 'Registan',
    status: 'active' as const,
  },
  {
    plate: '05 B 555 BB',
    model: 'KAMAZ 65115',
    capacity: 'PLAM-753',
    mahalla: 'Chorsu',
    status: 'maintenance' as const,
  },
  {
    plate: '01 K 001 XX',
    model: 'Nextu PVR',
    capacity: 'ETRAY7021',
    mahalla: 'Unassigned',
    status: 'offline' as const,
  },
  {
    plate: '12 C 332 CC',
    model: 'ISUZU Forward',
    capacity: 'CAMRV-04',
    mahalla: 'Bulungur',
    status: 'active' as const,
  },
  {
    plate: '07 D 211 DD',
    model: 'MAZ 5337',
    capacity: 'CAMRV-09',
    mahalla: 'Urgut',
    status: 'active' as const,
  },
  {
    plate: '03 E 988 EE',
    model: 'KAMAZ 5320',
    capacity: 'PLAM-102',
    mahalla: 'Pastdargom',
    status: 'maintenance' as const,
  },
  {
    plate: '09 F 441 FF',
    model: 'ISUZU ELF',
    capacity: 'CAMRV-07',
    mahalla: 'Kattakurgan',
    status: 'active' as const,
  },
  {
    plate: '11 G 673 GG',
    model: 'ZIL 130',
    capacity: 'ETRAY4412',
    mahalla: 'Unassigned',
    status: 'offline' as const,
  },
]

export default function FleetPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  const filtered = vehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='flex flex-col flex-1 min-h-screen bg-slate-50/50'>
      <Header title='Fleet Management' subtitle='Infrastructure Management' />

      <div className='p-4 md:p-8 flex-1 flex flex-col gap-6'>
        {/* KPI Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <KPICard
            label='Total Vehicles'
            value='482'
            trend={{ value: '+10% vs last month', up: true }}
          />
          <KPICard label='Active Now' value='391' note='87% utilization rate' />
          <KPICard label='In Maintenance' value='24' note='4 urgent repairs' />
          <KPICard label='Stopped Vehicles' value='12' note='Awaiting assignment' />
        </div>

        {/* Table Card */}
        <div className='bg-white/80 backdrop-blur-md rounded-2xl flex-1 flex flex-col border border-white shadow-xl shadow-slate-200/50 overflow-hidden'>
          {/* Table Toolbar */}
          <div className='flex flex-col lg:flex-row lg:items-center justify-between px-6 py-5 gap-4 border-b border-slate-100'>
            <div className='flex items-center gap-3'>
              <h2 className='font-bold text-slate-800 text-lg'>Vehicle Inventory</h2>
              <span className='text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-600 text-white tracking-wider'>
                Live Database
              </span>
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              <button className='flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors'>
                <Filter size={14} /> Filter
              </button>

              <div className='relative group'>
                <Search
                  size={14}
                  className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors'
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search units...'
                  className='pl-9 pr-4 py-2.5 text-sm bg-slate-100 rounded-xl outline-none w-full md:w-56 focus:ring-2 focus:ring-blue-500/10 focus:bg-white border border-transparent focus:border-blue-200 transition-all'
                />
              </div>

              <Link
                href='/fleet/new'
                className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-br from-blue-600 to-indigo-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95'
              >
                <Plus size={14} /> Register New Vehicle
              </Link>
            </div>
          </div>

          {/* Table Content */}
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-slate-50/50 border-b border-slate-100'>
                  {[
                    'Plate Number',
                    'Model & Capacity',
                    'Assigned Mahalla',
                    'Status',
                    'Actions',
                  ].map((h) => (
                    <th
                      key={h}
                      className='text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest'
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-50'>
                {filtered.map((v) => (
                  <tr
                    key={v.plate}
                    onClick={() => router.push(`/fleet/${v.plate.replace(/\s/g, '-')}`)}
                    className='group transition-colors hover:bg-blue-50/40 cursor-pointer'
                  >
                    <td className='px-6 py-4'>
                      <span className='font-bold text-sm text-blue-600'>{v.plate}</span>
                      <div className='text-[10px] mt-0.5 font-medium text-slate-400'>
                        VIN: {v.capacity}
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors text-slate-500'>
                          <Truck size={16} />
                        </div>
                        <div>
                          <div className='text-sm font-semibold text-slate-700'>{v.model}</div>
                          <div className='text-[10px] text-slate-400 font-medium'>
                            8,000 kg max capacity
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      {v.mahalla === 'Unassigned' ? (
                        <span className='text-xs text-slate-300 italic'>Not Assigned</span>
                      ) : (
                        <span className='text-sm font-medium text-slate-600'>{v.mahalla}</span>
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      <StatusBadge status={v.status} />
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          className='p-2 hover:bg-blue-100 rounded-lg text-slate-500 hover:text-blue-600 transition-colors'
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          className='p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors'
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className='flex flex-col sm:flex-row items-center justify-between px-6 py-5 border-t border-slate-100 gap-4'>
            <span className='text-xs font-medium text-slate-400'>
              Showing <span className='text-slate-700'>{filtered.length}</span> of 482 registered
              vehicles
            </span>
            <Pagination current={page} total={46} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
