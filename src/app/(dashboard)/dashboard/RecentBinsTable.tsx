"use client";

import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";
import FillLevelBar from "@/components/ui/FillLevelBar";

const recentBins = [
  { id: "BIN-001", location: "Samarkand City", sublocation: "Registan Mahalla", fill: 95, status: "full" as const, updated: "10 mins ago" },
  { id: "BIN-042", location: "Pastdargom",     sublocation: "Juma Town",         fill: 45, status: "medium" as const, updated: "2 hours ago" },
  { id: "BIN-108", location: "Urgut District", sublocation: "Center Market",      fill: 12, status: "empty" as const, updated: "5 mins ago" },
  { id: "BIN-087", location: "Samarkand City", sublocation: "Siyob Market",       fill: 88, status: "full" as const, updated: "45 mins ago" },
];

export default function RecentBinsTable() {
  const router = useRouter();

  return (
    <table className="w-full">
      <thead>
        <tr style={{ backgroundColor: "var(--color-surface-container-high)" }}>
          {["BIN ID", "LOCATION", "FILL LEVEL", "STATUS", "LAST UPDATE"].map((h) => (
            <th key={h} className="text-left px-5 py-3 text-[10px] font-600 uppercase tracking-wider"
              style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {recentBins.map((bin) => (
          <tr
            key={bin.id}
            onClick={() => router.push(`/trash-bins/${bin.id}`)}
            className="border-b transition-colors hover:bg-[rgba(37,99,235,0.05)] cursor-pointer"
            style={{ borderColor: "var(--color-outline-variant)" }}
          >
            <td className="px-5 py-3.5">
              <span className="font-600 text-xs" style={{ color: "var(--color-primary)" }}>
                #{bin.id}
              </span>
            </td>
            <td className="px-5 py-3.5">
              <div className="text-xs font-500" style={{ color: "var(--color-on-surface)" }}>{bin.location}</div>
              <div className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>{bin.sublocation}</div>
            </td>
            <td className="px-5 py-3.5">
              <FillLevelBar percent={bin.fill} />
            </td>
            <td className="px-5 py-3.5">
              <StatusBadge status={bin.status} />
            </td>
            <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
              {bin.updated}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
