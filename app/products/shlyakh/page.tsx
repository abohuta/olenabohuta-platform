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
  { num: "01", title: "Сила Волі", desc: "Як здобути нові звички та утримувати їх навіть у найскладніші дні." },
  { num: "02", title: "Мотивація", desc: "Що справді рухає тебе вперед — і як знайти глибинну мотивацію через цінності." },
  { num: "03", title: "Дисципліна Тиші", desc: "Чому тиша — це дисципліна для християн і як вона трансформує мислення." },
  { num: "04", title: "Нейропластичність та звички", desc: "Як мозок формує нові шляхи і які звички приведуть до першого заробітку в Instagram." },
  { num: "05", title: "Есенціалізм Христа", desc: "Шлях Христа як модель есенціалізму — більше результату через фокус на справді важливому." },
  { num: "06", title: "GTD та дисципліна планування", desc: "Система Getting Things Done і дисципліна планування — продуктивність без вигорання." },
  { num: "07", title: "Дисципліна Життя", desc: "Баланс між спортом, їжею, сім'єю та особистим — без самопожертви і виснаження." },
  { num: "08", title: "Межі та вміння говорити Ні", desc: "Як розставляти здорові межі у своїй діяльності та чому «хороша дівчинка» — це пастка." },
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

export default function Shlyakh() {
  useReveal();

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-[70px] relative overflow-hidden" style={{ background: 'var(--dark)' }}>
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.18)' }}/>
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.18)' }}/>
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.18)' }}/>
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b hidden md:block" style={{ borderColor: 'rgba(173,182,207,0.18)' }}/>

        {/* Ліва частина — контент */}
        <div className="px-6 md:px-20 py-20 md:py-32 flex flex-col justify-center relative z-10">
          <Link href="/navchannya" className="text-xs tracking-widest uppercase no-underline mb-8 hover:opacity-60 transition-opacity inline-block" style={{ color: 'rgba(173,182,207,0.5)' }}>
            ← Всі навчання
          </Link>
          <p className="text-xs tracking-[0.35em] uppercase mb-6 reveal" style={{ color: ACCENT }}>
            Bootcamp · Дисципліна та зростання
          </p>
          <h1 className="font-medium leading-none mb-8 reveal" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(4.5rem, 10vw, 8rem)', color: 'var(--cream)', lineHeight: 0.9 }}>
            Шлях
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-md mb-4 reveal" style={{ color: 'var(--taupe)' }}>
            Навчання з розвитку дисципліни та особистого зростання серед прикладу Христа та біблійних героїв.
          </p>
          <p className="text-sm leading-relaxed max-w-md mb-10 text-justify reveal" style={{ color: 'rgba(173,182,207,0.75)' }}>
            Моє головне завдання — допомогти тобі зрозуміти себе і пізнати свої можливості. Ти дізнаєшся хто ти є, навчишся жити з фокусом і знайдеш баланс між роботою, вірою та собою.
          </p>
          <div className="flex items-center gap-4 mb-10 reveal">
            <span className="font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--cream)', lineHeight: 1 }}>550 грн</span>
            <span className="text-xs tracking-[0.2em] uppercase px-3 py-1.5" style={{ background: 'rgba(173,182,207,0.1)', color: ACCENT, border: '1px solid rgba(173,182,207,0.25)' }}>9 модулів</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 reveal">
            <a href={PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline text-center hover:opacity-80 transition-opacity" style={{ background: ACCENT, color: 'var(--dark)' }}>
              Придбати курс
            </a>
            <a href="#modules" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline text-center hover:opacity-80 transition-opacity" style={{ border: '1px solid rgba(173,182,207,0.25)', color: 'var(--taupe)' }}>
              Дізнатись більше
            </a>
          </div>
        </div>

        {/* Права частина — фото + PNG Шлях */}
        <div className="hidden md:block relative overflow-hidden">
          <NextImage
            src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774982863/2026-03-31_21.46.33_glmjby.jpg"
            alt="Олена Богута — курс Шлях"
            fill
            priority
            className="object-cover object-top"
            sizes="50vw"
          />
          {/* Градієнт зліва — блендується з темним лівим стовпцем */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, var(--dark) 0%, rgba(20,15,10,0.15) 30%, transparent 60%)' }} />
          {/* Градієнт знизу */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--dark) 0%, transparent 30%)' }} />
          {/* "Шлях" PNG overlay */}
          <div className="absolute bottom-14 left-0 right-0 flex justify-center px-10">
            <NextImage
              src="https://res.cloudinary.com/dd6aymza7/image/upload/v1774982582/IMG_7962_su95fd.png"
              alt="Шлях"
              width={320}
              height={130}
              className="opacity-90"
              style={{ filter: 'drop-shadow(0 4px 32px rgba(0,0,0,0.7)) drop-shadow(0 0 16px rgba(173,182,207,0.15))' }}
            />
          </div>
        </div>
      </section>

      {/* ПРО КУРС */}
      <section className="px-6 md:px-20 py-20 md:py-28 bg-[var(--cream)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8 reveal">
            <Cross size={28} color={ACCENT} />
          </div>
          <p className="text-xs tracking-[0.35em] uppercase mb-4 reveal" style={{ color: ACCENT }}>Про курс</p>
          <h2 className="text-3xl md:text-4xl font-medium mb-8 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>
            Дисципліна — це не обмеження.<br />
            <em className="italic" style={{ color: ACCENT }}>Це свобода.</em>
          </h2>
          <p className="text-base leading-relaxed mb-6 text-justify reveal" style={{ color: 'var(--light-text)' }}>
            Курс «Шлях» — це не черговий тренінг з мотивації. Це глибоке занурення в систему, яка поєднує нейронауку, біблійну мудрість і практичні інструменти для сучасної жінки.
          </p>
          <p className="text-base leading-relaxed text-justify reveal" style={{ color: 'var(--light-text)' }}>
            Ми вчимось на прикладі Христа — найвеличнішого есенціаліста в історії — і застосовуємо ці принципи до Instagram, щоденного планування, особистих меж і внутрішнього спокою.
          </p>
        </div>
      </section>

      {/* ДЛЯ КОГО */}
      <section className="px-6 md:px-20 py-20 md:py-28 bg-[var(--dark)]">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 reveal" style={{ color: ACCENT }}>Для кого</p>
          <h2 className="text-3xl md:text-4xl font-medium text-center mb-12 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)' }}>
            Цей курс — для тебе,<br />
            <em className="italic" style={{ color: ACCENT }}>якщо...</em>
          </h2>
          <div className="space-y-3">
            {FOR_WHOM.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 reveal" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(173,182,207,0.12)', transitionDelay: `${i * 0.1}s` }}>
                <div className="mt-0.5 flex-shrink-0">
                  <Cross size={10} color={ACCENT} />
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(196,180,154,0.8)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* МОДУЛІ */}
      <section id="modules" className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)]">
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 reveal" style={{ color: ACCENT }}>Програма</p>
        <h2 className="text-3xl md:text-5xl font-medium text-center mb-4 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>
          9 модулів,<br />
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
            {QUESTIONS.map((q, i) => (
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
        </div>
      </section>

      {/* ЦІНА / CTA */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--cream)] relative overflow-hidden">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-8 reveal">
            <Cross size={28} color={ACCENT} />
          </div>
          <p className="text-xs tracking-[0.35em] uppercase mb-4 reveal" style={{ color: ACCENT }}>Вартість</p>
          <h2 className="text-4xl md:text-6xl font-medium mb-12 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>
            Почни свій<br />
            <em className="italic" style={{ color: ACCENT }}>шлях</em>
          </h2>

          {/* Цінова плашка */}
          <div className="inline-flex flex-col items-center gap-3 py-10 px-14 mb-10 reveal" style={{ border: '1px solid rgba(173,182,207,0.35)', background: 'rgba(173,182,207,0.05)' }}>
            <span className="text-xs tracking-[0.3em] uppercase" style={{ color: ACCENT }}>Повний доступ до курсу</span>
            <div className="flex items-end gap-2">
              <span className="font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '4.5rem', color: 'var(--dark)', lineHeight: 1 }}>550</span>
              <span className="text-2xl font-medium mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>грн</span>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--light-text)' }}>
              <span>9 модулів</span>
              <span style={{ color: ACCENT }}>·</span>
              <span>Lifetime доступ</span>
              <span style={{ color: ACCENT }}>·</span>
              <span>Практичні завдання</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center reveal">
            <a href={PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity" style={{ background: ACCENT, color: 'var(--dark)' }}>
              Придбати за 550 грн
            </a>
            <a href="https://t.me/olenabohuta" target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity" style={{ border: '1px solid rgba(173,182,207,0.4)', color: 'var(--dark)' }}>
              Написати питання
            </a>
          </div>
          <p className="text-xs mt-8 reveal" style={{ color: 'var(--light-text)' }}>
            Оплата через WayForPay · Доступ одразу після оплати
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
