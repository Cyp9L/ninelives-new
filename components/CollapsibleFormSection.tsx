'use client';

import { useState, useEffect } from 'react';

interface CollapsibleFormSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  children: React.ReactNode;
  containerClass?: string;
}

export default function CollapsibleFormSection({
  id,
  title,
  subtitle,
  buttonLabel = 'Remplir le formulaire',
  children,
  containerClass = 'container-narrow',
}: CollapsibleFormSectionProps) {
  const [showForm, setShowForm] = useState(false);

  // Auto-open if URL hash matches the section id (e.g. /adopter#formulaire)
  useEffect(() => {
    if (id && window.location.hash === `#${id}`) {
      setShowForm(true);
    }
  }, [id]);

  return (
    <section id={id} className="section section-gray">
      <div className={containerClass}>
        <h2 className="text-center">{title}</h2>
        {subtitle && (
          <p className="text-center text-muted mb-xl">{subtitle}</p>
        )}

        {!showForm ? (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="btn btn-gradient btn-lg"
            >
              {buttonLabel}
            </button>
          </div>
        ) : (
          <div className="form-container">{children}</div>
        )}
      </div>
    </section>
  );
}