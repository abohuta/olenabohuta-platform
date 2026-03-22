export default function Footer() {
  return (
    <footer className="bg-[#1A1109] px-6 md:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-lg tracking-widest uppercase text-[var(--taupe)] mb-1">Олена Богута</p>
            <p className="text-sm text-[var(--accent)] italic mb-3">«Не бійся, тільки вір»</p>
            <p className="text-sm text-[var(--taupe)] opacity-60 leading-relaxed">
              Платформа для християн які хочуть розвивати особистий бренд
            </p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-[var(--taupe)] opacity-60 mb-4">Навігація</p>
            <ul className="list-none space-y-2">
              {[
                { label: 'Навчання', href: '/navchannya' },
                { label: 'Про автора', href: '/pro-olenku' },
                { label: 'Закритий Клуб', href: '/zakrytyi-klub' },
                { label: 'Блог', href: '/blog' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-[var(--taupe)] opacity-60 no-underline hover:opacity-100 transition-opacity">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
        </div>
        <div className="border-t border-[var(--taupe)] border-opacity-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--taupe)] opacity-40">© 2025 Олена Богута. Всі права захищені.</p>
          <div className="flex gap-6">
            <a href="/oferta" className="text-xs text-[var(--taupe)] opacity-40 no-underline hover:opacity-80 transition-opacity">Договір оферти</a>
            <a href="/privacy" className="text-xs text-[var(--taupe)] opacity-40 no-underline hover:opacity-80 transition-opacity">Політика конфіденційності</a>
          </div>
        </div>
      </div>
    </footer>
  );
}