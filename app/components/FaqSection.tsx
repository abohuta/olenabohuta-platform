"use client";
import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqSectionProps {
  items: FaqItem[];
  title?: string;
}

export default function FaqSection({ items, title = "Питання та відповіді" }: FaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)]">
      <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent-text)] text-center mb-4">FAQ</p>
      <h2 className="text-4xl md:text-5xl font-medium text-center text-[var(--dark)] mb-16 leading-tight">
        {title}
      </h2>
      <div className="max-w-3xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="border-b border-[var(--sand)]">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full text-left py-6 flex justify-between items-center gap-4 bg-transparent border-none cursor-pointer"
            >
              <span className="text-base md:text-lg font-normal text-[var(--dark)]">{item.q}</span>
              <span className="text-[var(--accent)] text-xl flex-none">{openFaq === i ? "−" : "+"}</span>
            </button>
            {openFaq === i && (
              <p className="text-base leading-relaxed text-[var(--light-text)] pb-6 text-justify">{item.a}</p>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <p className="text-base text-[var(--light-text)] mb-6">Не знайшли відповідь на своє питання?</p>
        <a href="https://t.me/olenabohuta" target="_blank" rel="noopener noreferrer" className="inline-block px-10 py-4 border border-[var(--dark)] text-[var(--dark)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--dark)] hover:text-[var(--cream)] transition-colors">
          Написати у Telegram
        </a>
      </div>
    </section>
  );
}