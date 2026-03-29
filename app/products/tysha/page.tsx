"use client";
import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import Footer from "../../components/Footer";

// ── Constants ──────────────────────────────────────────────
const PRIMARY = "#748fa4";
const LIGHT = "#fffefb";
const DARK_ACC = "#000000";
const WHITE = "#ffffff";
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScKm6sGU6EqPEQpoMrbY9KxbClUI2Apco3EZWin1tW7X_Vq-A/viewform";

// ── Static data ────────────────────────────────────────────
const MODULES = [
  { num: "0", tag: "Вступний модуль", title: "Стратегія результату", items: ["Цілі та стратегія на 8 тижнів", "Проективне мислення контентом", "Ідея, Місія, Бачення та залучення"] },
  { num: "1", tag: "Модуль 1", title: "Запуски ТИШІ", items: ["Запуски та християнський контекст", "Стратегії запусків ТИШІ", "Лояльна Експертність та Особистий Бренд"] },
  { num: "2", tag: "Модуль 2", title: "Підготовка (Перші кроки)", items: ["Пошук та вибір продукту", "Сегменти та аналіз аудиторії", "CustDev", "Тестування гіпотез продукту"] },
  { num: "3", tag: "Модуль 3", title: "Створення продукту", items: ["Аналіз конкурентів та запусків", "Скелет продукту", "Унікальність дорогого продукту", "Декомпозиція та тарифна сітка"] },
  { num: "4", tag: "Модуль 4", title: "Прогріви ТИШІ", items: ["Прогрів. Розбираємо на молекули", "Тригери продажів", "Формати, концепція та структура", "Продажі через сторітелінг"] },
  { num: "5", tag: "Модуль 5", title: "Продажі та продукт у ТИШІ", items: ["Воронка продажів", "Пасивні продажі ManyChat", "Програма безкоштовника", "Продажі у блозі", "Методологія та навчання"] },
];

const BONUSES = [
  { title: "КОУЧ", desc: "Окремий чат та систематичні зустрічі з коучем" },
  { title: "Челенджі", desc: "Практичні завдання для закріплення матеріалу" },
  { title: "Подарунки", desc: "Сюрпризи для учасників протягом навчання" },
  { title: "Бонусні уроки", desc: "Уроки по мультиканальності" },
  { title: "Готові шаблони", desc: "Сценарії, таблиці — розпаковка особистості та експертності" },
  { title: "Закритий клуб", desc: "Річний безкоштовний доступ до клубу однодумців" },
];

const FOR_WHO = [
  { title: "Експертів-християн", desc: "Які хочуть будувати Особистий Бренд і впливати через соцмережі" },
  { title: "Middle та Senior експертів", desc: "Які втомились продавати послуги на низький чек і хочуть запустити авторський продукт" },
  { title: "Експертів на «пасивний» дохід", desc: "Які планують вийти на «пасивний» дохід із блогу" },
];

const LAUNCH_ITEMS = [
  "Веб і безкоштовний продукт (етапи, підготовка, фішки)",
  "Технічна частина та методологія",
  "Воронки та автоворонки",
  "Запуск у реальному часі разом зі мною",
];

const FAQ_ITEMS = [
  { q: "Хто може навчатись у ТИШІ?", a: "Навчання створено для експертів-християн з досвідом, які готові вийти на новий рівень і запустити свій Premium-продукт." },
  { q: "Скільки триває навчання?", a: "8 тижнів — ми будуємо і запускаємо продукт у реальному часі разом." },
  { q: "Чи є індивідуальний супровід?", a: "Так! Ти отримуєш мій індивідуальний супровід до результату, коуч-чат та систематичні зустрічі." },
  { q: "Яка ціна навчання?", a: "Ціна формується індивідуально. Заповни анкету і ми підберемо оптимальний формат для тебе." },
  { q: "Що якщо я ніколи не запускав продукт?", a: "ТИША починається з нуля — ми разом проходимо кожен крок від ідеї до першого продажу." },
];

