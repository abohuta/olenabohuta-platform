"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-16 flex justify-between items-center backdrop-blur-md border-b border-[rgba(196,180,154,0.2)] transition-all duration-500 ${scrolled ? 'py-3 bg-[rgba(253,251,248,0.98)] shadow-sm' : 'py-5 bg-[rgba(253,251,248,0.85)]'}`}>
      <Link href="/" className="no-underline group" aria-label="Олена Богута — на головну" style={{ color: 'var(--dark)' }}>
        <svg width="260" height="32" viewBox="0 0 220 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text
            x="110"
            y="20"
            textAnchor="middle"
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize="14"
            fontWeight="200"
            fill="currentColor"
            letterSpacing="8"
            style={{ transition: 'fill 0.3s ease' }}
          >
            ОЛЕНА БОГУТА
          </text>
          <line
            x1="0" y1="26"
            x2="220" y2="26"
            stroke="currentColor"
            strokeWidth="0.4"
            opacity="0.3"
            style={{ transition: 'opacity 0.3s ease' }}
          />
        </svg>
      </Link>

      {/* Десктоп меню */}
      <div className="hidden md:flex gap-8">
        <Link href="/navchannya" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors animated-link">Навчання</Link>
        <Link href="/pro-olenku" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors animated-link">Про автора</Link>
        <Link href="/zakrytyi-klub" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors animated-link">Закритий Клуб</Link>
        <Link href="/blog" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors animated-link">Блог</Link>
        <Link href="/#contact" className="text-xs tracking-widest uppercase text-[var(--accent)] no-underline border-b border-[var(--accent)]">Контакти</Link>
      </div>

      {/* Мобільна кнопка */}
      <button
        className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
        aria-label={menuOpen ? 'Закрити меню' : 'Відкрити меню'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`block w-6 h-0.5 bg-[var(--dark)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
        <span className={`block w-6 h-0.5 bg-[var(--dark)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
        <span className={`block w-6 h-0.5 bg-[var(--dark)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
      </button>

      {/* Мобільне меню */}
      {menuOpen && (
        <div className="mobile-menu-enter absolute top-full left-0 right-0 bg-[var(--warm-white)] border-b border-[rgba(196,180,154,0.2)] flex flex-col px-6 py-4 md:hidden shadow-lg">
          <Link href="/navchannya" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors py-3 border-b border-[rgba(196,180,154,0.15)]">Навчання</Link>
          <Link href="/pro-olenku" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors py-3 border-b border-[rgba(196,180,154,0.15)]">Про автора</Link>
          <Link href="/zakrytyi-klub" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors py-3 border-b border-[rgba(196,180,154,0.15)]">Закритий Клуб</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors py-3 border-b border-[rgba(196,180,154,0.15)]">Блог</Link>
          <Link href="/#contact" onClick={() => setMenuOpen(false)} className="text-sm tracking-widest uppercase text-[var(--accent-text)] no-underline py-3 self-start">Контакти</Link>
        </div>
      )}
    </nav>
  );
}
