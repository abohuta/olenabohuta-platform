"use client";
import React from "react";
import Link from "next/link";
import Footer from "../../components/Footer";
import Cross from "../../components/Cross";

// ── Constants ──────────────────────────────────────────────
const ACCENT = "#59020B";
const CREAM = "#FEF8E0";
const DARK = "#2A1F14";
const FORM_URL = "https://docs.google.com/forms/d/1GTJ6oijlCOO7GfUMlhvGealas2Vo5GI7bh-uaAljfdQ/edit";

// ── Static data ────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: "Чи підходить кемп якщо я повний новачок?", a: "Так! Кемп починається з нуля — з визначення де ти зараз і побудови фундаменту. Новачки отримують найбільший результат." },
  { q: "Скільки часу займає навчання на тиждень?", a: "В середньому 3–5 годин на тиждень. Всі матеріали залишаються у тебе назавжди." },
  { q: "Чи є розстрочка або часткова оплата?", a: "Так, для деяких тарифів доступна часткова оплата. Напиши нам у Telegram і ми підберемо зручний варіант." },
  { q: "Що якщо я не встигаю за темпом?", a: "Всі записи залишаються у тебе назавжди. Ти можеш повертатися до матеріалів у будь-який час." },
  { q: "Чи отримаю я сертифікат?", a: "Так, після завершення кемпу видається сертифікат про проходження навчання." },
  { q: "Чим кемп відрізняється від звичайного курсу?", a: "Кемп — це не просто відеоуроки. Це жива спільнота, підтримка куратора, живі зустрічі та практичні завдання з зворотним зв'язком." },
];

const BASE_MODULES = [
  { num: "0", tag: "Вступний", title: "Окреслюємо шлях", items: ["Визначаємо, де ти зараз", "Ідея, місія, бачення", "Образ у соцмережах", "Перші кроки до результату", "Активи блогу"] },
  { num: "1", tag: "Перший", title: "Основа та пакування", items: ["Позиціонування та концепція", "ДНК особистого бренду", "ДНК експертності", "Пакування до продажів", "Як не вигоріти"] },
  { num: "2", tag: "Другий", title: "Аудиторія", items: ["Аналіз конкурентів", "Лояльність аудиторії", "Сегментація ЦА", "Продуктова лінійка", "Що захочуть купити"] },
  { num: "3", tag: "Третій", title: "Архітектор контенту", items: ["Рівні та види контенту", "Архітектор сторітелінгу", "Прийоми для сторіс", "Концепція візуалу", "Reels та автоворонки"] },
  { num: "4", tag: "Четвертий", title: "Архітектор Автопрогріву", items: ["Карта особистості та сенсів", "Особистість, яка продає", "Контентна воронка", "Reels-стратегії", "Воронки з хайлайтс"] },
  { num: "5", tag: "П'ятий", title: "Архітектор Продажів", items: ["Фундамент продажів", "Стратегії пошуку клієнтів", "Продажі на теплу аудиторію", "Робота із запереченнями", "Продажі в директ"] },
];

const VIP_MODULES = [
  { num: "6", tag: "Шостий · VIP", title: "Підготовка до запуску", items: ["Аналіз конкурентів та запусків", "Скелет продукту", "Унікальність дорогого продукту", "Декомпозиція та тарифна сітка"] },
  { num: "7", tag: "Сьомий · VIP", title: "Прогріви ТИШІ", items: ["Прогрів. Розбираємо на молекули", "Тригери продаж", "Формати, концепція та структура", "Продажі через сторітелінг"] },
  { num: "8", tag: "Восьмий · VIP", title: "Продажі та продукт у ТИШІ", items: ["Воронка продажів", "Пасивні продажі ManyChat", "Програма безкоштовника", "Продажі у блозі", "Методологія та навчання"] },
];

const PLANS = [
  { tag: "Початківець", title: "Старт", desc: "З куратором — для тих, хто починає з нуля", price: "550", features: ["Доступ до всіх 6 модулів", "Підтримка куратора", "Зворотний зв'язок", "Чат учасників"], featured: false, vip: false },
  { tag: "Експерт", title: "Разом з автором", desc: "Особиста робота з Оленою Богутою", price: "690", features: ["Все з тарифу Старт", "Сесії з автором курсу", "Персональна стратегія", "Пріоритетна підтримка"], featured: true, vip: false },
  { tag: "VIP", title: "Запуск", desc: "Повний супровід запуску інфопродукту", price: "990", features: ["Все з тарифу Експерт", "3 VIP-модулі (6,7,8)", "Стратегія запуску продукту", "VIP-уроки з воронок", "Особистий супровід"], featured: false, vip: true },
] as const;

