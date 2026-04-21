'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { day: 'MON', value: 62 },
  { day: 'TUE', value: 78 },
  { day: 'WED', value: 85 },
  { day: 'THU', value: 91 },
  { day: 'FRI', value: 74 },
  { day: 'SAT', value: 48 },
  { day: 'SUN', value: 35 },
]

export default function WeeklyChart() {
  // Use state to handle dynamic bar sizes based on window width
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }

    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='w-full h-full min-h-[180px]'>
      <ResponsiveContainer width='100%' height={isMobile ? 220 : 180}>
        <BarChart
          data={data}
          // Dynamic bar size: thinner on mobile to ensure spacing
          barSize={isMobile ? 20 : 32}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey='day'
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: 'var(--color-on-surface-variant)', fontWeight: 500 }}
            dy={10} // Padding between chart and labels
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip
            cursor={{ fill: 'rgba(37, 99, 235, 0.05)', radius: 4 }}
            contentStyle={{
              background: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
            // formatter={(v: number) => [`${v}%`, 'Fill Level']}
            labelStyle={{ color: 'var(--color-on-surface-variant)', marginBottom: 4 }}
          />
          <Bar
            dataKey='value'
            fill='var(--color-primary, #2563eb)'
            radius={[4, 4, 0, 0]}
            // Optional: add a background to the bar for better context
            background={{ fill: 'rgba(0,0,0,0.03)', radius: 4 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
