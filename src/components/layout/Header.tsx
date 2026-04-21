"use client";

import { Bell, Search } from "lucide-react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 24px",
      margin: "10px 10px 0",
      background: "rgba(255,255,255,0.76)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderRadius: 22,
      border: "1px solid rgba(255,255,255,0.70)",
      boxShadow: "0 4px 24px rgba(15,23,42,0.07)",
      position: "sticky",
      top: 10,
      zIndex: 50,
    }}>
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: "var(--color-on-surface)", margin: 0, lineHeight: 1.2 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 11, color: "var(--color-on-surface-variant)", margin: "2px 0 0" }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search size={13} style={{
            position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
            color: "var(--color-on-surface-variant)",
          }} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              paddingLeft: 30, paddingRight: 14, paddingTop: 8, paddingBottom: 8,
              fontSize: 12, borderRadius: 10, outline: "none", width: 200,
              background: "var(--color-surface-container-low)",
              border: "1px solid var(--color-outline-variant)",
              color: "var(--color-on-surface)",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Bell */}
        <button style={{
          position: "relative", padding: "7px", borderRadius: 10, border: "none",
          background: "var(--color-surface-container-low)", cursor: "pointer",
          color: "var(--color-on-surface-variant)", display: "flex",
        }}>
          <Bell size={17} strokeWidth={1.75} />
          <span style={{
            position: "absolute", top: 6, right: 6, width: 7, height: 7,
            borderRadius: "50%", background: "var(--color-tertiary)",
          }} />
        </button>

        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--color-on-surface)" }}>Administrator</div>
            <div style={{ fontSize: 10, color: "var(--color-on-surface-variant)" }}>Samarkand R. Administration</div>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontSize: 13, fontWeight: 800,
          }}>
            A
          </div>
        </div>
      </div>
    </header>
  );
}
