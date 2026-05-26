"use client";
import { useState } from "react";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs tracking-widest uppercase" style={{ color: "var(--taupe)" }}>
        Поділитись
      </span>

      {/* Telegram */}
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase transition-opacity hover:opacity-70 no-underline"
        style={{ border: "1px solid var(--sand)", color: "var(--dark)" }}
        aria-label="Поділитись в Telegram"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 13.99 4.53 13.1c-.658-.205-.672-.658.136-.975l11.34-4.37c.549-.204 1.029.126.888.466z"/>
        </svg>
        Telegram
      </a>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase transition-all cursor-pointer hover:opacity-70"
        style={{
          border: "1px solid var(--sand)",
          color: copied ? "var(--accent)" : "var(--dark)",
          background: "transparent",
        }}
        aria-label="Скопіювати посилання"
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Скопійовано
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            Посилання
          </>
        )}
      </button>
    </div>
  );
}
