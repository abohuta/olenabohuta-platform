"use client";
import React from "react";
import NextImage from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cross from "../../components/Cross";
import { useReveal } from "../../hooks/useReveal";

const ACCENT = "#adb6cf";
const PAYMENT_URL = "https://secure.wayforpay.com/payment/shlyakh";

const MODULES = [
  { num: "00", title: "Вступ та зміна мислення", desc: "Визначаємо де ти зараз, формуємо основу для змін і перебудовуємо мислення під нові результати." },
  { num: "01", title: "Сила Волі", desc: "Як здобути нові звички та утримувати їх навіть у найскладніші дні." },
  { num: "02", title: "Мотивація", desc: "Що справді рухає тебе вперед — і як знайти глибинну мотивацію через цінності." },
  { num: "03", title: "Дисципліна Тиші", desc: "Чому тиша — це дисципліна для християн і як вона трансформує мислення." },
  { num: "04", title: "Нейропластичність та звички", desc: "Як мозок формує нові шляхи і які звички приведуть до першого заробітку в Instagram." },
  { num: "05", title: "Шлях Есенціалізму Христа", desc: "Шлях Христа як модель есенціалізму — більше результату через фокус на справді важливому." },
  { num: "06", title: "GTD та дисципліна планування", desc: "Система Getting Things Done і дисципліна планування — продуктивність без вигорання." },
  { num: "07", title: "Дисципліна Життя", desc: "Баланс між спортом, їжею, сім'єю та особистим — без самопожертви і виснаження." },
  { num: "08", title: "Вміння говорити Ні та межі", desc: "Як розставляти здорові межі у своїй діяльності та чому «хороша дівчинка» — це пастка." },
  { num: "09", title: "Instagram та комунікації", desc: "Вести Instagram без напруги, планувати контент і знайти баланс РОБОТА–INSTAGRAM–ХРИСТОС." },
];

const QUESTIONS = [
  "Як за допомогою сили волі здобути нові звички",
  "Відповідь на питання — хто я?",
  "Як за допомогою есенціалізму досягати успіху у щоденних справах та веденні Instagram",
  "Як дисциплінувати себе так, щоб не вигорати",
  "Як навчитись говорити «ні»",
  "Чому «хороша дівчинка» — це не так добре, як ми уявляємо",
  "Як розставляти пріоритети, щоб вони працювали на мене",
  "Як вести Instagram, щоб не вигоріти",
  "Тайм-менеджмент у соцмережах",
  "Де знайти баланс ЖИТТЯ–РОБОТА–INSTAGRAM–ХРИСТОС",
  "Чому Біблія — це книга з дисципліни і які практичні кроки Христа я можу використати",
  "Як розставляти межі у своїй діяльності, щоб почуватись комфортно",
  "Система GTD та як вона допоможе стати успішною у різних сферах",
  "Які корисні звички приведуть до першого заробітку в Instagram",
  "Чому дисципліна тиші — для християн і як вона змінює мислення",
  "Як правильно розподіляти контент і планувати його без напруги",
  "Чому працювати менше і заробляти більше допоможе мені вирости",
];

const FOR_WHOM = [
  "Ти християнка, яка хоче привести своє життя в порядок",
  "Ведеш або плануєш вести Instagram — і хочеш робити це без вигорання",
  "Відчуваєш, що часу ні на що не вистачає — і так по колу",
  "Хочеш знайти баланс між вірою, роботою, сім'єю і собою",
  "Шукаєш систему, яка справді працює — а не ще одну теорію",
];

const REVIEWS = [
  "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_600/v1774985651/%D0%B2%D1%96%D0%B4%D0%B3%D1%83%D0%BA1%D1%88%D0%BB%D1%8F%D1%85_dbwrfm.jpg",
  "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_600/v1774985651/%D0%B2%D1%96%D0%B4%D0%B3%D1%83%D0%BA2%D1%88%D0%BB%D1%8F%D1%85_kbmgtk.jpg",
];

const VISIBLE_QUESTIONS = 8;

