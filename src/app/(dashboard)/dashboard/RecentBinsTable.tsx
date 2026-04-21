'use client'

import { useRouter } from 'next/navigation'
import StatusBadge from '@/components/ui/StatusBadge'
import FillLevelBar from '@/components/ui/FillLevelBar'

const recentBins = [
  {
    id: 'BIN-001',
    location: 'Samarkand City',
    sublocation: 'Registan Mahalla',
    fill: 95,
    status: 'full' as const,
    updated: '10 mins ago',
  },
  {
    id: 'BIN-042',
    location: 'Pastdargom',
    sublocation: 'Juma Town',
    fill: 45,
    status: 'medium' as const,
    updated: '2 hours ago',
  },
  {
    id: 'BIN-108',
    location: 'Urgut District',
    sublocation: 'Center Market',
    fill: 12,
    status: 'empty' as const,
    updated: '5 mins ago',
  },
  {
    id: 'BIN-087',
    location: 'Samarkand City',
    sublocation: 'Siyob Market',
    fill: 88,
    status: 'full' as const,
    updated: '45 mins ago',
  },
]

export default function RecentBinsTable() {
  const router = useRouter()

  return (
    <div className='w-full overflow-x-auto no-scrollbar'>
      {/* Setting a min-width (e.g., 700px) ensures that on a 390px phone,
          the user can swipe left-to-right rather than seeing broken/squished columns.
      */}
      <table className='w-full min-w-[700px] border-collapse'>
        <thead>
          <tr style={{ backgroundColor: 'var(--color-surface-container-high)' }}>
            {['BIN ID', 'LOCATION', 'FILL LEVEL', 'STATUS', 'LAST UPDATE'].map((h) => (
              <th
                key={h}
                className='text-left px-5 py-4 text-[10px] font-semibold uppercase tracking-widest'
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recentBins.map((bin) => (
            <tr
              key={bin.id}
              onClick={() => router.push(`/trash-bins/${bin.id}`)}
              className='group border-b transition-all duration-200 hover:bg-primary/[0.04] cursor-pointer'
              style={{ borderColor: 'var(--color-outline-variant)' }}
            >
              <td className='px-5 py-4'>
                <span className='font-bold text-xs' style={{ color: 'var(--color-primary)' }}>
                  #{bin.id}
                </span>
              </td>
              <td className='px-5 py-4'>
                <div className='flex flex-col'>
                  <span
                    className='text-xs font-semibold'
                    style={{ color: 'var(--color-on-surface)' }}
                  >
                    {bin.location}
                  </span>
                  <span
                    className='text-[10px] opacity-70'
                    style={{ color: 'var(--color-on-surface-variant)' }}
                  >
                    {bin.sublocation}
                  </span>
                </div>
              </td>
              <td className='px-5 py-4 w-48'>
                <FillLevelBar percent={bin.fill} />
              </td>
              <td className='px-5 py-4'>
                {/* Wrapped in a div to ensure the badge
                   doesn't stretch to the height of the row
                */}
                <div className='flex'>
                  <StatusBadge status={bin.status} />
                </div>
              </td>
              <td
                className='px-5 py-4 text-xs font-medium'
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                {bin.updated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
