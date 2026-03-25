"use client";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cross from "../../components/Cross";

export default function Pochatok() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 md:px-20 pt-[70px] bg-[var(--dark)] relative overflow-hidden">
        <div className="absolute top-6 left-6 w-10 h-10 border-l border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute top-6 right-6 w-10 h-10 border-r border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>

        <div className="text-center relative z-10 max-w-3xl mx-auto">
          <div className="flex justify-center mb-8">
            <Cross size={32} color="var(--accent)" />
          </div>
          <p className="text-xs tracking-[0.35em] uppercase mb-6 text-[var(--accent)]">Навчання · Незабаром</p>
          <h1 className="font-medium text-[var(--cream)] leading-tight mb-8" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3.5rem, 8vw, 7rem)', lineHeight: 0.95 }}>
            Початок
          </h1>
          <div className="w-8 h-px bg-[var(--accent)] mx-auto mb-8"/>
          <p className="text-lg text-[var(--taupe)] leading-relaxed mb-4 max-w-lg mx-auto">
            Цей курс зараз готується з любов'ю та увагою до кожної деталі.
          </p>
          <p className="text-base text-[var(--taupe)] leading-relaxed max-w-lg mx-auto opacity-70">
            Ми працюємо над тим щоб створити щось особливе. Слідкуй за оновленнями в Instagram та Telegram.
          </p>
        </div>
      </section>

      {/* ЗАЛИШАЙСЯ НА ЗВ'ЯЗКУ */}
      <section className="px-6 md:px-20 py-20 bg-[var(--cream)]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-[2px]">

          {/* Консультації */}
          <a href="/products/konsultatsii" className="p-10 no-underline block group" style={{ background: 'var(--warm-white)', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(42,31,20,0.1)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4 text-[var(--accent)]">Поки курс готується</p>
            <h3 className="text-2xl font-medium mb-4 text-[var(--dark)]" style={{ fontFamily: 'var(--font-heading)' }}>Особиста консультація</h3>
            <p className="text-sm leading-relaxed text-[var(--light-text)] mb-6">Запишись на індивідуальну роботу з Оленою — отримай стратегію вже зараз без очікування.</p>
            <span className="text-xs tracking-widest uppercase text-[var(--accent)] border-b border-[var(--accent)] pb-1 group-hover:opacity-70 transition-opacity">Записатись →</span>
          </a>

          {/* Закритий клуб */}
          <a href="/zakrytyi-klub" className="p-10 no-underline block group" style={{ background: 'var(--dark)', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(42,31,20,0.3)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
          >
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--accent)' }}>Спільнота</p>
            <h3 className="text-2xl font-medium mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)' }}>Закритий Клуб</h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--taupe)' }}>Доєднуйся до спільноти Christian-підприємців — розвивайся і зростай разом.</p>
            <span className="text-xs tracking-widest uppercase pb-1 group-hover:opacity-70 transition-opacity" style={{ color: 'var(--accent)', borderBottom: '1px solid var(--accent)' }}>Доєднатись →</span>
          </a>

          {/* Соцмережі */}
          <div className="p-10" style={{ background: 'var(--sand)' }}>
            <p className="text-xs tracking-[0.3em] uppercase mb-4 text-[var(--accent)]">Слідкуй за новинами</p>
            <h3 className="text-2xl font-medium mb-4 text-[var(--dark)]" style={{ fontFamily: 'var(--font-heading)' }}>Соцмережі</h3>
            <p className="text-sm leading-relaxed text-[var(--light-text)] mb-6">Дізнавайся першою про старт курсу та отримуй корисні матеріали щодня.</p>
            <div className="flex flex-col gap-3">
              <a href="https://www.instagram.com/olenka.bohuta" target="_blank" className="text-xs tracking-widest uppercase no-underline border-b pb-1 hover:opacity-60 transition-opacity w-fit" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>Instagram →</a>
              <a href="https://t.me/olenabohuta" target="_blank" className="text-xs tracking-widest uppercase no-underline border-b pb-1 hover:opacity-60 transition-opacity w-fit" style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}>Telegram →</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}