import Header from '@/components/layout/Header'
import {
  BarChart3,
  Users,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  MoreHorizontal,
} from 'lucide-react'

// Mock Data
const stats = [
  {
    label: 'Jami Action',
    value: '12,840',
    icon: BarChart3,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    label: 'Faol Driverlar',
    value: '42',
    icon: Users,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  { label: 'Total Bins', value: '1,240', icon: Trash2, color: 'text-amber-500', bg: 'bg-amber-50' },
  { label: 'Accepted', value: '8,420', icon: Clock, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  {
    label: 'Done',
    value: '7,950',
    icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  { label: 'Rejected', value: '470', icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
]

const topDrivers = [
  { id: 1, name: 'Jasur Jumayev', score: '98%', tasks: 450 },
  { id: 2, name: 'Farrux Aliev', score: '95%', tasks: 412 },
]

const lowDrivers = [
  { id: 3, name: 'Dilshod Karimov', score: '62%', tasks: 120 },
  { id: 4, name: 'Otabek Sodiqov', score: '58%', tasks: 95 },
]

export default function SystemReports() {
  return (
    <div className='p-4 md:p-8 flex flex-col gap-6 bg-gray-50 min-h-screen'>
      <Header title='System Analytics Reports' />

      {/* Stats Grid */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {stats.map((item, i) => (
          <div
            key={i}
            className='bg-white p-5 rounded-[22px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow'
          >
            <div
              className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-4`}
            >
              <item.icon size={20} className={item.color} />
            </div>
            <div className='text-[10px] font-bold text-gray-400 uppercase tracking-wider'>
              {item.label}
            </div>
            <div className='text-xl md:text-2xl font-extrabold text-gray-800 mt-1'>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Split */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Top Drivers */}
        <div className='bg-slate-900 rounded-[22px] p-6 text-white shadow-xl'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='p-2 bg-emerald-500/20 rounded-lg'>
              <TrendingUp className='text-emerald-400' size={20} />
            </div>
            <h3 className='text-lg font-semibold'>Eng yaxshi driverlar</h3>
          </div>
          <div className='space-y-3'>
            {topDrivers.map((d) => (
              <div
                key={d.id}
                className='flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors'
              >
                <span className='font-medium'>{d.name}</span>
                <div className='flex items-center gap-3'>
                  <span className='text-xs text-gray-400'>{d.tasks} ta topshiriq</span>
                  <span className='text-emerald-400 font-bold'>{d.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Performers */}
        <div className='bg-white rounded-[22px] p-6 border border-gray-100 shadow-sm'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='p-2 bg-red-50 rounded-lg'>
              <TrendingDown className='text-red-500' size={20} />
            </div>
            <h3 className='text-lg font-semibold text-gray-800'>Past ishlagan driverlar</h3>
          </div>
          <div className='space-y-3'>
            {lowDrivers.map((d) => (
              <div
                key={d.id}
                className='flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors'
              >
                <span className='font-medium text-gray-700'>{d.name}</span>
                <div className='flex items-center gap-3'>
                  <span className='text-xs text-gray-400'>{d.tasks} ta topshiriq</span>
                  <span className='text-red-500 font-bold'>{d.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className='bg-white rounded-[22px] border border-gray-100 shadow-sm overflow-hidden'>
        <div className='p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-50'>
          <h3 className='text-lg font-bold text-gray-800'>Driverlar bo'yicha umumiy jadval</h3>
          <div className='flex gap-2 w-full md:w-auto'>
            <div className='relative flex-1 md:flex-none'>
              <Search
                size={16}
                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              />
              <input
                placeholder='Qidirish...'
                className='pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-64'
              />
            </div>
            <button className='p-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors'>
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-gray-50/50'>
                <th className='px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest'>
                  Driver
                </th>
                <th className='px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest'>
                  Total Tasks
                </th>
                <th className='px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest'>
                  Success Rate
                </th>
                <th className='px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest'>
                  Rejected
                </th>
                <th className='px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest'>
                  Status
                </th>
                <th className='px-6 py-4'></th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i} className='hover:bg-blue-50/30 transition-colors group'>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600'>
                        D{i + 1}
                      </div>
                      <span className='font-semibold text-gray-700'>Driver Name #{i + 1}</span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-gray-600'>145</td>
                  <td className='px-6 py-4 font-medium text-gray-700'>92%</td>
                  <td className='px-6 py-4 text-red-500 font-semibold'>4</td>
                  <td className='px-6 py-4'>
                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 uppercase'>
                      Active
                    </span>
                  </td>
                  <td className='px-6 py-4 text-right text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button className='p-1 hover:bg-gray-200 rounded-md'>
                      <MoreHorizontal size={16} />
                    </button>
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
