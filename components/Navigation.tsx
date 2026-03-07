'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAssoOpen, setMobileAssoOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const close = () => {
    setMobileOpen(false);
    setMobileAssoOpen(false);
    setDropdownOpen(false);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const assoLinks = [
    { href: '/actions', label: 'Nos actions' },
    { href: '/partenaires', label: 'Partenaires' },
    { href: '/galerie', label: 'Galerie' },
    {
      href: 'https://www.helloasso.com/associations/nine-lives-paris/boutiques/boutique-nine-lives-paris',
      label: 'Boutique ↗',
      external: true,
    },
  ];

  const isAssoActive = assoLinks.some((l) => isActive(l.href));

  return (
    <nav className="nav">
      <div className="nav-inner">
        {/* Logo */}
        <Link href="/" onClick={close} className="nav-logo" data-no-lightbox>
          <Image
            src="/images/site/logo-nine-lives-paris.svg"
            alt="Nine Lives Paris"
            width={140}
            height={45}
          />
        </Link>

        {/* Desktop */}
        <div className="nav-desktop">
          <Link
            href="/adopter"
            className={`nav-link ${isActive('/adopter') ? 'active' : ''}`}
          >
            Je veux adopter
          </Link>

          <Link
            href="/benevole"
            className={`nav-link ${isActive('/benevole') ? 'active' : ''}`}
          >
            Je veux aider
          </Link>

          <Link
            href="/abandon/solutions"
            className={`nav-link ${isActive('/abandon') ? 'active' : ''}`}
          >
            J&apos;ai besoin d&apos;aide
          </Link>

          <div className="nav-dropdown">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`nav-link ${isAssoActive ? 'active' : ''}`}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              style={{
                background: 'none',
                lineHeight: 'inherit',
                border: 'none',
                font: 'inherit',
                cursor: 'pointer',
                padding: 0,
                whiteSpace: 'nowrap',
              }}
            >
              L&apos;association {dropdownOpen ? '▴' : '▾'}
            </button>
            <div
              className="nav-dropdown-menu"
              style={{ display: dropdownOpen ? 'block' : 'none' }}
            >
              {assoLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>

          <Link
            href="/contact"
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            Contact
          </Link>

          <Link href="/donner" className="nav-cta">
            ♥ Faire un don
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-toggle"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu — always rendered, toggled with CSS */}
      <div className="nav-mobile" style={{ display: mobileOpen ? undefined : 'none' }}>
        <Link
          href="/adopter"
          onClick={close}
          className={`nav-mobile-link ${isActive('/adopter') ? 'active' : ''}`}
        >
          Je veux adopter
        </Link>

        <Link
          href="/benevole"
          onClick={close}
          className={`nav-mobile-link ${isActive('/benevole') ? 'active' : ''}`}
        >
          Je veux aider
        </Link>

        <Link
          href="/abandon/solutions"
          onClick={close}
          className={`nav-mobile-link ${isActive('/abandon') ? 'active' : ''}`}
        >
          J&apos;ai besoin d&apos;aide
        </Link>

        <button
          onClick={() => setMobileAssoOpen(!mobileAssoOpen)}
          className={`nav-mobile-link ${isAssoActive ? 'active' : ''}`}
          aria-expanded={mobileAssoOpen}
          aria-haspopup="true"
          style={{
            width: '100%',
            textAlign: 'left',
            background: 'none',
            border: 'none',
            font: 'inherit',
          }}
        >
          L&apos;association {mobileAssoOpen ? '▴' : '▾'}
        </button>
        <div
          className="nav-mobile-sub"
          style={{ display: mobileAssoOpen ? undefined : 'none' }}
        >
          {assoLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} onClick={close}>
                {link.label}
              </Link>
            )
          )}
        </div>

        <Link
          href="/contact"
          onClick={close}
          className={`nav-mobile-link ${isActive('/contact') ? 'active' : ''}`}
        >
          Contact
        </Link>

        <Link
          href="/donner"
          onClick={close}
          className="nav-mobile-link"
          style={{ color: '#667eea', fontWeight: '600' }}
        >
          ♥ Faire un don
        </Link>
      </div>
    </nav>
  );
}