import Header from '@/components/layout/Header'
import KPICard from '@/components/ui/KPICard'
import { Truck, ChevronRight } from 'lucide-react'
import WeeklyChart from './WeeklyChart'
import RecentBinsTable from './RecentBinsTable'

const districts = [
  { name: 'Samarkand city', brigades: 42, percent: 88 },
  { name: 'Pastdargom', brigades: 18, percent: 96 },
  { name: 'Urgut district', brigades: 25, percent: 72 },
  { name: 'Bulungur', brigades: 12, percent: 64 },
]

export default function DashboardPage() {
  return (
    <div className='flex flex-col flex-1 min-h-screen'>
      <Header title='Dashboard' subtitle='Samarkand Region' />

      <div className='p-4 md:p-8 flex-1 flex flex-col gap-6'>
        {/* Filters row - Scrollable on mobile to keep items in one line */}
        <div
          className='flex items-center gap-4 text-xs overflow-x-auto pb-2 md:pb-0 no-scrollbar'
          style={{ color: 'var(--color-on-surface-variant)' }}
        >
          <div className='flex items-center gap-2 shrink-0'>
            <span className='font-600 uppercase tracking-wider'>Region:</span>
            <select
              className='rounded-lg px-3 py-1.5 outline-none text-xs'
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                color: 'var(--color-on-surface)',
              }}
            >
              <option>Samarkand</option>
            </select>
          </div>
          <div className='flex items-center gap-2 shrink-0'>
            <span className='font-600 uppercase tracking-wider'>District:</span>
            <select
              className='rounded-lg px-3 py-1.5 outline-none text-xs'
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                color: 'var(--color-on-surface)',
              }}
            >
              <option>All districts</option>
            </select>
          </div>
          <div className='flex items-center gap-2 shrink-0'>
            <span className='font-600 uppercase tracking-wider'>Mahalla:</span>
            <select
              className='rounded-lg px-3 py-1.5 outline-none text-xs'
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                color: 'var(--color-on-surface)',
              }}
            >
              <option>All mahallas</option>
            </select>
          </div>
        </div>

        {/* KPI Cards - 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <KPICard label='Total Bins' value='3,412' trend={{ value: '+8%', up: true }} />
          <KPICard label='Full Bins' value='156' note='Critical' />
          <KPICard label='Empty Bins' value='2,105' />
          <KPICard label='Active Vehicles' value='124' accent icon={<Truck size={20} />} />
        </div>

        {/* Charts & District Status - Stacked on mobile/tablet, side-by-side on LG */}
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6'>
          {/* Weekly Chart Container */}
          <div
            className='rounded-xl p-5'
            style={{
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.70)',
              boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
            }}
          >
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
              <div>
                <h2
                  className='font-headline font-600 text-base'
                  style={{ color: 'var(--color-on-surface)' }}
                >
                  Weekly Fill Level
                </h2>
                <p className='text-xs mt-0.5' style={{ color: 'var(--color-on-surface-variant)' }}>
                  Samarkand region data
                </p>
              </div>
              <div
                className='flex gap-2 p-1 rounded-full w-fit'
                style={{ backgroundColor: 'var(--color-surface-container-low)' }}
              >
                {['7 days', '30 days'].map((d, i) => (
                  <button
                    key={d}
                    className='text-[10px] sm:text-xs px-4 py-1.5 rounded-full font-500 transition-all'
                    style={{
                      backgroundColor: i === 0 ? 'var(--color-primary)' : 'transparent',
                      color: i === 0 ? 'white' : 'var(--color-on-surface-variant)',
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div className='h-[250px] w-full'>
              <WeeklyChart />
            </div>
          </div>

          {/* District Status */}
          <div
            className='rounded-xl p-5'
            style={{
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.70)',
              boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
            }}
          >
            <h2
              className='font-headline font-600 text-base mb-4'
              style={{ color: 'var(--color-on-surface)' }}
            >
              District Status
            </h2>
            <div className='flex flex-col gap-4'>
              {districts.map((d) => (
                <div key={d.name} className='flex items-center gap-3'>
                  <div
                    className='w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
                    style={{ backgroundColor: 'var(--color-surface-container-low)' }}
                  >
                    <Truck size={16} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div
                      className='text-xs font-600 truncate'
                      style={{ color: 'var(--color-on-surface)' }}
                    >
                      {d.name}
                    </div>
                    <div
                      className='text-[10px]'
                      style={{ color: 'var(--color-on-surface-variant)' }}
                    >
                      {d.brigades} active brigades
                    </div>
                  </div>
                  <div className='text-right'>
                    <div
                      className='text-sm font-700 font-headline'
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {d.percent}%
                    </div>
                    <div
                      className='w-16 h-1 rounded-full mt-1 ml-auto'
                      style={{ backgroundColor: 'var(--color-surface-container)' }}
                    >
                      <div
                        className='h-1 rounded-full'
                        style={{ width: `${d.percent}%`, backgroundColor: 'var(--color-primary)' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className='w-full mt-6 py-2.5 text-xs font-600 rounded-lg hover:brightness-95 transition-all'
              style={{
                backgroundColor: 'var(--color-surface-container-low)',
                color: 'var(--color-on-surface-variant)',
              }}
            >
              View All Districts
            </button>
          </div>
        </div>

        {/* Recent Activity Table - Wrapped in overflow-x-auto for small screens */}
        <div
          className='rounded-xl overflow-hidden'
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.70)',
            boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
          }}
        >
          <div
            className='flex flex-col md:flex-row md:items-center justify-between px-5 py-4 border-b gap-4'
            style={{ borderColor: 'var(--color-outline-variant)' }}
          >
            <h2
              className='font-headline font-600 text-base'
              style={{ color: 'var(--color-on-surface)' }}
            >
              Recent Trash Bin Activity
            </h2>
            <div className='flex items-center gap-2 flex-wrap'>
              <div className='flex bg-black/5 p-1 rounded-full'>
                {['All', 'Full', 'Empty'].map((f, i) => (
                  <button
                    key={f}
                    className='text-[10px] px-3 py-1 rounded-full font-500 transition-all'
                    style={{
                      backgroundColor: i === 0 ? 'var(--color-primary)' : 'transparent',
                      color: i === 0 ? 'white' : 'var(--color-on-surface-variant)',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <button
                className='text-[10px] ml-auto md:ml-2 flex items-center gap-1 font-600 uppercase tracking-tight'
                style={{ color: 'var(--color-on-surface-variant)' }}
              >
                Sort by Level <ChevronRight size={12} />
              </button>
            </div>
          </div>

          <div className='overflow-x-auto'>
            <RecentBinsTable />
          </div>
        </div>
      </div>
    </div>
  )
}
