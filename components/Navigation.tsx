'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo-nine-lives-paris.png" 
              alt="Nine Lives Paris" 
              width={180} 
              height={60} 
              className="h-14 w-auto" 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition py-2">
              Accueil
            </Link>
            <Link href="/actions" className="text-gray-700 hover:text-blue-600 transition py-2">
              Nos actions
            </Link>
            
            {/* Adopter Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition py-2">
                Je veux adopter ▾
              </button>
              <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white border border-gray-200 shadow-lg rounded-lg mt-0 py-2 w-48">
                <Link href="/adopter" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Tous nos chats
                </Link>
                <Link href="/adopter#adultes" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Nos adultes
                </Link>
                <Link href="/adopter#chatons" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Nos chatons
                </Link>
              </div>
            </div>

            {/* Aider Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 transition py-2">
                Je veux aider ▾
              </button>
              <div className="absolute left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 bg-white border border-gray-200 shadow-lg rounded-lg mt-0 py-2 w-56">
                <Link href="/donner" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Faire un don
                </Link>
                <Link href="/benevole" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Devenir Bénévole
                </Link>
                <Link href="/aider-autrement" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                  Nous aider autrement
                </Link>
              </div>
            </div>

            <Link href="/abandon" className="text-gray-700 hover:text-blue-600 transition py-2">
              J'ai besoin d'aide
            </Link>
            <Link href="/conseils" className="text-gray-700 hover:text-blue-600 transition py-2">
              Nos conseils
            </Link>
            <Link href="/partenaires" className="text-gray-700 hover:text-blue-600 transition py-2">
              Nos partenaires
            </Link>
            <Link href="/medias" className="text-gray-700 hover:text-blue-600 transition py-2">
              Nos apparitions
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition py-2">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-2xl text-gray-700 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 space-y-1 border-t border-gray-200 pt-4">
            <Link href="/" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 rounded">
              Accueil
            </Link>
            <Link href="/actions" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 rounded">
              Nos actions
            </Link>
            <Link href="/adopter" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 rounded">
              Je veux adopter
            </Link>
            <Link href="/donner" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 rounded">
              Faire un don
            </Link>
            <Link href="/benevole" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 rounded">
              Devenir Bénévole
            </Link>
            <Link href="/abandon" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 rounded">
              J'ai besoin d'aide
            </Link>
            <Link href="/conseils" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 rounded">
              Nos conseils
            </Link>
            <Link href="/partenaires" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 rounded">
              Nos partenaires
            </Link>
            <Link href="/medias" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 rounded">
              Nos apparitions
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-2 rounded">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}