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
  const [visible, setVisible] = useState(false);
  const [preloaded, setPreloaded] = useState(false);

  // Auto-open if URL hash matches the section id (e.g. /adopter#formulaire)
  useEffect(() => {
    if (id && window.location.hash === `#${id}`) {
      setVisible(true);
      setPreloaded(true);
    }
  }, [id]);

  // Pre-mount the form in the background during browser idle time.
  // This way the heavy form DOM is already built when the user clicks.
  useEffect(() => {
    if (preloaded) return;

    let cancelled = false;

    const doPreload = () => {
      if (!cancelled) setPreloaded(true);
    };

    // requestIdleCallback = mount form when browser is idle (Chrome, Edge, Firefox)
    // setTimeout fallback for Safari which doesn't support rIC
    const handle =
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(doPreload, { timeout: 3000 })
        : setTimeout(doPreload, 300);

    return () => {
      cancelled = true;
      if (typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(handle as number);
      } else {
        clearTimeout(handle as ReturnType<typeof setTimeout>);
      }
    };
  }, [preloaded]);

  const handleOpen = () => {
    setVisible(true);
    // If the user clicks before idle callback fired, force-mount now
    if (!preloaded) setPreloaded(true);
  };

  return (
    <section id={id} className="section section-gray">
      <div className={containerClass}>
        <h2 className="text-center">{title}</h2>
        {subtitle && (
          <p className="text-center text-muted mb-xl">{subtitle}</p>
        )}

        {/* Button — hidden once form is visible */}
        {!visible && (
          <div className="text-center">
            <button
              onClick={handleOpen}
              className="btn btn-gradient btn-lg"
            >
              {buttonLabel}
            </button>
          </div>
        )}

        {/* Form — pre-rendered but hidden until user clicks */}
        {preloaded && (
          <div
            className="form-container"
            style={visible ? undefined : { display: 'none' }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}