"use client";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import React from "react";
import { useReveal } from "../hooks/useReveal";

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
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
    <div ref={ref} className="text-center reveal">
      <p className="text-4xl md:text-6xl font-medium text-[var(--accent)] mb-2">
        {count}{suffix}
      </p>
      <p className="text-xs tracking-widest uppercase text-[var(--taupe)] opacity-60">{label}</p>
    </div>
  );
}

export default function ProOlenku() {
  useReveal();
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO — Magazine Split */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-[55%_45%]">

        {/* Фото — full bleed зліва */}
        <div className="relative min-h-[70vh] md:min-h-screen order-1 md:order-none">
          <Image
            src="https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774359969/Olena_Bohuta_htaxhd.webp"
            fetchPriority="high"
            loading="eager"
            alt="Олена Богута"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
          {/* Затемнення знизу на мобільному */}
          <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(to top, rgba(42,31,20,0.5), transparent 50%)' }} />
        </div>

        {/* Текст — темний фон справа */}
        <div className="bg-[var(--dark)] flex flex-col px-8 md:px-14 py-10 md:py-0 md:min-h-screen order-2 md:order-none">

          {/* Відступ під navbar */}
          <div className="flex-none pt-4 md:pt-[88px]" />

          {/* Цитата — по центру */}
          <div className="flex-1 flex items-center justify-center">
            <blockquote className="reveal reveal-delay-1 text-center">
              <span
                className="block text-7xl font-medium text-[var(--accent)] leading-none mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}
                aria-hidden="true"
              >"</span>
              <p
                className="text-2xl md:text-3xl font-medium text-[var(--cream)] leading-snug"
                style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}
              >
                Не бійся, <em className="text-[var(--accent)]">тільки вір</em>
              </p>
            </blockquote>
          </div>

          {/* Ім'я + CTA — внизу по центру */}
          <div className="flex-none pb-10 md:pb-16 flex flex-col items-center text-center">
            <div className="w-8 h-px bg-[var(--accent)] mb-6 reveal reveal-delay-2" />
            <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-3 reveal reveal-delay-2">Про автора</p>
            <h1
              className="text-5xl md:text-7xl font-medium text-[var(--cream)] leading-tight mb-3 reveal reveal-delay-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Олена <em className="italic text-[var(--accent)]">Богута</em>
            </h1>
            <p className="text-sm md:text-base text-[var(--taupe)] leading-relaxed max-w-sm mb-8 reveal reveal-delay-3">
              Експерт з розвитку особистого бренду для християн. Засновниця першого в Україні навчання для християн у соцмережах.
            </p>
            <div className="reveal reveal-delay-4">
              <Link
                href="/navchannya"
                className="inline-block px-10 py-4 border border-[var(--accent)] text-[var(--accent)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--accent)] hover:text-white transition-colors"
              >
                Обрати навчання
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* ЦИФРИ */}
      <section className="px-6 md:px-20 py-16 bg-[var(--dark)]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard num={100} suffix="+" label="Студентів навчалось" />
          <StatCard num={10} suffix="" label="Курсів створено" />
          <StatCard num={8} suffix="" label="Років досвіду" />
          <StatCard num={10} suffix="K+" label="Підписників" />
        </div>
      </section>

      {/* ІСТОРІЯ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--cream)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent-text)] mb-4 reveal">Моя історія</p>
            <h2 className="text-4xl md:text-5xl font-medium text-[var(--dark)] leading-tight mb-8 reveal reveal-delay-1">
              Від простої дівчини<br />
              <em className="italic text-[var(--accent)]">до експерта</em>
            </h2>
            <div className="section-divider reveal"/>
          </div>
          <div className="space-y-6 reveal reveal-delay-2">
            <p className="text-base md:text-lg leading-relaxed text-[var(--light-text)] text-justify">
              Я Оленка. Народилася у християнській сім'ї, у маленькому містечку Миколаїв на Львівщині. Я мріяла здобути освіту — і здобула її в Національному університеті «Львівська політехніка», маю ступінь магістра з практичної психології.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[var(--light-text)] text-justify">
              Моя історія з Instagram розпочалася сама собою. Ще будучи в декреті, я любила публікувати фото та писати тексти для таких самих жінок, як і я. Декрет став переломним — саме тоді я зрозуміла, що хочу побудувати своє майбутнє з цією соцмережею.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[var(--light-text)] text-justify">
              Спочатку вела блог для себе, потім робила контент-зйомки для знайомих. Згодом мене почали запрошувати як сторісмейкера та SMM-спеціаліста. Одного разу я познайомилася з людьми, які показали мені, що можу більше — і я змінила позиціонування: від SMM-спеціаліста до експерта з розвитку особистого бренду для християн.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-[var(--light-text)] text-justify">
              Я зібрала понад 10 тисяч прекрасних людей, близько 400 із них — мої клієнти та учні. І я пишаюся тим, що наважилася запустити перше в Україні навчання для християн у соцмережах.
            </p>
          </div>
        </div>
      </section>

      {/* МІСІЯ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--dark)] relative overflow-hidden">
        <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-[rgba(184,147,106,0.3)] hidden md:block"/>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-medium text-[var(--cream)] leading-tight mb-8 reveal">
            Моя <em className="italic text-[var(--accent)]">місія</em>
          </h2>
          <div className="w-8 h-px bg-[var(--accent)] mx-auto mb-8"/>
          <p className="text-lg md:text-2xl text-[var(--taupe)] leading-relaxed max-w-3xl mx-auto reveal reveal-delay-2">
            Формувати християнських експертів, лідерів думок та інфлюенсерів, які захоплюються Христом, впевнено проявляються в соціальних мережах, будують особистий бренд і перетворюють свою діяльність на інструмент впливу.
          </p>
        </div>
      </section>

      {/* ЦІННОСТІ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent-text)] text-center mb-4 reveal">Цінності</p>
        <h2 className="text-4xl md:text-5xl font-medium text-center text-[var(--dark)] leading-tight mb-16 reveal reveal-delay-1">
          Що лежить в основі
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] max-w-6xl mx-auto">
          {[
            { title: "Христоцентричність", desc: "Ми будуємо блог не навколо популярності, а навколо Христа, покликання і служіння людям.", num: "01" },
            { title: "Прояв через цінності", desc: "Не просто вести Instagram — а відкривати свою особистість і віру так, щоб це торкалося сердець.", num: "02" },
            { title: "Сміливість бути собою", desc: "Не копіювати тренди, а запускати свій стиль і свій голос — навіть якщо він не схожий на інших.", num: "03" },
            { title: "Глибина і тиша", desc: "Поєднання психології, віри та стратегії — щоб бренд будувався зріло, а не хаотично.", num: "04" },
            { title: "Екологічний вплив", desc: "Продажі без маніпуляцій — чесно, відкрито і з повагою до людей.", num: "05" },
            { title: "Служіння іншим", desc: "Контент і продаж — це спосіб допомагати, підтримувати і вести людей до змін.", num: "06" },
          ].map((item) => (
            <div key={item.num} className="bg-[var(--cream)] p-8 relative card-depth reveal">
              <span className="absolute top-4 right-6 text-5xl font-medium text-[var(--taupe)] opacity-15">{item.num}</span>
              <h3 className="text-xl font-medium text-[var(--dark)] mb-4">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--light-text)] text-justify">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--accent)] text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-white opacity-70 mb-4 reveal">Починаємо</p>
        <h2 className="text-4xl md:text-6xl font-medium text-white leading-tight mb-8 reveal reveal-delay-1">
          Готові розпочати<br />навчання?
        </h2>
        <p className="text-lg text-white opacity-80 max-w-xl mx-auto mb-10 leading-relaxed reveal reveal-delay-2">
          Переглянь програми навчання і обери ту, що підходить саме тобі
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center reveal reveal-delay-3">
          <Link href="/navchannya" className="inline-block px-10 py-4 bg-white text-[var(--accent)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--cream)] transition-colors">
            Переглянути навчання
          </Link>
          <a href="https://t.me/olenabohuta" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 border border-white text-white no-underline text-xs tracking-widest uppercase hover:bg-white hover:text-[var(--accent)] transition-colors">
            Написати в Telegram
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
