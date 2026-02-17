'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setMobileOpen(false);

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/actions', label: 'Nos actions' },
    { href: '/adopter', label: 'Je veux adopter' },
    { href: '/benevole', label: 'Je veux aider' },
    { href: '/abandon', label: "J'ai besoin d'aide" },
    { href: '/donner', label: 'Faire un don' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

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
        <Link href="/" onClick={close} data-no-lightbox>
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
          gap: '1.75rem',
          alignItems: 'center'
        }} className="desktop-menu">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: isActive(link.href) ? '#667eea' : '#374151',
                fontWeight: isActive(link.href) ? '600' : '500',
                fontSize: '0.95rem',
                textDecoration: 'none',
                borderBottom: isActive(link.href) ? '2px solid #667eea' : '2px solid transparent',
                paddingBottom: '2px',
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          className="mobile-toggle"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          padding: '0.5rem 0',
          borderTop: '1px solid #e5e7eb',
          background: 'white',
        }} className="mobile-menu-content">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              style={{
                display: 'block',
                padding: '0.85rem 2rem',
                color: isActive(link.href) ? '#667eea' : '#374151',
                fontWeight: isActive(link.href) ? '600' : '400',
                borderLeft: isActive(link.href) ? '3px solid #667eea' : '3px solid transparent',
                textDecoration: 'none',
                fontSize: '1.05rem',
              }}
            >
              {link.label}
            </Link>
          ))}
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
