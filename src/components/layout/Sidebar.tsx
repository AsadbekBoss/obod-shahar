"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Trash2, Truck, Users, ShieldCheck,
  BarChart3, Settings, HelpCircle, LogOut, Plus, Building2, ChevronLeft,
} from "lucide-react";

const navGroups = [
  {
    section: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    section: "Management",
    items: [
      { href: "/trash-bins", label: "Trash Bins", icon: Trash2      },
      { href: "/fleet",      label: "Fleet",       icon: Truck       },
      { href: "/drivers",    label: "Drivers",     icon: Users       },
      { href: "/admins",     label: "Admins",      icon: ShieldCheck },
    ],
  },
  {
    section: "Insights",
    items: [
      { href: "/analytics", label: "Analytics", icon: BarChart3 },
    ],
  },
];

const bottomItems = [
  { href: "/settings", label: "Settings", icon: Settings   },
  { href: "/support",  label: "Support",  icon: HelpCircle },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const w = collapsed ? "72px" : "260px";

  return (
    <aside
      style={{
        position: "fixed", top: 0, left: 0, height: "100vh",
        width: w, zIndex: 100, padding: "10px",
        transition: "width 0.3s ease",
      }}
    >
      {/* Inner dark gradient container */}
      <div style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "linear-gradient(160deg, var(--color-sidebar-from), var(--color-sidebar-to))",
        borderRadius: "22px",
        padding: "20px 14px",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.24)",
      }}>
        {/* Logo */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: collapsed ? 0 : 10,
          padding: collapsed ? "0 0 20px" : "0 6px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          marginBottom: 16,
          overflow: "hidden",
        }}>
          <div style={{
            flexShrink: 0, width: 36, height: 36, borderRadius: 10,
            background: "rgba(255,255,255,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Building2 size={18} color="white" />
          </div>
          {!collapsed && (
            <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>
                Obod Shahar
              </div>
              <div style={{ fontSize: 9.5, fontWeight: 600, color: "rgba(255,255,255,0.50)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Infrastructure Authority
              </div>
            </div>
          )}
        </div>

        {/* Nav groups */}
        <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", display: "flex", flexDirection: "column", gap: 0 }}>
          {navGroups.map(group => (
            <div key={group.section}>
              {!collapsed && (
                <div style={{
                  fontSize: 9.5, fontWeight: 700, textTransform: "uppercase",
                  letterSpacing: "0.5px", color: "rgba(255,255,255,0.30)",
                  padding: "14px 10px 5px",
                }}>
                  {group.section}
                </div>
              )}
              {collapsed && <div style={{ height: 10 }} />}
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <Link key={href} href={href} title={collapsed ? label : undefined} style={{
                    display: "flex", alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: 10,
                    padding: collapsed ? "10px 0" : "9px 10px",
                    borderRadius: 12,
                    color: active ? "var(--color-sidebar-text-active)" : "var(--color-sidebar-text)",
                    background: active ? "var(--color-sidebar-active-bg)" : "transparent",
                    border: `1px solid ${active ? "rgba(255,255,255,0.15)" : "transparent"}`,
                    fontWeight: active ? 700 : 500,
                    fontSize: 13, textDecoration: "none",
                    whiteSpace: "nowrap", overflow: "hidden",
                    transition: "background 0.15s, color 0.15s",
                    position: "relative",
                    marginBottom: 2,
                  }}>
                    {active && !collapsed && (
                      <span style={{
                        position: "absolute", left: -14, top: "50%", transform: "translateY(-50%)",
                        width: 4, height: 22, background: "var(--color-success)",
                        borderRadius: "0 4px 4px 0",
                      }} />
                    )}
                    <Icon size={18} strokeWidth={active ? 2.2 : 1.75} style={{ flexShrink: 0 }} />
                    {!collapsed && <span>{label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 12 }}>
          {bottomItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} title={collapsed ? label : undefined} style={{
              display: "flex", alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: 10,
              padding: collapsed ? "9px 0" : "8px 10px",
              borderRadius: 10, marginBottom: 2,
              color: "rgba(255,255,255,0.55)", textDecoration: "none",
              fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden",
            }}>
              <Icon size={15} strokeWidth={1.75} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
          <button style={{
            display: "flex", alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 10,
            padding: collapsed ? "9px 0" : "8px 10px",
            borderRadius: 10, width: "100%",
            color: "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: 500,
            cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden",
            background: "none", border: "none", fontFamily: "inherit",
          }}>
            <LogOut size={15} strokeWidth={1.75} style={{ flexShrink: 0 }} />
            {!collapsed && <span>Logout</span>}
          </button>

          {!collapsed && (
            <Link href="/dashboard" style={{
              marginTop: 10, display: "flex", alignItems: "center",
              justifyContent: "center", gap: 6,
              padding: "10px 16px", borderRadius: 12,
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))",
              color: "white", fontSize: 12.5, fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 8px 20px rgba(37,99,235,0.30)",
            }}>
              <Plus size={14} /> New Report
            </Link>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        style={{
          position: "absolute", top: "50%", right: -12,
          transform: `translateY(-50%) rotate(${collapsed ? "180deg" : "0deg"})`,
          width: 24, height: 24, borderRadius: "50%",
          background: "var(--color-surface-container-lowest)",
          border: "1px solid var(--color-outline-variant)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "var(--color-on-surface-variant)",
          boxShadow: "0 2px 8px rgba(15,23,42,0.10)",
          transition: "transform 0.3s ease, background 0.15s",
          zIndex: 10,
        }}
      >
        <ChevronLeft size={13} />
      </button>
    </aside>
  );
}
