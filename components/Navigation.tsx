'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo-nine-lives-paris.png" alt="Nine Lives Paris" width={150} height={48} className="h-12 w-auto" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-blue-400 transition">Accueil</Link>
            <Link href="/actions" className="hover:text-blue-400 transition">Nos actions</Link>
            
            {/* Adopter Dropdown */}
            <div className="relative group">
              <button className="hover:text-blue-400 transition">Je veux adopter ▾</button>
              <div className="absolute hidden group-hover:block bg-white text-gray-900 shadow-lg rounded mt-2 py-2 w-48">
                <Link href="/adopter" className="block px-4 py-2 hover:bg-gray-100">Tous nos chats</Link>
                <Link href="/adopter#adultes" className="block px-4 py-2 hover:bg-gray-100">Nos adultes</Link>
                <Link href="/adopter#chatons" className="block px-4 py-2 hover:bg-gray-100">Nos chatons</Link>
              </div>
            </div>

            {/* Aider Dropdown */}
            <div className="relative group">
              <button className="hover:text-blue-400 transition">Je veux aider ▾</button>
              <div className="absolute hidden group-hover:block bg-white text-gray-900 shadow-lg rounded mt-2 py-2 w-48">
                <Link href="/donner" className="block px-4 py-2 hover:bg-gray-100">Faire un don</Link>
                <Link href="/benevole" className="block px-4 py-2 hover:bg-gray-100">Devenir Bénévole</Link>
                <Link href="/aider-autrement" className="block px-4 py-2 hover:bg-gray-100">Nous aider autrement</Link>
              </div>
            </div>

            <Link href="/abandon" className="hover:text-blue-400 transition">J'ai besoin d'aide</Link>
            <Link href="/conseils" className="hover:text-blue-400 transition">Nos conseils</Link>
            <Link href="/partenaires" className="hover:text-blue-400 transition">Nos partenaires</Link>
            <Link href="/medias" className="hover:text-blue-400 transition">Nos apparitions</Link>
            <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t border-gray-700 pt-4">
            <Link href="/" className="block py-2 hover:text-blue-400 transition">Accueil</Link>
            <Link href="/actions" className="block py-2 hover:text-blue-400 transition">Nos actions</Link>
            <Link href="/adopter" className="block py-2 hover:text-blue-400 transition">Je veux adopter</Link>
            <Link href="/donner" className="block py-2 hover:text-blue-400 transition">Faire un don</Link>
            <Link href="/benevole" className="block py-2 hover:text-blue-400 transition">Devenir Bénévole</Link>
            <Link href="/abandon" className="block py-2 hover:text-blue-400 transition">J'ai besoin d'aide</Link>
            <Link href="/conseils" className="block py-2 hover:text-blue-400 transition">Nos conseils</Link>
            <Link href="/partenaires" className="block py-2 hover:text-blue-400 transition">Nos partenaires</Link>
            <Link href="/medias" className="block py-2 hover:text-blue-400 transition">Nos apparitions</Link>
            <Link href="/contact" className="block py-2 hover:text-blue-400 transition">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}