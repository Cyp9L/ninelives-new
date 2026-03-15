'use client';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function FilteredSpeedInsights() {
  return (
    <SpeedInsights
      beforeSend={(data) => {
        if (data.url.includes('/admin')) return null;
        return data;
      }}
    />
  );
}