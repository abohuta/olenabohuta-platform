"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cross from "../components/Cross";

function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function ZakrytyiKlub() {
  useReveal();

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 md:px-20 pt-[70px] relative overflow-hidden">
        {/* Фото з блюром */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://i.ibb.co/dJbHmqzh/comunity.webp"
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(8px) brightness(0.3)', transform: 'scale(1.1)' }}
          />
        </div>

        {/* Градієнт поверх фото */}
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(184, 147, 106, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(139, 111, 82, 0.12) 0%, transparent 50%),
            rgba(26, 17, 9, 0.6)
          `
        }}/>

        {/* Зернова текстура */}
        <div className="absolute inset-0 z-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay'
        }}/>

        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="deco-line absolute left-16 top-0 bottom-0 hidden md:block" style={{height:'100%'}}/>
        <div className="deco-line absolute right-16 top-0 bottom-0 hidden md:block" style={{height:'100%'}}/>
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="deco-line absolute left-16 top-0 bottom-0 hidden md:block" style={{height:'100%'}}/>
        <div className="deco-line absolute right-16 top-0 bottom-0 hidden md:block" style={{height:'100%'}}/>

        <div className="max-w-4xl mx-auto text-center relative z-10 py-20">
          <div className="flex justify-center mb-6 reveal">
            <Cross size={32} color="var(--accent)" />
          </div>
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--taupe)] mb-6 reveal">Спільнота</p>
          <h1 className="text-5xl md:text-8xl font-medium text-[var(--cream)] leading-tight mb-6 reveal reveal-delay-1">
            Закритий<br />
            <em className="italic text-[var(--accent)]">Клуб</em>
          </h1>
          <p className="text-lg md:text-xl text-[var(--taupe)] max-w-2xl mx-auto leading-relaxed mb-10 reveal reveal-delay-2">
            Простір для християнських експертів які ростуть разом — з вірою, стратегією і підтримкою спільноти.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-3">
            <a href="#pricing" className="inline-block px-10 py-4 bg-[var(--accent)] text-white no-underline text-xs tracking-widest uppercase hover:bg-[var(--brown)] transition-colors">
              Долучитися до клубу
            </a>
            <a href="#benefits" className="inline-block px-10 py-4 border border-[var(--taupe)] text-[var(--taupe)] no-underline text-xs tracking-widest uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
              Дізнатися більше
            </a>
          </div>
        </div>
      </section>

      {/* ДЛЯ КОГО */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--cream)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4 reveal">Для кого</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center text-[var(--dark)] leading-tight mb-16 reveal reveal-delay-1">
          Клуб створений <em className="italic text-[var(--accent)]">для</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] max-w-5xl mx-auto">
          {[
            { title: "Інфлюенсери початківці", desc: "Хочеш розпочати блог і тобі потрібна підтримка спільноти та ментора на кожному кроці." },
            { title: "Експерти-християни", desc: "Вже маєш аудиторію і хочеш системно рости, монетизувати і будувати бренд з цінностями." },
            { title: "Підприємці з вірою", desc: "Будуєш бізнес на християнських цінностях і шукаєш однодумців та стратегічну підтримку." },
          ].map((item) => (
            <div key={item.title} className="bg-[var(--warm-white)] p-8 card-depth reveal">
              <div className="mb-4">
                <Cross size={20} color="var(--accent)" />
              </div>
              <h3 className="text-xl font-medium text-[var(--dark)] mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--light-text)] text-justify">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ЩО ВХОДИТЬ */}
      <section id="benefits" className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4 reveal">Що входить</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center text-[var(--dark)] leading-tight mb-16 reveal reveal-delay-1">
          Все що тобі потрібно<br />
          <em className="italic text-[var(--accent)]">для зростання</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] max-w-4xl mx-auto">
          {[
            { num: "01", title: "Закриті матеріали", desc: "Ексклюзивні уроки, гайди, шаблони та чеклісти які не доступні ніде більше. Нові матеріали щомісяця." },
            { num: "02", title: "Підтримка ментора", desc: "Прямий доступ до Олени та досвідчених кураторів. Отримуй зворотний зв'язок на свій контент і стратегію." },
            { num: "03", title: "Розбори стратегій", desc: "Щомісячні сесії де розбираємо реальні кейси учасників — контент, воронки, продажі та позиціонування." },
            { num: "04", title: "Ком'юніті у Telegram", desc: "Закритий чат з учасниками клубу. Підтримка, натхнення, колаборації та живе спілкування щодня." },
            { num: "05", title: "Зустрічі з експертами", desc: "Регулярні зустрічі з запрошеними Christian-експертами у різних нішах — маркетинг, фінанси, лідерство." },
          ].map((item) => (
            <div key={item.num} className="bg-[var(--cream)] p-8 relative card-depth reveal">
              <span className="absolute top-4 right-6 text-5xl font-medium text-[var(--taupe)] opacity-15">{item.num}</span>
              <h3 className="text-xl font-medium text-[var(--dark)] mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--light-text)] text-justify">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ЦІНИ */}
      <section id="pricing" className="px-6 md:px-20 py-20 md:py-32 bg-[var(--cream)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4 reveal">Тарифи</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center text-[var(--dark)] leading-tight mb-16 reveal reveal-delay-1">
          Обери свій формат
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] max-w-3xl mx-auto">

          {/* Річний */}
          <div className="bg-[var(--dark)] p-10 relative card-depth reveal">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs tracking-widest uppercase px-4 py-1 whitespace-nowrap">
              Найвигідніше
            </span>
            <p className="text-xs tracking-[0.35em] uppercase text-[var(--taupe)] mb-3">Рік</p>
            <h3 className="text-2xl font-medium text-[var(--cream)] mb-2">12 місяців</h3>
            <p className="text-sm text-[var(--taupe)] mb-6 leading-relaxed">Максимальний результат і найнижча ціна</p>
            <div className="mb-1">
              <span className="text-5xl font-medium text-[var(--cream)]">$7</span>
              <span className="text-lg text-[var(--taupe)]">/міс</span>
            </div>
            <p className="text-xs text-[var(--taupe)] mb-2">$84 за рік</p>
            <p className="text-xs text-[var(--accent)] mb-8">Економія $24 порівняно з сезонною оплатою</p>
            <ul className="list-none space-y-3 mb-8">
              {["Всі матеріали клубу", "Підтримка ментора", "Розбори стратегій", "Ком'юніті у Telegram", "Зустрічі з експертами", "Пріоритетний доступ до нових матеріалів"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[rgba(253,251,248,0.7)]">
                  <Cross size={14} color="var(--accent)" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="https://t.me/olenabohuta" target="_blank" className="block text-center px-6 py-3 bg-[var(--accent)] text-white no-underline text-xs tracking-widest uppercase hover:bg-[var(--brown)] transition-colors">
              Долучитися
            </a>
          </div>

          {/* Сезонний */}
          <div className="bg-[var(--warm-white)] p-10 card-depth reveal reveal-delay-1">
            <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-3">Сезон</p>
            <h3 className="text-2xl font-medium text-[var(--dark)] mb-2">3 місяці</h3>
            <p className="text-sm text-[var(--light-text)] mb-6 leading-relaxed">Ідеально щоб спробувати і відчути спільноту</p>
            <div className="mb-1">
              <span className="text-5xl font-medium text-[var(--dark)]">$9</span>
              <span className="text-lg text-[var(--light-text)]">/міс</span>
            </div>
            <p className="text-xs text-[var(--light-text)] mb-2">$27 за 3 місяці</p>
            <p className="text-xs text-[var(--accent)] mb-8">Економія $27 порівняно з місячною оплатою</p>
            <ul className="list-none space-y-3 mb-8">
              {["Всі матеріали клубу", "Підтримка ментора", "Розбори стратегій", "Ком'юніті у Telegram", "Зустрічі з експертами"].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[var(--light-text)]">
                  <Cross size={14} color="var(--accent)" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="https://t.me/olenabohuta" target="_blank" className="block text-center px-6 py-3 border border-[var(--dark)] text-[var(--dark)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--dark)] hover:text-[var(--cream)] transition-colors">
              Долучитися
            </a>
          </div>

        </div>

      </section>

      {/* QUOTE */}
      <section className="px-6 md:px-20 py-16 bg-[var(--dark)] abstract-dark abstract-dark relative overflow-hidden">
        <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6 reveal">
            <Cross size={24} color="var(--accent)" />
          </div>
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

      {/* CTA */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--accent)] text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-white opacity-70 mb-4 reveal">Починаємо</p>
        <h2 className="text-4xl md:text-6xl font-medium text-white leading-tight mb-8 reveal reveal-delay-1">
          Готові рости<br />разом з нами?
        </h2>
        <p className="text-lg text-white opacity-80 max-w-xl mx-auto mb-10 leading-relaxed reveal reveal-delay-2">
          Долучайся до закритого клубу і стань частиною спільноти християнських експертів
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-3">
          <a href="#pricing" className="inline-block px-10 py-4 bg-white text-[var(--accent)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--cream)] transition-colors">
            Обрати тариф
          </a>
          <a href="https://t.me/olenabohuta" target="_blank" className="inline-block px-10 py-4 border border-white text-white no-underline text-xs tracking-widest uppercase hover:bg-white hover:text-[var(--accent)] transition-colors">
            Написати в Telegram
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}