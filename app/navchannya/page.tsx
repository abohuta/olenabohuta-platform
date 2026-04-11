"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import { useReveal } from "../hooks/useReveal";

const ACCENT = "#B8936A";
const DARK = "#2A1F14";
const CREAM = "#F9F5EF";
const WARM_WHITE = "#FDFBF8";
const LIGHT_TEXT = "#5E4838";

type FilterKey = "all" | "free" | "beginner" | "mid" | "advanced";

interface Item {
  id: string;
  type: "free" | "paid";
  tag: string;
  title: string;
  desc: string;
  price: string;
  social: string;
  href: string;
  active: boolean;
  color: string;
  stages: FilterKey[];
}

// Додавай сюди нові продукти — вони автоматично з'являться в каталозі та фільтрах
const ITEMS: Item[] = [
  {
    id: "typy",
    type: "free",
    tag: "Урок",
    title: "Які типи блогів будуть зростати в Instagram",
    desc: "Відео-урок: знайди свій тип блогу — і не копіюй чужу модель. Підготовка до Кемпу.",
    price: "Безкоштовно",
    social: "Відео",
    href: "/products/typy-khrystyianskykh-blohiv",
    active: true,
    color: ACCENT,
    stages: ["free", "mid"],
  },
  {
    id: "era",
    type: "free",
    tag: "Майстер-клас",
    title: "Ера можливостей: як заробляти в Instagram",
    desc: "Мислення, холодна воронка і техніка — як зробити $2 000, працюючи менше.",
    price: "Безкоштовно",
    social: "Відео",
    href: "/products/era-mozhlyvostei",
    active: true,
    color: "#748fa4",
    stages: ["free", "advanced"],
  },
  {
    id: "shlyakh",
    type: "paid",
    tag: "Марафон",
    title: "Шлях",
    desc: "Марафон дисципліни за біблійними принципами тиші. Практичний курс для тих, хто хоче змінити своє життя — звички, мислення, фокус.",
    price: "550 грн",
    social: "9 модулів · дисципліна",
    href: "/products/shlyakh",
    active: true,
    color: "#adb6cf",
    stages: ["beginner"],
  },
  {
    id: "pochatok",
    type: "paid",
    tag: "Тренінг",
    title: "Початок",
    desc: "Тренінг для тих, хто хоче запустити особистий блог з нуля — від ідеї до першої аудиторії.",
    price: "Скоро",
    social: "Для початківців",
    href: "/products/pochatok",
    active: false,
    color: ACCENT,
    stages: ["beginner"],
  },
  {
    id: "kemp",
    type: "paid",
    tag: "Кемп",
    title: "Кемп Архітектор Бренду",
    desc: "Навчання для тих, хто хоче вибудувати особистий бренд, вести блог і продавати послуги з цінностями й сенсом.",
    price: "від $550",
    social: "200+ учасниць",
    href: "/products/kemp",
    active: true,
    color: "#59020B",
    stages: ["mid"],
  },
  {
    id: "tysha",
    type: "paid",
    tag: "Курс",
    title: "Тиша",
    desc: "8-тижневий курс по запусках та автоворонках. Система, яка дозволяє продавати системно — через контент, а не щоденний хаос.",
    price: "від $550",
    social: "Флагманська програма",
    href: "/products/tysha",
    active: true,
    color: "#748fa4",
    stages: ["advanced"],
  },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "Всі" },
  { key: "free", label: "Безкоштовно" },
  { key: "beginner", label: "Без досвіду" },
  { key: "mid", label: "Середній рівень" },
  { key: "advanced", label: "Просунутий рівень" },
];

const MARQUEE_ITEMS = [
  "200+ учасниць",
  "$7 000+ результати учениць",
  "5 програм",
  "Для Christian-блогерів",
  "Онлайн · у своєму темпі",
  "Особиста підтримка автора",
];

const HERO_STATS = [
  { num: "200+", label: "учасниць програм" },
  { num: "$7K+", label: "результати учениць" },
  { num: "5", label: "програм навчання" },
  { num: "3+", label: "роки онлайн-навчання" },
];

