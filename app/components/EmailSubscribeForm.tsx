"use client";
import { useState } from "react";

export default function EmailSubscribeForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || 'Помилка. Спробуй ще раз.');
      }
    } catch {
      setError('Помилка. Спробуй ще раз.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-4">
        <p className="text-lg mb-2" style={{ color: dark ? 'var(--accent)' : 'var(--accent)' }}>✓ Дякуємо!</p>
        <p className="text-sm" style={{ color: dark ? 'var(--taupe)' : 'var(--light-text)' }}>Перевір свою пошту 💛</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
      <div className="flex gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Твій email"
          required
          className="flex-1 px-5 py-3 bg-transparent border text-sm focus:outline-none transition-colors min-w-0"
          style={{
            borderColor: dark ? 'rgba(196,180,154,0.3)' : 'rgba(42,31,20,0.2)',
            color: dark ? 'var(--cream)' : 'var(--text)',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3 text-white text-xs tracking-widest uppercase hover:opacity-80 transition-opacity whitespace-nowrap"
          style={{ background: loading ? '#8B6F52' : 'var(--accent)' }}
        >
          {loading ? '...' : 'Підписатись'}
        </button>
      </div>
      {error && <p className="text-xs text-center" style={{ color: '#ff6b6b' }}>{error}</p>}
    </form>
  );
}