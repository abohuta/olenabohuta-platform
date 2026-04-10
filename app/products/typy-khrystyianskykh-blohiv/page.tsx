"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cross from "../../components/Cross";
import EmailSubscribeForm from "../../components/EmailSubscribeForm";
import { useReveal } from "../../hooks/useReveal";

const VIDEO_ID = "tH7rP8jYTec";
const ACCENT = "#59020B";
const CREAM = "#FEF8E0";
const DARK = "#2A1F14";

const WHAT_YOULL_LEARN = [
  "Які 5 типів блогів зростають у Instagram серед християнської аудиторії",
  "Як визначити свій тип — і не копіювати чужу модель",
  "З чого почати вести блог, щоб він потрапляв у ціль з першого посту",
  "Чому більшість christian-блогерів зупиняються — і як цього уникнути",
];

export default function TyopyBlohivPage() {
  useReveal();
  const [videoUnlocked, setVideoUnlocked] = useState(false);

  return (
    <main className="w-full overflow-x-hidden min-h-screen" style={{ background: CREAM, color: DARK }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">

          <span
            className="reveal inline-block text-xs tracking-widest uppercase mb-6 px-4 py-1.5"
            style={{ background: `rgba(89,2,11,0.08)`, color: ACCENT, border: `1px solid rgba(89,2,11,0.15)` }}
          >
            Безкоштовний урок
          </span>

          <h1
            className="text-3xl md:text-4xl leading-tight mb-6 reveal"
            style={{ fontFamily: "var(--font-heading)", color: DARK }}
          >
            Які типи християнських блогів будуть зростати в Instagram
          </h1>

          <p className="text-base md:text-lg mb-10 reveal" style={{ color: "#5E4838", lineHeight: "1.7" }}>
            Відео-урок для тих, хто хоче почати вести блог — або нарешті зрозуміти,
            у якому напрямку рухатись.
          </p>

          {/* Що дізнаєшся */}
          <div
            className="text-left p-6 mb-10 reveal"
            style={{ border: `1px solid rgba(89,2,11,0.15)`, background: "rgba(255,255,255,0.6)" }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#8B6F52" }}>
              Що ти дізнаєшся
            </p>
            <ul className="space-y-3">
              {WHAT_YOULL_LEARN.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: DARK, lineHeight: "1.6" }}>
                  <span style={{ flexShrink: 0, marginTop: "2px" }}>
                    <Cross size={10} color={ACCENT} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Email gate або відео */}
          {!videoUnlocked ? (
            <div
              className="reveal p-8 mt-2"
              style={{ background: DARK, border: `1px solid rgba(89,2,11,0.3)` }}
            >
              <p
                className="text-base font-medium mb-2"
                style={{ fontFamily: "var(--font-heading)", color: CREAM }}
              >
                Дивись урок безкоштовно
              </p>
              <p className="text-sm mb-6" style={{ color: "rgba(254,248,224,0.6)", lineHeight: "1.6" }}>
                Залиш email — відео відкриється одразу на цій сторінці
              </p>
              <EmailSubscribeForm
                dark
                source="leadmagnet"
                onSuccess={() => setVideoUnlocked(true)}
              />
              <p className="text-xs mt-4" style={{ color: "rgba(254,248,224,0.3)" }}>
                Без спаму. Тільки корисне — і тільки тоді, коли є що сказати.
              </p>
            </div>
          ) : (
            <VideoSection />
          )}
        </div>
      </section>

      {/* CTA → Kemp */}
      <section className="py-16 px-6" style={{ background: DARK, color: CREAM }}>
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Cross size={20} color={ACCENT} />
          </div>
          <h2
            className="text-2xl md:text-3xl mb-4 reveal"
            style={{ fontFamily: "var(--font-heading)", color: CREAM }}
          >
            Час зробити наступний крок?
          </h2>
          <p className="text-sm mb-8 reveal" style={{ color: "rgba(254,248,224,0.7)", lineHeight: "1.7" }}>
            Кемп — це 6-тижневий інтенсив де ми будуємо твій блог з нуля:
            позиціонування, аудиторія, контент, продажі.
          </p>
          <Link
            href="/products/kemp"
            className="reveal inline-block px-10 py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
            style={{ background: ACCENT, color: CREAM }}
          >
            Дізнатись про Кемп →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function VideoSection() {
  return (
    <div className="mt-2">
      <div
        className="mb-6 py-3 px-4 text-sm"
        style={{
          background: DARK,
          color: CREAM,
          border: `1px solid rgba(89,2,11,0.3)`,
        }}
      >
        ✓ Урок відкрито — перевір свою пошту, там є лист від Олени
      </div>

      {/* YouTube embed 16:9 */}
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

      {/* Ключові думки */}
      <div className="mt-8 text-left">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "#8B6F52" }}>
          Ключові думки з уроку
        </p>
        <ul className="space-y-2 text-sm" style={{ color: "#5E4838", lineHeight: "1.7" }}>
          <li>— Не кожен тип блогу підходить тобі — важливо знайти свій</li>
          <li>— Зростає той блог, де є чіткий голос і конкретна людина за ним</li>
          <li>— Початок — не про перфекцію, а про вірність своєму покликанню</li>
        </ul>
      </div>
    </div>
  );
}
