"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import { Save, Trash2, Truck, MapPin, Search, Plus, ChevronDown, X, Check, AlertCircle } from "lucide-react";

const MapPickerModal = dynamic(() => import("./MapPickerModal"), { ssr: false });

/* ── Data ─────────────────────────────────────── */
const regions = ["Samarkand City", "Pastdargom", "Urgut", "Bulungur", "Kattakurgan"];
const districts: Record<string, string[]> = {
  "Samarkand City": ["Registan", "Siyob", "Dagbit", "Bulungur Rd"],
  "Pastdargom":     ["Juma", "Oqdaryo", "Chelak"],
  "Urgut":          ["Urgut Center", "Yangi Urgut"],
  "Bulungur":       ["Bulungur Center", "Yangi Turmush"],
  "Kattakurgan":    ["Kattakurgan Center", "Arnasoy"],
};
const allVehicles = [
  { plate: "01 A 777 AA", driver: "Alisher Usmanov" },
  { plate: "10 B 924 OA", driver: "Rustam Karimov" },
  { plate: "01 H 456 AA", driver: "Bekzod Nazarov" },
  { plate: "01 Z 121 BB", driver: "Jasur Tulyaganov" },
  { plate: "05 B 555 BB", driver: "Dilshod Karimov" },
];

/* ── Shared styles ────────────────────────────── */
const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.88)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.70)",
  boxShadow: "0 8px 32px rgba(15,23,42,0.08)",
  borderRadius: 18,
};
const labelStyle: React.CSSProperties = {
  fontSize: 10, fontWeight: 700, textTransform: "uppercase",
  letterSpacing: "0.6px", color: "var(--color-on-surface-variant)",
  marginBottom: 6, display: "block",
};
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px", fontSize: 13, fontFamily: "inherit",
  fontWeight: 500, border: "1.5px solid var(--color-outline-variant)",
  borderRadius: 10, background: "var(--color-surface-container-low)",
  color: "var(--color-on-surface)", outline: "none", boxSizing: "border-box",
};
const sectionBadge: React.CSSProperties = {
  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
  background: "var(--color-surface-container-high)",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 11, fontWeight: 800, color: "var(--color-on-surface-variant)",
};

