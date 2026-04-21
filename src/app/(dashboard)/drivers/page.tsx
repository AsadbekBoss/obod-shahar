"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge from "@/components/ui/StatusBadge";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Truck, User } from "lucide-react";
import { useRouter } from "next/navigation";

const drivers = [
  { id: "javohir-doniyorov",  name: "Javohir Doniyorov", uid: "OS-7729-D", vehicle: "TASH 01 777 AA", status: "active" as const },
  { id: "alisher-mirzo",      name: "Alisher Mirzo",     uid: "OS-8104-D", vehicle: null,            status: "resting" as const },
  { id: "nigora-sobirova",    name: "Nigora Sobirova",   uid: "OS-3391-D", vehicle: "TASH 10 902 ZA", status: "offline" as const },
  { id: "rustam-azimov",      name: "Rustam Azimov",     uid: "OS-1225-D", vehicle: "TASH 01 444 BB", status: "active" as const },
  { id: "dilshod-karimov",    name: "Dilshod Karimov",   uid: "OS-0042-D", vehicle: "01 A 777 AA",    status: "active" as const },
  { id: "elena-rodionova",    name: "Elena Rodionova",   uid: "OS-2291-D", vehicle: "01 B 223 BB",    status: "active" as const },
  { id: "marcus-chen",        name: "Marcus Chen",       uid: "OS-4412-D", vehicle: null,            status: "resting" as const },
  { id: "artem-sokolov",      name: "Artem Sokolov",     uid: "OS-5531-D", vehicle: "01 C 445 CC",    status: "active" as const },
];

export default function DriversPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = drivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.uid.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1">
      <Header title="Drivers Management" subtitle="Manage and monitor municipal transportation staff" />
      <div className="p-8 flex-1 flex flex-col gap-6">

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline font-700 text-2xl" style={{ color: "var(--color-on-surface)" }}>
              Driver Directory
            </h2>
            <p className="text-xs mt-1" style={{ color: "var(--color-on-surface-variant)" }}>
              Manage and monitor municipal transportation staff
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2"
                style={{ color: "var(--color-on-surface-variant)" }} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search driver registry..."
                className="pl-8 pr-3 py-2 text-xs rounded-lg outline-none w-52"
                style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface)" }} />
            </div>
            <Link href="/drivers/new"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-600 text-white"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))" }}>
              <Plus size={13} /> Register New Driver
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl flex-1 flex flex-col" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)", boxShadow: "0 18px 40px rgba(15,23,42,0.08)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "var(--color-surface-container-high)" }}>
                {["PHOTO", "NAME & ID", "ASSIGNED VEHICLE", "STATUS", "ACTIONS"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-600 uppercase tracking-wider"
                    style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id}
                  onClick={() => router.push(`/drivers/${d.id}`)}
                  className="border-b transition-colors hover:bg-[rgba(37,99,235,0.05)] cursor-pointer"
                  style={{ borderColor: "var(--color-outline-variant)" }}>
                  <td className="px-5 py-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, var(--color-surface-container), var(--color-surface-container-high))" }}>
                      <User size={18} style={{ color: "var(--color-on-surface-variant)" }} />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-600 text-xs" style={{ color: "var(--color-on-surface)" }}>{d.name}</span>
                    <div className="text-[10px] mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      ID: {d.uid}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {d.vehicle ? (
                      <div className="flex items-center gap-2 text-xs">
                        <Truck size={13} style={{ color: "var(--color-on-surface-variant)" }} />
                        <span className="font-500" style={{ color: "var(--color-on-surface)" }}>{d.vehicle}</span>
                      </div>
                    ) : (
                      <span className="text-xs italic" style={{ color: "var(--color-on-surface-variant)" }}>
                        Unassigned
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={d.status} /></td>
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
              Showing {filtered.length} of 520 Registered Drivers
            </span>
            <Pagination current={page} total={52} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
