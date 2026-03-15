'use client';
import { useState, useEffect, useCallback } from 'react';

export default function Lightbox() {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Listen for explicit lightbox open events (instead of all clicks)
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setSrc(detail.src);
      setAlt(detail.alt || '');
      setIsOpen(true);
    };

    window.addEventListener('open-lightbox', handleOpen);
    return () => window.removeEventListener('open-lightbox', handleOpen);
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
          src="/images/site/logo-nine-lives-paris.svg"
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