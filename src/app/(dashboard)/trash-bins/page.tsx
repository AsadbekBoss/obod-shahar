"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge from "@/components/ui/StatusBadge";
import FillLevelBar from "@/components/ui/FillLevelBar";
import Pagination from "@/components/ui/Pagination";
import { Filter, ArrowUpDown, Search, Plus, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const bins = [
  { id: "BIN-10294", location: "Gulistan Mahalla",   sub: "Block B, Near Central Park Entrance", fill: 92, status: "full" as const },
  { id: "BIN-10342", location: "Navoiy District",    sub: "Amir Temur Street, Bus Stop #12",     fill: 45, status: "medium" as const },
  { id: "BIN-10551", location: "Chilonzor Mahalla",  sub: "School No. 4, North Side Gate",       fill: 12, status: "empty" as const },
  { id: "BIN-10883", location: "Yunusobod District", sub: "Mega Planet Shopping Center, Loading Dock", fill: 78, status: "medium" as const },
  { id: "BIN-10991", location: "Mirzo Ulugbek",      sub: "Near University Main Gate",            fill: 55, status: "medium" as const },
  { id: "BIN-11024", location: "Sergeli District",   sub: "Bus Terminal, Platform 3",             fill: 8,  status: "empty" as const },
  { id: "BIN-11156", location: "Shaykhontohur",      sub: "Bazaar East Entrance",                 fill: 97, status: "full" as const },
  { id: "BIN-11289", location: "Almazar District",   sub: "Railway Station Road",                 fill: 34, status: "medium" as const },
  { id: "BIN-11301", location: "Bektemir District",  sub: "Industrial Zone, Gate 2",              fill: 71, status: "medium" as const },
  { id: "BIN-11445", location: "Uchtepa District",   sub: "Park Central, East Path",              fill: 18, status: "empty" as const },
  { id: "BIN-11589", location: "Kibray District",    sub: "Market Street 12",                     fill: 89, status: "full" as const },
  { id: "BIN-11703", location: "Bostanliq District", sub: "Community Center Entrance",            fill: 42, status: "medium" as const },
  { id: "BIN-11812", location: "Zangiota District",  sub: "Highway A-380, KM 14",                 fill: 63, status: "medium" as const },
  { id: "BIN-11934", location: "Qibray District",    sub: "Hospital Complex, Block A",            fill: 5,  status: "empty" as const },
  { id: "BIN-12055", location: "Toshkent District",  sub: "Airport Road Junction",                fill: 91, status: "full" as const },
];

const PAGE_SIZE = 15;

export default function TrashBinsPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = bins.filter(b =>
    b.id.toLowerCase().includes(search.toLowerCase()) ||
    b.location.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col flex-1">
      <Header title="Trash Bin Management" subtitle="Real-time infrastructure monitoring and inventory control" />
      <div className="p-8 flex-1 flex flex-col gap-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Bins", value: "1,428", note: "+12% this month", up: true },
            { label: "Full Bins",  value: "42",    note: "Requiring immediate collection", up: false },
            { label: "Empty Bins", value: "856",   note: "Ready for disposal usage", up: true },
          ].map((k) => (
            <div key={k.label} className="rounded-xl p-5 border-l-4"
              style={{
                background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)",
                borderColor: k.label === "Full Bins" ? "var(--color-tertiary)" : "var(--color-primary)",
              }}>
              <div className="text-[11px] font-600 uppercase tracking-wider mb-2"
                style={{ color: "var(--color-on-surface-variant)" }}>{k.label}</div>
              <div className="text-4xl font-700 font-headline"
                style={{ color: k.label === "Full Bins" ? "var(--color-tertiary)" : k.label === "Empty Bins" ? "var(--color-primary)" : "var(--color-on-surface)" }}>
                {k.value}
              </div>
              <div className="text-xs mt-1.5" style={{ color: "var(--color-on-surface-variant)" }}>{k.note}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-xl flex-1 flex flex-col" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)", boxShadow: "0 18px 40px rgba(15,23,42,0.08)" }}>
          {/* Toolbar */}
          <div className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "var(--color-outline-variant)" }}>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
                style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface-variant)" }}>
                <Filter size={13} /> Filter
              </button>
              <button className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
                style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface-variant)" }}>
                <ArrowUpDown size={13} /> Sort By Level
              </button>
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--color-on-surface-variant)" }} />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Quick search assets..."
                  className="pl-8 pr-3 py-2 text-xs rounded-lg outline-none w-48"
                  style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface)" }} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                Showing {paged.length} of {filtered.length} Bins
              </span>
              <button
                onClick={() => router.push("/trash-bins/new")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-600 text-white"
                style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))" }}>
                <Plus size={13} /> Register New Bin
              </button>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "var(--color-surface-container-high)" }}>
                {["BIN ID", "MAHALLA / LOCATION", "FILL LEVEL", "STATUS", "ACTIONS"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-600 uppercase tracking-wider"
                    style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map(bin => (
                <tr key={bin.id}
                  onClick={() => router.push(`/trash-bins/${bin.id}`)}
                  className="border-b transition-colors hover:bg-[rgba(37,99,235,0.05)] cursor-pointer"
                  style={{ borderColor: "var(--color-outline-variant)" }}>
                  <td className="px-5 py-4">
                    <span className="font-600 text-xs" style={{ color: "var(--color-primary)" }}>#{bin.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-xs font-500" style={{ color: "var(--color-on-surface)" }}>{bin.location}</div>
                    <div className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>{bin.sub}</div>
                  </td>
                  <td className="px-5 py-4"><FillLevelBar percent={bin.fill} /></td>
                  <td className="px-5 py-4"><StatusBadge status={bin.status} /></td>
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
              Previous
            </span>
            <Pagination current={page} total={totalPages || 1} onPageChange={setPage} />
            <span className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
              Next
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
