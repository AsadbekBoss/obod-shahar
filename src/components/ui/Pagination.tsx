"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ current, total, onPageChange }: PaginationProps) {
  const pages: (number | "...")[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="p-1.5 rounded-lg disabled:opacity-40 transition-colors"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className="w-8 h-8 rounded-lg text-xs font-600 transition-colors"
            style={{
              backgroundColor: current === p ? "var(--color-primary)" : "transparent",
              color: current === p ? "white" : "var(--color-on-surface-variant)",
            }}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="p-1.5 rounded-lg disabled:opacity-40 transition-colors"
        style={{ color: "var(--color-on-surface-variant)" }}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
