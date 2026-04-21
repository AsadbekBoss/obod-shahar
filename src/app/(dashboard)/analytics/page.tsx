"use client";

import Header from "@/components/layout/Header";
import KPICard from "@/components/ui/KPICard";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, PieChart, Pie, Cell
} from "recharts";

const monthlyData = [
  { month: "Jan", bins: 1200, collections: 980, weight: 42 },
  { month: "Feb", bins: 1320, collections: 1050, weight: 45 },
  { month: "Mar", bins: 1180, collections: 920, weight: 38 },
  { month: "Apr", bins: 1428, collections: 1140, weight: 52 },
  { month: "May", bins: 1380, collections: 1080, weight: 49 },
  { month: "Jun", bins: 1510, collections: 1200, weight: 55 },
];

const districtData = [
  { name: "Samarkand", value: 420 },
  { name: "Pastdargom", value: 280 },
  { name: "Urgut", value: 195 },
  { name: "Bulungur", value: 140 },
  { name: "Others", value: 393 },
];

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

const cardStyle = {
  background: "rgba(255,255,255,0.82)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 18px 40px rgba(15,23,42,0.08)",
  borderRadius: 18,
  padding: 20,
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Analytics" subtitle="Samarkand region performance metrics" />
      <div className="p-8 flex-1 flex flex-col gap-6">

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          <KPICard label="Total Collections" value="6,370" trend={{ value: "+12%", up: true }} note="vs last month" />
          <KPICard label="Avg Fill Rate" value="68%" trend={{ value: "+3%", up: true }} />
          <KPICard label="Total Weight" value="281 T" trend={{ value: "+8%", up: true }} note="this month" />
          <KPICard label="Active Routes" value="47" accent />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <div style={cardStyle}>
            <h3 className="font-headline font-600 text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>
              Monthly Collection Trend
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8f0fe" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "white", border: "none", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="collections" stroke="#2563eb" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={cardStyle}>
            <h3 className="font-headline font-600 text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>
              Bins by District
            </h3>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={districtData} cx="50%" cy="50%" innerRadius={40} outerRadius={70}
                    dataKey="value" paddingAngle={3}>
                    {districtData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 flex-1">
                {districtData.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-xs" style={{ color: "var(--color-on-surface)" }}>{d.name}</span>
                    </div>
                    <span className="text-xs font-600" style={{ color: "var(--color-on-surface-variant)" }}>{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <div style={cardStyle}>
            <h3 className="font-headline font-600 text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>
              Average Fill Level Trend (%)
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8f0fe" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "white", border: "none", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="weight" stroke="#0ea5e9" strokeWidth={2} dot={{ fill: "#0ea5e9", r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={cardStyle}>
            <h3 className="font-headline font-600 text-sm mb-4" style={{ color: "var(--color-on-surface)" }}>
              Total Active Bins per Month
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={monthlyData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e8f0fe" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "white", border: "none", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="bins" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
