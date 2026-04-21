"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge from "@/components/ui/StatusBadge";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, User } from "lucide-react";

const admins = [
  { id: "ADM-2024-001", name: "Elena Rodionova", region: "Samarkand City", status: "active" as const },
  { id: "ADM-2024-042", name: "Marcus Chen",     region: "Pastdargom",     status: "active" as const },
  { id: "ADM-2023-812", name: "Sarah Jenkins",   region: "Urgut",          status: "inactive" as const },
  { id: "ADM-2024-109", name: "Priya Sharma",    region: "Bulungur",       status: "active" as const },
  { id: "ADM-2024-215", name: "Jasur Umarov",    region: "Kattakurgan",    status: "active" as const },
  { id: "ADM-2024-318", name: "Aziza Toshmatova",region: "Samarkand City", status: "active" as const },
];

export default function AdminsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const filtered = admins.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.id.toLowerCase().includes(search.toLowerCase()) ||
    a.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1">
      <Header title="Administrator Management" />
      <div className="p-8 flex-1 flex flex-col gap-6">

        {/* Title row */}
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-700 text-2xl" style={{ color: "var(--color-on-surface)" }}>
            Administrator Directory
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2"
                style={{ color: "var(--color-on-surface-variant)" }} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, ID or role..."
                className="pl-8 pr-3 py-2 text-xs rounded-lg outline-none w-60"
                style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface)" }} />
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-600 text-white"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))" }}>
              <Plus size={13} /> Register New Admin
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl flex-1 flex flex-col" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)", boxShadow: "0 18px 40px rgba(15,23,42,0.08)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: "var(--color-surface-container-high)" }}>
                {["PHOTO", "NAME & ID", "REGION", "STATUS", "ACTIONS"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-600 uppercase tracking-wider"
                    style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-b transition-colors hover:bg-[rgba(37,99,235,0.05)]"
                  style={{ borderColor: "var(--color-outline-variant)" }}>
                  <td className="px-5 py-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, var(--color-surface-container), var(--color-surface-container-high))" }}>
                      <User size={18} style={{ color: "var(--color-on-surface-variant)" }} />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-600 text-xs" style={{ color: "var(--color-on-surface)" }}>{a.name}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                      ID: {a.id}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs" style={{ color: "var(--color-on-surface)" }}>{a.region}</td>
                  <td className="px-5 py-4"><StatusBadge status={a.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg" style={{ color: "var(--color-on-surface-variant)" }}>
                        <Pencil size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg" style={{ color: "var(--color-tertiary)" }}>
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
              Showing 1-{filtered.length} of 24 Administrators
            </span>
            <Pagination current={page} total={3} onPageChange={setPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
