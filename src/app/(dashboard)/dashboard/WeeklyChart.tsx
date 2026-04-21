"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { day: "MON", value: 62 },
  { day: "TUE", value: 78 },
  { day: "WED", value: 85 },
  { day: "THU", value: 91 },
  { day: "FRI", value: 74 },
  { day: "SAT", value: 48 },
  { day: "SUN", value: 35 },
];

export default function WeeklyChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} barSize={32} barCategoryGap="30%">
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: "#3e4a3d" }}
        />
        <YAxis hide />
        <Tooltip
          cursor={{ fill: "#eff4ff" }}
          contentStyle={{
            background: "white",
            border: "none",
            borderRadius: 6,
            fontSize: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          formatter={(v) => [`${v}%`, "Fill Level"]}
        />
        <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
