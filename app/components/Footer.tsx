"use client";
import { useState } from "react";
import React from "react";

const footerLinkStyle = {
  color: '#C4A882',
  textDecoration: 'none',
  fontWeight: 400,
  transition: 'color 0.3s ease, font-weight 0.3s ease',
  display: 'inline-block',
};

const footerLinkHoverStyle = {
  color: '#FFFFFF',
  fontWeight: 500,
};

function EmailFooterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  if (sent) {
    return <p className="text-xs text-[var(--accent)]">Дякуємо! Чекай на листа 💛</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Твій email"
        required
        className="flex-1 px-3 py-2 bg-transparent border border-[rgba(196,180,154,0.2)] text-[var(--taupe)] placeholder-[var(--taupe)] text-xs focus:outline-none focus:border-[var(--accent)] transition-colors min-w-0"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-[var(--accent)] text-white text-xs tracking-widest uppercase hover:bg-[var(--brown)] transition-colors whitespace-nowrap"
      >
        →
      </button>
    </form>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    
      <a href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? '#FFFFFF' : '#C4A882',
        textDecoration: 'none',
        fontWeight: hovered ? 500 : 400,
        transition: 'color 0.3s ease',
        display: 'inline-block',
      }}
    >
      {children}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1A1109] px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Колонка 1 — Лого */}
          <div>
            <p className="text-lg tracking-widest uppercase mb-1" style={{ color: '#D4B896' }}>Олена Богута</p>
            <p className="text-sm text-[var(--accent)] italic mb-3">«Не бійся, тільки вір»</p>
            <p className="text-sm text-[var(--taupe)] opacity-60 leading-relaxed">
              Платформа для християн які хочуть розвивати особистий бренд
            </p>
          </div>

          {/* Колонка 2 — Навігація */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: '#B89870' }}>Навігація</p>
            <ul className="list-none space-y-2">
              {[
                { label: 'Навчання', href: '/navchannya' },
                { label: 'Про автора', href: '/pro-olenku' },
                { label: 'Закритий Клуб', href: '/zakrytyi-klub' },
                { label: 'Блог', href: '/blog' },
              ].map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Колонка 3 — Соціальні мережі */}
          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--taupe)] opacity-60 mb-4">Соціальні мережі</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/olenka.bohuta" target="_blank" className="w-10 h-10 border border-[var(--taupe)] border-opacity-30 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[var(--taupe)] opacity-60 hover:opacity-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://t.me/olenabohuta" target="_blank" className="w-10 h-10 border border-[var(--taupe)] border-opacity-30 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[var(--taupe)] opacity-60 hover:opacity-100">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Колонка 4 — Розсилка */}
          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--taupe)] opacity-60 mb-4">Підпишись</p>
            <p className="text-xs text-[var(--taupe)] opacity-50 leading-relaxed mb-4">
              Отримуй корисні матеріали
            </p>
            <EmailFooterForm />
          </div>

        </div>

        {/* Нижній рядок */}
        <div className="border-t border-[var(--taupe)] border-opacity-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: '#A08060' }}>© {new Date().getFullYear()} Олена Богута. Всі права захищені.</p>
          <div className="flex gap-6">
            <a href="/oferta" className="text-xs no-underline hover:text-white transition-colors" style={{ color: '#A08060' }}>Договір оферти</a>
<a href="/privacy" className="text-xs no-underline hover:text-white transition-colors" style={{ color: '#A08060' }}>Політика конфіденційності</a>
          </div>
        </div>

      </div>
    </footer>
  );
}