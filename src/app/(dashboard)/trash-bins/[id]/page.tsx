import Header from "@/components/layout/Header";
import Link from "next/link";
import { ChevronRight, Eye, Truck, Construction, History, FileText, TrendingDown, BadgeCheck, MapPin, Play, MoreVertical } from "lucide-react";

const logisticsHistory = [
  {
    date: "Oct 12, 2023", time: "06:12",
    plate: "01 A 452 AA", driver: "Davron Karimov",
    captures: 2, status: "completed" as const,
  },
  {
    date: "Oct 11, 2023", time: "18:45",
    plate: "01 B 124 BB", driver: "Shoxrukh Umarov",
    captures: 1, status: "completed" as const,
  },
  {
    date: "Oct 11, 2023", time: "08:30",
    plate: "01 A 777 AA", driver: "Alisher Vohidov",
    captures: 2, status: "delayed" as const,
  },
];

const weeklyFill = [
  { day: "MON", pct: 40 },
  { day: "TUE", pct: 65 },
  { day: "WED", pct: 85 },
  { day: "THU", pct: 30 },
  { day: "FRI", pct: 55 },
  { day: "SAT", pct: 95 },
  { day: "SUN", pct: 88, current: true },
];

const upcomingLogistics = [
  {
    tag: "Priority Task", tagBg: "rgba(37,99,235,0.10)", tagColor: "var(--color-primary)",
    time: "10:45", plate: "01 A 777 AA", driver: "Davron Karimov",
    note: "En Route (1.2km away)", noteColor: "var(--color-primary)", opacity: 1,
    icon: Truck,
  },
  {
    tag: "Maintenance", tagBg: "var(--color-surface-container-high)", tagColor: "var(--color-on-surface-variant)",
    time: "14:15", plate: "01 B 124 BB", driver: "Shoxrukh Umarov",
    note: "Scheduled", noteColor: "var(--color-on-surface-variant)", opacity: 0.8,
    icon: Construction,
  },
  {
    tag: "Backup", tagBg: "var(--color-surface-container-high)", tagColor: "var(--color-on-surface-variant)",
    time: "18:00", plate: "01 C 888 CC", driver: "Alisher Vohidov",
    note: "Scheduled", noteColor: "var(--color-on-surface-variant)", opacity: 0.6,
    icon: Truck,
  },
];

