interface FillLevelBarProps {
  percent: number;
}

export default function FillLevelBar({ percent }: FillLevelBarProps) {
  const color =
    percent >= 80 ? "#dc2626" :
    percent >= 50 ? "#ca8a04" :
    "#16a34a";

  const label =
    percent >= 80 ? "Critical" :
    percent >= 50 ? "Warning" :
    percent >= 20 ? "Healthy" :
    "Optimized";

  return (
    <div className="flex items-center gap-2 min-w-[140px]">
      <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-surface-container)" }}>
        <div
          className="h-1.5 rounded-full transition-all"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[11px] w-7 text-right font-500" style={{ color: "var(--color-on-surface)" }}>{percent}%</span>
      <span className="text-[11px] w-16" style={{ color }}>{label}</span>
    </div>
  );
}
