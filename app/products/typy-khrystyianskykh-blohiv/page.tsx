"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cross from "../../components/Cross";
import EmailSubscribeForm from "../../components/EmailSubscribeForm";

const VIDEO_ID = "tH7rP8jYTec";

const WHAT_YOULL_LEARN = [
  "Які 5 типів блогів зростають у Instagram серед християнської аудиторії",
  "Як визначити свій тип — і не копіювати чужу модель",
  "З чого почати вести блог, щоб він потрапляв у ціль з першого посту",
  "Чому більшість christian-блогерів зупиняються — і як цього уникнути",
];

export default function TyopyBlohivPage() {
  const [videoUnlocked, setVideoUnlocked] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)", color: "var(--text)" }}>
      <Navbar />

      {/* Hero section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <span
            className="inline-block text-xs tracking-widest uppercase mb-6 px-4 py-1.5"
            style={{ background: "rgba(89,2,11,0.08)", color: "var(--accent)" }}
          >
            Безкоштовний урок
          </span>

          <h1
            className="text-3xl md:text-4xl leading-tight mb-6"
            style={{ fontFamily: "var(--font-serif, Georgia, serif)", color: "var(--text)" }}
          >
            Які типи християнських блогів будуть зростати в Instagram
          </h1>

          <p className="text-base md:text-lg mb-10" style={{ color: "var(--light-text)", lineHeight: "1.7" }}>
            Відео-урок для тих, хто хоче почати вести блог — або нарешті зрозуміти,
            у якому напрямку рухатись.
          </p>

          {/* What you'll learn */}
          <div
            className="text-left rounded-none p-6 mb-10"
            style={{ border: "1px solid rgba(42,31,20,0.12)", background: "rgba(255,255,255,0.5)" }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--taupe)" }}>
              Що ти дізнаєшся
            </p>
            <ul className="space-y-3">
              {WHAT_YOULL_LEARN.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--text)", lineHeight: "1.6" }}>
                  <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }}>
                    <Cross size={10} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Email gate or video */}
          {!videoUnlocked ? (
            <div>
              <p className="text-sm mb-5" style={{ color: "var(--light-text)" }}>
                Залиш свій email — і дивись урок прямо тут
              </p>
              <EmailSubscribeForm
                source="leadmagnet"
                onSuccess={() => setVideoUnlocked(true)}
              />
              <p className="text-xs mt-4" style={{ color: "var(--taupe)" }}>
                Без спаму. Тільки корисне — і тільки тоді, коли є що сказати.
              </p>
            </div>
          ) : (
            <VideoSection />
          )}
        </div>
      </section>

      {/* CTA to Kemp — always visible */}
      <section
        className="py-16 px-6"
        style={{ background: "var(--text)", color: "var(--cream)" }}
      >
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-6"><Cross size={20} color="var(--accent)" /></div>
          <h2
            className="text-2xl md:text-3xl mb-4"
            style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
          >
            Час зробити наступний крок?
          </h2>
          <p className="text-sm mb-8" style={{ color: "rgba(254,248,224,0.7)", lineHeight: "1.7" }}>
            Кемп — це 6-тижневий інтенсив де ми будуємо твій блог з нуля:
            позиціонування, аудиторія, контент, продажі.
          </p>
          <Link
            href="/products/kemp"
            className="inline-block px-10 py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
            style={{ background: "var(--accent)", color: "var(--cream)" }}
          >
            Дізнатись про Кемп →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function VideoSection() {
  return (
    <div className="mt-2">
      <div
        className="mb-6 py-3 px-4 text-sm"
        style={{ background: "rgba(89,2,11,0.06)", color: "var(--accent)", border: "1px solid rgba(89,2,11,0.15)" }}
      >
        ✓ Урок відкрито — перевір свою пошту, там є лист від Олени
      </div>

      {/* YouTube embed — responsive 16:9 */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&color=white`}
          title="Які типи християнських блогів будуть зростати в Instagram"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Key takeaways */}
      <div className="mt-8 text-left">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--taupe)" }}>
          Ключові думки з уроку
        </p>
        <ul className="space-y-2 text-sm" style={{ color: "var(--light-text)", lineHeight: "1.7" }}>
          <li>— Не кожен тип блогу підходить тобі — важливо знайти свій</li>
          <li>— Зростає той блог, де є чіткий голос і конкретна людина за ним</li>
          <li>— Початок — не про перфекцію, а про вірність своєму покликанню</li>
        </ul>
      </div>
    </div>
  );
}
