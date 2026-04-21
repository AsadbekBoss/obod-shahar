'use client'

import Link from 'next/link'
import { ArrowLeft, Home, Search, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'var(--color-surface-container-lowest)', // Matching your body background
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          background: 'linear-gradient(160deg, var(--color-sidebar-from), var(--color-sidebar-to))',
          borderRadius: '32px', // Slightly more rounded for the focal card
          padding: '60px 40px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative Background Icon */}
        <AlertCircle
          size={200}
          style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            color: 'rgba(255,255,255,0.03)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '22px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <Search size={40} color='white' strokeWidth={1.5} />
          </div>

          <h1
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: '#fff',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-2px',
            }}
          >
            404
          </h1>

          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#fff',
              marginTop: '12px',
              marginBottom: '16px',
            }}
          >
            Page Not Found
          </h2>

          <p
            style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: '1.6',
              marginBottom: '40px',
              fontWeight: 400,
            }}
          >
            The infrastructure route you are looking for doesn&apos;t exist or has been moved to a
            new sector.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <Link
              href='/dashboard'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px 24px',
                borderRadius: '14px',
                background: 'var(--color-sidebar-active-bg)',
                color: 'var(--color-sidebar-text-active)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '14px',
                transition: 'transform 0.2s ease',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Home size={18} />
              Return to Dashboard
            </Link>

            <button
              onClick={() => window.history.back()}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '14px 24px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>

        {/* Footer Branding */}
        <div
          style={{
            marginTop: '40px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Obod Shahar
        </div>
      </div>
    </main>
  )
}
