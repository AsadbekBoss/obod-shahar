'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import {
  Save,
  Trash2,
  Truck,
  MapPin,
  Search,
  Plus,
  ChevronDown,
  X,
  Check,
  AlertCircle,
} from 'lucide-react'

const MapPickerModal = dynamic(() => import('./MapPickerModal'), { ssr: false })

/* ── Data ─────────────────────────────────────── */
const regions = ['Samarkand City', 'Pastdargom', 'Urgut', 'Bulungur', 'Kattakurgan']
const districts: Record<string, string[]> = {
  'Samarkand City': ['Registan', 'Siyob', 'Dagbit', 'Bulungur Rd'],
  Pastdargom: ['Juma', 'Oqdaryo', 'Chelak'],
  Urgut: ['Urgut Center', 'Yangi Urgut'],
  Bulungur: ['Bulungur Center', 'Yangi Turmush'],
  Kattakurgan: ['Kattakurgan Center', 'Arnasoy'],
}
const allVehicles = [
  { plate: '01 A 777 AA', driver: 'Alisher Usmanov' },
  { plate: '10 B 924 OA', driver: 'Rustam Karimov' },
  { plate: '01 H 456 AA', driver: 'Bekzod Nazarov' },
  { plate: '01 Z 121 BB', driver: 'Jasur Tulyaganov' },
  { plate: '05 B 555 BB', driver: 'Dilshod Karimov' },
]

/* ── Components ───────────────────────────────── */

