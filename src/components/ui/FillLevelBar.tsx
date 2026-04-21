'use client'

interface FillLevelBarProps {
  percent: number
}

export default function FillLevelBar({ percent }: FillLevelBarProps) {
  // Ranglarni Tailwind klasslari sifatida aniqlaymiz
  const getStyles = () => {
    if (percent >= 80)
      return {
        bg: 'bg-red-600',
        text: 'text-red-600',
        label: 'Critical',
        shadow: 'shadow-[0_0_8px_rgba(220,38,38,0.4)]',
      }
    if (percent >= 50)
      return {
        bg: 'bg-amber-500',
        text: 'text-amber-600',
        label: 'Warning',
        shadow: '',
      }
    if (percent >= 20)
      return {
        bg: 'bg-green-600',
        text: 'text-green-600',
        label: 'Healthy',
        shadow: '',
      }
    return {
      bg: 'bg-blue-500',
      text: 'text-blue-600',
      label: 'Optimized',
      shadow: '',
    }
  }

  const styles = getStyles()

  return (
    <div className='flex items-center gap-3 min-w-[160px] group'>
      {/* Progress Bar Container */}
      <div className='relative flex-1 h-2 rounded-full bg-[var(--color-surface-container)] overflow-hidden'>
        {/* Progress Fill */}
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${styles.bg} ${styles.shadow} ${
            percent >= 90 ? 'animate-pulse' : ''
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Ma'lumotlar */}
      <div className='flex items-center gap-2 shrink-0'>
        <span className='text-[11px] font-bold tabular-nums text-[var(--color-on-surface)] w-8 text-right'>
          {percent}%
        </span>

        <span className={`text-[10px] font-bold uppercase tracking-wider w-16 ${styles.text}`}>
          {styles.label}
        </span>
      </div>
    </div>
  )
}
