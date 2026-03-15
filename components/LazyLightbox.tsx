'use client';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

export default function LazyLightbox() {
  return <Lightbox />;
}