function AssignVehicleModal({
  assigned,
  onClose,
  onSave,
}: {
  assigned: string[]
  onClose: () => void
  onSave: (plates: string[]) => void
}) {
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState<string[]>([...assigned])

  const toggle = (plate: string) =>
    setChecked((prev) =>
      prev.includes(plate) ? prev.filter((p) => p !== plate) : [...prev, plate]
    )

  const filtered = allVehicles.filter(
    (v) =>
      v.plate.toLowerCase().includes(search.toLowerCase()) ||
      v.driver.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className='fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/45 backdrop-blur-sm p-4 md:p-6'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-200'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='p-6 md:p-7 pb-4'>
          <div className='flex items-start justify-between'>
            <div>
              <h2 className='text-lg font-extrabold text-slate-900'>Assign Vehicle</h2>
              <p className='text-xs text-slate-500 mt-1'>
                Allocate an available asset to the operation.
              </p>
            </div>
            <button
              onClick={onClose}
              className='p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors'
            >
              <X size={18} />
            </button>
          </div>

          <div className='relative mt-4'>
            <Search size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
            <input
              type='text'
              placeholder='Search registration or driver...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all'
            />
          </div>
        </div>

        <div className='px-6 md:px-7'>
          <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3'>
            Available Fleet Units
          </span>
          <div className='flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1'>
            {filtered.map((v) => {
              const isChecked = checked.includes(v.plate)
              return (
                <button
                  key={v.plate}
                  onClick={() => toggle(v.plate)}
                  className={`flex items-center gap-4 p-3 rounded-xl border transition-all text-left ${
                    isChecked
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-slate-100 bg-white hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isChecked ? 'bg-blue-100' : 'bg-slate-100'}`}
                  >
                    <Truck size={18} className={isChecked ? 'text-blue-600' : 'text-slate-400'} />
                  </div>
                  <div className='flex-1'>
                    <div className='text-sm font-bold text-slate-900'>{v.plate}</div>
                    <div className='text-[11px] text-slate-500'>Driver: {v.driver}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isChecked
                        ? 'bg-blue-600 border-transparent shadow-sm shadow-blue-200'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    {isChecked && <Check size={12} className='text-white' strokeWidth={4} />}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className='p-6 md:p-7 border-t border-slate-100 mt-4 flex flex-col sm:flex-row gap-3'>
          <button
            onClick={onClose}
            className='flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(checked)
              onClose()
            }}
            className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${
              checked.length > 0
                ? 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {checked.length > 0
              ? `Assign ${checked.length} Vehicle${checked.length > 1 ? 's' : ''}`
              : 'Assign Vehicle'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function RegisterBinPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'bin' | 'vehicle'>('bin')
  const [region, setRegion] = useState('Samarkand City')
  const [district, setDistrict] = useState('Registan')
  const [mahalla, setMahalla] = useState('')
  const [coords, setCoords] = useState('39.6547° N, 66.9758° E')
  const [cameraId, setCameraId] = useState('')
  const [binCount, setBinCount] = useState('')
  const [assigned, setAssigned] = useState<string[]>([])
  const [showVehicleModal, setShowVehicleModal] = useState(false)
  const [showMapModal, setShowMapModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const refs = {
    mahalla: useRef<HTMLInputElement>(null),
    cameraId: useRef<HTMLInputElement>(null),
    binCount: useRef<HTMLInputElement>(null),
    vehicles: useRef<HTMLDivElement>(null),
  }

  const clearError = (key: string) => setErrors((prev) => ({ ...prev, [key]: false }))

  const handleSubmit = async () => {
    const newErrors: Record<string, boolean> = {
      mahalla: !mahalla.trim(),
      cameraId: !cameraId.trim(),
      binCount: !binCount.trim(),
      vehicles: assigned.length === 0,
    }
    setErrors(newErrors)

    const firstError = Object.entries(newErrors).find(([, v]) => v)?.[0]
    if (firstError) {
      const el = refs[firstError as keyof typeof refs]?.current
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      if (el && 'focus' in el) (el as HTMLInputElement).focus()
      return
    }

    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1400))
    setSubmitting(false)
    router.push('/trash-bins')
  }

  // Shared Tailwind Class Helpers
  const labelClass = (errKey?: string) =>
    `text-[10px] font-bold uppercase tracking-wider mb-1.5 block ${errors[errKey || ''] ? 'text-red-500' : 'text-slate-500'}`
  const inputClass = (errKey?: string) =>
    `w-full px-4 py-2.5 text-sm font-medium border rounded-xl bg-slate-50/50 outline-none transition-all ${
      errors[errKey || '']
        ? 'border-red-500 bg-red-50 ring-2 ring-red-100'
        : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10'
    }`

  return (
    <div className='flex flex-col min-h-screen bg-slate-50'>
      <Header
        title='New Asset Registration'
        subtitle='Create and catalog new permanent infrastructure or fleet assets'
      />

      <main className='p-4 md:p-8 flex flex-col gap-6 max-w-5xl mx-auto w-full'>
        {/* ── Tabs ── */}
        <div className='flex flex-wrap gap-3'>
          {[
            { key: 'bin', icon: Trash2, label: 'Register Trash Bin' },
            { key: 'vehicle', icon: Truck, label: 'Register Vehicle' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setTab(key as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                tab === key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Form Card ── */}
        <div className='bg-white/90 backdrop-blur-md border border-white rounded-[24px] shadow-xl shadow-slate-200/50 overflow-hidden'>
          {/* Section 01 */}
          <section className='p-6 md:p-8 border-b border-slate-100'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500'>
                01
              </div>
              <h2 className='text-base font-extrabold text-slate-900'>Geospatial Identity</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className={labelClass()}>Region</label>
                <div className='relative'>
                  <select
                    value={region}
                    onChange={(e) => {
                      setRegion(e.target.value)
                      setDistrict(districts[e.target.value]?.[0] ?? '')
                    }}
                    className={`${inputClass()} appearance-none cursor-pointer pr-10`}
                  >
                    {regions.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none'
                  />
                </div>
              </div>
              <div>
                <label className={labelClass()}>District</label>
                <div className='relative'>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className={`${inputClass()} appearance-none cursor-pointer pr-10`}
                  >
                    {(districts[region] ?? []).map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none'
                  />
                </div>
              </div>
            </div>

            <div className='mb-4'>
              <label className={labelClass('mahalla')}>
                Mahalla {errors.mahalla && '— required'}
              </label>
              <div className='relative'>
                <Search
                  size={16}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${errors.mahalla ? 'text-red-400' : 'text-slate-400'}`}
                />
                <input
                  ref={refs.mahalla}
                  type='text'
                  placeholder='Search Mahalla...'
                  value={mahalla}
                  onChange={(e) => {
                    setMahalla(e.target.value)
                    clearError('mahalla')
                  }}
                  className={`${inputClass('mahalla')} pl-10`}
                />
                {errors.mahalla && (
                  <AlertCircle
                    size={16}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-red-500'
                  />
                )}
              </div>
            </div>

            <div>
              <label className={labelClass()}>Map Coordinates</label>
              <div className='flex flex-col sm:flex-row gap-3'>
                <input
                  type='text'
                  value={coords}
                  readOnly
                  className={`${inputClass()} flex-1 font-mono text-xs`}
                />
                <button
                  onClick={() => setShowMapModal(true)}
                  className='flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all whitespace-nowrap'
                >
                  <MapPin size={16} /> Select on Map
                </button>
              </div>
            </div>
          </section>

          {/* Section 02 */}
          <section className='p-6 md:p-8 border-b border-slate-100'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500'>
                02
              </div>
              <h2 className='text-base font-extrabold text-slate-900'>Technical & Monitoring</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className={labelClass('cameraId')}>
                  Camera ID {errors.cameraId && '— required'}
                </label>
                <div className='relative'>
                  <input
                    ref={refs.cameraId}
                    type='text'
                    placeholder='CAM-XXXX-000'
                    value={cameraId}
                    onChange={(e) => {
                      setCameraId(e.target.value)
                      clearError('cameraId')
                    }}
                    className={inputClass('cameraId')}
                  />
                  {errors.cameraId && (
                    <AlertCircle
                      size={16}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-red-500'
                    />
                  )}
                </div>
              </div>
              <div>
                <label className={labelClass('binCount')}>
                  Bin Count {errors.binCount && '— required'}
                </label>
                <div className='relative'>
                  <input
                    ref={refs.binCount}
                    type='number'
                    placeholder='e.g. 4'
                    value={binCount}
                    onChange={(e) => {
                      setBinCount(e.target.value)
                      clearError('binCount')
                    }}
                    className={inputClass('binCount')}
                  />
                  {errors.binCount && (
                    <AlertCircle
                      size={16}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-red-500'
                    />
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Section 03 */}
          <section className='p-6 md:p-8'>
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[11px] font-black text-slate-500'>
                03
              </div>
              <h2 className='text-base font-extrabold text-slate-900'>Personnel Assignment</h2>
            </div>
            <label className={labelClass('vehicles')}>
              Responsible Vehicle(s) {errors.vehicles && '— select at least one'}
            </label>
            <div
              ref={refs.vehicles}
              className={`flex flex-wrap gap-3 items-center p-1 transition-all ${
                errors.vehicles
                  ? 'p-4 border-2 border-dashed border-red-200 bg-red-50/30 rounded-2xl'
                  : ''
              }`}
            >
              {assigned.map((plate) => {
                const v = allVehicles.find((v) => v.plate === plate)!
                return (
                  <div
                    key={plate}
                    className='flex items-center gap-3 p-3 pr-2 rounded-xl border-2 border-blue-600 bg-blue-50/50 min-w-[200px] animate-in zoom-in-95'
                  >
                    <div className='w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600'>
                      <Truck size={18} />
                    </div>
                    <div className='flex-1'>
                      <div className='text-sm font-bold text-slate-900'>{v.plate}</div>
                      <div className='text-[11px] text-slate-500'>{v.driver}</div>
                    </div>
                    <button
                      onClick={() => setAssigned((prev) => prev.filter((p) => p !== plate))}
                      className='w-7 h-7 rounded-lg hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors'
                    >
                      <X size={14} />
                    </button>
                  </div>
                )
              })}

              <button
                onClick={() => setShowVehicleModal(true)}
                className='flex items-center gap-2 px-6 py-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-bold text-sm hover:border-slate-300 hover:bg-slate-50 transition-all min-w-[200px] justify-center'
              >
                <Plus size={18} /> Assign Vehicle
              </button>
            </div>
          </section>
        </div>

        {/* ── Footer Actions ── */}
        <div className='flex flex-col sm:flex-row justify-end items-center gap-4 mt-2'>
          <button
            onClick={() => router.push('/trash-bins')}
            className='w-full sm:w-auto px-8 py-3 rounded-full text-sm font-bold border border-slate-200 text-slate-500 hover:bg-white transition-colors flex items-center justify-center gap-2'
          >
            <X size={16} /> Discard Draft
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className='w-full sm:w-auto px-10 py-3 rounded-full text-sm font-bold bg-blue-600 text-white shadow-xl shadow-blue-200 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2'
          >
            {submitting ? (
              <>
                <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} /> Register Asset
              </>
            )}
          </button>
        </div>
      </main>

      {/* Modals */}
      {showVehicleModal && (
        <AssignVehicleModal
          assigned={assigned}
          onClose={() => setShowVehicleModal(false)}
          onSave={(plates) => {
            setAssigned(plates)
            if (plates.length > 0) clearError('vehicles')
          }}
        />
      )}

      {showMapModal && (
        <MapPickerModal
          coords={coords}
          onClose={() => setShowMapModal(false)}
          onConfirm={(newCoords) => setCoords(newCoords)}
        />
      )}
    </div>
  )
}
