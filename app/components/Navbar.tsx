"use client";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4 flex justify-between items-center bg-[rgba(253,251,248,0.94)] backdrop-blur-md border-b border-[rgba(196,180,154,0.2)]">
      <a href="/" className="text-lg tracking-widest uppercase text-[var(--dark)] no-underline">
        Олена Богута
      </a>

      {/* Десктоп меню */}
      <div className="hidden md:flex gap-8">
        <a href="/navchannya" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Навчання</a>
        <a href="/pro-olenku" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Про автора</a>
        <a href="/zakrytyi-klub" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Закритий Клуб</a>
        <a href="/blog" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Блог</a>
        <a href="/#contact" className="text-xs tracking-widest uppercase text-[var(--accent)] no-underline border-b border-[var(--accent)]">Контакт</a>
      </div>

      {/* Мобільна кнопка */}
      <button
        className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`block w-6 h-0.5 bg-[var(--dark)] transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
        <span className={`block w-6 h-0.5 bg-[var(--dark)] transition-all ${menuOpen ? 'opacity-0' : ''}`}/>
        <span className={`block w-6 h-0.5 bg-[var(--dark)] transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
      </button>

      {/* Мобільне меню */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--warm-white)] border-b border-[rgba(196,180,154,0.2)] flex flex-col px-6 py-6 gap-4 md:hidden">
          <a href="/navchannya" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Навчання</a>
          <a href="/pro-olenku" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Про автора</a>
          <a href="/zakrytyi-klub" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Закритий Клуб</a>
          <a href="/blog" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hover:text-[var(--accent)] transition-colors">Блог</a>
          <a href="/#contact" onClick={() => setMenuOpen(false)} className="text-xs tracking-widest uppercase text-[var(--accent)] no-underline border-b border-[var(--accent)] self-start">Контакт</a>
        </div>
      )}
    </nav>
  );
}