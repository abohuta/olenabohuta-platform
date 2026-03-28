"use client";
import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import FaqSection from "../components/FaqSection";
import CtaButton from "../components/CtaButton";

const products = [
  {
    id: 1,
    title: "Кемп Архітектор Бренду",
    desc: "Навчання для християн які хочуть розвивати особистий бренд, вести блог та продавати послуги з цінностями й сенсом.",
    tag: "Кемп",
    level: "Середній",
    topic: "Бренд",
    price: "від $550",
    href: "/products/kemp",
  },
  {
    id: 2,
    title: "Шлях",
    desc: "Марафон дисципліни за біблійними принципами тиші. Практичний курс для тих, хто хоче змінити своє життя.",
    tag: "Марафон",
    level: "Початківець",
    topic: "Духовність",
    price: "Скоро",
    href: "/products/shlyakh",
  },
  {
    id: 3,
    title: "Початок",
    desc: "Тренінг для християн, що прагнуть запустити блог з нуля та вийти на першу аудиторію.",
    tag: "Тренінг",
    level: "Початківець",
    topic: "Блог",
    price: "Скоро",
    href: "/products/pochatok",
  },
  {
    id: 4,
    title: "Тиша",
    desc: "Навчання по зупусках та автоворонках для тих, хто хоче системно продавати через контент.",
    tag: "Курс",
    level: "Просунутий",
    topic: "Продажі",
    price: "Скоро",
    href: "/products/tysha",
  },
  {
    id: 5,
    title: "Консультації",
    desc: "Особиста робота з Оленою над твоїм брендом, стратегією та контентом.",
    tag: "Сесія",
    level: "Допомога",
    topic: "Бренд",
    price: "За запитом",
    href: "/products/konsultatsii",
  },
];

const levels = ["Всі", "Початківець", "Середній", "Просунутий", "Допомога"];
const topics = ["Всі", "Бренд", "Блог", "Продажі", "Духовність"];

const faq = [
  {
    q: "Чи підходить навчання якщо я повний новачок?",
    a: "Так! Курси 'Початок' та 'Шлях' створені спеціально для тих, хто тільки починає. Ми йдемо крок за кроком від самого початку.",
  },
  {
    q: "Як відбувається навчання?",
    a: "Навчання проходить онлайн — відеоуроки, матеріали, живі зустрічі та підтримка куратора або автора залежно від тарифу.",
  },
  {
    q: "Чи є розстрочка або часткова оплата?",
    a: "Так, для деяких програм доступна часткова оплата. Напишіть нам у Telegram і ми підберемо зручний варіант.",
  },
  {
    q: "Скільки часу займає навчання на тиждень?",
    a: "В середньому 3-5 годин на тиждень. Всі матеріали залишаються у тебе назавжди, тому темп можна регулювати самостійно.",
  },
  {
    q: "Чи отримаю я сертифікат після завершення?",
    a: "Так, після завершення курсу видається сертифікат про проходження навчання.",
  },
];

