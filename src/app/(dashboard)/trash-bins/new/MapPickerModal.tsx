"use client";

import { useEffect, useRef } from "react";
import { X, MapPin } from "lucide-react";

interface Props {
  coords: string;
  onConfirm: (coords: string) => void;
  onClose: () => void;
}

export default function MapPickerModal({ coords, onConfirm, onClose }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletRef = useRef<{
    map: import("leaflet").Map;
    marker: import("leaflet").Marker | null;
    selectedLatLng: { lat: number; lng: number } | null;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (!mapRef.current || !isMounted) return;

      // Parse initial coords
      const match = coords.match(/([\d.]+)°\s*N,\s*([\d.]+)°\s*E/);
      const initLat = match ? parseFloat(match[1]) : 39.6547;
      const initLng = match ? parseFloat(match[2]) : 66.9758;

      const map = L.map(mapRef.current, { zoomControl: true }).setView([initLat, initLng], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Custom icon
      const icon = L.divIcon({
        html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:linear-gradient(135deg,#2563eb,#1d4ed8);border:3px solid #fff;box-shadow:0 4px 12px rgba(37,99,235,0.4)"></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        className: "",
      });

      let marker: import("leaflet").Marker | null = null;

      // Place initial marker
      marker = L.marker([initLat, initLng], { icon }).addTo(map);
      leafletRef.current = { map, marker, selectedLatLng: { lat: initLat, lng: initLng } };

      map.on("click", (e: import("leaflet").LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        if (marker) marker.remove();
        marker = L.marker([lat, lng], { icon }).addTo(map);
        if (leafletRef.current) {
          leafletRef.current.marker = marker;
          leafletRef.current.selectedLatLng = { lat, lng };
        }
      });
    }

    initMap();

    return () => {
      isMounted = false;
      leafletRef.current?.map.remove();
      leafletRef.current = null;
    };
  }, []);

  const handleConfirm = () => {
    const ll = leafletRef.current?.selectedLatLng;
    if (ll) {
      onConfirm(`${ll.lat.toFixed(4)}° N, ${ll.lng.toFixed(4)}° E`);
    }
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300,
        background: "rgba(15,23,42,0.50)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 20,
          boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
          width: "100%", maxWidth: 640,
          overflow: "hidden",
          animation: "modalIn 0.22s ease",
        }}
      >
        {/* header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid var(--color-outline-variant)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10, flexShrink: 0,
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <MapPin size={16} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "var(--color-on-surface)" }}>Select on Map</div>
              <div style={{ fontSize: 11.5, color: "var(--color-on-surface-variant)" }}>Xaritada joylashuvni tanlang</div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "var(--color-surface-container-low)", border: "none",
              borderRadius: 8, padding: "6px 8px", cursor: "pointer",
              color: "var(--color-on-surface-variant)", display: "flex",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* hint */}
        <div style={{
          padding: "10px 24px", fontSize: 12, fontWeight: 500,
          color: "var(--color-on-surface-variant)",
          background: "var(--color-surface-container-low)",
          borderBottom: "1px solid var(--color-outline-variant)",
        }}>
          📍 Xaritaning istalgan joyiga bosib koordinatni tanlang
        </div>

        {/* map */}
        <div ref={mapRef} style={{ height: 380, width: "100%" }} />

        {/* footer */}
        <div style={{
          display: "flex", gap: 10, padding: "16px 24px",
          borderTop: "1px solid var(--color-outline-variant)",
        }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "11px", borderRadius: 10,
              border: "1.5px solid var(--color-outline-variant)",
              background: "transparent", fontSize: 13, fontWeight: 600,
              color: "var(--color-on-surface-variant)", cursor: "pointer",
            }}
          >
            Bekor qilish
          </button>
          <button
            onClick={handleConfirm}
            style={{
              flex: 1, padding: "11px", borderRadius: 10, border: "none",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-container))",
              color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 4px 14px rgba(37,99,235,0.28)",
            }}
          >
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
}
