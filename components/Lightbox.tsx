'use client';
import { useState, useEffect, useCallback } from 'react';

export default function Lightbox() {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const img = target.closest('img');
      if (!img) return;
      if (img.naturalWidth < 100 || img.naturalHeight < 100) return;
      if (img.closest('[data-no-lightbox]')) return;
      
      e.preventDefault();
      e.stopPropagation();
      setSrc(img.src);
      setAlt(img.alt || '');
      setIsOpen(true);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div
      onClick={close}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'zoom-out',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', cursor: 'default' }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: '95vw',
            maxHeight: '90vh',
            objectFit: 'contain',
            borderRadius: '4px',
            userSelect: 'none',
            WebkitUserDrag: 'none',
          } as React.CSSProperties}
        />
        {/* Watermark */}
        <img
          src="/images/logo-nine-lives-paris.svg"
          alt=""
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            width: '120px',
            opacity: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </div>

      <button
        onClick={close}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1.5rem',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '2.5rem',
          cursor: 'pointer',
          lineHeight: 1,
        }}
        aria-label="Fermer"
      >
        ✕
      </button>
    </div>
  );
}