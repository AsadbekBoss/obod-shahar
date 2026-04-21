import Header from "@/components/layout/Header";
import StatusBadge from "@/components/ui/StatusBadge";
import Link from "next/link";
import { ChevronRight, User, Phone, MapPin, Calendar, Truck } from "lucide-react";

const pastVehicles = [
  { plate: "91 B 123 GA", model: "Hyundai Mighty",   start: "12.03.2021 08:00", end: "14.01.2023 18:00", hours: "4,120 h" },
  { plate: "91 Z 555 AA", model: "Mercedes-Benz Atego", start: "05.07.2019 06:30", end: "20.04.2021 06:30", hours: "5,890 h" },
  { plate: "91 X 001 BB", model: "KAMAZ 4308",       start: "02.07.2018 06:30", end: "04.01.2019 10:45", hours: "2,105 h" },
];

const nameMap: Record<string, { name: string; phone: string; address: string; dob: string; emp: string }> = {
  "dilshod-karimov": { name: "Dilshod Karimov", phone: "+998 90 123 45 67", address: "Samarkand City, Dagbit Street 12", dob: "18.05.1982", emp: "02.01.2018" },
  "javohir-doniyorov": { name: "Javohir Doniyorov", phone: "+998 71 234 56 78", address: "Tashkent City, Yunusobod", dob: "05.11.1990", emp: "14.03.2020" },
};

export default async function DriverDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const info = nameMap[id] ?? { name: id.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()), phone: "+998 90 000 00 00", address: "Samarkand City", dob: "01.01.1990", emp: "01.01.2020" };

  return (
    <div className="flex flex-col flex-1">
      <Header title="Driver Ledger" subtitle="Driver Profile" />
      <div className="p-8 flex-1 flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <ChevronRight size={12} />
          <Link href="/drivers" className="hover:underline">Driver Management</Link>
          <ChevronRight size={12} />
          <span style={{ color: "var(--color-on-surface)" }}>Driver Profile</span>
        </div>

        <div className="grid grid-cols-[300px_1fr] gap-6">
          {/* Left: Profile card */}
          <div className="flex flex-col gap-4">
            <div className="rounded-xl p-6" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)" }}>
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--color-surface-container), var(--color-surface-container-high))" }}>
                <User size={40} style={{ color: "var(--color-on-surface-variant)" }} />
              </div>
              <h2 className="font-headline font-700 text-xl text-center mb-1" style={{ color: "var(--color-on-surface)" }}>
                {info.name}
              </h2>

              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-start gap-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                  <Phone size={13} className="mt-0.5 shrink-0" />
                  <span>{info.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                  <MapPin size={13} className="mt-0.5 shrink-0" />
                  <span>{info.address}</span>
                </div>
                <div className="flex items-start gap-2 text-xs" style={{ color: "var(--color-on-surface-variant)" }}>
                  <Calendar size={13} className="mt-0.5 shrink-0" />
                  <div>
                    <div>DOB: {info.dob}</div>
                    <div>Employment: {info.emp}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--color-outline-variant)" }}>
                <div className="text-[10px] font-600 uppercase tracking-wider mb-2"
                  style={{ color: "var(--color-on-surface-variant)" }}>Current Status</div>
                <div className="flex items-center gap-2">
                  <StatusBadge status="active" />
                  <span className="text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>
                    Last log in: 06:30 Today
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Present vehicle + history */}
          <div className="flex flex-col gap-4">
            {/* Present vehicle */}
            <div className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-headline font-600 text-sm" style={{ color: "var(--color-on-surface)" }}>
                  Present Vehicle
                </h3>
                <StatusBadge status="active" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-surface-container-low)" }}>
                  <Truck size={28} style={{ color: "var(--color-primary)" }} />
                </div>
                <div>
                  <div className="font-700 text-base font-headline" style={{ color: "var(--color-on-surface)" }}>
                    Isuzu Forward
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--color-on-surface-variant)" }}>
                    Registration No. 01 A 777 AA
                  </div>
                  {[
                    { label: "Assignment",   value: "2021-01-14" },
                    { label: "Driven Hours", value: "2,460 h" },
                    { label: "Main Route",   value: "District 4" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-4 text-xs mt-1">
                      <span style={{ color: "var(--color-on-surface-variant)" }}>{label}</span>
                      <span className="font-500" style={{ color: "var(--color-on-surface)" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Past vehicles */}
            <div className="rounded-xl flex-1" style={{ background: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.70)" }}>
              <div className="flex items-center justify-between px-5 py-4 border-b"
                style={{ borderColor: "var(--color-outline-variant)" }}>
                <h3 className="font-headline font-600 text-sm" style={{ color: "var(--color-on-surface)" }}>
                  Past Vehicles Operated
                </h3>
                <button className="text-xs px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: "var(--color-surface-container-low)", color: "var(--color-on-surface-variant)" }}>
                  Archival Record
                </button>
              </div>
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-surface-container-high)" }}>
                    {["PLATE NUMBER", "MODEL", "OPERATION PERIOD", "TOTAL HOURS"].map(h => (
                      <th key={h} className="text-left px-5 py-2.5 text-[10px] font-600 uppercase tracking-wider"
                        style={{ color: "var(--color-on-surface-variant)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pastVehicles.map((v, i) => (
                    <tr key={i} className="border-b hover:bg-[#7ffc9720]"
                      style={{ borderColor: "var(--color-outline-variant)" }}>
                      <td className="px-5 py-3.5">
                        <Link href={`/fleet/${v.plate.replace(/\s/g, "-")}`}
                          className="font-600 text-xs" style={{ color: "var(--color-primary)" }}>
                          {v.plate}
                        </Link>
                      </td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: "var(--color-on-surface)" }}>{v.model}</td>
                      <td className="px-5 py-3.5 text-[10px]" style={{ color: "var(--color-on-surface-variant)" }}>
                        <div>{v.start}</div>
                        <div>{v.end}</div>
                      </td>
                      <td className="px-5 py-3.5 text-xs font-600" style={{ color: "var(--color-on-surface)" }}>
                        {v.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