const faq = [
  {
    q: "З чого почати, якщо я повний новачок?",
    a: "Почни з безкоштовного уроку — він допоможе зрозуміти свій тип блогу. Далі: марафон «Шлях» або тренінг «Початок» — залежно від того, де ти зараз.",
  },
  {
    q: "Чим відрізняється Кемп від Тиші?",
    a: "Кемп — про побудову бренду з нуля: позиціонування, аудиторія, контент, перші продажі. Тиша — про запуски і воронки для тих, хто вже має бренд і хоче системно монетизувати.",
  },
  {
    q: "Чи є розстрочка або часткова оплата?",
    a: "Так, для деяких програм доступна часткова оплата. Напишіть у Telegram і ми підберемо зручний варіант.",
  },
  {
    q: "Як відбувається навчання?",
    a: "Онлайн — відеоуроки, матеріали, живі зустрічі та підтримка куратора або автора залежно від тарифу. Матеріали залишаються назавжди.",
  },
  {
    q: "Як зрозуміти яка програма підходить мені?",
    a: "Напиши Олені в Telegram — вона особисто відповість і підбере програму під твою ситуацію.",
  },
];

export default function Navchannya() {
  useReveal();
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredItems =
    activeFilter === "all"
      ? ITEMS
      : ITEMS.filter((item) => item.stages.includes(activeFilter));

  const getCount = (key: FilterKey) =>
    key === "all"
      ? ITEMS.length
      : ITEMS.filter((i) => i.stages.includes(key)).length;

  const activeLabel = FILTERS.find((f) => f.key === activeFilter)?.label ?? "Всі";

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-[var(--dark)] pt-[70px] relative overflow-hidden">
        {/* Background photo */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1775908998/olenka_couse_light_uwmjnw.webp)`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            filter: "blur(3px) brightness(0.35)",
            transform: "scale(1.05)",
          }}
        />
        {/* Gradient overlay — stronger on left so text stays readable */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "linear-gradient(90deg, rgba(42,31,20,0.85) 0%, rgba(42,31,20,0.5) 60%, rgba(42,31,20,0.3) 100%)",
          }}
        />
        <div className="px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch relative z-10">

          {/* Left */}
          <div className="flex flex-col justify-center py-16 md:py-20 md:pr-16">
            <p className="reveal text-xs tracking-[0.35em] uppercase mb-6" style={{ color: ACCENT }}>
              Навчання
            </p>
            <h1
              className="reveal reveal-delay-1 text-5xl md:text-6xl font-light text-[var(--cream)] leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Твоя історія<br />
              <em className="italic" style={{ color: ACCENT }}>тільки починається</em>
            </h1>
            <p className="reveal reveal-delay-2 text-lg text-[var(--taupe)] max-w-xl leading-relaxed mb-10">
              Практичні програми для Christian-блогерів — від першого посту до системної монетизації.
            </p>
            <div className="reveal reveal-delay-3">
              <Link
                href="#catalog"
                className="inline-block px-10 py-4 text-xs tracking-widest uppercase hover:opacity-80 transition-opacity"
                style={{ background: ACCENT, color: "#fff" }}
              >
                Обрати програму →
              </Link>
            </div>
          </div>

          {/* Right: stats grid — desktop only */}
          <div
            className="hidden md:grid grid-cols-2 border-l border-[rgba(196,180,154,0.08)]"
            style={{ gridTemplateRows: "1fr 1fr", paddingTop: "96px", paddingBottom: "48px" }}
          >
            {HERO_STATS.map((stat, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} flex flex-col justify-center p-8`}
                style={{
                  borderBottom: i < 2 ? "1px solid rgba(196,180,154,0.08)" : undefined,
                  borderRight: i % 2 === 0 ? "1px solid rgba(196,180,154,0.08)" : undefined,
                }}
              >
                <p
                  className="text-4xl md:text-5xl font-light mb-1 leading-none"
                  style={{ color: ACCENT, fontFamily: "var(--font-heading)" }}
                >
                  {stat.num}
                </p>
                <p className="text-sm text-[var(--taupe)]">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div
        className="overflow-hidden py-4 border-y border-[rgba(184,147,106,0.2)]"
        style={{ background: CREAM }}
      >
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-xs tracking-[0.3em] uppercase flex-shrink-0 inline-flex items-center"
              style={{ color: LIGHT_TEXT, marginRight: "3rem" }}
            >
              {item}
              <span className="ml-3" style={{ color: ACCENT }}>×</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── CATALOG + FILTERS ── */}
      <section id="catalog" className="py-20 md:py-28" style={{ background: WARM_WHITE }}>
        <div className="px-6 md:px-20 max-w-6xl mx-auto">

          <p className="reveal text-xs tracking-[0.35em] uppercase mb-3" style={{ color: ACCENT }}>
            Програми
          </p>
          <h2
            className="reveal text-3xl md:text-4xl font-light mb-12 leading-tight"
            style={{ color: DARK, fontFamily: "var(--font-heading)" }}
          >
            Знайди свою програму
          </h2>

          <div className="flex flex-col md:flex-row gap-0 md:gap-16 items-start">

            {/* ── SIDEBAR (desktop) ── */}
            <aside className="w-full md:w-48 flex-shrink-0 md:sticky" style={{ top: "96px" }}>

              <div className="hidden md:block">
                <p
                  className="text-xs tracking-widest uppercase mb-4 pb-3"
                  style={{ color: LIGHT_TEXT, opacity: 0.5, borderBottom: "1px solid rgba(42,31,20,0.1)" }}
                >
                  Рівень
                </p>
                <div className="flex flex-col">
                  {FILTERS.map((f) => {
                    const isActive = activeFilter === f.key;
                    const count = getCount(f.key);
                    return (
                      <button
                        key={f.key}
                        onClick={() => setActiveFilter(f.key)}
                        className="text-left flex items-center justify-between py-3 text-sm transition-all duration-200"
                        style={{
                          color: isActive ? DARK : LIGHT_TEXT,
                          fontWeight: isActive ? 500 : 400,
                          background: "none",
                          border: "none",
                          borderBottom: "1px solid rgba(42,31,20,0.07)",
                          borderLeft: `2px solid ${isActive ? ACCENT : "transparent"}`,
                          paddingLeft: isActive ? "10px" : "0",
                          cursor: "pointer",
                          transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                        }}
                      >
                        <span>{f.label}</span>
                        <span className="text-xs ml-3" style={{ color: LIGHT_TEXT, opacity: 0.4 }}>{count}</span>
                      </button>
                    );
                  })}
                </div>
                {activeFilter !== "all" && (
                  <button
                    onClick={() => setActiveFilter("all")}
                    className="mt-5 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
                    style={{ color: ACCENT, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    ↺ Скинути фільтр
                  </button>
                )}
              </div>

              {/* ── MOBILE FILTER BUTTON ── */}
              <div className="md:hidden mb-8">
                <button
                  onClick={() => setMobileFiltersOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-5 py-4 text-xs tracking-widest uppercase transition-all duration-300"
                  style={{
                    background: mobileFiltersOpen ? DARK : "transparent",
                    color: mobileFiltersOpen ? CREAM : DARK,
                    border: `1px solid ${mobileFiltersOpen ? DARK : "rgba(42,31,20,0.2)"}`,
                    cursor: "pointer",
                    transition: "background 0.35s cubic-bezier(0.16,1,0.3,1), color 0.35s ease, border-color 0.35s ease",
                  }}
                >
                  <span>
                    {activeFilter === "all" ? "Фільтрувати" : activeLabel}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      transform: mobileFiltersOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
                      color: mobileFiltersOpen ? CREAM : ACCENT,
                    }}
                  >
                    ↓
                  </span>
                </button>

                {/* Dropdown panel */}
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: mobileFiltersOpen ? "400px" : "0",
                    transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1)",
                    borderTop: "none",
                    borderRight: mobileFiltersOpen ? `1px solid rgba(42,31,20,0.1)` : "1px solid transparent",
                    borderBottom: mobileFiltersOpen ? `1px solid rgba(42,31,20,0.1)` : "1px solid transparent",
                    borderLeft: mobileFiltersOpen ? `1px solid rgba(42,31,20,0.1)` : "1px solid transparent",
                  }}
                >
                  <div style={{ background: WARM_WHITE }}>
                    {FILTERS.map((f) => {
                      const isActive = activeFilter === f.key;
                      const count = getCount(f.key);
                      return (
                        <button
                          key={f.key}
                          onClick={() => {
                            setActiveFilter(f.key);
                            setMobileFiltersOpen(false);
                          }}
                          className="w-full text-left flex items-center justify-between px-5 py-4 text-sm transition-all duration-200"
                          style={{
                            background: isActive ? `${ACCENT}12` : "transparent",
                            color: isActive ? DARK : LIGHT_TEXT,
                            fontWeight: isActive ? 500 : 400,
                            borderBottom: "1px solid rgba(42,31,20,0.06)",
                            borderLeft: `3px solid ${isActive ? ACCENT : "transparent"}`,
                            paddingLeft: isActive ? "18px" : "20px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <span>{f.label}</span>
                          <span className="text-xs" style={{ color: LIGHT_TEXT, opacity: 0.4 }}>{count}</span>
                        </button>
                      );
                    })}
                    {activeFilter !== "all" && (
                      <button
                        onClick={() => {
                          setActiveFilter("all");
                          setMobileFiltersOpen(false);
                        }}
                        className="w-full text-left px-5 py-3 text-xs tracking-widest uppercase"
                        style={{ color: ACCENT, background: "none", border: "none", cursor: "pointer" }}
                      >
                        ↺ Скинути фільтр
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </aside>

            {/* ── ITEMS LIST ── */}
            <div className="flex-1 min-w-0">
              {filteredItems.length === 0 ? (
                <p className="py-16 text-sm" style={{ color: LIGHT_TEXT }}>
                  Нічого не знайдено
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {filteredItems.map((item) => (
                    <CourseRow key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── КОНСУЛЬТАЦІЇ ── */}
      <section className="px-6 md:px-20 py-12" style={{ background: CREAM }}>
        <div className="max-w-6xl mx-auto">
          <Link
            href="/products/konsultatsii"
            className="reveal group flex flex-col md:flex-row md:items-center justify-between gap-6 no-underline overflow-hidden"
            style={{
              background: CREAM,
              border: `1px solid rgba(42,31,20,0.1)`,
              transition: "background 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `${ACCENT}18`;
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = `0 12px 40px ${ACCENT}30`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = CREAM;
              el.style.transform = "";
              el.style.boxShadow = "";
            }}
          >
            {/* Mobile: color top bar */}
            <div className="md:hidden w-full" style={{ height: "4px", background: ACCENT }} />

            {/* Desktop: accent bar */}
            <div className="hidden md:block flex-shrink-0 self-stretch" style={{ width: "6px", background: ACCENT }} />

            <div className="flex-1 p-6 md:py-7 md:pl-6">
              <p className="text-xs tracking-widest uppercase mb-3" style={{ color: ACCENT }}>
                Хочеш пройти швидше?
              </p>
              <h3
                className="text-2xl md:text-4xl font-medium mb-2 leading-snug text-center md:text-left"
                style={{ color: DARK, fontFamily: "var(--font-heading)" }}
              >
                Особиста консультація з Оленою
              </h3>
              <p className="text-sm leading-relaxed max-w-xl text-center md:text-left" style={{ color: LIGHT_TEXT }}>
                Замість того щоб шукати відповідь самостійно — одна сесія дає чіткий напрямок, стратегію і план дій саме для тебе.
              </p>
            </div>

            <div className="px-6 pb-6 pt-2 md:py-7 md:pr-7 md:pl-0 flex-shrink-0">
              <span
                className="text-xs tracking-widest uppercase whitespace-nowrap group-hover:tracking-[0.2em] transition-all duration-300"
                style={{ color: ACCENT, borderBottom: `1px solid ${ACCENT}` }}
              >
                Детальніше →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 md:px-20 py-20" style={{ background: DARK }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="reveal text-xs tracking-[0.35em] uppercase mb-4" style={{ color: ACCENT }}>
            Ще не визначилась?
          </p>
          <h2
            className="reveal text-3xl md:text-4xl font-light mb-4 leading-tight text-[var(--cream)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Олена підбере програму особисто
          </h2>
          <p className="reveal text-base leading-relaxed mb-8 text-[var(--taupe)]">
            Напиши в Telegram — і за кілька хвилин отримаєш відповідь яка програма підходить саме тобі.
          </p>
          <div className="reveal flex flex-wrap justify-center gap-4">
            <a
              href="https://t.me/olenabohuta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 text-xs tracking-widest uppercase hover:opacity-80 transition-opacity"
              style={{ background: ACCENT, color: "#fff" }}
            >
              Написати в Telegram →
            </a>
            <button
              onClick={() => {
                const el = document.getElementById("catalog");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block px-8 py-4 text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
              style={{
                color: "rgba(254,248,224,0.5)",
                border: "1px solid rgba(254,248,224,0.15)",
                background: "none",
                cursor: "pointer",
              }}
            >
              ↑ До програм
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FaqSection items={faq} title="Питання та відповіді" />

      <Footer />
    </main>
  );
}

function CourseRow({ item }: { item: Item }) {
  const isFree = item.type === "free";

  const inner = (
    <div className="flex flex-col md:flex-row md:items-center gap-0 w-full">
      {/* Color accent bar — desktop only */}
      <div
        className="hidden md:block flex-shrink-0 self-stretch"
        style={{ width: "6px", background: item.color, opacity: item.active ? 1 : 0.4 }}
      />

      {/* Mobile: color top bar */}
      <div
        className="md:hidden w-full"
        style={{ height: "4px", background: item.color, opacity: item.active ? 1 : 0.4 }}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0 p-6 md:py-7 md:pl-6">
        <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-3">
          <span
            className="text-xs tracking-widest uppercase px-3 py-1 font-medium"
            style={{ background: item.color, color: "#fff" }}
          >
            {item.tag}
          </span>
          {isFree && (
            <span
              className="text-xs tracking-widest uppercase px-3 py-1"
              style={{ background: "rgba(184,147,106,0.15)", color: ACCENT }}
            >
              Безкоштовно
            </span>
          )}
          <span className="text-xs" style={{ color: LIGHT_TEXT, opacity: 0.5 }}>
            {item.social}
          </span>
        </div>
        <h3
          className="text-2xl md:text-3xl font-light leading-snug mb-2 transition-colors duration-300 text-center md:text-left"
          style={{
            color: item.active ? DARK : LIGHT_TEXT,
            fontFamily: "var(--font-heading)",
          }}
        >
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed max-w-lg text-center md:text-left" style={{ color: LIGHT_TEXT }}>
          {item.desc}
        </p>
      </div>

      {/* Price + CTA */}
      <div className="flex md:flex-col items-center justify-between md:justify-center gap-3 flex-shrink-0 md:min-w-[130px] px-6 pb-6 pt-2 md:py-7 md:pr-7 md:pl-0">
        <p
          className="text-2xl font-light"
          style={{ color: item.active ? DARK : LIGHT_TEXT, fontFamily: "var(--font-heading)" }}
        >
          {item.price}
        </p>
        {item.active ? (
          <span
            className="text-xs tracking-widest uppercase whitespace-nowrap group-hover:tracking-[0.2em] transition-all duration-300"
            style={{ color: item.color, borderBottom: `1px solid ${item.color}` }}
          >
            {isFree ? "Дивитись →" : "Детальніше →"}
          </span>
        ) : (
          <span className="text-xs tracking-widest uppercase opacity-40" style={{ color: DARK }}>
            Незабаром
          </span>
        )}
      </div>
    </div>
  );

  const baseCard: React.CSSProperties = {
    background: CREAM,
    opacity: item.active ? 1 : 0.45,
    overflow: "hidden",
    border: `1px solid rgba(42,31,20,0.1)`,
    transition: "background 0.35s cubic-bezier(0.16,1,0.3,1), transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease",
  };

  if (!item.active) {
    return (
      <div style={{ ...baseCard, pointerEvents: "none" }}>
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className="group block no-underline"
      style={baseCard}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = `${item.color}20`;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = `0 12px 40px ${item.color}30`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = CREAM;
        el.style.transform = "";
        el.style.boxShadow = "";
      }}
    >
      {inner}
    </Link>
  );
}
