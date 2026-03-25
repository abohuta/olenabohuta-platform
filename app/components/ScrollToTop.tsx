"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const TYSHA_PATH = '/products/tysha';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const pathname = usePathname();
  const isTysha = pathname === TYSHA_PATH;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight;
      const winHeight = window.innerHeight;
      setVisible(scrollY > 400);
      setCtaVisible(scrollY > 600 && scrollY < docHeight - winHeight - 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // На мобільному на сторінці Тиші — піднімаємо стрілку вище CTA
  const bottomClass = isTysha && ctaVisible
    ? 'bottom-20 md:bottom-8'
    : 'bottom-8';

  return (
    <button
      onClick={scrollToTop}
      aria-label="Повернутись догори"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
      }}
      className={`fixed ${bottomClass} right-8 z-50 w-12 h-12 bg-[var(--dark)] text-[var(--cream)] flex items-center justify-center transition-all duration-500 hover:bg-[var(--accent)] border border-[rgba(184,147,106,0.3)] shadow-lg`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  );
}