export default async function BinDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="flex flex-col flex-1">
      <Header title={`Bin #${id} (Registan Square)`} subtitle="High-density tourism corridor diagnostic interface" />

      <div className="p-8 flex-1 flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
          <MapPin size={12} style={{ color: "var(--color-primary)" }} />
          <span className="font-600 text-[10px] uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
            Heritage Zone • Samarkand District
          </span>
        </div>

        {/* ── TOP GRID: Time-Lapse + Logistics ── */}
        <div className="grid grid-cols-12 gap-6">

          {/* Left 8/12: Fill Level Time-Lapse */}
          <div className="col-span-8 rounded-xl overflow-hidden flex flex-col"
            style={{ backgroundColor: "var(--color-surface-container-lowest)" }}>

            {/* Card header */}
            <div className="flex items-center justify-between px-6 py-4"
              style={{ backgroundColor: "rgba(220,233,255,0.3)", borderBottom: "1px solid rgba(189,202,186,0.15)" }}>
              <h2 className="font-headline font-600 text-base flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
                <Eye size={16} style={{ color: "var(--color-primary)" }} />
                Fill Level Time-Lapse
              </h2>
              <div className="flex items-center gap-3">
                <div className="flex rounded-lg p-0.5" style={{ backgroundColor: "var(--color-surface-container)" }}>
                  {["Daily", "Weekly"].map((l, i) => (
                    <button key={l} className="px-3 py-1 text-xs font-600 rounded-md"
                      style={{
                        backgroundColor: i === 0 ? "white" : "transparent",
                        color: i === 0 ? "var(--color-on-surface)" : "var(--color-on-surface-variant)",
                        boxShadow: i === 0 ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                      }}>
                      {l}
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-2 text-xs font-500 px-3 py-1.5 rounded-lg border"
                  style={{ borderColor: "rgba(189,202,186,0.3)", color: "var(--color-on-surface-variant)" }}>
                  Oct 12, 2023
                </button>
              </div>
            </div>

            {/* Image area */}
            <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: "#000" }}>
              {/* Gradient placeholder representing location photo */}
              <div className="w-full h-full"
                style={{ background: "linear-gradient(135deg, #1a2744 0%, #0d3524 50%, #1a2744 100%)" }}>
                <div className="w-full h-full flex items-center justify-center opacity-30">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-2">🏛️</div>
                    <div className="text-sm font-500">Registan Square, Samarkand</div>
                  </div>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />

              {/* Top-left overlay badges */}
              <div className="absolute top-5 left-5 flex flex-col gap-2">
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl border"
                  style={{
                    background: "rgba(248,249,255,0.85)", backdropFilter: "blur(20px)",
                    borderColor: "rgba(255,255,255,0.3)", boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
                  }}>
                  <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: "#ba1a1a" }} />
                  <div>
                    <div className="text-[9px] font-700 uppercase tracking-widest opacity-60 leading-none"
                      style={{ color: "var(--color-on-surface)" }}>Snapshot Fill</div>
                    <div className="text-lg font-700 font-headline" style={{ color: "var(--color-on-surface)" }}>
                      88% Full
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl border"
                  style={{
                    background: "rgba(248,249,255,0.85)", backdropFilter: "blur(20px)",
                    borderColor: "rgba(255,255,255,0.3)", boxShadow: "0 4px 16px rgba(0,0,0,0.15)"
                  }}>
                  <div className="text-[9px] font-700 uppercase tracking-widest opacity-60 leading-none"
                    style={{ color: "var(--color-on-surface)" }}>CCTV Camera Status</div>
                  <div className="flex items-center gap-1.5 text-base font-700 font-headline"
                    style={{ color: "var(--color-primary)" }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--color-primary)" }} />
                    ONLINE
                  </div>
                </div>
              </div>

              {/* Bottom-right timestamp */}
              <div className="absolute bottom-5 right-5">
                <div className="font-mono text-xs px-3 py-1 rounded border"
                  style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.15)" }}>
                  REC 16:42:09
                </div>
              </div>
            </div>

            {/* Timeline scrubber */}
            <div className="px-6 pt-5 pb-7" style={{ backgroundColor: "rgba(239,244,255,0.3)" }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 flex items-center justify-center rounded-full text-white shadow-md"
                    style={{ background: "var(--color-primary)" }}>
                    <Play size={16} fill="white" />
                  </button>
                  <div>
                    <div className="text-[10px] font-700 uppercase tracking-wider" style={{ color: "var(--color-primary)" }}>
                      Current Viewback
                    </div>
                    <div className="text-lg font-700 font-headline" style={{ color: "var(--color-on-surface)" }}>
                      16:42:09
                    </div>
                  </div>
                </div>
              </div>

              {/* Track */}
              <div className="relative px-1 pt-2 pb-6">
                <div className="relative h-2 rounded-full" style={{ backgroundColor: "rgba(189,202,186,0.3)" }}>
                  <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: "70%", backgroundColor: "var(--color-primary)" }} />
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 cursor-grab"
                    style={{ left: "70%", borderColor: "var(--color-primary)" }}>
                    <div className="absolute inset-1.5 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
                  </div>
                </div>
                {/* Hour markers */}
                <div className="absolute inset-x-1 bottom-0 flex justify-between">
                  {["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"].map((t, i) => {
                    const isActive = t === "16:00";
                    return (
                      <div key={t} className="flex flex-col items-center gap-0.5">
                        <div className="w-px" style={{ height: isActive ? "16px" : "8px", backgroundColor: isActive ? "var(--color-primary)" : "rgba(110,123,108,0.4)" }} />
                        <span className="text-[9px] font-700" style={{ color: isActive ? "var(--color-primary)" : "rgba(62,74,61,0.6)" }}>{t}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right 4/12: Upcoming Logistics */}
          <div className="col-span-4 rounded-xl p-6 flex flex-col border"
            style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)" }}>
            <h2 className="font-headline font-600 text-base mb-5 flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <Truck size={16} style={{ color: "var(--color-primary)" }} />
              Upcoming Logistics
            </h2>

            <div className="flex flex-col gap-3 flex-1">
              {upcomingLogistics.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="p-4 rounded-xl border transition-all"
                    style={{
                      opacity: item.opacity,
                      backgroundColor: i === 0 ? "var(--color-surface-container-low)" : "var(--color-surface)",
                      borderColor: i === 0 ? "rgba(37,99,235,0.2)" : "rgba(189,202,186,0.2)",
                    }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-700 uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{ backgroundColor: item.tagBg, color: item.tagColor }}>
                        {item.tag}
                      </span>
                      <span className="text-sm font-700"
                        style={{ color: i === 0 ? "var(--color-primary)" : "var(--color-on-surface-variant)" }}>
                        {item.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: i === 0 ? "var(--color-surface-container-highest)" : "var(--color-surface-container)" }}>
                        <Icon size={22} style={{ color: i === 0 ? "var(--color-primary)" : "var(--color-outline)" }} />
                      </div>
                      <div>
                        <div className="font-700 text-sm" style={{ color: "var(--color-on-surface)" }}>{item.plate}</div>
                        <div className="text-xs opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>{item.driver}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-xs font-600 flex items-center gap-1" style={{ color: item.noteColor }}>
                      {item.note}
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="mt-5 w-full py-3 rounded-xl font-700 text-xs border-2 border-dashed transition-colors"
              style={{ borderColor: "rgba(189,202,186,0.6)", color: "var(--color-on-surface-variant)" }}>
              Assign Emergency Task
            </button>
          </div>
        </div>

        {/* ── STATS SECTION ── */}
        <div className="rounded-xl overflow-hidden border"
          style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "rgba(189,202,186,0.15)" }}>
            <h2 className="font-headline font-600 text-base" style={{ color: "var(--color-on-surface)" }}>
              Collection Performance &amp; Fill Trends
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
              <span className="text-[10px] font-700 uppercase tracking-wider" style={{ color: "var(--color-on-surface-variant)" }}>
                7-Day Analysis
              </span>
            </div>
          </div>

          <div className="grid grid-cols-12">
            {/* Metrics sidebar */}
            <div className="col-span-4 p-8 flex flex-col gap-8 border-r"
              style={{ borderColor: "rgba(189,202,186,0.15)" }}>
              <div>
                <div className="text-[10px] font-700 uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-on-surface-variant)" }}>Avg Fill Time</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-700 font-headline tracking-tight" style={{ color: "var(--color-on-surface)" }}>4.2</span>
                  <span className="font-600" style={{ color: "var(--color-on-surface-variant)" }}>hours</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-700" style={{ color: "var(--color-primary)" }}>
                  <TrendingDown size={14} /> -12% from last week
                </div>
              </div>

              <div>
                <div className="text-[10px] font-700 uppercase tracking-widest mb-3"
                  style={{ color: "var(--color-on-surface-variant)" }}>Efficiency Score</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-700 font-headline tracking-tight" style={{ color: "var(--color-on-surface)" }}>94</span>
                  <span className="font-600" style={{ color: "var(--color-on-surface-variant)" }}>/100</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs font-700" style={{ color: "var(--color-primary)" }}>
                  <BadgeCheck size={14} /> Top 5% in District
                </div>
              </div>

              <div className="rounded-xl p-4" style={{ backgroundColor: "var(--color-surface-container-low)" }}>
                <div className="text-[10px] font-700 uppercase tracking-widest mb-1.5"
                  style={{ color: "var(--color-on-surface-variant)" }}>Last Serviced</div>
                <div className="font-700 text-sm" style={{ color: "var(--color-on-surface)" }}>Today, 06:12</div>
                <div className="text-xs mt-0.5 opacity-70" style={{ color: "var(--color-on-surface-variant)" }}>
                  Ref 01 A 452 AA • 12.4kg collected
                </div>
              </div>
            </div>

            {/* Weekly chart */}
            <div className="col-span-8 p-8">
              <div className="h-56 flex items-end gap-4 px-2 mb-4 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                  {[0,1,2,3].map(i => <div key={i} className="border-b w-full" style={{ borderColor: "var(--color-on-surface)" }} />)}
                </div>
                {weeklyFill.map(({ day, pct, current }) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2 relative">
                    {current && (
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-white text-[9px] px-2 py-0.5 rounded font-700 whitespace-nowrap"
                        style={{ backgroundColor: "var(--color-on-surface)" }}>
                        88% (Now)
                      </div>
                    )}
                    <div className="w-full rounded-t-lg relative"
                      style={{
                        height: `${pct}%`,
                        backgroundColor: current ? "rgba(37,99,235,0.25)" : "rgba(37,99,235,0.10)",
                      }}>
                      <div className="absolute top-0 inset-x-0 rounded-t-sm"
                        style={{
                          borderTop: current ? "4px solid var(--color-primary)" : "2px solid var(--color-primary)",
                          boxShadow: current ? "0 -4px 12px rgba(0,107,44,0.3)" : "none",
                        }} />
                    </div>
                    <span className="text-[10px] font-700"
                      style={{ color: current ? "var(--color-primary)" : "var(--color-on-surface-variant)" }}>
                      {day}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center p-4 rounded-xl"
                style={{ backgroundColor: "rgba(239,244,255,0.5)" }}>
                <div className="flex gap-5">
                  {[{ color: "var(--color-primary)", label: "Fill Level" }, { color: "var(--color-outline-variant)", label: "Predictive Baseline" }].map(l => (
                    <div key={l.label} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                      <span className="text-xs font-600" style={{ color: "var(--color-on-surface-variant)" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
                <button className="text-xs font-700 uppercase tracking-wider flex items-center gap-1 hover:underline"
                  style={{ color: "var(--color-primary)" }}>
                  View Historical Logs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── LOGISTICS HISTORY TABLE ── */}
        <section className="rounded-xl overflow-hidden border"
          style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: "rgba(189,202,186,0.15)", backgroundColor: "rgba(220,233,255,0.1)" }}>
            <h2 className="font-headline font-600 text-base flex items-center gap-2" style={{ color: "var(--color-on-surface)" }}>
              <History size={16} style={{ color: "var(--color-primary)" }} />
              Logistics History
            </h2>
            <button className="text-xs font-700 px-3 py-1 rounded-lg border"
              style={{ color: "var(--color-primary)", borderColor: "rgba(37,99,235,0.2)" }}>
              View All Records
            </button>
          </div>

          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "rgba(239,244,255,0.4)" }}>
                {["Date & Time", "Vehicle & Driver", "CCTV Captures", "Status", ""].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-[10px] font-700 uppercase tracking-widest"
                    style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logisticsHistory.map((row, i) => (
                <tr key={i} className="border-t transition-colors hover:bg-[#eff4ff80]"
                  style={{ borderColor: "rgba(189,202,186,0.15)" }}>
                  <td className="px-6 py-5">
                    <div className="font-600 text-sm" style={{ color: "var(--color-on-surface)" }}>{row.date}</div>
                    <div className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{row.time}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center border flex-shrink-0"
                        style={{ backgroundColor: "var(--color-surface-container-low)", borderColor: "rgba(189,202,186,0.3)" }}>
                        <Truck size={18} style={{ color: "var(--color-primary)" }} />
                      </div>
                      <div>
                        <div className="font-700 text-sm" style={{ color: "var(--color-on-surface)" }}>{row.plate}</div>
                        <div className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{row.driver}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      {Array.from({ length: row.captures }).map((_, j) => (
                        <div key={j} className="w-10 h-10 rounded-lg border flex items-center justify-center"
                          style={{ backgroundColor: "var(--color-surface-container)", borderColor: "rgba(189,202,186,0.3)" }}>
                          <span className="text-lg">📷</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {row.status === "completed" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-700"
                        style={{ backgroundColor: "rgba(37,99,235,0.10)", color: "var(--color-primary)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-700"
                        style={{ backgroundColor: "var(--color-error-container)", color: "var(--color-on-error-container)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-error)" }} />
                        Delayed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 rounded-lg" style={{ color: "var(--color-outline)" }}>
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-4 border-t text-center"
            style={{ borderColor: "rgba(189,202,186,0.15)", backgroundColor: "rgba(239,244,255,0.4)" }}>
            <button className="text-xs font-700 uppercase tracking-wider flex items-center gap-2 mx-auto hover:underline"
              style={{ color: "var(--color-primary)" }}>
              <FileText size={14} /> Generate Full Log PDF
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
