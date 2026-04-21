import Header from "@/components/layout/Header";
import StatusBadge from "@/components/ui/StatusBadge";
import Link from "next/link";
import { ChevronRight, FileText, User, Gauge, MapPin, Wind, Calendar, Weight, ClipboardCheck } from "lucide-react";

const activityLog = [
  { start: "08:15", end: "09:42", distance: "18.4 km", bins: 12, speed: "43 km/h", status: "completed" as const },
  { start: "10:00", end: "12:15", distance: "45.2 km", bins: 28, speed: "38 km/h", status: "completed" as const },
  { start: "13:30", end: "14:50", distance: "18.1 km", bins: 14, speed: "41 km/h", status: "completed" as const },
  { start: "15:10", end: "16:50", distance: "32.3 km", bins: 19, speed: "37 km/h", status: "completed" as const },
  { start: "17:00", end: "18:00", distance: "15.3 km", bins: 11, speed: "51 km/h", status: "completed" as const },
];

const personnel = [
  { name: "Dilshod Karimov", role: "Primary Driver", hours: "1,240h", id: "dilshod-karimov" },
  { name: "Artem Sokolov", role: "Co-Driver", hours: "852h", id: "artem-sokolov" },
  { name: "Jasur Umarov", role: "Jr. Pack Driver", hours: "412h", id: "jasur-umarov" },
];

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plate = id.replace(/-/g, " ");

  return (
    <div className="flex flex-col flex-1 bg-slate-50 min-h-screen">
      <Header title={`Vehicle Details: ${plate}`} />

      <div className="p-4 md:p-8 flex-1 flex flex-col gap-6">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
          <ChevronRight size={14} />
          <Link href="/fleet" className="hover:text-blue-600 transition-colors">Fleet</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 font-bold">{plate}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">

          {/* Left panel: Technical Specs */}
          <div className="flex flex-col gap-6">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <ClipboardCheck size={16} className="text-blue-600" />
                  Tech Passport
                </h3>
                <StatusBadge status="active" />
              </div>

              <div className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                Isuzu Forward
              </div>

              <div className="space-y-1">
                {[
                  { label: "Plate Number", value: plate, icon: <MapPin size={14}/> },
                  { label: "MFG Year", value: "2001", icon: <Calendar size={14}/> },
                  { label: "Max Capacity", value: "8,000 kg", icon: <Weight size={14}/> },
                  { label: "Inspection", value: "2023-11-15", icon: <ClipboardCheck size={14}/> },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0 group">
                    <span className="text-xs text-slate-400 flex items-center gap-2 font-medium">
                      {icon} {label}
                    </span>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3 bg-blue-50 rounded-xl flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
                </div>
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">Engine Status: Optimal</span>
              </div>
            </div>

            {/* Vehicle Preview Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-2xl h-48 flex flex-col items-center justify-center relative overflow-hidden shadow-lg group">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="relative z-10 text-center">
                <span className="text-6xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500 block mb-2">🚛</span>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Asset ID: {id}</p>
              </div>
            </div>
          </div>

          {/* Right panel: Stats & Activity */}
          <div className="flex flex-col gap-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Total Distance", value: "142", unit: "Kilometres", icon: <MapPin className="text-blue-500"/> },
                { label: "Total Trips", value: "21", unit: "Deployments", icon: <Gauge className="text-purple-500"/> },
                { label: "Max Speed", value: "72", unit: "KM / Hour", highlight: true, icon: <Wind className="text-white"/> },
              ].map((stat) => (
                <div key={stat.label}
                  className={`rounded-2xl p-5 shadow-sm border transition-all hover:shadow-md ${
                    stat.highlight ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white border-slate-100 text-slate-900'
                  }`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${stat.highlight ? 'text-blue-100' : 'text-slate-400'}`}>
                      {stat.label}
                    </span>
                    <div className={stat.highlight ? '' : 'p-2 bg-slate-50 rounded-lg'}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-black mb-1 leading-none">{stat.value}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-tighter ${stat.highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                    {stat.unit}
                  </div>
                </div>
              ))}
            </div>

            {/* Activity Log Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex-1 flex flex-col">
              <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-white/50">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
                  <FileText size={16} className="text-blue-600" />
                  Daily Activity Log
                </h3>
                <button className="flex items-center gap-2 text-[11px] font-bold px-4 py-2 bg-slate-100 rounded-xl text-slate-600 hover:bg-slate-200 transition-all active:scale-95">
                  <FileText size={14} /> EXPORT PDF
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      {["Start Time", "End Time", "Distance", "Bins Served", "Status"].map(h => (
                        <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {activityLog.map((row, i) => (
                      <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4 text-xs font-bold text-slate-700">{row.start}</td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-700">{row.end}</td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-600">{row.distance}</td>
                        <td className="px-6 py-4 text-xs font-black text-blue-600">{row.bins}</td>
                        <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Personnel Section */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white shadow-xl shadow-slate-200/40">
          <div className="px-8 py-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-black text-slate-800 text-lg tracking-tight">Assigned Fleet Personnel</h3>
              <p className="text-xs font-medium text-slate-400 mt-1">Authorized operators and performance stats for unit {plate}</p>
            </div>
            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
              Manage Access
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {personnel.map(p => (
              <Link key={p.id} href={`/drivers/${p.id}`}
                className="group p-5 bg-slate-50/50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{p.name}</div>
                    <div className="text-[10px] font-bold text-blue-500 uppercase mt-0.5 tracking-wider">{p.role}</div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-end">
                  <div>
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Total Usage</div>
                    <div className="text-xl font-black text-slate-900">{p.hours}</div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