const REVIEW_IMAGES = [
  "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360071/1_sqzdzx.jpg",
  "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360076/2_fgkaqz.jpg",
  "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360072/3_k0uscc.jpg",
  "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360072/4_y34lkj.jpg",
  "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360073/5_odf9r5.jpg",
  "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360074/6_cmxrfg.jpg",
  "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360074/7_kuyqjj.jpg",
  "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_400/v1774360075/8_uuqd5v.jpg",
];

const RESULTS = [
  "Почнеш вести особистий блог із чіткою концепцією, місією та позиціонуванням",
  "Запустиш свою нішу в напрямку експертного християнського блогу",
  "Розпочнеш продавати свої послуги через особистий бренд та контент",
  "Запустиш свій перший інфопродукт із готовою воронкою продажів",
  "Станеш впливовим християнином, чий голос змінює серця й аудиторію",
  "Удосконалиш комунікативні навички та прокачаєш впевненість у собі",
  "Побудуєш лояльну аудиторію яка довіряє і купує",
  "Річна підписка на Закритий клуб",
];

const FOR_WHO = [
  { title: "Починаєш вести блог", desc: "Хочеш розпочати особистий християнський блог, але не знаєш, з чого почати, як упакувати себе і дійти до першого результату." },
  { title: "Експерт із покликанням", desc: "Вже маєш знання та послуги, але хочеш вибудувати системний особистий бренд і почати продавати з позиції цінностей." },
  { title: "Плануєш запускати інформаційні продукти", desc: "Ти експерт у своїй ніші та хочеш зробити успішний запуск, або вдосконалити навики у воронках продажів." },
];