const TYSHA_IS = [
  { num: "01", text: "Навчання яке з 0 допоможе запустити продукт протягом 8 тижнів" },
  { num: "02", text: "З першого тижня будуємо стратегію і маркетинговий план для 100% результату" },
  { num: "03", text: "Твій дохід та середній чек виросте у 2-3 рази" },
  { num: "04", text: "Робота з мисленням — масштабуєшся зовнішньо та внутрішньо" },
  { num: "05", text: "Авторський підхід без постійного прогріву" },
  { num: "06", text: "Більше 15 уроків та індивідуальний супровід до результату" },
];

// ── Hooks ──────────────────────────────────────────────────
function useAnimations() {
  React.useEffect(() => {
    // Reveal
    const els = document.querySelectorAll('.tysha-reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    els.forEach((el) => revealObserver.observe(el));

    // Parallax
    const bg = document.getElementById('tysha-parallax') as HTMLElement | null;
    const section = document.getElementById('tysha-program-section') as HTMLElement | null;
    let rafId: number;

    const onScroll = () => {
      if (!bg || !section) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        bg.style.transform = `translateY(${(progress - 0.5) * 80}px)`;
      });
    };

    if (bg && section) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

function ModuleNumber({ num, delay }: { num: string; delay: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [animated, setAnimated] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setTimeout(() => {
            setAnimated(true);
            el.classList.add('mod-num-animate');
          }, delay * 1000);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated, delay]);

  return (
    <span
      ref={ref}
      className="mod-num absolute top-4 right-6 font-medium"
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '4rem',
        color: PRIMARY,
        opacity: animated ? 0.1 : 0,
        lineHeight: 1,
        transition: 'opacity 0.6s ease, color 0.4s ease',
      }}
    >
      {num}
    </span>
  );
}

function StickyCta() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight;
      const winHeight = window.innerHeight;
      // Показуємо після 600px але ховаємо за 400px до кінця сторінки (футер)
      setVisible(scrollY > 600 && scrollY < docHeight - winHeight - 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Лише на мобільних — max-width 768px */}
      <style>{`
        @media (min-width: 768px) { .tysha-sticky-cta { display: none !important; } }
      `}</style>
      <div
        className="tysha-sticky-cta fixed bottom-0 left-0 right-0 z-40"
        style={{
          transform: visible ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
          background: PRIMARY,
          padding: '0.875rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 -4px 20px rgba(116,143,164,0.3)',
        }}
      >
        <div>
          <p className="text-xs font-medium" style={{ color: WHITE }}>ТИША — 8 тижнів</p>
          <p className="text-xs" style={{ color: 'rgba(255,254,251,0.7)' }}>Premium навчання</p>
        </div>
          <a href={FORM_URL}
          target="_blank"
          className="text-xs tracking-widest uppercase no-underline px-5 py-2 hover:opacity-80 transition-opacity"
          style={{ background: WHITE, color: PRIMARY }}
        >
          Анкета →
        </a>
      </div>
    </>
  );
}

