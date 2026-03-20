'use client';

import dynamic from 'next/dynamic';

type Cat = {
  id: string;
  name: string;
  slug: string;
  images: string[];
};

const AdoptionForm = dynamic(() => import('@/components/AdoptionForm'), {
  ssr: false,
  loading: () => (
    <div role="status" aria-live="polite" style={{ padding: '1rem' }}>
      Chargement du formulaire...
    </div>
  ),
});

export default function AdoptionFormDynamic({ cats }: { cats: Cat[] }) {
  return <AdoptionForm cats={cats} />;
}

