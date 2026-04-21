'use client'

interface StatusBadgeProps {
  status:
    | 'active'
    | 'inactive'
    | 'full'
    | 'empty'
    | 'medium'
    | 'critical'
    | 'maintenance'
    | 'offline'
    | 'resting'
    | 'completed'
    | 'delayed'
}

// Konfiguratsiyani Tailwind klasslari bilan yozamiz
const config: Record<
  StatusBadgeProps['status'],
  { label: string; bg: string; text: string; dot: string }
> = {
  active: { label: 'Active', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-600' },
  inactive: { label: 'Inactive', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  full: { label: 'Full', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  empty: { label: 'Empty', bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-600' },
  medium: { label: 'Medium', bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  critical: { label: 'Critical', bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  maintenance: {
    label: 'Maintenance',
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    dot: 'bg-amber-500',
  },
  offline: { label: 'Offline', bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400' },
  resting: { label: 'Resting', bg: 'bg-pink-100', text: 'text-pink-700', dot: 'bg-pink-500' },
  completed: { label: 'Completed', bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-600' },
  delayed: { label: 'Delayed', bg: 'bg-rose-100', text: 'text-rose-700', dot: 'bg-rose-500' },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status]

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1
        rounded-full text-[10px] font-bold uppercase tracking-wider
        transition-colors duration-200
        ${c.bg} ${c.text}
      `}
    >
      {/* Nuqta (Dot) - pulsatsiya effekti bilan (Active bo'lsa) */}
      <span
        className={`w-1.5 h-1.5 rounded-full ${c.dot} ${
          status === 'active' ? 'animate-pulse' : ''
        }`}
      />

      {c.label}
    </span>
  )
}