function AnimatedTitle() {
  const [animate, setAnimate] = React.useState(false);
  const letters = ['Т', 'И', 'Ш', 'А'];

  React.useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 className="font-medium leading-none mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(5rem, 12vw, 10rem)', color: WHITE, letterSpacing: '-0.02em' }}>
      {letters.map((letter, i) => (
        <span
          key={i}
          className={`tysha-letter ${animate ? 'animate' : ''}`}
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
}

function FloatingQuote() {
  const [visible, setVisible] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setVisible(window.scrollY > 800 && window.scrollY < 4000);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-40 max-w-[220px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(-50%) translateX(${visible ? 0 : 20}px)`,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="p-5 relative" style={{ background: PRIMARY, borderLeft: `3px solid rgba(255,254,251,0.3)` }}>
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-xs hover:opacity-60 transition-opacity bg-transparent border-none cursor-pointer"
          style={{ color: 'rgba(255,254,251,0.5)' }}
        >
          ✕
        </button>
        <p className="text-sm italic leading-relaxed" style={{ color: WHITE }}>
          "Тиша — це не відсутність шуму. Це присутність Бога."
        </p>
        <p className="text-xs mt-3 tracking-widest uppercase" style={{ color: 'rgba(255,254,251,0.5)' }}>— Олена Богута</p>
      </div>
    </div>
  );
}

function Quiz() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [result, setResult] = React.useState<string | null>(null);

  const questions = [
    {
      q: "Який твій досвід у соцмережах?",
      options: ["Тільки починаю", "Веду блог, але без системи", "Маю аудиторію і хочу монетизувати", "Вже продаю але хочу масштабуватись"],
      scores: [1, 2, 3, 4],
    },
    {
      q: "Яка твоя головна ціль?",
      options: ["Запустити перший продукт", "Збільшити дохід у 2-3 рази", "Вийти на пасивний дохід", "Стати топ-експертом у своїй ніші"],
      scores: [2, 3, 3, 4],
    },
    {
      q: "Ти готова інвестувати час у навчання?",
      options: ["Маю лише 1-2 години на тиждень", "Можу 3-5 годин на тиждень", "Готова повністю зануритись", "Хочу результат якомога швидше"],
      scores: [1, 3, 4, 4],
    },
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    if (step < questions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      if (total <= 5) {
        setResult('maybe');
      } else if (total <= 9) {
        setResult('good');
      } else {
        setResult('perfect');
      }
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); };

  const results: Record<string, { title: string; desc: string; cta: string }> = {
    maybe: {
      title: "Ти на правильному шляху 🌱",
      desc: "ТИША — це для тих хто вже має базу. Почни з навчання «Початок» і повернись до нас коли будеш готова до великого запуску.",
      cta: "Переглянути «Початок»",
    },
    good: {
      title: "ТИША тобі підходить! ✨",
      desc: "Ти маєш достатній досвід щоб запустити свій Premium-продукт. ТИША дасть тобі систему, стратегію і супровід до результату.",
      cta: "Заповнити анкету",
    },
    perfect: {
      title: "ТИША — саме для тебе! 🔥",
      desc: "Ти готова до масштабування. ТИША допоможе запустити продукт і вийти на новий рівень доходу за 8 тижнів.",
      cta: "Заповнити анкету зараз",
    },
  };

  return (
    <section className="px-6 md:px-20 py-20 md:py-32" style={{ background: WHITE }}>
      <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 tysha-reveal" style={{ color: PRIMARY }}>Тест</p>
      <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 leading-tight tysha-reveal" style={{ fontFamily: 'var(--font-heading)', color: DARK_ACC }}>
        Чи підходить тобі<br />
        <em className="italic" style={{ color: PRIMARY }}>ТИША?</em>
      </h2>
      <p className="text-base text-center mb-12 tysha-reveal" style={{ color: '#4a6275' }}>3 питання — і ти отримаєш чесну відповідь</p>

      <div className="max-w-2xl mx-auto">
        {result ? (
          <div className="p-10 text-center" style={{ background: LIGHT, border: `1px solid rgba(116,143,164,0.2)` }}>
            <h3 className="text-2xl font-medium mb-4" style={{ fontFamily: 'var(--font-heading)', color: DARK_ACC }}>{results[result].title}</h3>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#4a6275' }}>{results[result].desc}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              
                <a href={result === 'maybe' ? '/products/pochatok' : FORM_URL}
                target={result !== 'maybe' ? '_blank' : undefined}
                className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity"
                style={{ background: PRIMARY, color: WHITE }}
              >
                {results[result].cta}
              </a>
              <button
                onClick={reset}
                className="inline-block px-10 py-4 text-xs tracking-widest uppercase cursor-pointer hover:opacity-60 transition-opacity bg-transparent border-none"
                style={{ color: PRIMARY, border: `1px solid ${PRIMARY}` }}
              >
                Пройти знову
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-12" style={{ background: LIGHT, border: `1px solid rgba(116,143,164,0.2)` }}>
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-8">
              {questions.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full transition-colors duration-300" style={{ background: i <= step ? PRIMARY : 'rgba(116,143,164,0.2)' }} />
              ))}
            </div>

            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: PRIMARY }}>Питання {step + 1} з {questions.length}</p>
            <h3 className="text-xl md:text-2xl font-medium mb-8" style={{ fontFamily: 'var(--font-heading)', color: DARK_ACC }}>
              {questions[step].q}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {questions[step].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(questions[step].scores[i])}
                  className="text-left px-6 py-4 text-sm cursor-pointer hover:opacity-80 transition-all bg-transparent"
                  style={{
                    border: `1px solid rgba(116,143,164,0.25)`,
                    color: '#4a6275',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = PRIMARY;
                    (e.currentTarget as HTMLElement).style.color = WHITE;
                    (e.currentTarget as HTMLElement).style.borderColor = PRIMARY;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#4a6275';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(116,143,164,0.25)';
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ── Sub-components ─────────────────────────────────────────
function FaqBlock() {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <div className="max-w-3xl mx-auto">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid rgba(116,143,164,0.2)` }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left py-5 flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer"
          >
            <span className="text-base font-medium" style={{ color: DARK_ACC, fontFamily: 'var(--font-heading)' }}>{item.q}</span>
            <span style={{ color: PRIMARY, fontSize: '1.2rem', flexShrink: 0 }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <p className="text-sm leading-relaxed pb-5 text-justify" style={{ color: '#4a6275' }}>{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function Tysha() {
  useAnimations();

  return (
    <main className="w-full overflow-x-hidden" style={{ background: LIGHT }}>
      <style>{`
        .tysha-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .tysha-reveal.visible { opacity: 1; transform: none; }
        .tysha-delay-1 { transition-delay: 0.1s; }
        .tysha-delay-2 { transition-delay: 0.2s; }
        .tysha-delay-3 { transition-delay: 0.3s; }
        .tysha-card { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); }
        .tysha-card:hover { transform: translateY(-5px); box-shadow: 0 20px 50px rgba(116,143,164,0.2); }
        @keyframes tysha-zoom { from { transform: scale(1); } to { transform: scale(1.06); } }
        .tysha-delay-4 { transition-delay: 0.4s; }
        .tysha-delay-5 { transition-delay: 0.5s; }
        .module-card { transition: opacity 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease; }
        .module-card .mod-num { transition: color 0.4s ease, opacity 0.4s ease; }
        .modules-grid:hover .module-card { opacity: 0.5; }
        .modules-grid:hover .module-card:hover { opacity: 1; transform: translateY(-5px); box-shadow: 0 20px 50px rgba(116,143,164,0.2); }
        .modules-grid:hover .module-card:hover .mod-num { opacity: 0.8 !important; color: ${PRIMARY}; }
        @keyframes countUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 0.1; transform: translateY(0); } }
        .mod-num-animate { animation: countUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
        /* Progress bar */
        .scroll-progress { position: fixed; top: 0; left: 0; height: 2px; background: ${PRIMARY}; z-index: 999; transition: width 0.1s linear; }
        /* Sticky CTA */
        .sticky-cta { position: fixed; bottom: 0; left: 0; right: 0; z-index: 100; transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .sticky-cta.visible { transform: translateY(0); }
        /* Letter animation */
        @keyframes letterIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .tysha-letter { display: inline-block; opacity: 0; }
        .tysha-letter.animate { animation: letterIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>
      <StickyCta />
      <FloatingQuote />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4 flex justify-between items-center backdrop-blur-md" style={{ background: 'rgba(255,254,251,0.95)', borderBottom: `1px solid rgba(116,143,164,0.15)` }}>
        <Link href="/" className="no-underline" aria-label="Олена Богута — на головну">
  <svg width="260" height="32" viewBox="0 0 220 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="20" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontSize="14" fontWeight="200" fill={DARK_ACC} letterSpacing="8">
      ОЛЕНА БОГУТА
    </text>
    <line x1="0" y1="26" x2="220" y2="26" stroke={DARK_ACC} strokeWidth="0.4" opacity="0.3"/>
  </svg>
</Link>
        <div className="hidden md:flex gap-8 items-center">
          {[
            { href: '/navchannya', label: 'Навчання' },
            { href: '/pro-olenku', label: 'Про автора' },
            { href: '/zakrytyi-klub', label: 'Закритий Клуб' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-xs tracking-widest uppercase no-underline hover:opacity-60 transition-opacity" style={{ color: PRIMARY }}>{label}</Link>
          ))}
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase no-underline px-6 py-2 hover:opacity-80 transition-opacity" style={{ background: PRIMARY, color: WHITE }}>
            Записатись
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 pt-[70px] relative overflow-hidden" style={{ background: PRIMARY, minHeight: '100svh' }}>
        <div className="absolute top-8 left-8 w-12 h-12 hidden md:block" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', borderTop: '1px solid rgba(255,255,255,0.2)' }}/>
        <div className="absolute top-8 right-8 w-12 h-12 hidden md:block" style={{ borderRight: '1px solid rgba(255,255,255,0.2)', borderTop: '1px solid rgba(255,255,255,0.2)' }}/>
        <div className="absolute bottom-8 left-8 w-12 h-12 hidden md:block" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}/>
        <div className="absolute bottom-8 right-8 w-12 h-12 hidden md:block" style={{ borderRight: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}/>

        <div className="px-6 md:px-20 py-20 md:py-32 flex flex-col justify-center relative z-10">
          <Link href="/navchannya" className="text-xs tracking-widest uppercase no-underline mb-8 hover:opacity-60 transition-opacity inline-block" style={{ color: 'rgba(255,254,251,0.6)' }}>← Всі навчання</Link>
          <p className="text-xs tracking-[0.35em] uppercase mb-6 tysha-reveal" style={{ color: 'rgba(255,254,251,0.7)' }}>Навчання · 8 тижнів · Premium</p>
          <AnimatedTitle />
          <p className="text-lg md:text-xl leading-relaxed max-w-md mb-4 tysha-reveal tysha-delay-1" style={{ color: 'rgba(255,254,251,0.9)', fontStyle: 'italic' }}>
            Відчуй свою ТИШУ
          </p>
          <p className="text-base leading-relaxed max-w-md mb-10 text-justify tysha-reveal tysha-delay-2" style={{ color: 'rgba(255,254,251,0.75)' }}>
            Навчання, яке змінить твоє ставлення до запусків. Тиша. Зріст. Результат.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 tysha-reveal tysha-delay-3">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline text-center hover:opacity-80 transition-opacity" style={{ background: WHITE, color: PRIMARY }}>
              Заповнити анкету
            </a>
            <a href="#program" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline text-center hover:opacity-80 transition-opacity" style={{ border: `1px solid rgba(255,254,251,0.4)`, color: WHITE }}>
              Програма
            </a>
          </div>
        </div>

        {/* Фото з зум-ефектом */}
        <div className="relative overflow-hidden" style={{ minHeight: 'clamp(300px, 60vw, 100svh)' }}>
          <NextImage
            src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774448751/photo_2026-03-25_15.17.06_sw70mx.jpg"
            alt="ТИША — навчання Олени Богути"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: 'center center', animation: 'tysha-zoom 8s ease-in-out infinite alternate', transformOrigin: 'center center' }}
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${PRIMARY}, transparent 60%)` }}/>
        </div>
      </section>

      {/* ПРО НАВЧАННЯ */}
      <section className="px-6 md:px-20 py-20 md:py-32" style={{ background: LIGHT }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase mb-4 tysha-reveal" style={{ color: PRIMARY }}>Про навчання</p>
            <h2 className="text-4xl md:text-5xl font-medium mb-8 leading-tight tysha-reveal" style={{ fontFamily: 'var(--font-heading)', color: DARK_ACC }}>
              Запуск продукту —<br />
              <em className="italic" style={{ color: PRIMARY }}>це задоволення</em>
            </h2>
          </div>
          <div className="tysha-reveal">
            <p className="text-base leading-relaxed mb-6 text-justify" style={{ color: '#4a6275' }}>
              Я пишаюсь тим, що я ХРИСТИЯНКА і можу навчати інших, таких як я, — ставати найкращими, конкурентоспроможними експертами.
            </p>
            <p className="text-base leading-relaxed text-justify" style={{ color: '#4a6275' }}>
              Багато людей бояться слова «ІНФОПРОДУКТ», а я пишаюсь! ТИША — це авторський підхід, який передає весь мій досвід і спокій у процесі запуску.
            </p>
          </div>
        </div>
      </section>

      {/* ЩО ТАКЕ ТИША — з паралаксом */}
      <section id="tysha-program-section" className="relative py-20 md:py-32 overflow-hidden">
        {/* Фото на весь фон */}
        <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
          <img
            id="tysha-parallax"
            src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774450115/2026-03-25_16.38.52_gdyr5e.jpg"
            alt=""
            className="w-full object-cover"
            style={{
              filter: 'brightness(0.35)',
              position: 'absolute',
              top: '-20%',
              left: 0,
              width: '100%',
              height: '140%',
              willChange: 'transform',
            }}
            loading="lazy"
          />
        </div>

        {/* Контент поверх фото */}
        <div className="relative z-10 px-6 md:px-20">
          <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 tysha-reveal" style={{ color: PRIMARY }}>Що таке</p>
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-6 leading-tight tysha-reveal" style={{ fontFamily: 'var(--font-heading)', color: WHITE }}>
            ТИША — це
          </h2>
          <div className="w-8 h-px mx-auto mb-16" style={{ background: PRIMARY }}/>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px">
            {TYSHA_IS.map((item, i) => (
              <div key={i} className={`p-8 tysha-reveal tysha-delay-${Math.min(i, 3)}`} style={{
                background: 'rgba(255,254,251,0.08)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(116,143,164,0.2)',
              }}>
                <span className="text-5xl font-medium block mb-4" style={{ fontFamily: 'var(--font-heading)', color: PRIMARY, opacity: 0.5 }}>{item.num}</span>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,254,251,0.9)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ДЛЯ КОГО */}
      <section className="px-6 md:px-20 py-20 md:py-32" style={{ background: LIGHT }}>
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 tysha-reveal" style={{ color: PRIMARY }}>Для кого</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight tysha-reveal" style={{ fontFamily: 'var(--font-heading)', color: DARK_ACC }}>
          ТИША створена для<br />
          <em className="italic" style={{ color: PRIMARY }}>експертів</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] max-w-5xl mx-auto">
          {FOR_WHO.map((item, i) => (
            <div key={i} className="p-10 tysha-card tysha-reveal" style={{ background: WHITE, transitionDelay: `${i * 0.1}s`, boxShadow: '0 4px 20px rgba(116,143,164,0.08)' }}>
              <div className="w-8 h-px mb-6" style={{ background: PRIMARY }}/>
              <h3 className="text-xl font-medium mb-4" style={{ fontFamily: 'var(--font-heading)', color: DARK_ACC }}>{item.title}</h3>
              <p className="text-sm leading-relaxed text-justify" style={{ color: '#4a6275' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ПРОГРАМА */}
      <section id="program" className="px-6 md:px-20 py-20 md:py-32" style={{ background: WHITE }}>
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 tysha-reveal" style={{ color: PRIMARY }}>Програма</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight tysha-reveal" style={{ fontFamily: 'var(--font-heading)', color: DARK_ACC }}>
          6 модулів + Запуск
        </h2>
        <div className="modules-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] max-w-6xl mx-auto mb-4">
          {MODULES.map((mod, i) => (
            <div key={mod.num} className="p-8 relative module-card tysha-reveal" style={{ background: LIGHT, transitionDelay: `${i * 0.08}s` }}>
              <ModuleNumber num={mod.num} delay={i * 0.15} />
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: PRIMARY }}>{mod.tag}</p>
              <h3 className="text-lg font-medium mb-4" style={{ color: DARK_ACC }}>{mod.title}</h3>
              <ul className="list-none space-y-1">
                {mod.items.map((item) => (
                  <li key={item} className="text-sm flex items-start gap-2" style={{ color: '#4a6275' }}>
                    <span style={{ color: PRIMARY, flexShrink: 0 }}>—</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ЗАПУСК */}
        <div className="max-w-6xl mx-auto mt-4">
          <div className="flex items-center gap-4 mb-4 tysha-reveal">
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, transparent, ${PRIMARY})` }}/>
            <span className="text-xs tracking-[0.3em] uppercase px-4 py-2" style={{ color: WHITE, background: PRIMARY }}>ЗАПУСК</span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${PRIMARY})` }}/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {LAUNCH_ITEMS.map((item, i) => (
              <div key={i} className="p-8 flex items-start gap-4 tysha-reveal" style={{ background: PRIMARY, transitionDelay: `${i * 0.1}s` }}>
                <span className="text-xl font-medium flex-shrink-0" style={{ color: WHITE, fontFamily: 'var(--font-heading)', opacity: 0.5 }}>0{i + 1}</span>
                <p className="text-base leading-relaxed" style={{ color: WHITE }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* БОНУСИ */}
      <section className="px-6 md:px-20 py-20 md:py-32" style={{ background: LIGHT }}>
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 tysha-reveal" style={{ color: PRIMARY }}>Бонуси</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight tysha-reveal" style={{ fontFamily: 'var(--font-heading)', color: DARK_ACC }}>
          Що ти отримаєш<br />
          <em className="italic" style={{ color: PRIMARY }}>додатково</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] max-w-5xl mx-auto">
          {BONUSES.map((bonus, i) => (
            <div key={i} className="p-8 tysha-card tysha-reveal" style={{ background: WHITE, transitionDelay: `${i * 0.1}s`, boxShadow: '0 4px 20px rgba(116,143,164,0.08)' }}>
              <div className="w-6 h-6 flex items-center justify-center mb-4 rounded-full" style={{ background: PRIMARY }}>
                <span className="text-white text-xs">✓</span>
              </div>
              <h3 className="text-lg font-medium mb-3" style={{ fontFamily: 'var(--font-heading)', color: DARK_ACC }}>{bonus.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#4a6275' }}>{bonus.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Quiz />

      {/* FAQ */}
      <section className="px-6 md:px-20 py-20 md:py-32" style={{ background: WHITE }}>
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 tysha-reveal" style={{ color: PRIMARY }}>FAQ</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight tysha-reveal" style={{ fontFamily: 'var(--font-heading)', color: DARK_ACC }}>
          Питання та відповіді
        </h2>
        <FaqBlock />
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-20 md:py-32 text-center relative overflow-hidden" style={{ background: PRIMARY }}>
        <div className="absolute top-8 left-8 w-10 h-10 hidden md:block" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', borderTop: '1px solid rgba(255,255,255,0.2)' }}/>
        <div className="absolute top-8 right-8 w-10 h-10 hidden md:block" style={{ borderRight: '1px solid rgba(255,255,255,0.2)', borderTop: '1px solid rgba(255,255,255,0.2)' }}/>
        <div className="absolute bottom-8 left-8 w-10 h-10 hidden md:block" style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}/>
        <div className="absolute bottom-8 right-8 w-10 h-10 hidden md:block" style={{ borderRight: '1px solid rgba(255,255,255,0.2)', borderBottom: '1px solid rgba(255,255,255,0.2)' }}/>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-medium mb-6 leading-none tysha-reveal" style={{ fontFamily: 'var(--font-heading)', color: WHITE, letterSpacing: '-0.02em' }}>
            ТИША
          </h2>
          <p className="text-lg mb-4 tysha-reveal" style={{ color: 'rgba(255,254,251,0.85)', fontStyle: 'italic' }}>
            Запусти свій Premium-продукт за 8 тижнів
          </p>
          <p className="text-base mb-10 leading-relaxed tysha-reveal" style={{ color: 'rgba(255,254,251,0.7)', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            Заповни анкету — і ми зв'яжемось з тобою та розкажемо деталі про старт навчання
          </p>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity tysha-reveal" style={{ background: WHITE, color: PRIMARY }}>
            Заповнити анкету
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}