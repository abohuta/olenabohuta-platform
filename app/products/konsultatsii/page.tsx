"use client";
import React from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cross from "../../components/Cross";
import { useReveal } from "../../hooks/useReveal";

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  React.useEffect(() => {
    if (!started) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return { count, ref };
}

function StatCard({ num, suffix, label }: { num: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(num);
  return (
    <div ref={ref} className="text-center">
      <p className="font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--accent)' }}>
        {count}{suffix}
      </p>
      <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--taupe)', opacity: 0.6 }}>{label}</p>
    </div>
  );
}

const TOPICS = [
  { num: "01", title: "Розбір особистого бренду", desc: "Глибокий аналіз твого бренду — позиціонування, голос, візуал, меседж. Отримаєш чіткий план що змінити і як." },
  { num: "02", title: "Контент-стратегія", desc: "Розробка персональної стратегії контенту — теми, формати, частота, воронки. Контент який продає без нав'язування." },
  { num: "03", title: "Запуск продукту", desc: "Стратегія запуску інфопродукту або послуги — від ідеї до продажів. Прогріви, воронки, тарифна сітка." },
  { num: "04", title: "Аудит блогу", desc: "Детальний розбір твого Instagram — що працює, що заважає рости, конкретні рекомендації для покращення." },
  { num: "05", title: "Позиціонування", desc: "Допомагаю знайти унікальну нішу і сформулювати чіткий меседж який притягує потрібну аудиторію." },
  { num: "06", title: "Стратегія розвитку", desc: "Довгострокова стратегія розвитку особистого бренду — цілі, етапи, інструменти, монетизація." },
  { num: "07", title: "Продажі в блозі", desc: "Як продавати через контент органічно і екологічно. Воронки, прогріви, директ-продажі." },
  { num: "08", title: "SMM-консалтинг для бізнесу", desc: "Стратегія присутності бізнесу в соцмережах — контент-план, тональність, зростання аудиторії." },
];

const BOOKING_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdueHegCm2zqt8JqdFqR1PhQLSciV21ARAxy0YhkyuA0_azTw/viewform?usp=header";

const PRICING = [
  {
    title: "Міні-консультація",
    duration: "30 хв",
    price: "45",
    oldPrice: null,
    savings: null,
    icon: "◈",
    desc: "Швидка відповідь на конкретне питання. Підходить якщо потрібна порада без глибокого занурення.",
    features: ["Відповідь на одне конкретне питання", "Zoom або Telegram", "Короткі рекомендації"],
    featured: false,
  },
  {
    title: "Пакет сесій",
    duration: "3–5 зустрічей",
    price: "200",
    oldPrice: "270",
    savings: "26",
    icon: "◉",
    desc: "Серія консультацій з домашніми завданнями між сесіями. Для системних змін і запуску продукту.",
    features: ["Серія зустрічей", "Домашні завдання між сесіями", "Запис кожної сесії", "Підтримка у чаті", "Особистий супровід"],
    featured: false,
  },
  {
    title: "Разова консультація",
    duration: "60–90 хв",
    price: "70–90",
    oldPrice: null,
    savings: null,
    icon: "◇",
    desc: "Одна зустріч у Zoom або Telegram. Ідеально для конкретного запиту — розбір, аудит, стратегія.",
    features: ["Глибокий розбір запиту", "Zoom або Telegram", "Зворотний зв'язок після зустрічі", "Запис консультації"],
    featured: false,
  },
];

const FAQ_ITEMS = [
  { q: "Як проходить консультація?", a: "Онлайн у Zoom або Telegram. Після запису ти отримаєш бриф для заповнення — це допоможе підготуватись і провести зустріч максимально ефективно." },
  { q: "Яка вартість консультації?", a: "Міні-консультація (30 хв) — $45. Разова консультація (60–90 хв) — $70–90. Пакет сесій (3–5 зустрічей) — $200 (замість $270)." },
  { q: "Чи буде запис консультації?", a: "Так, за бажанням консультація записується і надсилається тобі після зустрічі." },
  { q: "Скільки людей вже консультувалось?", a: "Понад 400 клієнтів та учнів пройшли через консультації і навчання Олени." },
  { q: "Чи можна отримати консультацію письмово?", a: "Так, є формат письмової консультації у Telegram — надсилаєш запитання, отримуєш детальну відповідь з рекомендаціями." },
];

function FaqBlock() {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <div className="max-w-3xl mx-auto">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i} style={{ borderBottom: '1px solid rgba(196,180,154,0.3)' }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left py-5 flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer"
          >
            <span className="text-base" style={{ color: 'var(--dark)', fontFamily: 'var(--font-heading)' }}>{item.q}</span>
            <span style={{ color: 'var(--accent)', fontSize: '1.2rem', flexShrink: 0 }}>{open === i ? '−' : '+'}</span>
          </button>
          {open === i && (
            <p className="text-sm leading-relaxed pb-5 text-justify" style={{ color: 'var(--light-text)' }}>{item.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Konsultatsii() {
  useReveal();

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-[70px] bg-[var(--dark)] relative overflow-hidden">
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="deco-line absolute left-1/2 top-0 bottom-0 hidden md:block" style={{height:'100%'}}/>

        <div className="px-6 md:px-20 py-20 md:py-32 flex flex-col justify-center relative z-10">
          <Link href="/navchannya" className="text-xs tracking-widest uppercase no-underline mb-8 hover:opacity-60 transition-opacity inline-block" style={{ color: 'rgba(196,180,154,0.6)' }}>← Всі навчання</Link>
          <p className="text-xs tracking-[0.35em] uppercase mb-6 reveal" style={{ color: 'var(--accent)' }}>Особиста робота · 1:1</p>
          <h1 className="font-medium leading-tight mb-6 reveal" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: 'var(--cream)', lineHeight: 0.95 }}>
            Консуль<br />
            <em className="italic" style={{ color: 'var(--accent)' }}>тації</em>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-md mb-10 text-justify reveal" style={{ color: 'var(--taupe)' }}>
            Особиста робота з Оленою над твоїм брендом, стратегією та контентом. Індивідуальний підхід до кожного запиту.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 reveal">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline text-center hover:opacity-80 transition-opacity" style={{ background: 'var(--accent)', color: 'white' }}>
              Записатись
            </a>
            <a href="#topics" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline text-center hover:opacity-80 transition-opacity" style={{ border: '1px solid rgba(196,180,154,0.4)', color: 'var(--taupe)' }}>
              Теми консультацій
            </a>
          </div>

          {/* Статистика — мобільна версія */}
          <div className="grid grid-cols-4 gap-4 mt-10 md:hidden reveal">
            {[
              { num: 400, suffix: '+', label: 'Клієнтів' },
              { num: 8, suffix: '', label: 'Років' },
              { num: 10, suffix: 'K+', label: 'Підписн.' },
              { num: 10, suffix: '+', label: 'Курсів' },
            ].map((stat) => (
              <StatCard key={stat.label} num={stat.num} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>

        {/* Права частина — декоративна */}
        <div className="hidden md:flex items-center justify-center relative z-10">
          <div className="text-center px-12">
            <div className="flex justify-center mb-8">
              <Cross size={40} color="var(--accent)" />
            </div>
            <div className="w-8 h-px bg-[var(--accent)] mx-auto mb-8"/>
            <p className="font-medium mb-4" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--cream)', fontStyle: 'italic' }}>
              "Твій бренд — це не те що ти робиш.<br />Це те, ким ти є."
            </p>
            <p className="text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--taupe)' }}>Олена Богута</p>
            <div className="w-8 h-px bg-[var(--accent)] mx-auto mt-8"/>

            {/* Статистика */}
            <div className="grid grid-cols-2 gap-8 mt-12">
              {[
                { num: 400, suffix: '+', label: 'Клієнтів' },
                { num: 8, suffix: '', label: 'Років досвіду' },
                { num: 10, suffix: 'K+', label: 'Підписників' },
                { num: 10, suffix: '+', label: 'Курсів' },
              ].map((stat) => (
                <StatCard key={stat.label} num={stat.num} suffix={stat.suffix} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ЦІНА */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--dark)] relative overflow-hidden">
        <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="max-w-5xl mx-auto relative z-10">
          <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 reveal" style={{ color: 'var(--taupe)' }}>Формати · Вартість</p>
          <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)' }}>
            Обери свій<br />
            <em className="italic" style={{ color: 'var(--accent)' }}>формат</em>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
            {PRICING.map((plan, i) => (
              <div key={plan.title} className={`relative flex flex-col reveal${plan.savings ? ' md:-mt-3' : ''}`} style={{
                padding: plan.savings ? '2.75rem 2.5rem 2.5rem' : '2.5rem',
                background: plan.featured ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
                border: plan.savings
                  ? '1px solid rgba(184,147,106,0.7)'
                  : plan.featured ? 'none' : '1px solid rgba(196,180,154,0.12)',
                transitionDelay: `${i * 0.15}s`,
                transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease',
                boxShadow: plan.savings
                  ? '0 8px 40px rgba(184,147,106,0.22), inset 0 0 0 1px rgba(184,147,106,0.15)'
                  : plan.featured
                    ? '0 8px 40px rgba(184,147,106,0.35)'
                    : '0 4px 24px rgba(0,0,0,0.25)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-8px)';
                el.style.boxShadow = plan.savings
                  ? '0 28px 70px rgba(184,147,106,0.4), inset 0 0 0 1px rgba(184,147,106,0.3)'
                  : plan.featured
                    ? '0 24px 60px rgba(184,147,106,0.5)'
                    : '0 24px 60px rgba(0,0,0,0.45)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = '';
                el.style.boxShadow = plan.savings
                  ? '0 8px 40px rgba(184,147,106,0.22), inset 0 0 0 1px rgba(184,147,106,0.15)'
                  : plan.featured
                    ? '0 8px 40px rgba(184,147,106,0.35)'
                    : '0 4px 24px rgba(0,0,0,0.25)';
              }}
              >
                {plan.savings && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs tracking-widest uppercase px-5 py-1.5 whitespace-nowrap" style={{ background: 'var(--dark)', color: 'var(--accent)', letterSpacing: '0.18em', border: '1px solid rgba(184,147,106,0.5)' }}>
                    ✦ Найвигідніше · -{plan.savings}%
                  </span>
                )}
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl" style={{ color: plan.savings ? 'var(--accent)' : 'rgba(196,180,154,0.5)' }}>{plan.icon}</span>
                  <p className="text-xs tracking-[0.35em] uppercase" style={{ color: plan.featured ? 'rgba(255,255,255,0.7)' : plan.savings ? 'var(--accent)' : 'var(--taupe)' }}>{plan.duration}</p>
                </div>
                <h3 className="font-medium mb-3" style={{ fontFamily: 'var(--font-heading)', fontSize: plan.savings ? '1.75rem' : '1.5rem', color: plan.featured ? 'white' : 'var(--cream)' }}>{plan.title}</h3>
                <p className="text-sm leading-relaxed mb-6 text-justify" style={{ color: plan.featured ? 'rgba(255,255,255,0.7)' : 'rgba(196,180,154,0.55)' }}>{plan.desc}</p>
                <div className="w-full h-px mb-6" style={{ background: plan.savings ? 'rgba(184,147,106,0.25)' : 'rgba(196,180,154,0.1)' }} />
                <div className="mb-1 flex items-end gap-3">
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: plan.savings ? '3.5rem' : '3rem', fontWeight: 500, color: plan.featured ? 'white' : 'var(--cream)', lineHeight: 1 }}>
                    <span style={{ fontSize: '1.1rem', verticalAlign: 'super' }}>$</span>{plan.price}
                  </span>
                  {plan.oldPrice && (
                    <span className="text-lg mb-1" style={{ color: 'rgba(196,180,154,0.45)', textDecoration: 'line-through' }}>${plan.oldPrice}</span>
                  )}
                </div>
                <p className="text-xs mb-8" style={{ color: plan.featured ? 'rgba(255,255,255,0.6)' : 'rgba(196,180,154,0.5)' }}>USD</p>
                <ul className="list-none space-y-3 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="text-sm flex items-center gap-2" style={{ color: plan.featured ? 'rgba(255,255,255,0.85)' : 'rgba(196,180,154,0.7)' }}>
                      <Cross size={11} color={plan.featured ? 'white' : 'var(--accent)'} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="block text-center py-3.5 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity" style={{
                  background: plan.featured ? 'white' : 'transparent',
                  color: plan.featured ? 'var(--accent)' : 'var(--cream)',
                  border: plan.featured ? 'none' : '1px solid rgba(196,180,154,0.4)',
                }}>
                  Записатись
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-8 reveal" style={{ color: 'rgba(196,180,154,0.5)' }}>
            Або напиши напряму —{' '}
            <a href="https://t.me/olenabohuta" target="_blank" rel="noopener noreferrer" className="no-underline border-b" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>Telegram</a>
          </p>
        </div>
      </section>

      {/* ТЕМИ */}
      <section id="topics" className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)]">
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 reveal" style={{ color: 'var(--accent)' }}>Теми</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>
          З чим я можу<br />
          <em className="italic" style={{ color: 'var(--accent)' }}>допомогти</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] max-w-4xl mx-auto">
          {TOPICS.map((topic, i) => (
            <div key={topic.num} className="p-8 relative reveal" style={{ background: 'var(--cream)', transitionDelay: `${i * 0.07}s`, transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--sand)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--cream)'; (e.currentTarget as HTMLElement).style.transform = ''; }}
            >
              <span className="absolute top-4 right-6 font-medium" style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', color: 'var(--accent)', opacity: 0.42, lineHeight: 1 }}>{topic.num}</span>
              <h3 className="text-lg font-medium mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>{topic.title}</h3>
              <p className="text-sm leading-relaxed text-justify" style={{ color: 'var(--light-text)' }}>{topic.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ПРО АВТОРА */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--sand)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--accent)' }}>Твій ментор</p>
            <h2 className="text-4xl md:text-5xl font-medium mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)', lineHeight: 0.95 }}>
              Олена<br />
              <em className="italic" style={{ color: 'var(--accent)' }}>Богута</em>
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--brown)', letterSpacing: '0.1em' }}>Засновниця · Наставник · Архітектор брендів</p>
            <p className="text-base leading-relaxed mb-6 text-justify" style={{ color: 'var(--text)' }}>
              Магістр практичної психології. Експерт з розвитку особистого бренду для християн. Понад 400 клієнтів та учнів.
            </p>
            <p className="text-base leading-relaxed mb-8 text-justify" style={{ color: 'var(--text)' }}>
              Засновниця першого в Україні навчання для християн у соцмережах. 8 років досвіду у SMM та особистому брендингу.
            </p>
            <div className="flex gap-4">
              <Link href="/pro-olenku" className="text-xs tracking-widest uppercase no-underline border-b pb-1 hover:opacity-60 transition-opacity" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>Детальніше про автора →</Link>
            </div>
          </div>
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden reveal">
            <img
              src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774359969/Olena_Bohuta_htaxhd.webp"
              alt="Олена Богута"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(232,223,208,0.3), transparent)' }}/>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)]">
        <p className="text-xs tracking-[0.35em] uppercase text-center mb-4 reveal" style={{ color: 'var(--accent)' }}>FAQ</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>
          Питання та відповіді
        </h2>
        <FaqBlock />
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--accent)] text-center">
        <p className="text-xs tracking-[0.35em] uppercase mb-4 reveal" style={{ color: 'rgba(255,255,255,0.7)' }}>Починаємо</p>
        <h2 className="text-4xl md:text-6xl font-medium mb-8 leading-tight reveal" style={{ fontFamily: 'var(--font-heading)', color: 'white' }}>
          Запишись на<br />
          <em className="italic">консультацію</em>
        </h2>
        <p className="text-lg mb-10 leading-relaxed reveal" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
          Заповни анкету — і ми підберемо оптимальний формат та час для роботи разом.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity" style={{ background: 'white', color: 'var(--accent)' }}>
            Заповнити анкету
          </a>
          <a href="https://t.me/olenabohuta" target="_blank" rel="noopener noreferrer" className="inline-block px-12 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity" style={{ border: '1px solid rgba(255,255,255,0.4)', color: 'white' }}>
            Telegram
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}