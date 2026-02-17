'use client';
import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    turnstile: any;
    onTurnstileLoad: () => void;
  }
}

export default function Captcha({ onVerify }: { onVerify: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    if (containerRef.current && window.turnstile && widgetIdRef.current === null) {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        callback: (token: string) => onVerify(token),
        'expired-callback': () => onVerify(''),
      });
    }
  }, [onVerify]);

  useEffect(() => {
    if (window.turnstile) {
      renderWidget();
      return;
    }

    if (!document.getElementById('cf-turnstile-script')) {
      window.onTurnstileLoad = renderWidget;
      const script = document.createElement('script');
      script.id = 'cf-turnstile-script';
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
      script.async = true;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [renderWidget]);

  return <div ref={containerRef} style={{ marginTop: '0.5rem' }} />;
}
