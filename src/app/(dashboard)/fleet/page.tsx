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
        <div className='overflow-x-auto custom-scrollbar'>
          {/* Jadvalga min-width beramiz, shunda u juda torayib ketmaydi */}
          <table className='w-full min-w-[900px] border-collapse'>
            <thead>
              <tr className='bg-slate-50/50 border-b border-slate-100'>
                <th className='text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[180px]'>
                  Plate Number
                </th>
                <th className='text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[250px]'>
                  Model & Capacity
                </th>
                <th className='text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[180px]'>
                  Assigned Mahalla
                </th>
                <th className='text-left px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[140px]'>
                  Status
                </th>
                <th className='text-right px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[100px]'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-50'>
              {filtered.map((v) => (
                <tr
                  key={v.plate}
                  onClick={() => router.push(`/fleet/${v.plate.replace(/\s/g, '-')}`)}
                  className='group transition-colors hover:bg-blue-50/40 cursor-pointer'
                >
                  {/* Plate Number */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex flex-col'>
                      <span className='font-bold text-sm text-blue-600 tracking-tight'>
                        {v.plate}
                      </span>
                      <span className='text-[10px] mt-1 font-medium text-slate-400'>
                        VIN: {v.capacity}
                      </span>
                    </div>
                  </td>

                  {/* Model & Capacity */}
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-4'>
                      <div className='p-2.5 bg-slate-100 rounded-xl group-hover:bg-white transition-colors text-slate-500 shrink-0'>
                        <Truck size={18} />
                      </div>
                      <div className='flex flex-col min-w-0'>
                        <div className='text-sm font-bold text-slate-700 truncate'>{v.model}</div>
                        <div className='text-[10px] text-slate-400 font-medium mt-0.5'>
                          8,000 kg max capacity
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Assigned Mahalla */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {v.mahalla === 'Unassigned' ? (
                      <span className='text-xs text-slate-300 italic'>Not Assigned</span>
                    ) : (
                      <span className='text-sm font-bold text-slate-600'>{v.mahalla}</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <StatusBadge status={v.status} />
                  </td>

                  {/* Actions */}
                  <td className='px-6 py-4 text-right'>
                    <div className='flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
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
      </div>
    </div>
  )
}
