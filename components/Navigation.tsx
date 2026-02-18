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
    { href: '/partenaires', label: 'Partenaires' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" onClick={close} className="nav-logo" data-no-lightbox>
          <Image src="/logo-nine-lives-paris.png" alt="Nine Lives Paris" width={140} height={45} />
        </Link>

        {/* Desktop */}
        <div className="nav-desktop">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="nav-toggle"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="nav-mobile">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={close}
              className={`nav-mobile-link ${isActive(link.href) ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}