// ── Single unified IntersectionObserver hook ──────────────
function useAnimations() {
  React.useEffect(() => {
    // 1. Reveal elements
    const revealEls = document.querySelectorAll('.kemp-reveal');
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    // 2. Plan cards with staggered delay
    const planCards = document.querySelectorAll('.plan-card');
    const planObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const delay = parseFloat(el.dataset.delay ?? '0') * 1000;
          setTimeout(() => el.classList.add('visible'), delay);
          planObserver.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    planCards.forEach((el) => planObserver.observe(el));

    // 3. Parallax on scroll
    const bg = document.getElementById('parallax-bg') as HTMLElement | null;
    const section = document.getElementById('results-section') as HTMLElement | null;
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
      planObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);
}

function Quiz() {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [result, setResult] = React.useState<string | null>(null);

  const questions = [
    {
      q: "Який у тебе досвід у блогінгу?",
      options: [
        "Ніколи не вів блог",
        "Є акаунт але не веду регулярно",
        "Веду блог але без системи",
        "Маю аудиторію 5k+ і хочу монетизувати",
      ],
      scores: [0, 2, 2, 3],
    },
    {
      q: "Яка твоя головна мета?",
      options: [
        "Зрозуміти з чого почати",
        "Упакувати себе як експерта",
        "Запустити власний інфопродукт",
        "Отримати стратегію особисто",
      ],
      scores: [0, 2, 3, 1],
    },
    {
      q: "Чи є у тебе конкретна проблема яку потрібно вирішити швидко?",
      options: [
        "Не знаю як позиціонувати себе на ринку",
        "Застрягла на одному рівні і не розумію чому",
        "Хочу розібратись з конкретним інструментом (Reels, воронки, директ)",
        "Ні — хочу системне навчання від А до Я",
      ],
      scores: [1, 1, 1, 2],
    },
    {
      q: "Як ти себе ідентифікуєш?",
      options: [
        "Християнин який хоче впливати через контент",
        "Підприємець який хоче продавати онлайн",
        "Служитель який хоче розширити вплив",
        "Вже продаю і хочу масштабуватись",
      ],
      scores: [2, 2, 2, 3],
    },
    {
      q: "Скільки часу готовий інвестувати на тиждень?",
      options: [
        "До 2 годин на тиждень",
        "3-5 годин на тиждень",
        "Готовий повністю зануритись",
        "Хочу швидкий результат 1:1",
      ],
      scores: [0, 2, 3, 1],
    },
    {
      q: "Де ти зараз знаходишся?",
      options: [
        "Не знаю про що писати і як себе позиціонувати",
        "Маю ідеї але не знаю як їх упакувати",
        "Є аудиторія але не знаю як монетизувати",
        "Хочу запустити курс або марафон",
      ],
      scores: [0, 2, 2, 3],
    },
  ];

  const results: Record<string, { title: string; desc: string; cta: string; href: string }> = {
    pochatok: {
      title: "Твій старт — «Початок» 🌱",
      desc: "Ти ще на початку шляху — і це чудово! Курс «Початок» допоможе збудувати фундамент перед тим як переходити до Архітектора бренду.",
      cta: "Переглянути «Початок»",
      href: "/products/pochatok",
    },
    kemp: {
      title: "Кемп — саме для тебе! ✨",
      desc: "Ти готовий до серйозної роботи над особистим брендом. Кемп «Архітектор Бренду» дасть тобі систему, стратегію і результат.",
      cta: "Заповнити анкету",
      href: "https://docs.google.com/forms/d/1GTJ6oijlCOO7GfUMlhvGealas2Vo5GI7bh-uaAljfdQ/edit",
    },
    tysha: {
      title: "Ти готовий до ТИШІ! 🔥",
      desc: "У тебе вже є база — час масштабуватись. Навчання ТИША допоможе запустити Premium-продукт і вийти на новий рівень доходу.",
      cta: "Переглянути ТИШУ",
      href: "/products/tysha",
    },
    konsultatsii: {
      title: "Тобі потрібна особиста стратегія 🎯",
      desc: "Твій запит унікальний. Запишись на консультацію з Оленою — разом визначимо найкращий шлях саме для тебе.",
      cta: "Записатись на консультацію",
      href: "/products/konsultatsii",
    },
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    if (step < questions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      const total = newAnswers.reduce((a, b) => a + b, 0);
      // Якщо людина обрала конкретну проблему (score=1 у питанні 5) — консультація
      const hasSpecificProblem = newAnswers[4] === 1;
      if (hasSpecificProblem) {
        setResult('konsultatsii');
      } else if (total <= 4) {
        setResult('pochatok');
      } else if (total <= 10) {
        setResult('kemp');
      } else {
        setResult('tysha');
      }
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); };

  return (
    <section id="quiz" className="px-6 md:px-20 py-20 md:py-32" style={{ background: '#FDF5D5' }}>
      <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 kemp-reveal" style={{ color: ACCENT }}>Тест</p>
      <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 leading-tight kemp-reveal" style={{ fontFamily: 'var(--font-heading)', color: DARK }}>
        Чи підходить тобі<br />
        <em className="italic" style={{ color: ACCENT }}>Архітектор Бренду?</em>
      </h2>
      <p className="text-base text-center mb-12 kemp-reveal" style={{ color: '#8B6F52' }}>6 питань — і ти отримаєш чесну відповідь</p>

      <div className="max-w-2xl mx-auto">
        {result ? (
          <div className="p-10 text-center" style={{ background: CREAM, border: `1px solid rgba(89,2,11,0.1)` }}>
            <h3 className="text-2xl font-medium mb-4" style={{ fontFamily: 'var(--font-heading)', color: DARK }}>{results[result].title}</h3>
            <p className="text-base leading-relaxed mb-8 text-justify" style={{ color: '#5A3A3A' }}>{results[result].desc}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              
               <a href={results[result].href}
                target={results[result].href.startsWith('http') ? '_blank' : undefined}
                className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity"
                style={{ background: ACCENT, color: CREAM }}
              >
                {results[result].cta}
              </a>
              <button
                onClick={reset}
                className="inline-block px-10 py-4 text-xs tracking-widest uppercase cursor-pointer hover:opacity-60 transition-opacity bg-transparent"
                style={{ color: ACCENT, border: `1px solid ${ACCENT}` }}
              >
                Пройти знову
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-12" style={{ background: CREAM, border: `1px solid rgba(89,2,11,0.1)` }}>
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-8">
              {questions.map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full transition-colors duration-300" style={{ background: i <= step ? ACCENT : 'rgba(89,2,11,0.15)' }} />
              ))}
            </div>

            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: ACCENT }}>Питання {step + 1} з {questions.length}</p>
            <h3 className="text-xl md:text-2xl font-medium mb-8" style={{ fontFamily: 'var(--font-heading)', color: DARK }}>
              {questions[step].q}
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {questions[step].options.map((option, i) => (
                <button
                  key={`${step}-${i}`}
                  onClick={() => handleAnswer(questions[step].scores[i])}
                  className="text-left px-6 py-4 text-sm cursor-pointer transition-all bg-transparent"
                  style={{ border: `1px solid rgba(89,2,11,0.15)`, color: '#5A3A3A' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = ACCENT;
                    (e.currentTarget as HTMLElement).style.color = CREAM;
                    (e.currentTarget as HTMLElement).style.borderColor = ACCENT;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = '#5A3A3A';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(89,2,11,0.15)';
                  }}
                  onTouchStart={(e) => {
                    (e.currentTarget as HTMLElement).style.background = ACCENT;
                    (e.currentTarget as HTMLElement).style.color = CREAM;
                    (e.currentTarget as HTMLElement).style.borderColor = ACCENT;
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
        <div key={i} style={{ borderBottom: '1px solid rgba(89,2,11,0.15)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left py-5 flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer"
          >
            <span style={{ fontSize: '1rem', color: DARK, fontFamily: 'var(--font-heading)' }}>{item.q}</span>
            <span style={{ color: ACCENT, fontSize: '1.2rem', flexShrink: 0 }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#5A3A3A', paddingBottom: '1.25rem', textAlign: 'justify' }}>{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function Carousel() {
  const total = REVIEW_IMAGES.length;
  const slides = [REVIEW_IMAGES[total - 1], ...REVIEW_IMAGES, REVIEW_IMAGES[0]];
  const [current, setCurrent] = React.useState(1);
  const [animated, setAnimated] = React.useState(true);
  const [cardWidth, setCardWidth] = React.useState(336);
  const touchStartX = React.useRef(0);

  React.useEffect(() => {
    const update = () => setCardWidth(window.innerWidth < 768 ? 296 : 336);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const prev = () => { setAnimated(true); setCurrent((p) => p - 1); };
  const next = () => { setAnimated(true); setCurrent((p) => p + 1); };

  const handleTransitionEnd = () => {
    if (current === slides.length - 1) { setAnimated(false); setCurrent(1); }
    else if (current === 0) { setAnimated(false); setCurrent(total); }
  };

  React.useEffect(() => {
    if (!animated) {
      const t = setTimeout(() => setAnimated(true), 20);
      return () => clearTimeout(t);
    }
  }, [animated]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) next(); else prev(); }
  };

  const dotIndex = (current - 1 + total) % total;

  return (
    <div className="relative">
      <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div
          className="flex gap-4"
          style={{ transform: `translateX(-${current * cardWidth}px)`, transition: animated ? 'transform 500ms ease' : 'none' }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((src, i) => (
            <div key={i} className="flex-none w-[280px] md:w-[320px] rounded-sm overflow-hidden aspect-[9/16]">
              <img src={src} alt={`Відгук ${((i - 1 + total) % total) + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
      <button onClick={prev} aria-label="Попередній відгук" className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 hidden md:flex items-center justify-center hover:opacity-80 transition-opacity z-10" style={{ background: DARK, color: CREAM }}>←</button>
      <button onClick={next} aria-label="Наступний відгук" className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 hidden md:flex items-center justify-center hover:opacity-80 transition-opacity z-10" style={{ background: DARK, color: CREAM }}>→</button>
      <div className="flex justify-center gap-0 mt-6">
        {REVIEW_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setAnimated(true); setCurrent(i + 1); }}
            aria-label={`Відгук ${i + 1}`}
            className="p-3 bg-transparent border-none cursor-pointer"
          >
            <span className="block w-2 h-2 rounded-full transition-colors" style={{ background: i === dotIndex ? ACCENT : '#C4B49A' }} />
          </button>
        ))}
      </div>
      <p className="text-xs text-center mt-2 md:hidden tracking-widest uppercase" style={{ color: '#C4B49A' }}>Гортай пальцем →</p>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function Kemp() {
  useAnimations();

  return (
    <main className="w-full overflow-x-hidden" style={{ background: CREAM }}>
      <style>{`
        .kemp-reveal{opacity:0;transform:translateY(20px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
        .kemp-reveal.visible{opacity:1;transform:none}
        .kemp-reveal-delay-1{transition-delay:.1s}
        .kemp-reveal-delay-2{transition-delay:.2s}
        .kemp-reveal-delay-3{transition-delay:.3s}
        .vip-module{transition:all .4s cubic-bezier(.16,1,.3,1)}
        .vip-module:hover{transform:translateY(-4px);box-shadow:0 20px 50px rgba(89,2,11,.25)}
        .base-module{transition:all .4s cubic-bezier(.16,1,.3,1)}
        .base-module:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(89,2,11,.12)}
        .plan-card{opacity:0;transform:translateY(40px) scale(.97);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1),box-shadow .4s ease}
        .plan-card.visible{opacity:1;transform:translateY(0) scale(1)}
        .plan-card.visible:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 30px 70px rgba(89,2,11,.25)!important}
        .for-who-card{transition:all .4s cubic-bezier(.16,1,.3,1);box-shadow:0 4px 20px rgba(89,2,11,.06)}
        .for-who-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(89,2,11,.14)}
        .plan-btn-gold{transition:all .3s cubic-bezier(.16,1,.3,1)}
        .plan-btn-gold:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(184,147,106,.4)}
        .kemp-link{position:relative;text-decoration:none}
        .kemp-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:#59020B;transition:width .3s ease}
        .kemp-link:hover::after{width:100%}
        @keyframes heroZoom{from{transform:scale(1)}to{transform:scale(1.06)}}
      `}</style>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4 flex justify-between items-center backdrop-blur-md" style={{ background: 'rgba(254,248,224,0.95)', borderBottom: '1px solid rgba(89,2,11,0.1)' }}>
        <Link href="/" className="no-underline group" aria-label="Олена Богута — на головну">
  <svg width="260" height="32" viewBox="0 0 220 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="20" fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif" fontSize="14" fontWeight="200" fill="#2A1F14" letterSpacing="8">
      ОЛЕНА БОГУТА
    </text>
    <line x1="0" y1="26" x2="220" y2="26" stroke="#2A1F14" strokeWidth="0.4" opacity="0.3"/>
  </svg>
</Link>
        <div className="hidden md:flex gap-8">
          {[{ href: '/navchannya', label: 'Навчання' }, { href: '/pro-olenku', label: 'Про автора' }, { href: '/zakrytyi-klub', label: 'Закритий Клуб' }].map(({ href, label }) => (
            <Link key={href} href={href} className="text-xs tracking-widest uppercase no-underline hover:opacity-60 transition-opacity kemp-link" style={{ color: DARK }}>{label}</Link>
          ))}
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="text-xs tracking-widest uppercase no-underline border-b" style={{ color: ACCENT, borderColor: ACCENT }}>Залишити заявку</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 pt-[70px]" style={{ background: '#59020B', minHeight: '100svh' }}>
        <div className="px-6 md:px-20 py-20 md:py-32 flex flex-col justify-center items-center text-center">
          <Link href="/navchannya" className="text-xs tracking-widest uppercase no-underline mb-8 hover:opacity-60 transition-opacity" style={{ color: 'rgba(254,248,224,0.6)' }}>← Всі навчання</Link>
          <p className="text-xs tracking-[0.35em] uppercase mb-6 kemp-reveal" style={{ color: '#F5D5A0' }}>Кемп · Навчання · Особистий бренд</p>
          <div className="flex justify-center mb-8">
            <img src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774359948/architect_zhdzma.png" alt="Кемп Архітектор Бренду" width={300} height={220} style={{ height: '220px', width: 'auto', filter: 'brightness(0) invert(1) sepia(1) saturate(0.5) hue-rotate(5deg)', opacity: 0.9 }} />
          </div>
          <p className="text-lg md:text-xl leading-relaxed max-w-md mb-10 text-justify kemp-reveal kemp-reveal-delay-2" style={{ color: 'rgba(254,248,224,0.85)' }}>
            Навчання для християн, які хочуть розвивати особистий бренд, вести блог та продавати свої послуги з цінностями й сенсом.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 kemp-reveal kemp-reveal-delay-3 justify-center">
            <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline text-center hover:opacity-80 transition-opacity" style={{ background: CREAM, color: '#59020B' }}>Заповнити анкету</a>
            <a href="#program" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline text-center hover:opacity-80 transition-opacity" style={{ border: `1px solid ${CREAM}`, color: CREAM }}>Програма</a>
          </div>
        </div>
        <div className="relative overflow-hidden" style={{ minHeight: 'clamp(300px, 60vw, 100svh)' }}>
          <img src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774359840/hero_olenka_lmwbqv.webp" alt="Олена Богута" className="absolute inset-0 w-full h-full object-cover" fetchPriority="high" style={{ objectPosition: 'center 20%', animation: 'heroZoom 8s ease-in-out infinite alternate', transformOrigin: 'center top' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(89,2,11,0.4), transparent)' }} />
        </div>
      </section>

      {/* ДЛЯ КОГО */}
      <section className="px-6 md:px-20 py-20" style={{ background: '#FDF5D5' }}>
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 kemp-reveal" style={{ color: ACCENT }}>Для кого</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight kemp-reveal" style={{ color: DARK, fontFamily: 'var(--font-heading)' }}>
          Цей кемп — для тебе,<br />якщо ти...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] max-w-6xl mx-auto">
          {FOR_WHO.map((item, i) => (
            <div key={item.title} className="p-10 kemp-reveal for-who-card" style={{ background: CREAM, transitionDelay: `${i * 0.1}s` }}>
              <h3 className="text-2xl font-medium mb-4" style={{ color: DARK, fontFamily: 'var(--font-heading)' }}>{item.title}</h3>
              <p className="text-base leading-relaxed text-justify" style={{ color: '#5A3A3A' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* РЕЗУЛЬТАТИ */}
      <section className="relative py-20 md:py-32 overflow-hidden" id="results-section">
        <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
          <img id="parallax-bg" src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774359853/results_olenka_uhgo1i.webp" loading="lazy" alt="" className="w-full object-cover" style={{ filter: 'brightness(0.25)', position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%', willChange: 'transform' }} />
        </div>
        <div className="relative z-10 px-6 md:px-20">
          <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 kemp-reveal" style={{ color: '#B8936A' }}>Результати</p>
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight kemp-reveal" style={{ color: CREAM, fontFamily: 'var(--font-heading)' }}>Що ти отримаєш після кемпу</h2>
          <div className="max-w-3xl mx-auto">
            {RESULTS.map((result, i) => (
              <div key={i} className="flex items-start gap-8 py-5 kemp-reveal" style={{ borderBottom: '1px solid rgba(184,147,106,0.2)', transitionDelay: `${i * 0.08}s` }}>
                <span className="min-w-[50px] font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: '#B8936A', opacity: 0.6, lineHeight: 1 }}>0{i + 1}</span>
                <p className="text-base leading-relaxed pt-1" style={{ color: CREAM }}>{result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОГРАМА */}
      <section id="program" className="px-6 md:px-20 py-20 md:py-32" style={{ background: CREAM }}>
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 kemp-reveal" style={{ color: ACCENT }}>Програма</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-4 leading-tight kemp-reveal" style={{ color: DARK, fontFamily: 'var(--font-heading)' }}>6 модулів — від основи до запуску</h2>
        <p className="text-center mb-16 kemp-reveal" style={{ color: '#8B6F52', fontSize: '0.9rem' }}>+ 3 VIP-модулі для тарифу Запуск</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] max-w-6xl mx-auto mb-4">
          {BASE_MODULES.map((mod) => (
            <div key={mod.num} className="p-8 relative kemp-reveal base-module" style={{ background: '#FDF5D5' }}>
              <span className="absolute top-4 right-6 font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', color: ACCENT, opacity: 0.22, lineHeight: 1 }}>{mod.num}</span>
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: ACCENT }}>{mod.tag}</p>
              <h3 className="text-lg font-medium mb-4" style={{ color: DARK }}>{mod.title}</h3>
              <ul className="list-none space-y-1">
                {mod.items.map((item) => <li key={item} className="text-sm" style={{ color: '#7A5A5A' }}>— {item}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-8">
          <div className="flex items-center gap-4 mb-6 kemp-reveal">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, #59020B)' }} />
            <span className="text-xs tracking-[0.3em] uppercase px-4 py-2" style={{ color: CREAM, background: '#59020B' }}>VIP тариф — Запуск</span>
            <div className="flex-1 h-px" style={{ background: `linear-gradient(to left, transparent, ${ACCENT})` }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
            {VIP_MODULES.map((mod) => (
              <div key={mod.num} className="p-8 relative vip-module kemp-reveal" style={{ background: '#59020B', border: '1px solid rgba(254,248,224,0.15)' }}>
                <span className="absolute top-4 right-6 font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', color: '#FEF8E0', opacity: 0.06, lineHeight: 1 }}>{mod.num}</span>
                <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: '#F5D5A0' }}>{mod.tag}</p>
                <h3 className="text-lg font-medium mb-4" style={{ color: CREAM }}>{mod.title}</h3>
                <ul className="list-none space-y-2">
                  {mod.items.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2" style={{ color: '#C4B49A' }}>
                      <span style={{ color: '#B8936A', marginTop: '2px', flexShrink: 0 }}>✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ТАРИФИ */}
      <section className="px-6 md:px-20 py-20 md:py-32" style={{ background: '#FDF5D5' }}>
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 kemp-reveal" style={{ color: ACCENT }}>Тарифи</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight kemp-reveal" style={{ color: DARK, fontFamily: 'var(--font-heading)' }}>Обери свій формат</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto items-stretch">
          {PLANS.map((plan, i) => (
            <div
              key={plan.title}
              className="p-10 relative plan-card"
              data-delay={`${i * 0.18}`}
              style={{
                background: plan.featured ? '#59020B' : CREAM,
                boxShadow: plan.featured ? '0 32px 80px rgba(89,2,11,0.35)' : '0 4px 20px rgba(89,2,11,0.06)',
                zIndex: plan.featured ? 2 : 1,
              }}
            >
              {plan.featured && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase px-5 py-1.5 whitespace-nowrap" style={{ background: '#B8936A', color: '#FEF8E0', letterSpacing: '0.2em' }}>Популярний</span>}
              {plan.vip && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase px-5 py-1.5 whitespace-nowrap" style={{ background: '#59020B', color: '#FEF8E0', letterSpacing: '0.2em' }}>VIP</span>}
              <p className="text-xs tracking-[0.35em] uppercase mb-2" style={{ color: plan.featured ? '#F5D5A0' : '#59020B' }}>{plan.tag}</p>
              <h3 className="text-2xl font-medium mb-2" style={{ fontFamily: 'var(--font-heading)', color: plan.featured ? CREAM : DARK, fontSize: '1.8rem' }}>{plan.title}</h3>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: plan.featured ? 'rgba(254,248,224,0.7)' : '#7A5A5A' }}>{plan.desc}</p>
              <div className="mb-1">
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '3.5rem', fontWeight: 500, color: plan.featured ? CREAM : DARK, lineHeight: 1 }}>
                  <span style={{ fontSize: '1.2rem', verticalAlign: 'super' }}>$</span>{plan.price}
                </span>
              </div>
              <p className="text-xs mb-8" style={{ color: plan.featured ? 'rgba(254,248,224,0.5)' : '#8B6F52' }}>USD · повна оплата</p>
              <ul className="list-none space-y-3 mb-10">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm flex items-center gap-2" style={{ color: plan.featured ? 'rgba(254,248,224,0.8)' : '#5A3A3A' }}>
                    <Cross size={12} color={plan.featured ? '#B8936A' : '#59020B'} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="block text-center py-3.5 text-xs tracking-widest uppercase no-underline plan-btn-gold"
                style={{
                  background: plan.featured ? '#B8936A' : plan.vip ? '#59020B' : 'transparent',
                  color: plan.featured ? '#FEF8E0' : plan.vip ? CREAM : DARK,
                  border: plan.featured ? 'none' : plan.vip ? 'none' : `1px solid ${DARK}`,
                  letterSpacing: '0.2em',
                }}
              >
                Залишити заявку
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ПРО АВТОРА */}
      <section className="px-6 md:px-20 py-20 md:py-32" style={{ background: CREAM }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden kemp-reveal">
            <img src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774359881/about_olenka_fq9fxo.webp" loading="lazy" alt="Олена Богута" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(254,248,224,0.3), transparent)' }} />
          </div>
          <div className="kemp-reveal">
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT }}>Автор кемпу</p>
            <h2 className="text-4xl md:text-5xl font-medium mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: DARK }}>
              Олена<br /><em className="italic" style={{ color: ACCENT }}>Богута</em>
            </h2>
            <p className="text-sm mb-6" style={{ color: '#8B6F52', letterSpacing: '0.1em' }}>Засновниця · Наставник · Архітектор брендів</p>
            <p className="text-base leading-relaxed mb-6 text-justify" style={{ color: '#5A3A3A' }}>Олена допомагає християнам будувати особистий бренд, який відображає їхнє покликання. Її підхід поєднує глибоку віру, стратегічне мислення та практичні інструменти соцмереж.</p>
            <p className="text-base leading-relaxed mb-8 text-justify" style={{ color: '#5A3A3A' }}>Понад 400 клієнтів та учнів. Засновниця першого в Україні навчання для християн у соцмережах.</p>
            <div className="flex gap-4">
              {[
                { href: 'https://t.me/olenabohuta', label: 'Telegram', color: ACCENT },
                { href: 'https://www.instagram.com/olenka.bohuta', label: 'Instagram', color: ACCENT },
                { href: '/pro-olenku', label: 'Детальніше →', color: '#8B6F52' },
              ].map(({ href, label, color }) => (
                <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} className="text-xs tracking-widest uppercase no-underline border-b pb-1 hover:opacity-60 transition-opacity kemp-link" style={{ color, borderColor: color }}>{label}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ВІДГУКИ */}
      <section className="px-6 md:px-20 py-20" style={{ background: '#FDF5D5', overflow: 'hidden' }}>
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 kemp-reveal" style={{ color: ACCENT }}>Відгуки</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight kemp-reveal" style={{ color: DARK, fontFamily: 'var(--font-heading)' }}>Що кажуть учасники</h2>
        <Carousel />
        <div className="text-center mt-10 kemp-reveal">
          
          <a href="https://www.instagram.com/olenabohuta_camp?igsh=dnZwaHA4c2ZsaG1s"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase no-underline hover:opacity-70 transition-opacity pb-1"
            style={{ color: ACCENT, borderBottom: `1px solid ${ACCENT}` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            Більше відгуків в Instagram
          </a>
        </div>
      </section>

      <Quiz />

      {/* Q&A */}
      <section className="px-6 md:px-20 py-20 md:py-32" style={{ background: CREAM }}>
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 kemp-reveal" style={{ color: ACCENT }}>FAQ</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight kemp-reveal" style={{ color: DARK, fontFamily: 'var(--font-heading)' }}>Питання та відповіді</h2>
        <FaqBlock />
        <div className="text-center mt-12 kemp-reveal">
          <p className="text-base mb-6" style={{ color: '#8B6F52' }}>Не знайшли відповідь?</p>
          <a href="https://t.me/olenabohuta" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity" style={{ border: `1px solid ${DARK}`, color: DARK }}>Написати в Telegram</a>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-20 md:py-32 text-center relative overflow-hidden" style={{ background: DARK }}>
        <div className="absolute top-6 left-6 w-8 h-8 hidden md:block" style={{ borderLeft: '1px solid rgba(184,147,106,0.3)', borderTop: '1px solid rgba(184,147,106,0.3)' }}/>
        <div className="absolute top-6 right-6 w-8 h-8 hidden md:block" style={{ borderRight: '1px solid rgba(184,147,106,0.3)', borderTop: '1px solid rgba(184,147,106,0.3)' }}/>
        <div className="absolute bottom-6 left-6 w-8 h-8 hidden md:block" style={{ borderLeft: '1px solid rgba(184,147,106,0.3)', borderBottom: '1px solid rgba(184,147,106,0.3)' }}/>
        <div className="absolute bottom-6 right-6 w-8 h-8 hidden md:block" style={{ borderRight: '1px solid rgba(184,147,106,0.3)', borderBottom: '1px solid rgba(184,147,106,0.3)' }}/>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6 kemp-reveal"><Cross size={28} color="#B8936A" /></div>
          <p className="text-xs tracking-[0.35em] uppercase mb-4 kemp-reveal" style={{ color: '#C4B49A' }}>Починаємо</p>
          <h2 className="text-4xl md:text-6xl font-medium mb-8 leading-tight kemp-reveal" style={{ color: CREAM, fontFamily: 'var(--font-heading)' }}>
            Готовий(а) стати<br /><em className="italic" style={{ color: '#B8936A' }}>Архітектором</em><br />свого бренду?
          </h2>
          <p className="text-lg mb-10 leading-relaxed kemp-reveal" style={{ color: '#C4B49A', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            Заповни анкету передзапису — і ми зв'яжемося з тобою з деталями про старт та умови участі.
          </p>
          <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity kemp-reveal" style={{ background: ACCENT, color: CREAM }}>
            Заповнити анкету передзапису
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}