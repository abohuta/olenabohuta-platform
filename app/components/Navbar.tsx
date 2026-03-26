"use client";
import { useState, useEffect } from "react";

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
      <a href="/" className="no-underline group" aria-label="Олена Богута — на головну">
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
</a>

      {/* Десктоп меню */}
      <div className="hidden md:flex gap-8">
        <a href="/navchannya" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors animated-link">Навчання</a>
        <a href="/pro-olenku" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors animated-link">Про автора</a>
        <a href="/zakrytyi-klub" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors animated-link">Закритий Клуб</a>
        <a href="/blog" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors animated-link">Блог</a>
        <a href="/#contact" className="text-xs tracking-widest uppercase text-[var(--accent)] no-underline border-b border-[var(--accent)]">Контакти</a>
      </div>

      {/* Мобільна кнопка */}
      <button
        className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`block w-6 h-0.5 bg-[var(--dark)] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
        <span className={`block w-6 h-0.5 bg-[var(--dark)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
        <span className={`block w-6 h-0.5 bg-[var(--dark)] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
      </button>

      {/* Мобільне меню */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--warm-white)] border-b border-[rgba(196,180,154,0.2)] flex flex-col px-6 py-6 gap-4 md:hidden shadow-lg">
          <a href="/navchannya" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Навчання</a>
          <a href="/pro-olenku" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Про автора</a>
          <a href="/zakrytyi-klub" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Закритий Клуб</a>
          <a href="/blog" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Блог</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[var(--accent)] no-underline border-b border-[var(--accent)] self-start">Контакти</a>
        </div>
      )}
    </nav>
  );
}