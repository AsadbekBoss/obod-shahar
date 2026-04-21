"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        style={{
          marginLeft: collapsed ? 92 : 270,
          padding: "0 10px 24px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          transition: "margin-left 0.3s ease",
        }}
      >
        {children}
      </main>
    </div>
  );
}
