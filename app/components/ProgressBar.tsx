"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const COLORS: Record<string, string> = {
  '/products/tysha': '#748fa4',
  '/products/kemp': '#59020B',
  '/products/konsultatsii': '#B8936A',
  '/blog': '#B8936A',
  '/navchannya': '#B8936A',
  '/pro-olenku': '#B8936A',
  '/zakrytyi-klub': '#B8936A',
};

export default function ProgressBar() {
  const [width, setWidth] = useState(0);
  const pathname = usePathname();

  const color = COLORS[pathname] || 'var(--accent)';

  useEffect(() => {
    setWidth(0);
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(scrolled);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${width}%`,
        background: color,
        zIndex: 9999,
        transition: 'width 0.1s linear',
        pointerEvents: 'none',
      }}
    />
  );
}