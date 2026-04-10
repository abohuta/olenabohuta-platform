"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cross from "../../components/Cross";
import EmailSubscribeForm from "../../components/EmailSubscribeForm";
import { useReveal } from "../../hooks/useReveal";

const VIDEO_ID = "IjFS0vj9SI0";
const PRIMARY = "#748fa4";
const DARK = "#2A1F14";
const WHITE = "#ffffff";

const WHAT_YOULL_LEARN = [
  "Як мислення впливає на заробіток — і чому «дозвіл» є першим кроком",
  "Основні етапи холодної воронки, про які ти, мабуть, не чула",
  "Чому менше контенту може дати більше продажів",
  "Як заробити $2 000, працюючи менше і не жертвуючи собою",
  "Реальні приклади запусків: від Reels до покупки без щоденних сторіс",
  "Що таке система запуску і чому натхнення без неї не працює",
];


export default function EraMozhlyvosteiPage() {
  useReveal();
  const [videoUnlocked, setVideoUnlocked] = useState(false);

  return (
    <main className="w-full overflow-x-hidden min-h-screen" style={{ background: PRIMARY, color: WHITE }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto text-center">

          <span
            className="reveal inline-block text-xs tracking-widest uppercase mb-6 px-4 py-1.5"
            style={{ background: `rgba(255,255,255,0.15)`, color: WHITE, border: `1px solid rgba(255,255,255,0.3)` }}
          >
            Безкоштовний майстер-клас
          </span>

          <h1
            className="text-3xl md:text-4xl leading-tight mb-6 reveal"
            style={{ fontFamily: "var(--font-heading)", color: WHITE }}
          >
            Як християнам заробляти в Instagram
          </h1>

          <p className="text-base md:text-lg mb-10 reveal" style={{ color: "rgba(255,254,251,0.7)", lineHeight: "1.7" }}>
            Майстер-клас «Ера можливостей» — про мислення, техніку та холодні воронки,
            які приносять дохід без щоденного контенту.
          </p>

          {/* Що дізнаєшся */}
          <div
            className="text-left p-6 mb-10 reveal"
            style={{ border: `1px solid rgba(255,255,255,0.2)`, background: "rgba(255,255,255,0.08)" }}
          >
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              Що ти дізнаєшся
            </p>
            <ul className="space-y-3">
              {WHAT_YOULL_LEARN.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ color: "rgba(255,254,251,0.85)", lineHeight: "1.6" }}>
                  <span style={{ flexShrink: 0, marginTop: "2px" }}>
                    <Cross size={10} color={WHITE} />
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
              style={{ background: DARK, border: `1px solid rgba(255,255,255,0.08)` }}
            >
              <p
                className="text-base font-medium mb-2"
                style={{ fontFamily: "var(--font-heading)", color: WHITE }}
              >
                Дивись майстер-клас безкоштовно
              </p>
              <p className="text-sm mb-6" style={{ color: "rgba(255,254,251,0.55)", lineHeight: "1.6" }}>
                Залиш email — відео відкриється одразу на цій сторінці
              </p>
              <EmailSubscribeForm
                dark
                source="era-mozhlyvostei"
                onSuccess={() => setVideoUnlocked(true)}
              />
              <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>
                Без спаму. Тільки корисне — і тільки тоді, коли є що сказати.
              </p>
            </div>
          ) : (
            <VideoSection />
          )}
        </div>
      </section>

      {/* CTA → Tysha */}
      <section className="py-16 px-6" style={{ background: DARK }}>
        <div className="max-w-xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Cross size={20} color={PRIMARY} />
          </div>
          <h2
            className="text-2xl md:text-3xl mb-4 reveal"
            style={{ fontFamily: "var(--font-heading)", color: WHITE }}
          >
            Твоя нова ера починається тут
          </h2>
          <p className="text-sm mb-8 reveal" style={{ color: "rgba(255,254,251,0.6)", lineHeight: "1.7" }}>
            ТИША — це 8-тижневе навчання, де ми будуємо і запускаємо твій Premium-продукт
            у реальному часі. Система, яка змінила мене і сотні учасниць.
          </p>
          <Link
            href="/products/tysha"
            className="reveal inline-block px-10 py-4 text-xs tracking-widest uppercase transition-opacity hover:opacity-80"
            style={{ background: PRIMARY, color: WHITE }}
          >
            Дізнатись про Тишу →
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
          color: WHITE,
          border: `1px solid rgba(255,255,255,0.15)`,
        }}
      >
        ✓ Майстер-клас відкрито — перевір свою пошту, там є лист від Олени
      </div>

      {/* YouTube embed 16:9 */}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${VIDEO_ID}?rel=0&modestbranding=1&color=white`}
          title="Ера можливостей — Як християнам заробляти в Instagram"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Ключові думки */}
      <div className="mt-8 text-left">
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
          Ключові думки з майстер-класу
        </p>
        <ul className="space-y-2 text-sm" style={{ color: "rgba(255,254,251,0.7)", lineHeight: "1.7" }}>
          <li>— Щоб заробити більше — не обов&apos;язково працювати більше</li>
          <li>— Система перемагає натхнення: план, воронка, фокус</li>
          <li>— Твоя цінність набагато більша, ніж ти можеш уявити</li>
        </ul>
      </div>
    </div>
  );
}
