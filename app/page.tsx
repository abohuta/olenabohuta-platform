"use client";
import React from "react";
function Carousel() {
  const [current, setCurrent] = React.useState(0);
  const total = 8;
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const next = () => setCurrent((prev) => (prev + 1) % total);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  const cardWidth = typeof window !== 'undefined'
    ? window.innerWidth < 768 ? 296 : 336
    : 336;

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex gap-4 transition-transform duration-500"
          style={{ transform: `translateX(calc(-${current * cardWidth}px))` }}
        >
          {[...Array(total * 2)].map((_, i) => (
            <div
              key={i}
              className="flex-none w-[280px] md:w-[320px] bg-[var(--sand)] rounded-sm aspect-[9/16] flex items-center justify-center"
            >
              <p className="text-sm text-[var(--light-text)] text-center px-4">
                Скріншот відгуку {(i % total) + 1}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки — тільки на десктопі */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-[var(--dark)] text-[var(--cream)] hidden md:flex items-center justify-center hover:bg-[var(--accent)] transition-colors z-10"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-[var(--dark)] text-[var(--cream)] hidden md:flex items-center justify-center hover:bg-[var(--accent)] transition-colors z-10"
      >
        →
      </button>

      {/* Крапки навігації */}
      <div className="flex justify-center gap-2 mt-6">
        {[...Array(total)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-[var(--accent)]' : 'bg-[var(--taupe)]'}`}
          />
        ))}
      </div>

      {/* Підказка для мобільного */}
      <p className="text-xs text-[var(--taupe)] text-center mt-4 md:hidden tracking-widest uppercase">
        Гортай пальцем →
      </p>
    </div>
  );
}
export default function Home() {
  return (
    <main className="font-sans w-full overflow-x-hidden">

      {/* НАВІГАЦІЯ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4 flex justify-between items-center bg-[rgba(253,251,248,0.94)] backdrop-blur-md border-b border-[rgba(196,180,154,0.2)]">
        <span className="font-cormorant text-lg tracking-widest uppercase text-[var(--dark)]">
          Олена Богута
        </span>
        <div className="flex gap-4 md:gap-8">
  <a href="/navchannya" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hidden md:block hover:text-[var(--accent)] transition-colors">Навчання</a>
  <a href="/pro-olenku" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hidden md:block hover:text-[var(--accent)] transition-colors">Про Оленку</a>
  <a href="/zakrytyi-klub" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hidden md:block hover:text-[var(--accent)] transition-colors">Закритий Клуб</a>
  <a href="/blog" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hidden md:block hover:text-[var(--accent)] transition-colors">Блог</a>
  <a href="#contact" className="text-xs tracking-widest uppercase text-[var(--accent)] no-underline border-b border-[var(--accent)]">Контакти</a>
</div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-[70px]">
        <div className="px-6 md:px-20 py-20 md:py-32 flex flex-col justify-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-6">
            Засновниця · Наставник · Архітектор брендів
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-tight text-[var(--dark)] mb-6">
            Олена<br />
            <em className="italic text-[var(--accent)]">Богута</em>
          </h1>
          <div className="max-w-md mb-10 flex flex-col gap-6">
  <p className="text-lg md:text-xl leading-relaxed text-[var(--light-text)] text-justify">
    Експерт з розвитку особистого бренду для християн. Допомагаю інфлюенсерам та фахівцям різних ніш запускати блог з нуля, монетизувати експертність і створювати власні унікальні продукти.
  </p>
</div>
          <a href="/products" className="inline-block px-10 py-4 bg-[var(--dark)] text-[var(--cream)] no-underline text-xs tracking-widest uppercase self-start hover:bg-[var(--accent)] transition-colors">
            Переглянути продукти
          </a>
        </div>
        <div className="relative min-h-[50vh] md:min-h-screen bg-[var(--sand)]">
          <img
            src="https://i.ibb.co/8LfTV0xM/photo.webp"
            alt="Олена Богута"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>
      </section>

      {/* ПРОДУКТИ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--cream)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4">
  Навчання
</p>
<h2 className="text-4xl md:text-5xl font-light text-center text-[var(--dark)] mb-16 leading-tight">
  Чим я можу тобі допомогти
</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-[2px] max-w-7xl mx-auto">
          {[
  { title: 'Шлях', desc: 'Марафон дисципліни за біблійними принципами тиші', tag: 'Марафон', href: '/products/shlyakh' },
  { title: 'Початок', desc: 'Тренінг для християн, що прагнуть запустити блог', tag: 'Тренінг', href: '/products/pochatok' },
  { title: 'Кемп Архітектор Бренду', desc: 'Навчання для християн які хочуть розвивати особистий бренд', tag: 'Кемп', href: '/products/kemp' },
  { title: 'Тиша', desc: 'Навчання по зупусках та автоворонках', tag: 'Курс', href: '/products/tysha' },
  { title: 'Консультації', desc: 'Особиста робота над твоїм брендом та стратегією', tag: 'Сесія', href: '/products/konsultatsii' },
].map((item) => (
  <a href={item.href} key={item.title} className="bg-[var(--warm-white)] p-10 hover:-translate-y-1 transition-transform block no-underline">
    <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-3">{item.tag}</p>
    <h3 className="font-cormorant text-xl font-normal text-[var(--dark)] mb-4">{item.title}</h3>
    <p className="text-sm leading-relaxed text-[var(--light-text)]">{item.desc}</p>
  </a>
))}
        </div>
        <div className="text-center mt-12">
          <a href="/products" className="inline-block px-10 py-4 border border-[var(--dark)] text-[var(--dark)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--dark)] hover:text-[var(--cream)] transition-colors">
            Дізнатися більше
          </a>
        </div>
      </section>
      {/* ВІДГУКИ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)] overflow-hidden">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4">Відгуки</p>
        <h2 className="text-4xl md:text-5xl font-light text-center text-[var(--dark)] mb-16 leading-tight">
          Що кажуть учасники
        </h2>
        <Carousel />
      </section>

      {/* ЗАКРИТИЙ КЛУБ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--accent)]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-white opacity-70 mb-4">Спільнота</p>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6">
              Закритий<br />
              <em className="italic">Клуб</em>
            </h2>
            <p className="text-lg leading-relaxed text-white opacity-80 mb-8 text-justify">
              Простір для християнських експертів, які ростуть разом. Підтримка, натхнення, живе ком'юніті однодумців.
            </p>
            <a href="/zakrytyi-klub" className="inline-block px-10 py-4 bg-white text-[var(--accent)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--cream)] transition-colors">
              Долучитися до клубу
            </a>
          </div>
          <div className="bg-white bg-opacity-10 p-10 rounded-sm">
            <ul className="list-none space-y-4">
              {[
                "Щотижневі зустрічі та розбори",
                "Підтримка куратора та автора",
                "Доступ до закритих матеріалів",
                "Ком'юніті однодумців-християн",
                "Разбори стратегій та контенту",
              ].map((item) => (
                <li key={item} className="text-white flex items-start gap-3">
                  <span className="text-white opacity-60 mt-1">✝</span>
                  <span className="text-base leading-relaxed opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* КОНТАКТ */}
      <section id="contact" className="px-6 md:px-20 py-20 md:py-32 bg-[var(--dark)] text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--taupe)] mb-4">
          Зв'язок
        </p>
        <h2 className="font-cormorant text-5xl md:text-7xl font-light text-[var(--cream)] leading-tight mb-8">
          Давай створимо<br />
          <em className="italic text-[var(--accent)]">твій бренд</em><br />
          разом
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="https://t.me/olenabohuta" target="_blank" className="px-10 py-4 bg-[var(--accent)] text-white no-underline text-xs tracking-widest uppercase hover:bg-[var(--brown)] transition-colors">
            Telegram
          </a>
          <a href="https://www.instagram.com/olenka.bohuta" target="_blank" className="px-10 py-4 border border-[var(--taupe)] text-[var(--taupe)] no-underline text-xs tracking-widest uppercase hover:border-[var(--cream)] hover:text-[var(--cream)] transition-colors">
            Instagram
          </a>
        </div>
      </section>

      {/* ФУТЕР */}
      <footer className="bg-[#1A1109] px-6 md:px-20 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            {/* Лого та опис */}
            <div>
              <p className="text-lg tracking-widest uppercase text-[var(--taupe)] mb-3">Олена Богута</p>
              <p className="text-sm text-[var(--taupe)] opacity-60 leading-relaxed">
                Платформа для християн які хочуть розвивати особистий бренд
              </p>
            </div>

            {/* Навігація */}
            <div>
              <p className="text-xs tracking-widest uppercase text-[var(--taupe)] opacity-60 mb-4">Навігація</p>
              <ul className="list-none space-y-2">
                {[
                  { label: 'Навчання', href: '/navchannya' },
                  { label: 'Про Оленку', href: '/pro-olenku' },
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

            {/* Соцмережі */}
            <div>
              <p className="text-xs tracking-widest uppercase text-[var(--taupe)] opacity-60 mb-4">Соціальні мережі</p>
              <div className="flex gap-4">
                {/* Instagram */}
                <a href="https://www.instagram.com/olenka.bohuta" target="_blank" className="w-10 h-10 border border-[var(--taupe)] border-opacity-30 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[var(--taupe)] opacity-60 hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
                {/* Telegram */}
                <a href="https://t.me/olenabohuta" target="_blank" className="w-10 h-10 border border-[var(--taupe)] border-opacity-30 flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors text-[var(--taupe)] opacity-60 hover:opacity-100">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Нижній рядок */}
          <div className="border-t border-[var(--taupe)] border-opacity-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[var(--taupe)] opacity-40">
              © 2026 Олена Богута. Всі права захищені.
            </p>
            <div className="flex gap-6">
              <a href="/oferta" className="text-xs text-[var(--taupe)] opacity-40 no-underline hover:opacity-80 transition-opacity">
                Договір оферти
              </a>
              <a href="/privacy" className="text-xs text-[var(--taupe)] opacity-40 no-underline hover:opacity-80 transition-opacity">
                Політика конфіденційності
              </a>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}