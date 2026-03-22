import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Cross from "./components/Cross";

export default function NotFound() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      <section className="min-h-screen flex items-center justify-center px-6 md:px-20 pt-[70px] bg-[var(--dark)] relative overflow-hidden">
        {/* Декоративні кути */}
        <div className="absolute top-8 left-8 w-10 h-10 border-l border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute top-8 right-8 w-10 h-10 border-r border-t border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-8 left-8 w-10 h-10 border-l border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>
        <div className="absolute bottom-8 right-8 w-10 h-10 border-r border-b border-[rgba(184,147,106,0.2)] hidden md:block"/>

        <div className="text-center relative z-10 max-w-2xl mx-auto">
          {/* Великий 404 */}
          <p className="text-[120px] md:text-[200px] font-medium leading-none text-transparent mb-0"
            style={{
              WebkitTextStroke: '1px rgba(184,147,106,0.2)',
              fontFamily: 'var(--font-heading)'
            }}>
            404
          </p>

          <div className="flex justify-center mb-6 -mt-4">
            <Cross size={28} color="var(--accent)" />
          </div>

          <div className="w-8 h-px bg-[var(--accent)] mx-auto mb-8"/>

          <h1 className="text-3xl md:text-5xl font-medium text-[var(--cream)] leading-tight mb-6">
            Сторінку не знайдено
          </h1>

          <p className="text-lg text-[var(--taupe)] leading-relaxed mb-10 max-w-md mx-auto">
            Схоже ця сторінка переїхала або ще не існує. Але не бійся — головна сторінка чекає на тебе.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="inline-block px-10 py-4 bg-[var(--accent)] text-white no-underline text-xs tracking-widest uppercase hover:bg-[var(--brown)] transition-colors">
              На головну
            </a>
            <a href="/navchannya" className="inline-block px-10 py-4 border border-[var(--taupe)] text-[var(--taupe)] no-underline text-xs tracking-widest uppercase hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
              Переглянути навчання
            </a>
          </div>

          <div className="w-8 h-px bg-[var(--accent)] mx-auto mt-10"/>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--taupe)] mt-4 opacity-50">
            «Не бійся, тільки вір» — Марка 5:36
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}