export default function Shlyakh() {
  useReveal();
  const [showAllQ, setShowAllQ] = React.useState(false);
  const visibleQ = showAllQ ? QUESTIONS : QUESTIONS.slice(0, VISIBLE_QUESTIONS);

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-[70px] relative overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.18)' }}/>
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.18)' }}/>
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.18)' }}/>
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.18)' }}/>

        {/* Ліва частина — контент, вирівняно по центру */}
        <div className="px-6 md:px-20 py-16 md:py-32 flex flex-col justify-center items-center text-center relative z-10">
          <Link href="/navchannya" className="text-xs tracking-widest uppercase no-underline mb-10 hover:opacity-60 transition-opacity" style={{ color: 'rgba(173,182,207,0.45)' }}>
            ← Всі навчання
          </Link>

          <p className="text-xs tracking-[0.35em] uppercase mb-5 reveal" style={{ color: ACCENT }}>
            Bootcamp · Дисципліна та зростання
          </p>

          <h1 className="font-medium mb-4 reveal" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(4.5rem, 10vw, 8rem)', color: 'var(--cream)', lineHeight: 0.9 }}>
            Шлях
          </h1>

          {/* PNG "Шлях" — тільки мобільна версія */}
          <div className="mb-6 md:hidden reveal">
            <NextImage
              src="https://res.cloudinary.com/dd6aymza7/image/upload/v1774982582/IMG_7962_su95fd.png"
              alt="Шлях"
              width={200}
              height={80}
              style={{ height: 'auto', opacity: 0.8 }}
            />
          </div>

          <p className="text-base md:text-lg leading-relaxed max-w-sm mb-10 reveal" style={{ color: 'var(--taupe)' }}>
            Навчання з розвитку дисципліни та особистого зростання. Через приклад Христа і біблійних героїв — до себе справжньої.
          </p>

          {/* Ціна і бейдж — один під одним, по центру */}
          <div className="flex flex-col items-center gap-2 mb-10 reveal">
            <span className="font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', color: 'var(--cream)', lineHeight: 1 }}>550 грн</span>
            <span className="text-xs tracking-[0.2em] uppercase px-4 py-1.5" style={{ background: 'rgba(173,182,207,0.1)', color: ACCENT, border: '1px solid rgba(173,182,207,0.25)' }}>
              10 модулів
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 reveal">
            <a href={PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline text-center hover:opacity-80 transition-opacity" style={{ background: ACCENT, color: 'var(--dark)' }}>
              Придбати курс
            </a>
            <a href="#about" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline text-center hover:opacity-80 transition-opacity" style={{ border: '1px solid rgba(173,182,207,0.25)', color: 'var(--taupe)' }}>
              Дізнатись більше
            </a>
          </div>
        </div>

        {/* Права частина — фото + PNG Шлях (тільки десктоп) */}
        <div className="hidden md:block relative overflow-hidden">
          <NextImage
            src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774985584/2026-03-31_22.25.43_ax1bfe.jpg"
            alt="Олена Богута — курс Шлях"
            fill
            priority
            className="object-cover object-bottom"
            sizes="50vw"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--dark) 0%, rgba(20,15,10,0.15) 30%, transparent 60%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--dark) 0%, transparent 30%)' }} />
          <div className="absolute bottom-14 left-0 right-0 flex justify-center px-10">
            <NextImage
              src="https://res.cloudinary.com/dd6aymza7/image/upload/v1774982582/IMG_7962_su95fd.png"
              alt="Шлях"
              width={320}
              height={130}
              className="opacity-90"
              style={{ filter: 'drop-shadow(0 4px 32px rgba(0,0,0,0.7)) drop-shadow(0 0 16px rgba(173,182,207,0.15))', height: 'auto' }}
            />
          </div>
        </div>
      </section>

      {/* ДЛЯ КОГО (фільтр) + ПРО КУРС */}
      <section id="about" className="px-6 md:px-20 py-20 md:py-28 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* Ліво: для кого — головний фільтр */}
          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-4 reveal" style={{ color: ACCENT }}>Для кого</p>
            <h2 className="text-3xl md:text-4xl font-medium mb-8 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>
              Цей курс — для тебе,<br />
              <em className="italic" style={{ color: ACCENT }}>якщо...</em>
            </h2>
            <div className="space-y-3">
              {FOR_WHOM.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 reveal" style={{ background: 'var(--warm-white)', transitionDelay: `${i * 0.08}s` }}>
                  <div className="mt-0.5 flex-shrink-0">
                    <Cross size={10} color={ACCENT} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--light-text)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Право: про курс + цитата */}
          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-4 reveal" style={{ color: ACCENT }}>Про курс</p>
            <h3 className="text-2xl md:text-3xl font-medium mb-6 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>
              Дисципліна — це не обмеження.<br />
              <em className="italic" style={{ color: ACCENT }}>Це свобода.</em>
            </h3>
            <p className="text-base leading-relaxed mb-8 text-justify reveal" style={{ color: 'var(--light-text)' }}>
              Курс «Шлях» — це не черговий тренінг з мотивації. Це глибоке занурення в систему, яка поєднує нейронауку, біблійну мудрість і практичні інструменти для сучасної жінки.
            </p>
            <div className="reveal" style={{ borderLeft: `3px solid ${ACCENT}`, paddingLeft: '1.5rem' }}>
              <p className="text-lg font-medium leading-snug mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)', fontStyle: 'italic' }}>
                «Христос — найвеличніший есенціаліст в історії»
              </p>
              <p className="text-xs tracking-widest uppercase" style={{ color: ACCENT }}>Олена Богута</p>
            </div>
          </div>

        </div>
      </section>

      {/* МОДУЛІ */}
      <section id="modules" className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)]">
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 reveal" style={{ color: ACCENT }}>Програма</p>
        <h2 className="text-3xl md:text-5xl font-medium text-center mb-4 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>
          10 модулів,<br />
          <em className="italic" style={{ color: ACCENT }}>які змінять підхід</em>
        </h2>
        <p className="text-sm text-center mb-16 reveal" style={{ color: 'var(--light-text)' }}>
          Кожен модуль — це окрема тема з практичними завданнями
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] max-w-5xl mx-auto">
          {MODULES.map((mod, i) => (
            <div
              key={mod.num}
              className="p-8 relative reveal"
              style={{ background: 'var(--cream)', transitionDelay: `${i * 0.06}s`, transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'var(--sand)';
                el.style.transform = 'translateY(-3px)';
                el.style.boxShadow = '0 16px 40px rgba(42,31,20,0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'var(--cream)';
                el.style.transform = '';
                el.style.boxShadow = '';
              }}
            >
              <span className="absolute top-4 right-5 font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: ACCENT, opacity: 0.25, lineHeight: 1 }}>{mod.num}</span>
              <h3 className="text-lg font-medium mb-3 pr-10" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>{mod.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--light-text)' }}>{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ПИТАННЯ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--dark)] relative overflow-hidden">
        <div className="absolute top-6 left-6 w-8 h-8 border-l border-t hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.15)' }}/>
        <div className="absolute top-6 right-6 w-8 h-8 border-r border-t hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.15)' }}/>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.15)' }}/>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.15)' }}/>
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 reveal" style={{ color: ACCENT }}>Ти отримаєш відповіді</p>
          <h2 className="text-3xl md:text-5xl font-medium text-center mb-16 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)' }}>
            Які запитання<br />
            <em className="italic" style={{ color: ACCENT }}>закриє курс?</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {visibleQ.map((q, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 reveal"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(173,182,207,0.1)',
                  transitionDelay: `${(i % 6) * 0.07}s`,
                  transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(173,182,207,0.06)';
                  el.style.borderColor = 'rgba(173,182,207,0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(255,255,255,0.03)';
                  el.style.borderColor = 'rgba(173,182,207,0.1)';
                }}
              >
                <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: ACCENT }}>✦</span>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(196,180,154,0.75)' }}>{q}</p>
              </div>
            ))}
          </div>

          {!showAllQ && (
            <div className="text-center mt-8 reveal">
              <button
                onClick={() => setShowAllQ(true)}
                className="text-xs tracking-widest uppercase px-8 py-3 hover:opacity-70 transition-opacity bg-transparent cursor-pointer"
                style={{ border: '1px solid rgba(173,182,207,0.3)', color: ACCENT }}
              >
                Показати всі ({QUESTIONS.length - VISIBLE_QUESTIONS} більше)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* СОЦІАЛЬНИЙ ДОКАЗ */}
      <section className="px-6 md:px-20 py-20 md:py-28 bg-[var(--warm-white)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.35em] uppercase mb-4 reveal" style={{ color: ACCENT }}>Відгуки</p>
            <h2 className="text-3xl md:text-5xl font-medium leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>
              Понад <em className="italic" style={{ color: ACCENT }}>100 учасників</em><br />
              вже пройшли шлях
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEWS.map((src, i) => (
              <div
                key={i}
                className="overflow-hidden reveal"
                style={{
                  transitionDelay: `${i * 0.15}s`,
                  boxShadow: '0 4px 24px rgba(42,31,20,0.08)',
                  transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 20px 50px rgba(42,31,20,0.14)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = '';
                  el.style.boxShadow = '0 4px 24px rgba(42,31,20,0.08)';
                }}
              >
                <img src={src} alt={`Відгук учасниці курсу Шлях ${i + 1}`} className="w-full h-auto" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЦІНА / CTA */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--dark)] relative overflow-hidden">
        <div className="absolute top-6 left-6 w-8 h-8 border-l border-t hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.15)' }}/>
        <div className="absolute top-6 right-6 w-8 h-8 border-r border-t hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.15)' }}/>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.15)' }}/>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.15)' }}/>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8 reveal">
            <Cross size={28} color={ACCENT} />
          </div>
          <p className="text-xs tracking-[0.35em] uppercase mb-4 reveal" style={{ color: ACCENT }}>Вартість</p>
          <h2 className="text-4xl md:text-6xl font-medium mb-12 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)' }}>
            Почни свій<br />
            <em className="italic" style={{ color: ACCENT }}>шлях</em>
          </h2>

          {/* Цінова картка з анімацією */}
          <div
            className="inline-flex flex-col items-center gap-4 py-12 px-14 mb-10 reveal"
            style={{
              border: '1px solid rgba(173,182,207,0.3)',
              background: 'rgba(173,182,207,0.05)',
              boxShadow: '0 8px 48px rgba(173,182,207,0.1), inset 0 0 0 1px rgba(173,182,207,0.08)',
              transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-10px)';
              el.style.boxShadow = '0 36px 80px rgba(173,182,207,0.22), inset 0 0 0 1px rgba(173,182,207,0.22)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = '';
              el.style.boxShadow = '0 8px 48px rgba(173,182,207,0.1), inset 0 0 0 1px rgba(173,182,207,0.08)';
            }}
          >
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: ACCENT }}>Повний доступ до курсу</span>
            <div className="flex items-end gap-2">
              <span className="font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '5rem', color: 'var(--cream)', lineHeight: 1 }}>550</span>
              <span className="text-2xl font-medium mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)' }}>грн</span>
            </div>
            <div className="w-10 h-px" style={{ background: `rgba(173,182,207,0.3)` }} />
            <div className="flex items-center gap-4 text-xs" style={{ color: 'rgba(196,180,154,0.6)' }}>
              <span>10 модулів</span>
              <span style={{ color: ACCENT }}>·</span>
              <span>Lifetime доступ</span>
              <span style={{ color: ACCENT }}>·</span>
              <span>Практичні завдання</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal">
            <a
              href={PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity"
              style={{ background: ACCENT, color: 'var(--dark)' }}
            >
              Придбати за 550 грн
            </a>
            <a
              href="https://t.me/olenabohuta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity"
              style={{ border: '1px solid rgba(173,182,207,0.3)', color: 'var(--taupe)' }}
            >
              Написати питання
            </a>
          </div>
          <p className="text-xs mt-8 reveal" style={{ color: 'rgba(196,180,154,0.4)' }}>
            Оплата через WayForPay · Доступ одразу після оплати
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
