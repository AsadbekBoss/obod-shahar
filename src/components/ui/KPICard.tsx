import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  trend?: { value: string; up: boolean };
  note?: string;
  accent?: boolean;
  icon?: ReactNode;
}

export default function KPICard({ label, value, trend, note, accent, icon }: KPICardProps) {
  return (
    <div style={{
      background: accent
        ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))"
        : "rgba(255,255,255,0.82)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      borderRadius: 22,
      padding: "22px 24px",
      display: "flex", flexDirection: "column", gap: 12,
      border: "1px solid rgba(255,255,255,0.70)",
      boxShadow: "0 18px 40px rgba(15,23,42,0.10)",
      color: accent ? "white" : "inherit",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{
          fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px",
          color: accent ? "rgba(255,255,255,0.75)" : "var(--color-on-surface-variant)",
        }}>
          {label}
        </span>
        {icon && (
          <span style={{ color: accent ? "rgba(255,255,255,0.75)" : "var(--color-on-surface-variant)" }}>
            {icon}
          </span>
        )}
      </div>
      <div style={{
        fontSize: 36, fontWeight: 800, lineHeight: 1,
        color: accent ? "white" : "var(--color-on-surface)",
        fontFamily: "var(--font-headline)",
      }}>
        {value}
      </div>
      {(trend || note) && (
        <div style={{
          display: "flex", alignItems: "center", gap: 6, fontSize: 11,
          color: accent ? "rgba(255,255,255,0.75)" : "var(--color-on-surface-variant)",
        }}>
          {trend && (
            <>
              {trend.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span style={{ color: trend.up ? (accent ? "rgba(255,255,255,0.9)" : "#16a34a") : "#dc2626" }}>
                {trend.value}
              </span>
            </>
          )}
          {note && <span>{note}</span>}
        </div>
      )}
    </div>
  );
}