export default function Navchannya() {
  const [activeLevel, setActiveLevel] = React.useState("Всі");
  const [activeTopic, setActiveTopic] = React.useState("Всі");

  const filtered = products.filter((p) => {
    const levelMatch = activeLevel === "Всі" || p.level === activeLevel;
    const topicMatch = activeTopic === "Всі" || p.topic === activeTopic;
    return levelMatch && topicMatch;
  });

  return (
    <main className="w-full overflow-x-hidden">

      {/* НАВІГАЦІЯ */}
      <Navbar />

      {/* HERO */}
      <section className="px-6 md:px-20 py-32 md:py-40 bg-[var(--dark)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-6">Навчання</p>
        <h1 className="text-5xl md:text-7xl font-light text-[var(--cream)] leading-tight mb-6 max-w-3xl">
          Навчання для тих,<br />
          <em className="italic text-[var(--accent)]">хто будує з вірою</em>
        </h1>
        <p className="text-lg md:text-xl text-[var(--taupe)] max-w-xl leading-relaxed mb-10 text-justify">
          Практичні програми для християн які хочуть розвивати особистий бренд, запускати блог та монетизувати експертність.
        </p>
        <Link href="#catalog" className="inline-block px-10 py-4 bg-[var(--accent)] text-white no-underline text-xs tracking-widest uppercase hover:bg-[var(--brown)] transition-colors">
          Переглянути навчання
        </Link>
      </section>

      {/* ЩО ОТРИМАЄШ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--cream)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4">Результати</p>
        <h2 className="text-4xl md:text-5xl font-light text-center text-[var(--dark)] mb-16 leading-tight">
          Що ти отримаєш від навчання
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] max-w-5xl mx-auto">
          {[
            { num: "01", title: "Чітку стратегію", desc: "Персональний план розвитку бренду з конкретними кроками і дедлайнами" },
            { num: "02", title: "Живу спільноту", desc: "Доступ до ком'юніті однодумців-християн які підтримують і надихають" },
            { num: "03", title: "Практичні навички", desc: "Інструменти для створення контенту, воронок продажів та монетизації" },
            { num: "04", title: "Особистий бренд", desc: "Упакований профіль який відображає твої цінності і залучає потрібну аудиторію" },
            { num: "05", title: "Перші продажі", desc: "Системний підхід до продажів через контент без відчуття нав'язування" },
            { num: "06", title: "Підтримку ментора", desc: "Зворотний зв'язок від Олени або куратора на кожному етапі навчання" },
          ].map((item) => (
            <div key={item.num} className="bg-[var(--warm-white)] p-8 hover:-translate-y-1 transition-transform">
              <p className="text-4xl font-light text-[var(--taupe)] opacity-40 mb-4">{item.num}</p>
              <h3 className="text-xl font-normal text-[var(--dark)] mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--light-text)] text-justify">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <CtaButton text="Записатися на консультацію" href="https://t.me/olenabohuta" newTab={true} variant="secondary" />
        </div>
      </section>

      {/* КАТАЛОГ */}
      <section id="catalog" className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4">Каталог</p>
        <h2 className="text-4xl md:text-5xl font-light text-center text-[var(--dark)] mb-12 leading-tight">
          Всі програми навчання
        </h2>

        {/* ФІЛЬТРИ */}
        <div className="max-w-5xl mx-auto mb-10 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs tracking-widest uppercase text-[var(--light-text)] mr-2">Рівень:</span>
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-colors border ${
                  activeLevel === level
                    ? "bg-[var(--dark)] text-[var(--cream)] border-[var(--dark)]"
                    : "bg-transparent text-[var(--light-text)] border-[var(--sand)] hover:border-[var(--dark)]"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs tracking-widest uppercase text-[var(--light-text)] mr-2">Тема:</span>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-colors border ${
                  activeTopic === topic
                    ? "bg-[var(--accent)] text-white border-[var(--accent)]"
                    : "bg-transparent text-[var(--light-text)] border-[var(--sand)] hover:border-[var(--accent)]"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* КАРТКИ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] max-w-5xl mx-auto">
          {filtered.length > 0 ? filtered.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              desc={product.desc}
              tag={product.tag}
              level={product.level}
              price={product.price}
              href={product.href}
            />
          )) : (
            <div className="col-span-3 text-center py-16">
              <p className="text-lg text-[var(--light-text)]">За цими фільтрами нічого не знайдено.</p>
            </div>
          )}
        </div>
      </section>

      {/* ПАРТНЕРИ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--sand)]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-4">Партнерство</p>
            <h2 className="text-4xl md:text-5xl font-light text-[var(--dark)] leading-tight mb-6">
              Запрошую<br />
              <em className="italic text-[var(--accent)]">менторів</em><br />
              та викладачів
            </h2>
            <p className="text-lg leading-relaxed text-[var(--light-text)] mb-8 text-justify">
              Якщо ти Christian-експерт у своїй ніші і хочеш ділитися знаннями — долучайся до платформи як викладач або ментор. Разом ми будуємо найсильніше Christian-освітнє ком'юніті в Україні.
            </p>
            <a href="https://t.me/olenabohuta" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 bg-[var(--dark)] text-[var(--cream)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--accent)] transition-colors">
              Написати Олені
            </a>
          </div>
          <div className="bg-[var(--warm-white)] p-10">
            <ul className="list-none space-y-4">
              {[
                "Власна аудиторія платформи",
                "Підтримка у створенні курсу",
                "Спільний маркетинг та просування",
                "Технічна інфраструктура готова",
                "Ком'юніті однодумців-християн",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[var(--accent)] mt-1">✓</span>
                  <span className="text-base text-[var(--light-text)] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection items={faq} />

      {/* ФУТЕР */}
      <Footer />

    </main>
  );
}
