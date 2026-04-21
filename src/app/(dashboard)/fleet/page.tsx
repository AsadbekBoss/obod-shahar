"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import KPICard from "@/components/ui/KPICard";
import StatusBadge from "@/components/ui/StatusBadge";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import { Plus, Filter, Search, Pencil, Trash2, Truck } from "lucide-react";
import { useRouter } from "next/navigation";

const vehicles = [
  { plate: "01 A 777 AA", model: "ISUZU MAN 18.290", capacity: "CAMRV-01", mahalla: "Registan",  status: "active" as const },
  { plate: "05 B 555 BB", model: "KAMAZ 65115",      capacity: "PLAM-753", mahalla: "Chorsu",    status: "maintenance" as const },
  { plate: "01 K 001 XX", model: "Nextu PVR",        capacity: "ETRAY7021", mahalla: "Unassigned", status: "offline" as const },
  { plate: "12 C 332 CC", model: "ISUZU Forward",    capacity: "CAMRV-04", mahalla: "Bulungur",  status: "active" as const },
  { plate: "07 D 211 DD", model: "MAZ 5337",         capacity: "CAMRV-09", mahalla: "Urgut",     status: "active" as const },
  { plate: "03 E 988 EE", model: "KAMAZ 5320",       capacity: "PLAM-102", mahalla: "Pastdargom",status: "maintenance" as const },
  { plate: "09 F 441 FF", model: "ISUZU ELF",        capacity: "CAMRV-07", mahalla: "Kattakurgan", status: "active" as const },
  { plate: "11 G 673 GG", model: "ZIL 130",          capacity: "ETRAY4412", mahalla: "Unassigned", status: "offline" as const },
];

export default function FleetPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = vehicles.filter(v =>
    v.plate.toLowerCase().includes(search.toLowerCase()) ||
    v.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1">
      <Header title="Fleet Management" subtitle="Infrastructure Management" />
      <div className="p-8 flex-1 flex flex-col gap-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <KPICard label="Total Vehicles" value="482" trend={{ value: "+10% vs last month", up: true }} />
          <KPICard label="Active Now" value="391" note="87% utilization rate" trend={{ value: "391", up: true }} />
          <KPICard label="In Maintenance" value="24" note="4 urgent repairs" />
          <KPICard label="Stopped Vehicles" value="12" note="Awaiting assignment" />
        </div>

        {/* Table Card */}
        <div className="rounded-xl flex-1 flex flex-col" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)", boxShadow: "0 18px 40px rgba(15,23,42,0.08)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "var(--color-outline-variant)" }}>
            <div className="flex items-center gap-2">
              <h2 className="font-headline font-600 text-base" style={{ color: "var(--color-on-surface)" }}>
                Vehicle Inventory
              </h2>
              <span className="text-[10px] font-600 uppercase px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "var(--color-primary)", color: "white" }}>
                Live Database
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
                style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface-variant)" }}>
                <Filter size={13} /> Filter
              </button>
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--color-on-surface-variant)" }} />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search units..."
                  className="pl-8 pr-3 py-2 text-xs rounded-lg outline-none w-44"
                  style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface)" }} />
              </div>
              <Link href="/fleet/new"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-600 text-white"
                style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))" }}>
                <Plus size={13} /> Register New Vehicle
              </Link>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "var(--color-surface-container-high)" }}>
                {["PLATE NUMBER", "MODEL & CAPACITY", "ASSIGNED MAHALLA", "STATUS", "ACTIONS"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-600 uppercase tracking-wider"
                    style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => (
                <tr key={v.plate}
                  onClick={() => router.push(`/fleet/${v.plate.replace(/\s/g, "-")}`)}
                  className="border-b transition-colors hover:bg-[rgba(37,99,235,0.05)] cursor-pointer"
                  style={{ borderColor: "var(--color-outline-variant)" }}>
                  <td className="px-5 py-4">
                    <span className="font-600 text-xs" style={{ color: "var(--color-primary)" }}>
                      {v.plate}
                    </span>
                    <div className="text-[10px] mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      VIN: {v.capacity}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Truck size={14} style={{ color: "var(--color-on-surface-variant)" }} />
                      <div>
                        <div className="text-xs font-500" style={{ color: "var(--color-on-surface)" }}>{v.model}</div>
                        <div className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>8,000 kg max</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: "var(--color-on-surface)" }}>
                    {v.mahalla === "Unassigned"
                      ? <span style={{ color: "var(--color-on-surface-variant)", fontStyle: "italic" }}>Unassigned</span>
                      : v.mahalla}
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={v.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg" style={{ color: "var(--color-on-surface-variant)" }}>
                        <Pencil size={14} />
                      </button>
                      <button onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg" style={{ color: "var(--color-tertiary)" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between px-5 py-4 border-t"
            style={{ borderColor: "var(--color-outline-variant)" }}>
            <span className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
              Showing {filtered.length} of 482 registered vehicles
            </span>
            <Pagination current={page} total={46} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
