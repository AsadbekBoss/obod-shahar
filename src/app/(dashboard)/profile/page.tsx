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
    width: '100%',
    maxWidth: '520px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'inherit',
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
  }

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={cardStyle} className="mt-24">
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '45px' }}>
          <div
            style={{
              width: '85px',
              height: '85px',
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <User size={40} color='white' strokeWidth={1.2} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
                {adminData.name}
              </h2>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '1.5px solid #4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    background: '#4ade80',
                    borderRadius: '50%',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#4ade80',
                letterSpacing: '0.5px',
                marginTop: '4px',
              }}
            >
              {adminData.role}
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={labelStyle}>Organization & Department</div>
            <div style={{ ...valueStyle, fontSize: '18px', fontWeight: 700 }}>
              {adminData.department}
            </div>
          </div>

          <div>
            <div style={labelStyle}>Email</div>
            <div style={valueStyle}>
              <Mail size={14} color='rgba(255,255,255,0.5)' />
              <span style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                {adminData.email}
              </span>
            </div>
          </div>

          <div>
            <div style={labelStyle}>Phone</div>
            <div style={valueStyle}>
              <Phone size={14} color='rgba(255,255,255,0.5)' /> {adminData.phone}
            </div>
          </div>

          <div>
            <div style={labelStyle}>Location</div>
            <div style={valueStyle}>
              <MapPin size={14} color='rgba(255,255,255,0.5)' /> {adminData.location}
            </div>
          </div>

          <div>
            <div style={labelStyle}>Joined Date</div>
            <div style={valueStyle}>
              <Calendar size={14} color='rgba(255,255,255,0.5)' /> {adminData.joined}
            </div>
          </div>
        </div>

        {/* Footer Status Bar */}
        <div
          style={{
            marginTop: '45px',
            padding: '18px 24px',
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
              fontSize: '11px',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.4)',
              letterSpacing: '1px',
            }}
          >
            SYSTEM ACCESS STATUS
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
