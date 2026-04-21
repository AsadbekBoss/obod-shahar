import Header from "@/components/layout/Header";
import KPICard from "@/components/ui/KPICard";
import { Truck, ChevronRight } from "lucide-react";
import WeeklyChart from "./WeeklyChart";
import RecentBinsTable from "./RecentBinsTable";

const districts = [
  { name: "Samarkand city", brigades: 42, percent: 88 },
  { name: "Pastdargom",     brigades: 18, percent: 96 },
  { name: "Urgut district", brigades: 25, percent: 72 },
  { name: "Bulungur",       brigades: 12, percent: 64 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Dashboard" subtitle="Samarkand Region" />

      <div className="p-8 flex-1 flex flex-col gap-6">
        {/* Filters row */}
        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
          <span className="font-600 uppercase tracking-wider">Region:</span>
          <select className="rounded-lg px-3 py-1.5 outline-none text-xs"
            style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface)" }}>
            <option>Samarkand</option>
          </select>
          <span className="font-600 uppercase tracking-wider">District:</span>
          <select className="rounded-lg px-3 py-1.5 outline-none text-xs"
            style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface)" }}>
            <option>All districts</option>
          </select>
          <span className="font-600 uppercase tracking-wider">Mahalla:</span>
          <select className="rounded-lg px-3 py-1.5 outline-none text-xs"
            style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface)" }}>
            <option>All mahallas</option>
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <KPICard label="Total Bins" value="3,412" trend={{ value: "+8%", up: true }} />
          <KPICard label="Full Bins" value="156" note="Critical" />
          <KPICard label="Empty Bins" value="2,105" />
          <KPICard label="Active Vehicles" value="124" accent icon={<Truck size={20} />} />
        </div>

        {/* Charts & District Status */}
        <div className="grid grid-cols-[1fr_320px] gap-4">
          {/* Weekly Chart */}
          <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)", boxShadow: "0 18px 40px rgba(15,23,42,0.08)" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-headline font-600 text-base" style={{ color: "var(--color-on-surface)" }}>
                  Weekly Fill Level
                </h2>
                <p className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                  Samarkand region data
                </p>
              </div>
              <div className="flex gap-2">
                {["7 days", "30 days"].map((d, i) => (
                  <button key={d} className="text-xs px-3 py-1 rounded-full font-500"
                    style={{
                      backgroundColor: i === 0 ? "var(--color-primary)" : "transparent",
                      color: i === 0 ? "white" : "var(--color-on-surface-variant)",
                    }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <WeeklyChart />
          </div>

          {/* District Status */}
          <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)", boxShadow: "0 18px 40px rgba(15,23,42,0.08)" }}>
            <h2 className="font-headline font-600 text-base mb-4" style={{ color: "var(--color-on-surface)" }}>
              District Status
            </h2>
            <div className="flex flex-col gap-4">
              {districts.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-surface-container-low)" }}>
                    <Truck size={14} style={{ color: "var(--color-primary)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-600 truncate" style={{ color: "var(--color-on-surface)" }}>{d.name}</div>
                    <div className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>{d.brigades} active brigades</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-700 font-headline" style={{ color: "var(--color-primary)" }}>{d.percent}%</div>
                    <div className="w-16 h-1 rounded-full mt-1" style={{ backgroundColor: "var(--color-surface-container)" }}>
                      <div className="h-1 rounded-full" style={{ width: `${d.percent}%`, backgroundColor: "var(--color-primary)" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-xs font-600 rounded-lg transition-colors"
              style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface-variant)" }}>
              View All Districts
            </button>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="rounded-xl" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)", boxShadow: "0 18px 40px rgba(15,23,42,0.08)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "var(--color-outline-variant)" }}>
            <h2 className="font-headline font-600 text-base" style={{ color: "var(--color-on-surface)" }}>
              Recent Trash Bin Activity
            </h2>
            <div className="flex items-center gap-2">
              {["All", "Full", "Empty"].map((f, i) => (
                <button key={f} className="text-xs px-3 py-1 rounded-full font-500"
                  style={{
                    backgroundColor: i === 0 ? "var(--color-primary)" : "transparent",
                    color: i === 0 ? "white" : "var(--color-on-surface-variant)",
                  }}>
                  {f}
                </button>
              ))}
              <button className="text-xs ml-2 flex items-center gap-1"
                style={{ color: "var(--color-on-surface-variant)" }}>
                Sort by Level <ChevronRight size={12} />
              </button>
            </div>
          </div>

          <RecentBinsTable />
        </div>
      </div>
    </div>
  );
}
