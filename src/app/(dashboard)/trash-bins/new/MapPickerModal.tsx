'use client'

import { useEffect, useRef } from 'react'
import { X, MapPin } from 'lucide-react'

interface Props {
  coords: string
  onConfirm: (coords: string) => void
  onClose: () => void
}

export default function MapPickerModal({ coords, onConfirm, onClose }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletRef = useRef<{
    map: import('leaflet').Map
    marker: import('leaflet').Marker | null
    selectedLatLng: { lat: number; lng: number } | null
  } | null>(null)

  useEffect(() => {
    let isMounted = true

    async function initMap() {
      const L = (await import('leaflet')).default
      await import('leaflet/dist/leaflet.css')

      if (!mapRef.current || !isMounted) return

      // Parse initial coords
      const match = coords.match(/([\d.]+)°\s*N,\s*([\d.]+)°\s*E/)
      const initLat = match ? parseFloat(match[1]) : 39.6547
      const initLng = match ? parseFloat(match[2]) : 66.9758

      const map = L.map(mapRef.current, { zoomControl: true }).setView([initLat, initLng], 14)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(map)

      // Custom icon using tailwind-like colors for the gradient
      const icon = L.divIcon({
        html: `<div class="w-7 h-7 rounded-full rounded-br-none -rotate-45 bg-gradient-to-br from-blue-600 to-blue-800 border-[3px] border-white shadow-lg shadow-blue-500/40"></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        className: '',
      })

      let marker: import('leaflet').Marker | null = null

      marker = L.marker([initLat, initLng], { icon }).addTo(map)
      leafletRef.current = { map, marker, selectedLatLng: { lat: initLat, lng: initLng } }

      map.on('click', (e: import('leaflet').LeafletMouseEvent) => {
        const { lat, lng } = e.latlng
        if (marker) marker.remove()
        marker = L.marker([lat, lng], { icon }).addTo(map)
        if (leafletRef.current) {
          leafletRef.current.marker = marker
          leafletRef.current.selectedLatLng = { lat, lng }
        }
      })
    }

    initMap()

    return () => {
      isMounted = false
      leafletRef.current?.map.remove()
      leafletRef.current = null
    }
  }, [coords])

  const handleConfirm = () => {
    const ll = leafletRef.current?.selectedLatLng
    if (ll) {
      onConfirm(`${ll.lat.toFixed(4)}° N, ${ll.lng.toFixed(4)}° E`)
    }
    onClose()
  }

  return (
    <div
      onClick={onClose}
      className='fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 md:p-6'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200'
      >
        {/* Header */}
        <div className='flex items-center justify-between p-4 md:p-6 border-b border-slate-100'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shrink-0 shadow-lg shadow-blue-200'>
              <MapPin size={18} className='text-white' />
            </div>
            <div>
              <h2 className='text-sm md:text-base font-extrabold text-slate-900'>Select on Map</h2>
              <p className='text-[11px] md:text-xs text-slate-500'>Xaritada joylashuvni tanlang</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors'
          >
            <X size={18} />
          </button>
        </div>

        {/* Hint bar */}
        <div className='px-5 py-2.5 bg-slate-50 border-b border-slate-100'>
          <p className='text-[11px] md:text-xs font-semibold text-slate-500 flex items-center gap-2'>
            <span role='img' aria-label='pin'>
              📍
            </span>
            Xaritaning istalgan joyiga bosib koordinatni tanlang
          </p>
        </div>

        {/* Map Container */}
        <div ref={mapRef} className='h-[300px] md:h-[400px] w-full z-0' />

        {/* Footer */}
        <div className='flex flex-col sm:flex-row gap-3 p-4 md:p-6 border-t border-slate-100'>
          <button
            onClick={onClose}
            className='flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors'
          >
            Bekor qilish
          </button>
          <button
            onClick={handleConfirm}
            className='flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:from-blue-700 hover:to-blue-800 transition-all active:scale-[0.98]'
          >
            Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  )
}
