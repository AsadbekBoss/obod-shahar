"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import s from "./page.module.css";
import { useRouter } from 'next/navigation'

/* ── Types ──────────────────────────────────────── */
interface Toast {
  id: number;
  type: "success" | "error" | "info";
  title: string;
  desc?: string;
}

/* ── Carousel data ───────────────────────────────── */
const slides = [
  {
    bg: "linear-gradient(145deg, #0d1b3e 0%, #132b6b 55%, #0a1e4a 100%)",
    accent: "rgba(37,99,235,0.35)",
    title: "Aqlli shahar, toza kelajak",
    sub: "Samarqand viloyati chiqindilari real vaqtda nazorat qilinadi",
  },
  {
    bg: "linear-gradient(145deg, #0a2318 0%, #0f3d26 55%, #082015 100%)",
    accent: "rgba(34,197,94,0.30)",
    title: "Ekologik monitoring tizimi",
    sub: "Har bir mahalla, har bir konteyner — doimiy nazoratda",
  },
  {
    bg: "linear-gradient(145deg, #1a0a2e 0%, #2d1260 55%, #150827 100%)",
    accent: "rgba(139,92,246,0.30)",
    title: "Ma'lumotga asoslangan boshqaruv",
    sub: "Analitika va statistika yordamida qarorlar qabul qiling",
  },
];

const toastIcons: Record<Toast["type"], string> = {
  success: "ri-checkbox-circle-fill",
  error:   "ri-error-warning-fill",
  info:    "ri-information-fill",
};

/* ── Component ───────────────────────────────────── */
export default function LoginPage() {
  const [slide, setSlide]             = useState(0);
  const [username, setUsername]       = useState("");
  const [password, setPassword]       = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [remember, setRemember]       = useState(false);
  const [loading, setLoading]         = useState(false);
  const [toasts, setToasts]           = useState<Toast[]>([]);
  const toastIdRef = useRef(0);

  const router = useRouter()

  const handleSubmit = async () => {
    if (!username.trim()) {
      addToast('error', "Maydon bo'sh", 'Foydalanuvchi nomini kiriting')
      return
    }
    if (!password) {
      addToast('error', "Maydon bo'sh", 'Parolni kiriting')
      return
    }

    setLoading(true)

    // API so'rovini simulyatsiya qilish
    await new Promise((r) => setTimeout(r, 1600))

    setLoading(false)

    // Muvaffaqiyatli xabar ko'rsatish
    addToast('success', 'Muvaffaqiyatli kirish', 'Tizimga xush kelibsiz!')

    // 3. Bir zumda dashboardga o'tkazish
    // Agar toast ko'rinishini kutmoqchi bo'lsangiz, setTimeout ichiga olishingiz mumkin
    setTimeout(() => {
      router.push('/dashboard')
    }, 500)
  }

  /* auto-advance carousel */
  useEffect(() => {
    const id = setInterval(() => setSlide(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  /* toast helper */
  const addToast = (type: Toast["type"], title: string, desc?: string) => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, type, title, desc }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  };

  const removeToast = (id: number) =>
    setToasts(prev => prev.filter(t => t.id !== id));

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className={s.root}>
      {/* ── Card ── */}
      <div className={s.card}>

        {/* ════ LEFT / HERO ════ */}
        <div className={s.hero}>
          {slides.map((sl, i) => (
            <div
              key={i}
              className={`${s.slide} ${i === slide ? s.slideActive : ""}`}
              style={{ background: sl.bg }}
            >
              {/* decorative blob */}
              <div className={s.slideDecor} style={{
                background: `radial-gradient(circle at 80% 20%, ${sl.accent} 0%, transparent 60%)`,
                position: "absolute", inset: 0,
              }} />
              <div className={s.slideOverlay} />

              {/* caption */}
              <div className={s.slideCaption}>
                <p className={s.slideCaptionTitle}>{sl.title}</p>
                <p className={s.slideCaptionSub}>{sl.sub}</p>
              </div>
            </div>
          ))}

          {/* brand top-left */}
          <div className={s.brand}>
            <div className={s.brandIcon}>
              <i className="ri-leaf-line" />
            </div>
            <div>
              <div className={s.brandName}>OBOD SHAHAR</div>
              <div className={s.brandSub}>Infrastructure Authority</div>
            </div>
          </div>

          {/* dot indicators */}
          <div className={s.dots}>
            {slides.map((_, i) => (
              <button
                key={i}
                className={`${s.dot} ${i === slide ? s.dotActive : ""}`}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </div>

        {/* ════ RIGHT / FORM ════ */}
        <div className={s.form}>
          {/* logo */}
          <div className={s.formLogo}>
            <div className={s.formLogoIcon}>
              <i className="ri-leaf-line" />
            </div>
            <div>
              <div className={s.formAppName}>EcoBin AI</div>
              <div className={s.formAppSub}>Monitoring tizimi</div>
            </div>
          </div>

          <h1 className={s.formTitle}>Xush kelibsiz</h1>
          <p className={s.formSubtitle}>Hisobingizga kiring va boshqaruvni boshlang</p>

          {/* inputs */}
          <div className={s.fieldGroup}>
            <div className={s.fieldWrap}>
              <i className={`ri-user-3-line ${s.fieldIcon}`} />
              <input
                className={s.input}
                type="text"
                placeholder="Foydalanuvchi nomi"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="username"
              />
            </div>

            <div className={s.fieldWrap}>
              <i className={`ri-lock-2-line ${s.fieldIcon}`} />
              <input
                className={`${s.input} ${s.inputPadRight}`}
                type={showPass ? "text" : "password"}
                placeholder="Parol"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleKey}
                autoComplete="current-password"
              />
              <button
                className={s.eyeBtn}
                type="button"
                onClick={() => setShowPass(v => !v)}
                tabIndex={-1}
              >
                <i className={showPass ? "ri-eye-off-line" : "ri-eye-line"} />
              </button>
            </div>
          </div>

          {/* remember me */}
          <div className={s.row}>
            <label className={s.checkLabel}>
              <input
                type="checkbox"
                className={s.checkbox}
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Eslab qolish
            </label>
          </div>

          {/* submit */}
          <button
            className={s.submitBtn}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={s.spinner} />
                Kirish…
              </>
            ) : (
              <>
                <i className="ri-login-box-line" />
                Tizimga kirish
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Toasts ── */}
      <div className={s.toastWrap}>
        {toasts.map(t => (
          <div
            key={t.id}
            className={`${s.toast} ${
              t.type === "success" ? s.toastSuccess :
              t.type === "error"   ? s.toastError   : s.toastInfo
            }`}
          >
            <i className={`${toastIcons[t.type]} ${s.toastIcon} ${
              t.type === "success" ? s.toastIconSuccess :
              t.type === "error"   ? s.toastIconError   : s.toastIconInfo
            }`} />
            <div className={s.toastBody}>
              <div className={s.toastTitle}>{t.title}</div>
              {t.desc && <div className={s.toastDesc}>{t.desc}</div>}
            </div>
            <button className={s.toastClose} onClick={() => removeToast(t.id)}>
              <i className="ri-close-line" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