/* ── Assign Vehicle Modal ─────────────────────── */
function AssignVehicleModal({
  assigned, onClose, onSave,
}: {
  assigned: string[];
  onClose: () => void;
  onSave: (plates: string[]) => void;
}) {
  const [search, setSearch] = useState("");
  // start with already assigned ones checked
  const [checked, setChecked] = useState<string[]>([...assigned]);

  const toggle = (plate: string) =>
    setChecked(prev =>
      prev.includes(plate) ? prev.filter(p => p !== plate) : [...prev, plate]
    );

  const filtered = allVehicles.filter(v =>
    v.plate.toLowerCase().includes(search.toLowerCase()) ||
    v.driver.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(15,23,42,0.45)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 20,
          boxShadow: "0 32px 80px rgba(0,0,0,0.24)",
          width: "100%", maxWidth: 480,
          animation: "modalIn 0.22s ease",
        }}
      >
        {/* header */}
        <div style={{ padding: "26px 28px 18px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--color-on-surface)", margin: "0 0 4px" }}>
                Assign Vehicle
              </h2>
              <p style={{ fontSize: 12.5, color: "var(--color-on-surface-variant)", margin: 0 }}>
                Allocate an available asset to the current operation.
              </p>
            </div>
            <button onClick={onClose} style={{
              background: "var(--color-surface-container-low)", border: "none",
              borderRadius: 8, padding: "6px 8px", cursor: "pointer",
              color: "var(--color-on-surface-variant)", display: "flex",
            }}>
              <X size={16} />
            </button>
          </div>

          {/* search */}
          <div style={{ position: "relative", marginTop: 16 }}>
            <Search size={13} style={{
              position: "absolute", left: 12, top: "50%",
              transform: "translateY(-50%)", color: "var(--color-on-surface-variant)", pointerEvents: "none",
            }} />
            <input
              type="text"
              placeholder="Search by registration number or driver name"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, paddingLeft: 36, fontSize: 12.5 }}
            />
          </div>
        </div>

        {/* list */}
        <div style={{ padding: "0 28px 4px" }}>
          <span style={{ ...labelStyle, marginBottom: 10 }}>Available Fleet Units</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 300, overflowY: "auto" }}>
            {filtered.map(v => {
              const isChecked = checked.includes(v.plate);
              return (
                <button
                  key={v.plate}
                  onClick={() => toggle(v.plate)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "13px 14px", borderRadius: 12, cursor: "pointer",
                    border: isChecked
                      ? "2px solid var(--color-primary)"
                      : "1.5px solid var(--color-outline-variant)",
                    background: isChecked ? "rgba(37,99,235,0.05)" : "#fff",
                    textAlign: "left", transition: "all 0.13s",
                  }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    background: isChecked ? "rgba(37,99,235,0.10)" : "var(--color-surface-container-low)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Truck size={17} style={{ color: isChecked ? "var(--color-primary)" : "var(--color-on-surface-variant)" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--color-on-surface)" }}>{v.plate}</div>
                    <div style={{ fontSize: 11.5, color: "var(--color-on-surface-variant)", marginTop: 1 }}>
                      Driver: {v.driver}
                    </div>
                  </div>
                  {/* checkbox */}
                  <div style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                    border: isChecked ? "none" : "2px solid var(--color-outline)",
                    background: isChecked
                      ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))"
                      : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.13s",
                    boxShadow: isChecked ? "0 2px 8px rgba(37,99,235,0.28)" : "none",
                  }}>
                    {isChecked && <Check size={12} color="#fff" strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <div style={{
          padding: "16px 28px 24px",
          borderTop: "1px solid var(--color-outline-variant)",
          marginTop: 12,
          display: "flex", gap: 10,
        }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px", borderRadius: 10,
            border: "1.5px solid var(--color-outline-variant)",
            background: "transparent", fontSize: 13, fontWeight: 600,
            color: "var(--color-on-surface-variant)", cursor: "pointer",
          }}>
            Cancel and Go Back
          </button>
          <button
            onClick={() => { onSave(checked); onClose(); }}
            style={{
              flex: 1, padding: "11px", borderRadius: 10, border: "none",
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              background: checked.length > 0
                ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))"
                : "var(--color-surface-container-high)",
              color: checked.length > 0 ? "#fff" : "var(--color-on-surface-variant)",
              boxShadow: checked.length > 0 ? "0 4px 14px rgba(37,99,235,0.28)" : "none",
              transition: "all 0.15s",
            }}
          >
            {checked.length > 0 ? `Assign ${checked.length} Vehicle${checked.length > 1 ? "s" : ""}` : "Assign Vehicle"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ────────────────────────────────── */
export default function RegisterBinPage() {
  const router = useRouter();
  const [tab, setTab]             = useState<"bin" | "vehicle">("bin");
  const [region, setRegion]       = useState("Samarkand City");
  const [district, setDistrict]   = useState("Registan");
  const [mahalla, setMahalla]     = useState("");
  const [coords, setCoords]       = useState("39.6547° N, 66.9758° E");
  const [cameraId, setCameraId]   = useState("");
  const [binCount, setBinCount]   = useState("");
  const [assigned, setAssigned]   = useState<string[]>([]);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showMapModal, setShowMapModal]         = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const refs = {
    mahalla:  useRef<HTMLInputElement>(null),
    cameraId: useRef<HTMLInputElement>(null),
    binCount: useRef<HTMLInputElement>(null),
    vehicles: useRef<HTMLDivElement>(null),
  };

  const clearError = (key: string) =>
    setErrors(prev => ({ ...prev, [key]: false }));

  const handleSubmit = async () => {
    const newErrors: Record<string, boolean> = {
      mahalla:  !mahalla.trim(),
      cameraId: !cameraId.trim(),
      binCount: !binCount.trim(),
      vehicles: assigned.length === 0,
    };
    setErrors(newErrors);

    const firstError = Object.entries(newErrors).find(([, v]) => v)?.[0];
    if (firstError) {
      const el = refs[firstError as keyof typeof refs]?.current;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        if ("focus" in el) (el as HTMLInputElement).focus();
      }
      return;
    }

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setSubmitting(false);
    router.push("/trash-bins");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Header
        title="New Asset Registration"
        subtitle="Create and catalog new permanent infrastructure or fleet assets within the municipal ledger"
      />

      <div style={{ padding: "24px 28px 40px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", gap: 10 }}>
          {([
            { key: "bin",     icon: Trash2, label: "Register Trash Bin" },
            { key: "vehicle", icon: Truck,  label: "Register Vehicle"   },
          ] as const).map(({ key, icon: Icon, label }) => (
            <button key={key} onClick={() => setTab(key)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 20px", borderRadius: 12,
              fontSize: 13, fontWeight: 700, cursor: "pointer",
              border: tab === key ? "none" : "1.5px solid var(--color-outline-variant)",
              background: tab === key
                ? "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))"
                : "rgba(255,255,255,0.80)",
              color: tab === key ? "#fff" : "var(--color-on-surface-variant)",
              boxShadow: tab === key ? "0 6px 20px rgba(37,99,235,0.28)" : "none",
              transition: "all 0.18s",
            }}>
              <Icon size={14} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Form card ── */}
        <div style={{ ...cardStyle, padding: "0 0 32px" }}>

          {/* 01 Geospatial */}
          <div style={{ padding: "28px 32px 24px", borderBottom: "1px solid var(--color-outline-variant)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={sectionBadge}>01</div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--color-on-surface)", margin: 0 }}>
                Geospatial Identity
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <span style={labelStyle}>Region</span>
                <div style={{ position: "relative" }}>
                  <select value={region} onChange={e => { setRegion(e.target.value); setDistrict(districts[e.target.value]?.[0] ?? ""); }}
                    style={{ ...inputStyle, appearance: "none", paddingRight: 36, cursor: "pointer" }}>
                    {regions.map(r => <option key={r}>{r}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-on-surface-variant)", pointerEvents: "none" }} />
                </div>
              </div>
              <div>
                <span style={labelStyle}>District</span>
                <div style={{ position: "relative" }}>
                  <select value={district} onChange={e => setDistrict(e.target.value)}
                    style={{ ...inputStyle, appearance: "none", paddingRight: 36, cursor: "pointer" }}>
                    {(districts[region] ?? []).map(d => <option key={d}>{d}</option>)}
                  </select>
                  <ChevronDown size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-on-surface-variant)", pointerEvents: "none" }} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <span style={{ ...labelStyle, color: errors.mahalla ? "#ef4444" : "var(--color-on-surface-variant)" }}>
                Mahalla {errors.mahalla && "— majburiy maydon"}
              </span>
              <div style={{ position: "relative" }}>
                <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: errors.mahalla ? "#ef4444" : "var(--color-on-surface-variant)", pointerEvents: "none" }} />
                <input
                  ref={refs.mahalla}
                  type="text" placeholder="Search Mahalla..." value={mahalla}
                  onChange={e => { setMahalla(e.target.value); clearError("mahalla"); }}
                  style={{
                    ...inputStyle, paddingLeft: 36,
                    borderColor: errors.mahalla ? "#ef4444" : "var(--color-outline-variant)",
                    background: errors.mahalla ? "#fff5f5" : "var(--color-surface-container-low)",
                    boxShadow: errors.mahalla ? "0 0 0 3px rgba(239,68,68,0.12)" : "none",
                  }}
                />
                {errors.mahalla && <AlertCircle size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#ef4444" }} />}
              </div>
            </div>

            <div>
              <span style={labelStyle}>Map Coordinates</span>
              <div style={{ display: "flex", gap: 10 }}>
                <input type="text" value={coords} onChange={e => setCoords(e.target.value)}
                  style={{ ...inputStyle, flex: 1, fontFamily: "monospace", fontSize: 12.5 }} />
                <button
                  onClick={() => setShowMapModal(true)}
                  style={{
                    display: "flex", alignItems: "center", gap: 7,
                    padding: "0 18px", borderRadius: 10, flexShrink: 0,
                    background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))",
                    color: "#fff", fontSize: 12.5, fontWeight: 700,
                    border: "none", cursor: "pointer", whiteSpace: "nowrap",
                    boxShadow: "0 4px 14px rgba(37,99,235,0.28)",
                  }}
                >
                  <MapPin size={13} /> Select on Map
                </button>
              </div>
            </div>
          </div>

          {/* 02 Technical */}
          <div style={{ padding: "28px 32px 24px", borderBottom: "1px solid var(--color-outline-variant)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={sectionBadge}>02</div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--color-on-surface)", margin: 0 }}>
                Technical &amp; Monitoring
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <span style={{ ...labelStyle, color: errors.cameraId ? "#ef4444" : "var(--color-on-surface-variant)" }}>
                  Camera Identification Number (ID) {errors.cameraId && "— majburiy"}
                </span>
                <div style={{ position: "relative" }}>
                  <input
                    ref={refs.cameraId}
                    type="text" placeholder="CAM-XXXX-000" value={cameraId}
                    onChange={e => { setCameraId(e.target.value); clearError("cameraId"); }}
                    style={{
                      ...inputStyle,
                      borderColor: errors.cameraId ? "#ef4444" : "var(--color-outline-variant)",
                      background: errors.cameraId ? "#fff5f5" : "var(--color-surface-container-low)",
                      boxShadow: errors.cameraId ? "0 0 0 3px rgba(239,68,68,0.12)" : "none",
                    }}
                  />
                  {errors.cameraId && <AlertCircle size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#ef4444" }} />}
                </div>
              </div>
              <div>
                <span style={{ ...labelStyle, color: errors.binCount ? "#ef4444" : "var(--color-on-surface-variant)" }}>
                  Qutilar soni {errors.binCount && "— majburiy"}
                </span>
                <div style={{ position: "relative" }}>
                  <input
                    ref={refs.binCount}
                    type="number" placeholder="e.g. 4" value={binCount}
                    onChange={e => { setBinCount(e.target.value); clearError("binCount"); }}
                    style={{
                      ...inputStyle,
                      borderColor: errors.binCount ? "#ef4444" : "var(--color-outline-variant)",
                      background: errors.binCount ? "#fff5f5" : "var(--color-surface-container-low)",
                      boxShadow: errors.binCount ? "0 0 0 3px rgba(239,68,68,0.12)" : "none",
                    }}
                  />
                  {errors.binCount && <AlertCircle size={14} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#ef4444" }} />}
                </div>
              </div>
            </div>
          </div>

          {/* 03 Personnel */}
          <div style={{ padding: "28px 32px 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={sectionBadge}>03</div>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: "var(--color-on-surface)", margin: 0 }}>
                Personnel Assignment
              </h2>
            </div>
            <span style={{ ...labelStyle, color: errors.vehicles ? "#ef4444" : "var(--color-on-surface-variant)" }}>
              Responsible Vehicle(s) {errors.vehicles && "— kamida bitta mashina tanlang"}
            </span>
            <div ref={refs.vehicles} style={{
              display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center",
              padding: errors.vehicles ? "12px" : "0",
              borderRadius: errors.vehicles ? 14 : 0,
              border: errors.vehicles ? "2px dashed #ef4444" : "2px dashed transparent",
              background: errors.vehicles ? "rgba(239,68,68,0.04)" : "transparent",
              transition: "all 0.2s",
            }}>
              {assigned.map(plate => {
                const v = allVehicles.find(v => v.plate === plate)!;
                return (
                  <div key={plate} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "13px 14px", borderRadius: 14,
                    border: "2px solid var(--color-primary)",
                    background: "rgba(37,99,235,0.05)", minWidth: 200,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                      background: "rgba(37,99,235,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Truck size={16} style={{ color: "var(--color-primary)" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--color-on-surface)" }}>{v.plate}</div>
                      <div style={{ fontSize: 11, color: "var(--color-on-surface-variant)", marginTop: 1 }}>{v.driver}</div>
                    </div>
                    <button
                      onClick={() => setAssigned(prev => prev.filter(p => p !== plate))}
                      style={{
                        width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                        background: "rgba(239,68,68,0.10)", border: "none",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", color: "#ef4444",
                      }}
                    >
                      <X size={13} />
                    </button>
                  </div>
                );
              })}

              <button onClick={() => setShowVehicleModal(true)} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "14px 22px", borderRadius: 14, cursor: "pointer",
                border: "1.5px dashed var(--color-outline-variant)",
                background: "transparent", fontSize: 13, fontWeight: 600,
                color: "var(--color-on-surface-variant)",
                minWidth: 180, justifyContent: "center",
              }}>
                <Plus size={15} /> Assign New Vehicle
              </button>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12 }}>
          <button onClick={() => router.push("/trash-bins")} style={{
            padding: "11px 24px", borderRadius: 999, fontSize: 13, fontWeight: 600,
            border: "1.5px solid var(--color-outline-variant)",
            background: "transparent", color: "var(--color-on-surface-variant)",
            cursor: "pointer", display: "flex", alignItems: "center", gap: 7,
          }}>
            <X size={14} /> Discard Draft
          </button>
          <button onClick={handleSubmit} disabled={submitting} style={{
            padding: "11px 28px", borderRadius: 999, fontSize: 13, fontWeight: 700,
            border: "none", cursor: submitting ? "not-allowed" : "pointer",
            background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))",
            color: "#fff", display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 6px 20px rgba(37,99,235,0.30)",
            opacity: submitting ? 0.75 : 1, transition: "opacity 0.15s",
          }}>
            {submitting ? (
              <>
                <span style={{
                  width: 14, height: 14, borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff",
                  animation: "spin 0.65s linear infinite", display: "inline-block",
                }} />
                Saving…
              </>
            ) : (
              <><Save size={14} /> Register Asset</>
            )}
          </button>
        </div>
      </div>

      {/* ── Modals ── */}
      {showVehicleModal && (
        <AssignVehicleModal
          assigned={assigned}
          onClose={() => setShowVehicleModal(false)}
          onSave={plates => { setAssigned(plates); if (plates.length > 0) clearError("vehicles"); }}
        />
      )}

      {showMapModal && (
        <MapPickerModal
          coords={coords}
          onClose={() => setShowMapModal(false)}
          onConfirm={newCoords => setCoords(newCoords)}
        />
      )}

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes modalIn { from { opacity:0; transform:scale(0.96) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
      `}</style>
    </div>
  );
}
