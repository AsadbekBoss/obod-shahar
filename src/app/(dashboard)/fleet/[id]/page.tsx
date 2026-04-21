import Header from "@/components/layout/Header";
import StatusBadge from "@/components/ui/StatusBadge";
import Link from "next/link";
import { ChevronRight, FileText, User } from "lucide-react";

const activityLog = [
  { start: "08:15", end: "09:42", distance: "18.4 km", bins: 12, speed: "43 km/h", status: "completed" as "completed" },
  { start: "10:00", end: "12:15", distance: "45.2 km", bins: 28, speed: "38 km/h", status: "completed" as "completed" },
  { start: "13:30", end: "14:50", distance: "18.1 km", bins: 14, speed: "41 km/h", status: "completed" as "completed" },
  { start: "15:10", end: "16:50", distance: "32.3 km", bins: 19, speed: "37 km/h", status: "completed" as "completed" },
  { start: "17:00", end: "18:00", distance: "15.3 km", bins: 11, speed: "51 km/h", status: "completed" as "completed" },
];

const personnel = [
  { name: "Dilshod Karimov", role: "Primary Driver",    hours: "1,240h", id: "dilshod-karimov" },
  { name: "Artem Sokolov",   role: "Co-Driver",         hours: "852h",   id: "artem-sokolov" },
  { name: "Jasur Umarov",    role: "Jr. Pack Driver",   hours: "412h",   id: "jasur-umarov" },
];

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plate = id.replace(/-/g, " ");

  return (
    <div className="flex flex-col flex-1">
      <Header title={`Vehicle Details: ${plate}`} />
      <div className="p-8 flex-1 flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <ChevronRight size={12} />
          <Link href="/fleet" className="hover:underline">Fleet</Link>
          <ChevronRight size={12} />
          <span style={{ color: "var(--color-on-surface)" }}>{plate}</span>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-6">
          {/* Left panel */}
          <div className="flex flex-col gap-4">
            {/* Technical Passport */}
            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-headline font-600 text-sm" style={{ color: "var(--color-on-surface)" }}>
                  Technical Passport
                </h3>
                <StatusBadge status="active" />
              </div>
              <div className="text-xl font-700 font-headline mb-1" style={{ color: "var(--color-on-surface)" }}>
                Isuzu Forward
              </div>
              {[
                { label: "Plate Number",    value: plate },
                { label: "MFG Year",        value: "2001" },
                { label: "Max Capacity",    value: "8,000 kg" },
                { label: "Last Inspection", value: "2023-11-15" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-2 border-b last:border-0 text-xs"
                  style={{ borderColor: "var(--color-outline-variant)" }}>
                  <span style={{ color: "var(--color-on-surface-variant)" }}>{label}</span>
                  <span className="font-500" style={{ color: "var(--color-on-surface)" }}>{value}</span>
                </div>
              ))}
              <div className="mt-3 flex items-center gap-2 text-xs" style={{ color: "var(--color-primary)" }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-primary)" }} />
                Engine Status: Optimal
              </div>
            </div>

            {/* Vehicle image placeholder */}
            <div className="rounded-xl h-40 flex items-center justify-center"
              style={{ backgroundColor: "var(--color-surface-container-low)" }}>
              <div className="text-center" style={{ color: "var(--color-on-surface-variant)" }}>
                <span className="text-4xl">🚛</span>
                <p className="text-xs mt-2 opacity-60">Reference Asset: {id}</p>
              </div>
            </div>
          </div>

          {/* Right: stats + log */}
          <div className="flex flex-col gap-4">
            {/* Today stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Total Distance", value: "142", unit: "Kilometres" },
                { label: "Total Trips",    value: "21",  unit: "Deployments" },
                { label: "Max Speed",      value: "72",  unit: "KM / Hour", accent: true },
              ].map(({ label, value, unit, accent }) => (
                <div key={label} className="rounded-xl p-4"
                  style={{
                    backgroundColor: accent ? "var(--color-primary)" : "var(--color-surface-container-lowest)",
                  }}>
                  <div className="text-[10px] font-600 uppercase tracking-wider mb-2"
                    style={{ color: accent ? "rgba(255,255,255,0.7)" : "var(--color-on-surface-variant)" }}>
                    {label}
                  </div>
                  <div className="text-3xl font-700 font-headline" style={{ color: accent ? "white" : "var(--color-on-surface)" }}>
                    {value}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: accent ? "rgba(255,255,255,0.7)" : "var(--color-on-surface-variant)" }}>
                    {unit}
                  </div>
                </div>
              ))}
            </div>

            {/* Daily Activity Log */}
            <div className="rounded-xl flex-1" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)" }}>
              <div className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: "var(--color-outline-variant)" }}>
                <h3 className="font-headline font-600 text-sm" style={{ color: "var(--color-on-surface)" }}>
                  Daily Activity Log
                </h3>
                <button className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface-variant)" }}>
                  <FileText size={12} /> Export PDF
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-surface-container-high)" }}>
                    {["START TIME", "END TIME", "DISTANCE", "BINS SERVED", "STATUS"].map(h => (
                      <th key={h} className="text-left px-5 py-2.5 text-[10px] font-600 uppercase tracking-wider"
                        style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activityLog.map((row, i) => (
                    <tr key={i} className="border-b hover:bg-[rgba(37,99,235,0.05)]"
                      style={{ borderColor: "var(--color-outline-variant)" }}>
                      <td className="px-5 py-3 text-xs" style={{ color: "var(--color-on-surface)" }}>{row.start}</td>
                      <td className="px-5 py-3 text-xs" style={{ color: "var(--color-on-surface)" }}>{row.end}</td>
                      <td className="px-5 py-3 text-xs" style={{ color: "var(--color-on-surface)" }}>{row.distance}</td>
                      <td className="px-5 py-3 text-xs font-500" style={{ color: "var(--color-on-surface)" }}>{row.bins}</td>
                      <td className="px-5 py-3"><StatusBadge status={row.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Assigned Personnel */}
        <div className="rounded-xl" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "var(--color-outline-variant)" }}>
            <div>
              <h3 className="font-headline font-600 text-base" style={{ color: "var(--color-on-surface)" }}>
                Assigned Fleet Personnel
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                Authorized operators and their lifetime usage statistics for unit {plate}
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-600 text-white"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))" }}>
              Manage Access
            </button>
          </div>
          <div className="p-5 flex gap-4">
            {personnel.map(p => (
              <Link key={p.id} href={`/drivers/${p.id}`}
                className="flex-1 rounded-xl p-4 hover:bg-[rgba(37,99,235,0.05)] transition-colors"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))" }}>
                  <User size={20} color="white" />
                </div>
                <div className="font-600 text-sm" style={{ color: "var(--color-on-surface)" }}>{p.name}</div>
                <div className="text-[10px] font-500 mt-0.5" style={{ color: "var(--color-primary)" }}>● {p.role}</div>
                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--color-on-surface-variant)" }}>Total Hours</div>
                  <div className="text-lg font-700 font-headline" style={{ color: "var(--color-on-surface)" }}>{p.hours}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
