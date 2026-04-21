import Header from "@/components/layout/Header";
import { Bell, Shield, Globe, Palette, Database } from "lucide-react";

const sections = [
  {
    icon: Globe, title: "Region & Locale",
    fields: [
      { label: "Default Region", value: "Samarkand" },
      { label: "Language", value: "English" },
      { label: "Timezone", value: "Asia/Tashkent (UTC+5)" },
    ],
  },
  {
    icon: Bell, title: "Notifications",
    fields: [
      { label: "Critical Alerts", value: "Enabled" },
      { label: "Daily Reports", value: "08:00 AM" },
      { label: "Email Digest", value: "Weekly" },
    ],
  },
  {
    icon: Shield, title: "Security",
    fields: [
      { label: "Two-Factor Auth", value: "Active" },
      { label: "Session Timeout", value: "60 minutes" },
      { label: "Audit Log", value: "30 days retention" },
    ],
  },
  {
    icon: Database, title: "Data & Storage",
    fields: [
      { label: "Auto Backup", value: "Daily at 00:00" },
      { label: "Data Retention", value: "12 months" },
      { label: "Export Format", value: "CSV / PDF" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-col flex-1">
      <Header title="Settings" subtitle="System configuration and preferences" />
      <div className="p-8 flex-1 grid grid-cols-2 gap-4 content-start">
        {sections.map(({ icon: Icon, title, fields }) => (
          <div key={title} className="rounded-xl p-5" style={{ backgroundColor: "var(--color-surface-container-lowest)" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "var(--color-surface-container-low)" }}>
                <Icon size={16} style={{ color: "var(--color-primary)" }} />
              </div>
              <h3 className="font-headline font-600 text-sm" style={{ color: "var(--color-on-surface)" }}>{title}</h3>
            </div>
            {fields.map(({ label, value }) => (
              <div key={label} className="flex justify-between py-2.5 border-b last:border-0 text-xs"
                style={{ borderColor: "var(--color-outline-variant)" }}>
                <span style={{ color: "var(--color-on-surface-variant)" }}>{label}</span>
                <span className="font-500" style={{ color: "var(--color-on-surface)" }}>{value}</span>
              </div>
            ))}
            <button className="mt-4 w-full py-2 text-xs font-600 rounded-lg"
              style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface-variant)" }}>
              Edit {title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
