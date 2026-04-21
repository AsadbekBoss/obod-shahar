'use client'

import Header from '@/components/layout/Header'
import KPICard from '@/components/ui/KPICard'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const monthlyData = [
  { month: 'Jan', bins: 1200, collections: 980, weight: 42 },
  { month: 'Feb', bins: 1320, collections: 1050, weight: 45 },
  { month: 'Mar', bins: 1180, collections: 920, weight: 38 },
  { month: 'Apr', bins: 1428, collections: 1140, weight: 52 },
  { month: 'May', bins: 1380, collections: 1080, weight: 49 },
  { month: 'Jun', bins: 1510, collections: 1200, weight: 55 },
]

const districtData = [
  { name: 'Samarkand', value: 420 },
  { name: 'Pastdargom', value: 280 },
  { name: 'Urgut', value: 195 },
  { name: 'Bulungur', value: 140 },
  { name: 'Others', value: 393 },
]

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe']

// Converted to a string for easier use with Tailwind's className if needed,
// but kept as an object for logic consistency with your previous code.
const cardClassName =
  'rounded-[18px] p-5 md:p-6 bg-white/80 backdrop-blur-md border border-white/70 shadow-[0_18px_40px_rgba(15,23,42,0.08)]'

export default function AnalyticsPage() {
  return (
    <div className='flex flex-col flex-1 min-h-screen'>
      <Header title='Analytics' subtitle='Samarkand region performance metrics' />

      <div className='p-4 md:p-8 flex-1 flex flex-col gap-6'>
        {/* KPIs: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          <KPICard
            label='Total Collections'
            value='6,370'
            trend={{ value: '+12%', up: true }}
            note='vs last month'
          />
          <KPICard label='Avg Fill Rate' value='68%' trend={{ value: '+3%', up: true }} />
          <KPICard
            label='Total Weight'
            value='281 T'
            trend={{ value: '+8%', up: true }}
            note='this month'
          />
          <KPICard label='Active Routes' value='47' accent />
        </div>

        {/* Charts row 1: Area Chart and Pie Chart */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className={cardClassName}>
            <h3
              className='font-headline font-semibold text-sm mb-6'
              style={{ color: 'var(--color-on-surface)' }}
            >
              Monthly Collection Trend
            </h3>
            <div className='h-[220px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={monthlyData} margin={{ left: -20 }}>
                  <defs>
                    <linearGradient id='g1' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#2563eb' stopOpacity={0.25} />
                      <stop offset='95%' stopColor='#2563eb' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e8f0fe' vertical={false} />
                  <XAxis
                    dataKey='month'
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 12,
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Area
                    type='monotone'
                    dataKey='collections'
                    stroke='#2563eb'
                    fill='url(#g1)'
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={cardClassName}>
            <h3
              className='font-headline font-semibold text-sm mb-6'
              style={{ color: 'var(--color-on-surface)' }}
            >
              Bins by District
            </h3>
            <div className='flex flex-col sm:flex-row items-center justify-around gap-6'>
              <div className='h-[160px] w-[160px] shrink-0'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={districtData}
                      cx='50%'
                      cy='50%'
                      innerRadius={45}
                      outerRadius={75}
                      dataKey='value'
                      paddingAngle={4}
                    >
                      {districtData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} stroke='none' />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className='flex flex-col gap-3 w-full max-w-[200px]'>
                {districtData.map((d, i) => (
                  <div key={d.name} className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <span
                        className='w-2.5 h-2.5 rounded-full'
                        style={{ backgroundColor: COLORS[i] }}
                      />
                      <span
                        className='text-xs font-medium'
                        style={{ color: 'var(--color-on-surface)' }}
                      >
                        {d.name}
                      </span>
                    </div>
                    <span
                      className='text-xs font-bold'
                      style={{ color: 'var(--color-on-surface-variant)' }}
                    >
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts row 2: Line Chart and Bar Chart */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className={cardClassName}>
            <h3
              className='font-headline font-semibold text-sm mb-6'
              style={{ color: 'var(--color-on-surface)' }}
            >
              Average Fill Level Trend (%)
            </h3>
            <div className='h-[180px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <LineChart data={monthlyData} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e8f0fe' vertical={false} />
                  <XAxis
                    dataKey='month'
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      background: 'white',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 12,
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Line
                    type='monotone'
                    dataKey='weight'
                    stroke='#0ea5e9'
                    strokeWidth={3}
                    dot={{ fill: '#0ea5e9', r: 4, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={cardClassName}>
            <h3
              className='font-headline font-semibold text-sm mb-6'
              style={{ color: 'var(--color-on-surface)' }}
            >
              Total Active Bins per Month
            </h3>
            <div className='h-[180px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={monthlyData} barSize={24} margin={{ left: -20 }}>
                  <CartesianGrid strokeDasharray='3 3' stroke='#e8f0fe' vertical={false} />
                  <XAxis
                    dataKey='month'
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{
                      background: 'white',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 12,
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar dataKey='bins' fill='#2563eb' radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
