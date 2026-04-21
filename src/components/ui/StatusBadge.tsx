interface StatusBadgeProps {
  status: "active" | "inactive" | "full" | "empty" | "medium" | "critical" | "maintenance" | "offline" | "resting" | "completed" | "delayed";
}

const config: Record<StatusBadgeProps["status"], { label: string; bg: string; color: string; dot?: string }> = {
  active:      { label: "Active",       bg: "#dcfce7", color: "#15803d", dot: "#16a34a" },
  inactive:    { label: "Inactive",     bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
  full:        { label: "Full",         bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
  empty:       { label: "Empty",        bg: "#dcfce7", color: "#15803d", dot: "#16a34a" },
  medium:      { label: "Medium",       bg: "#fef9c3", color: "#854d0e", dot: "#ca8a04" },
  critical:    { label: "Critical",     bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
  maintenance: { label: "Maintenance",  bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
  offline:     { label: "Offline",      bg: "#f3f4f6", color: "#6b7280", dot: "#9ca3af" },
  resting:     { label: "Resting",      bg: "#fce7f3", color: "#9d174d", dot: "#ec4899" },
  completed:   { label: "Completed",   bg: "#dbeafe", color: "#1d4ed8", dot: "#2563eb" },
  delayed:     { label: "Delayed",     bg: "#fee2e2", color: "#b91c1c", dot: "#ef4444" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-600"
      style={{ backgroundColor: c.bg, color: c.color }}
    >
      {c.dot && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.dot }} />}
      {c.label}
    </span>
  );
}
