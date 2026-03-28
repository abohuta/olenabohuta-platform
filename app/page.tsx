"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cross from "./components/Cross";
import { useReveal } from "./hooks/useReveal";

function Carousel() {
  const [current, setCurrent] = React.useState(0);
  const total = 8;
  const touchStartX = React.useRef(0);
  const touchEndX = React.useRef(0);

  const images = [
    "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360071/1_sqzdzx.jpg",
    "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360076/2_fgkaqz.jpg",
    "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360072/3_k0uscc.jpg",
    "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360072/4_y34lkj.jpg",
    "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360073/5_odf9r5.jpg",
    "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360074/6_cmxrfg.jpg",
    "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360074/7_kuyqjj.jpg",
    "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360075/8_uuqd5v.jpg",
  ];

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
          {[...images, ...images].map((src, i) => (
            <div
              key={i}
              className="flex-none w-[280px] md:w-[320px] rounded-sm overflow-hidden aspect-[9/16] relative"
            >
              <Image
                src={src}
                alt={`Відгук ${(i % total) + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 280px, 320px"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Кнопки — тільки на десктопі */}
      <button
        onClick={prev}
        aria-label="Попередній відгук"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-[var(--dark)] text-[var(--cream)] hidden md:flex items-center justify-center hover:bg-[var(--accent)] transition-colors z-10"
      >
        ←
      </button>
      <button
        onClick={next}
        aria-label="Наступний відгук"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-[var(--dark)] text-[var(--cream)] hidden md:flex items-center justify-center hover:bg-[var(--accent)] transition-colors z-10"
      >
        →
      </button>

      {/* Крапки навігації */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Відгук ${i + 1}`}
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
  useReveal();
  return (
    <main className="font-sans w-full overflow-x-hidden">

      {/* НАВІГАЦІЯ */}
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-[70px] mesh-bg relative">
        {/* Декоративна вертикальна лінія */}
        <div className="deco-line absolute left-1/2 top-0 bottom-0 hidden md:block" style={{height: '100%'}} />

        {/* Декоративний номер */}
        <span className="absolute top-32 right-8 text-[120px] font-light text-[var(--sand)] opacity-40 leading-none hidden md:block select-none" style={{fontFamily: 'var(--font-heading)'}}>01</span>

        <div className="px-6 md:px-20 py-20 md:py-32 flex flex-col justify-center relative z-10">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-6">
            Засновниця · Наставник · Архітектор бренду
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-[var(--dark)] mb-6" style={{ lineHeight: 0.75, letterSpacing: '-0.02em' }}>
            Олена<br />
            <em className="italic text-[var(--accent)]">Богута</em>
          </h1>
          <div className="max-w-md mb-10 flex flex-col gap-6">
            <p className="text-lg md:text-xl leading-relaxed text-[var(--light-text)] text-justify">
              Експерт з розвитку особистого бренду для християн. Допомагаю інфлюенсерам та фахівцям різних ніш запускати блог з нуля, монетизувати експертність і створювати власні унікальні продукти.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link href="/navchannya" className="inline-block px-10 py-4 bg-[var(--dark)] text-[var(--cream)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-colors text-center">
              Переглянути продукти
            </Link>
            <a href="https://docs.google.com/forms/d/1GTJ6oijlCOO7GfUMlhvGealas2Vo5GI7bh-uaAljfdQ/edit" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 border border-[var(--accent)] text-[var(--accent)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--accent)] hover:text-white transition-colors text-center">
              Хочу вчитися
            </a>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-screen bg-[var(--sand)]">
          <img
            src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774359969/Olena_Bohuta_htaxhd.webp"
            fetchPriority="high"
            alt="Олена Богута"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>
      </section>

      {/* ПРОДУКТИ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--cream)] mesh-bg relative overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-light text-center text-[var(--dark)] mb-16 leading-tight reveal reveal-delay-1">
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
            <Link href={item.href} key={item.title} className="bg-[var(--warm-white)] p-10 block no-underline reveal card-shine card-depth">
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-3">{item.tag}</p>
              <h3 className="font-cormorant text-xl font-normal text-[var(--dark)] mb-4">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--light-text)]">{item.desc}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/navchannya" className="inline-block px-10 py-4 border border-[var(--dark)] text-[var(--dark)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--dark)] hover:text-[var(--cream)] transition-colors">
            Дізнатися більше
          </Link>
        </div>
      </section>

      {/* QUOTE */}
      <section className="px-6 md:px-20 py-16 bg-[var(--dark)] relative overflow-hidden">
        {/* Кутові декоративні елементи */}
        <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[rgba(184,147,106,0.3)] hidden md:block"/>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-[var(--accent)] text-xl block mb-6"><Cross size={24} color="var(--accent)" /></span>
          <div className="w-8 h-px bg-[var(--accent)] mx-auto mb-6"/>
          <blockquote className="text-2xl md:text-4xl font-medium text-[var(--cream)] leading-snug mb-6 reveal">
            "Не бійся, тільки вір"
          </blockquote>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--taupe)] reveal reveal-delay-1">
            Марка 5:36
          </p>
          <div className="w-8 h-px bg-[var(--accent)] mx-auto mt-6"/>
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
            <p className="text-xs tracking-[0.35em] uppercase text-white mb-4" style={{opacity: 0.7}}>Спільнота</p>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6">
              Закритий<br />
              <em className="italic">Клуб</em>
            </h2>
            <p className="text-lg leading-relaxed text-white mb-8 text-justify" style={{opacity: 0.85}}>
              Простір для християнських експертів, які ростуть разом. Підтримка, натхнення, живе ком'юніті однодумців.
            </p>
            <Link href="/zakrytyi-klub" className="inline-block px-10 py-4 bg-white text-[var(--accent)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--cream)] transition-colors">
              Долучитися до клубу
            </Link>
          </div>
          <div style={{background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)'}} className="p-10 rounded-sm">
            <ul className="list-none space-y-4">
              {[
                "Щотижневі зустрічі та розбори",
                "Підтримка куратора та автора",
                "Доступ до закритих матеріалів",
                "Ком'юніті однодумців-християн",
                "Розбори стратегій та контенту",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-white mt-1 flex-shrink-0" style={{opacity: 0.9}}>✓</span>
                  <span className="text-white text-base leading-relaxed" style={{opacity: 0.95}}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* КОНТАКТ */}
      <section id="contact" className="px-6 md:px-20 py-20 md:py-32 bg-[var(--dark)] text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--taupe)] mb-4 reveal">Зв'язок</p>
        <h2 className="text-4xl md:text-6xl font-medium text-[var(--cream)] leading-tight mb-8 reveal reveal-delay-1">
          Давай побудуємо<br />
          <em className="italic text-[var(--accent)]">твій бренд</em><br />
          разом
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center reveal reveal-delay-2">
          <a href="https://t.me/olenabohuta" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-[var(--accent)] text-white no-underline text-xs tracking-widest uppercase hover:bg-[var(--brown)] transition-colors">
            Telegram
          </a>
          <a href="https://www.instagram.com/olenka.bohuta" target="_blank" rel="noopener noreferrer" className="px-10 py-4 border border-[var(--taupe)] text-[var(--taupe)] no-underline text-xs tracking-widest uppercase hover:border-[var(--cream)] hover:text-[var(--cream)] transition-colors">
            Instagram
          </a>
        </div>
      </section>

      {/* ФУТЕР */}
      <Footer />

    </main>
  );
}
