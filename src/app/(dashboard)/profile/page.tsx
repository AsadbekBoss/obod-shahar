'use client'

import { User, Mail, MapPin, Phone, Calendar, Building2 } from 'lucide-react'

const adminData = {
  name: 'Alisher Usmanov',
  role: 'SUPER ADMIN',
  email: 'a.usmanov@obodshahar.uz',
  phone: '+998 90 123 45 67',
  location: 'Tashkent, Uzbekistan',
  joined: 'March 2024',
  department: 'Infrastructure & Urban Planning',
  status: 'Active',
}

export default function ProfileCard() {
  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(160deg, #163e82, #0d2a5a)',
    borderRadius: '32px',
    padding: '40px',
    color: 'white',
    width: '90%', // Mobil uchun biroz chetda joy qoldiramiz
    maxWidth: '560px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    overflow: 'hidden',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: '8px',
  }

  const valueStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    // Matn sig'may qolsa pastga tushishi yoki qisqarishi uchun:
    wordBreak: 'break-word',
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div style={cardStyle}>
        <Building2
          size={240}
          style={{
            position: 'absolute',
            bottom: '-60px',
            right: '-40px',
            color: 'rgba(255, 255, 255, 0.03)',
            transform: 'rotate(-10deg)',
            pointerEvents: 'none',
          }}
        />

        {/* Profile Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              flexShrink: 0,
            }}
          >
            <User size={38} color='white' strokeWidth={1.2} />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2
                style={{
                  fontSize: '24px',
                  // marginBottom: '28px',
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: '-0.5px',
                }}
              >
                {adminData.name}
              </h2>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: '2px solid #4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '4px',
                    height: '4px',
                    background: '#4ade80',
                    borderRadius: '50%',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#4ade80',
                letterSpacing: '1px',
                marginTop: '4px',
              }}
            >
              {adminData.role}
            </div>
          </div>
        </div>

        {/* Information Grid - MUAMMO SHU YERDA EDI */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '24px 32px',
          }}
        >
          {/* Department - Har doim to'liq qatorni egallaydi */}
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={labelStyle}>Organization & Department</div>
            <div style={{ ...valueStyle, fontSize: '17px', fontWeight: 700 }}>
              {adminData.department}
            </div>
          </div>

          {/* Email */}
          <div style={{ minWidth: 0 }}>
            {' '}
            {/* minWidth: 0 grid ichida overflow'ni oldini oladi */}
            <div style={labelStyle}>Email</div>
            <div style={valueStyle}>
              <Mail size={14} color='rgba(255,255,255,0.5)' style={{ flexShrink: 0 }} />
              <span
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                }}
              >
                {adminData.email}
              </span>
            </div>
          </div>

          {/* Phone */}
          <div>
            <div style={labelStyle}>Phone</div>
            <div style={valueStyle}>
              <Phone size={14} color='rgba(255,255,255,0.5)' style={{ flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap' }}>{adminData.phone}</span>
            </div>
          </div>

          {/* Location */}
          <div>
            <div style={labelStyle}>Location</div>
            <div style={valueStyle}>
              <MapPin size={14} color='rgba(255,255,255,0.5)' style={{ flexShrink: 0 }} />
              {adminData.location}
            </div>
          </div>

          {/* Joined Date */}
          <div>
            <div style={labelStyle}>Joined Date</div>
            <div style={valueStyle}>
              <Calendar size={14} color='rgba(255,255,255,0.5)' style={{ flexShrink: 0 }} />
              {adminData.joined}
            </div>
          </div>
        </div>

        {/* Footer Status Bar */}
        <div
          style={{
            marginTop: '40px',
            padding: '16px 20px',
            borderRadius: '18px',
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '1px',
            }}
          >
            SYSTEM ACCESS
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#4ade80',
            }}
          >
            <div
              style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }}
            />
            {adminData.status}
          </div>
        </div>
      </div>
    </div>
  )
}
