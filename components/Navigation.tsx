'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
      }}>
        {/* Logo */}
        <Link href="/">
          <Image 
            src="/logo-nine-lives-paris.png" 
            alt="Nine Lives Paris" 
            width={140} 
            height={45}
            style={{ height: '45px', width: 'auto' }}
          />
        </Link>

        {/* Desktop Menu */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          alignItems: 'center'
        }} className="desktop-menu">
          <Link href="/" style={{ color: '#374151', fontWeight: '500', fontSize: '0.95rem' }}>Accueil</Link>
          <Link href="/actions" style={{ color: '#374151', fontWeight: '500', fontSize: '0.95rem' }}>Nos actions</Link>
          <Link href="/adopter" style={{ color: '#374151', fontWeight: '500', fontSize: '0.95rem' }}>Je veux adopter</Link>
          <Link href="/donner" style={{ color: '#374151', fontWeight: '500', fontSize: '0.95rem' }}>Je veux aider</Link>
          <Link href="/abandon" style={{ color: '#374151', fontWeight: '500', fontSize: '0.95rem' }}>J'ai besoin d'aide</Link>
          <Link href="/contact" style={{ color: '#374151', fontWeight: '500', fontSize: '0.95rem' }}>Contact</Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
          className="mobile-toggle"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ padding: '1rem 0', borderTop: '1px solid #e5e7eb' }} className="mobile-menu-content">
          <Link href="/" style={{ display: 'block', padding: '0.75rem 2rem', color: '#374151' }}>Accueil</Link>
          <Link href="/actions" style={{ display: 'block', padding: '0.75rem 2rem', color: '#374151' }}>Nos actions</Link>
          <Link href="/adopter" style={{ display: 'block', padding: '0.75rem 2rem', color: '#374151' }}>Je veux adopter</Link>
          <Link href="/donner" style={{ display: 'block', padding: '0.75rem 2rem', color: '#374151' }}>Je veux aider</Link>
          <Link href="/abandon" style={{ display: 'block', padding: '0.75rem 2rem', color: '#374151' }}>J'ai besoin d'aide</Link>
          <Link href="/contact" style={{ display: 'block', padding: '0.75rem 2rem', color: '#374151' }}>Contact</Link>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 1024px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}