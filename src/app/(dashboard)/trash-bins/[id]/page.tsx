import Header from '@/components/layout/Header'
import {
  ChevronRight,
  Eye,
  Truck,
  Construction,
  History,
  FileText,
  TrendingDown,
  BadgeCheck,
  MapPin,
  Play,
  MoreVertical,
} from 'lucide-react'

const logisticsHistory = [
  {
    date: 'Oct 12, 2023',
    time: '06:12',
    plate: '01 A 452 AA',
    driver: 'Davron Karimov',
    captures: 2,
    status: 'completed' as const,
  },
  {
    date: 'Oct 11, 2023',
    time: '18:45',
    plate: '01 B 124 BB',
    driver: 'Shoxrukh Umarov',
    captures: 1,
    status: 'completed' as const,
  },
  {
    date: 'Oct 11, 2023',
    time: '08:30',
    plate: '01 A 777 AA',
    driver: 'Alisher Vohidov',
    captures: 2,
    status: 'delayed' as const,
  },
]

const weeklyFill = [
  { day: 'MON', pct: 40 },
  { day: 'TUE', pct: 65 },
  { day: 'WED', pct: 85 },
  { day: 'THU', pct: 30 },
  { day: 'FRI', pct: 55 },
  { day: 'SAT', pct: 95 },
  { day: 'SUN', pct: 88, current: true },
]

const upcomingLogistics = [
  {
    tag: 'Priority Task',
    tagBg: 'bg-blue-100',
    tagColor: 'text-blue-600',
    time: '10:45',
    plate: '01 A 777 AA',
    driver: 'Davron Karimov',
    note: 'En Route (1.2km away)',
    noteColor: 'text-blue-600',
    opacity: 'opacity-100',
    icon: Truck,
  },
  {
    tag: 'Maintenance',
    tagBg: 'bg-gray-100',
    tagColor: 'text-gray-600',
    time: '14:15',
    plate: '01 B 124 BB',
    driver: 'Shoxrukh Umarov',
    note: 'Scheduled',
    noteColor: 'text-gray-500',
    opacity: 'opacity-80',
    icon: Construction,
  },
  {
    tag: 'Backup',
    tagBg: 'bg-gray-100',
    tagColor: 'text-gray-600',
    time: '18:00',
    plate: '01 C 888 CC',
    driver: 'Alisher Vohidov',
    note: 'Scheduled',
    noteColor: 'text-gray-500',
    opacity: 'opacity-60',
    icon: Truck,
  },
]

export default async function BinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className='flex flex-col flex-1 min-h-screen bg-gray-50'>
      <Header
        title={`Bin #${id} (Registan Square)`}
        subtitle='High-density tourism corridor diagnostic interface'
      />

      <div className='p-4 md:p-8 flex-1 flex flex-col gap-6'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-1.5 text-gray-500'>
          <MapPin size={12} className='text-blue-600' />
          <span className='font-bold text-[10px] uppercase tracking-widest text-blue-600'>
            Heritage Zone • Samarkand District
          </span>
        </div>

        {/* ── TOP GRID: Time-Lapse + Logistics ── */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
          {/* Left: Fill Level Time-Lapse (8/12 on desktop) */}
          <div className='lg:col-span-8 rounded-xl overflow-hidden flex flex-col bg-white shadow-sm border border-gray-100'>
            {/* Card header */}
            <div className='flex flex-wrap items-center justify-between px-4 py-4 bg-blue-50/30 border-b border-gray-100 gap-3'>
              <h2 className='font-semibold text-base flex items-center gap-2 text-gray-800'>
                <Eye size={16} className='text-blue-600' />
                Fill Level Time-Lapse
              </h2>
              <div className='flex items-center gap-2 md:gap-3'>
                <div className='flex bg-gray-100 rounded-lg p-0.5'>
                  {['Daily', 'Weekly'].map((l, i) => (
                    <button
                      key={l}
                      className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${i === 0 ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
                <button className='hidden sm:block text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600'>
                  Oct 12, 2023
                </button>
              </div>
            </div>

            {/* Image area */}
            <div className='relative aspect-video bg-black overflow-hidden'>
              <div className='w-full h-full bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 opacity-70 flex items-center justify-center'>
                <div className='text-white text-center'>
                  <div className='text-5xl md:text-6xl mb-2'>🏛️</div>
                  <div className='text-xs md:text-sm font-medium'>Registan Square, Samarkand</div>
                </div>
              </div>

              {/* Overlays */}
              <div className='absolute top-4 left-4 flex flex-col gap-2 scale-90 md:scale-100 origin-top-left'>
                <div className='flex items-center gap-3 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 shadow-xl'>
                  <div className='w-3 h-3 rounded-full animate-pulse bg-red-600' />
                  <div>
                    <div className='text-[9px] font-bold uppercase tracking-widest text-gray-500 leading-none'>
                      Snapshot Fill
                    </div>
                    <div className='text-lg font-bold text-gray-900'>88% Full</div>
                  </div>
                </div>
                <div className='px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 shadow-xl'>
                  <div className='text-[9px] font-bold uppercase tracking-widest text-gray-500 leading-none'>
                    CCTV Status
                  </div>
                  <div className='flex items-center gap-1.5 text-base font-bold text-blue-600'>
                    <span className='w-2 h-2 rounded-full animate-pulse bg-blue-600' /> ONLINE
                  </div>
                </div>
              </div>

              <div className='absolute bottom-4 right-4'>
                <div className='font-mono text-[10px] px-3 py-1 rounded bg-black/50 backdrop-blur-sm text-white/80 border border-white/10'>
                  REC 16:42:09
                </div>
              </div>
            </div>

            {/* Timeline scrubber */}
            <div className='px-4 md:px-6 py-6 bg-blue-50/20'>
              <div className='flex items-center gap-4 mb-6'>
                <button className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors'>
                  <Play size={16} fill='white' />
                </button>
                <div>
                  <div className='text-[10px] font-bold uppercase tracking-wider text-blue-600'>
                    Current Viewback
                  </div>
                  <div className='text-lg font-bold text-gray-900'>16:42:09</div>
                </div>
              </div>

              <div className='relative px-1 pb-6'>
                <div className='relative h-2 rounded-full bg-gray-200'>
                  <div
                    className='absolute left-0 top-0 h-full rounded-full bg-blue-600'
                    style={{ width: '70%' }}
                  />
                  <div
                    className='absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-blue-600 cursor-grab'
                    style={{ left: '70%' }}
                  >
                    <div className='absolute inset-1.5 rounded-full bg-blue-600' />
                  </div>
                </div>
                <div className='absolute inset-x-0 bottom-0 flex justify-between'>
                  {['00:00', '08:00', '12:00', '16:00', '20:00', '23:59'].map((t) => (
                    <div key={t} className='flex flex-col items-center'>
                      <div
                        className={`w-px h-2 ${t === '16:00' ? 'h-4 bg-blue-600' : 'bg-gray-300'}`}
                      />
                      <span
                        className={`text-[9px] font-bold mt-1 ${t === '16:00' ? 'text-blue-600' : 'text-gray-400'}`}
                      >
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Upcoming Logistics (4/12 on desktop) */}
          <div className='lg:col-span-4 rounded-xl p-6 bg-white border border-gray-100 shadow-sm flex flex-col'>
            <h2 className='font-semibold text-base mb-5 flex items-center gap-2 text-gray-800'>
              <Truck size={16} className='text-blue-600' />
              Upcoming Logistics
            </h2>

            <div className='flex flex-col gap-3 flex-1'>
              {upcomingLogistics.map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border transition-all ${item.opacity} ${i === 0 ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-gray-100'}`}
                  >
                    <div className='flex items-center justify-between mb-3'>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${item.tagBg} ${item.tagColor}`}
                      >
                        {item.tag}
                      </span>
                      <span
                        className={`text-sm font-bold ${i === 0 ? 'text-blue-600' : 'text-gray-500'}`}
                      >
                        {item.time}
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-white shadow-sm' : 'bg-gray-50'}`}
                      >
                        <Icon size={22} className={i === 0 ? 'text-blue-600' : 'text-gray-400'} />
                      </div>
                      <div>
                        <div className='font-bold text-sm text-gray-800'>{item.plate}</div>
                        <div className='text-xs text-gray-500'>{item.driver}</div>
                      </div>
                    </div>
                    <div
                      className={`mt-3 text-xs font-semibold flex items-center gap-1 ${item.noteColor}`}
                    >
                      {item.note}
                    </div>
                  </div>
                )
              })}
            </div>

            <button className='mt-5 w-full py-3 rounded-xl font-bold text-xs border-2 border-dashed border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors'>
              Assign Emergency Task
            </button>
          </div>
        </div>

        {/* ── STATS SECTION ── */}
        <div className='rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm'>
          <div className='flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/30'>
            <h2 className='font-semibold text-base text-gray-800'>Performance & Trends</h2>
            <div className='flex items-center gap-2'>
              <span className='w-2.5 h-2.5 rounded-full bg-blue-600' />
              <span className='text-[10px] font-bold uppercase tracking-wider text-gray-500'>
                7-Day Analysis
              </span>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-12'>
            {/* Metrics Sidebar */}
            <div className='md:col-span-4 p-6 md:p-8 flex flex-col gap-8 border-b md:border-b-0 md:border-r border-gray-100'>
              <div>
                <div className='text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-500'>
                  Avg Fill Time
                </div>
                <div className='flex items-baseline gap-2'>
                  <span className='text-4xl md:text-5xl font-bold text-gray-900 tracking-tight'>
                    4.2
                  </span>
                  <span className='font-semibold text-gray-500'>hours</span>
                </div>
                <div className='mt-2 flex items-center gap-1.5 text-xs font-bold text-blue-600'>
                  <TrendingDown size={14} /> -12% from last week
                </div>
              </div>

              <div>
                <div className='text-[10px] font-bold uppercase tracking-widest mb-2 text-gray-500'>
                  Efficiency Score
                </div>
                <div className='flex items-baseline gap-2'>
                  <span className='text-4xl md:text-5xl font-bold text-gray-900 tracking-tight'>
                    94
                  </span>
                  <span className='font-semibold text-gray-500'>/100</span>
                </div>
                <div className='mt-2 flex items-center gap-1.5 text-xs font-bold text-blue-600'>
                  <BadgeCheck size={14} /> Top 5% in District
                </div>
              </div>

              <div className='rounded-xl p-4 bg-gray-50 border border-gray-100'>
                <div className='text-[10px] font-bold uppercase tracking-widest mb-1 text-gray-500'>
                  Last Serviced
                </div>
                <div className='font-bold text-sm text-gray-800'>Today, 06:12</div>
                <div className='text-xs mt-0.5 text-gray-500'>Ref 01 A 452 AA • 12.4kg</div>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className='md:col-span-8 p-6 md:p-8'>
              <div className='h-56 flex items-end gap-2 sm:gap-4 px-2 mb-6 relative'>
                <div className='absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5'>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className='border-b border-black w-full' />
                  ))}
                </div>
                {weeklyFill.map(({ day, pct, current }) => (
                  <div key={day} className='flex-1 flex flex-col items-center gap-2 relative group'>
                    <div
                      className={`w-full rounded-t-lg transition-all relative ${current ? 'bg-blue-600/20' : 'bg-blue-600/10 hover:bg-blue-600/15'}`}
                      style={{ height: `${pct}%` }}
                    >
                      <div
                        className={`absolute top-0 inset-x-0 ${current ? 'border-t-4 border-blue-600 shadow-[0_-4px_12px_rgba(37,99,235,0.2)]' : 'border-t-2 border-blue-400 opacity-60'}`}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-bold ${current ? 'text-blue-600' : 'text-gray-400'}`}
                    >
                      {day}
                    </span>
                  </div>
                ))}
              </div>
              <div className='flex flex-wrap justify-between items-center p-4 rounded-xl bg-gray-50 gap-4'>
                <div className='flex gap-4'>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-blue-600' />
                    <span className='text-xs font-semibold text-gray-600'>Fill Level</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-gray-300' />
                    <span className='text-xs font-semibold text-gray-600'>Baseline</span>
                  </div>
                </div>
                <button className='text-xs font-bold uppercase tracking-wider text-blue-600 hover:underline'>
                  Historical Logs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── LOGISTICS HISTORY TABLE ── */}
        <section className='rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm overflow-x-auto'>
          <div className='flex items-center justify-between px-6 py-4 border-b border-gray-50 min-w-[600px]'>
            <h2 className='font-semibold text-base flex items-center gap-2 text-gray-800'>
              <History size={16} className='text-blue-600' />
              Logistics History
            </h2>
            <button className='text-xs font-bold px-3 py-1 rounded-lg border border-blue-100 text-blue-600 hover:bg-blue-50'>
              View All
            </button>
          </div>

          <table className='w-full text-left min-w-[600px]'>
            <thead>
              <tr className='bg-gray-50/50'>
                {['Date & Time', 'Vehicle & Driver', 'Captures', 'Status', ''].map((h) => (
                  <th
                    key={h}
                    className='px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400'
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {logisticsHistory.map((row, i) => (
                <tr key={i} className='hover:bg-blue-50/30 transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='font-semibold text-sm text-gray-800'>{row.date}</div>
                    <div className='text-xs text-gray-500'>{row.time}</div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100 border border-gray-200'>
                        <Truck size={16} className='text-blue-600' />
                      </div>
                      <div>
                        <div className='font-bold text-sm text-gray-800'>{row.plate}</div>
                        <div className='text-xs text-gray-500'>{row.driver}</div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex gap-1.5'>
                      {Array.from({ length: row.captures }).map((_, j) => (
                        <div
                          key={j}
                          className='w-8 h-8 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center text-xs'
                        >
                          📷
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${row.status === 'completed' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${row.status === 'completed' ? 'bg-blue-600' : 'bg-red-600'}`}
                      />
                      {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                    </span>
                  </td>
                  <td className='px-6 py-4 text-right text-gray-400'>
                    <button className='p-1 hover:bg-gray-100 rounded-md'>
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='p-4 border-t border-gray-50 bg-gray-50/30 text-center'>
            <button className='text-xs font-bold uppercase tracking-wider text-blue-600 hover:underline flex items-center gap-2 mx-auto'>
              <FileText size={14} /> Generate Full Report
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
