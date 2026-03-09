export default function Home() {
  return (
    <main className="font-sans">

      {/* НАВІГАЦІЯ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4 flex justify-between items-center bg-[rgba(253,251,248,0.94)] backdrop-blur-md border-b border-[rgba(196,180,154,0.2)]">
        <span className="font-cormorant text-lg tracking-widest uppercase text-[var(--dark)]">
          Олена Богута
        </span>
        <div className="flex gap-4 md:gap-8">
          <a href="/products" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hidden md:block">Продукти</a>
          <a href="/blog" className="text-xs tracking-widest uppercase text-[var(--text)] no-underline hidden md:block">Блог</a>
          <a href="#contact" className="text-xs tracking-widest uppercase text-[var(--accent)] no-underline border-b border-[var(--accent)]">Контакт</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-[70px]">
        <div className="px-6 md:px-20 py-20 md:py-32 flex flex-col justify-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-6">
            Засновниця · Наставник · Архітектор брендів
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light leading-tight text-[var(--dark)] mb-6">
            Олена<br />
            <em className="italic text-[var(--accent)]">Богута</em>
          </h1>
          <p className="text-base leading-relaxed text-[var(--light-text)] max-w-md mb-10">
            Допомагаю християнам будувати особистий бренд, який відображає їхнє покликання — з вірою, стратегією і сенсом.
          </p>
          <a href="/products" className="inline-block px-10 py-4 bg-[var(--dark)] text-[var(--cream)] no-underline text-xs tracking-widest uppercase self-start hover:bg-[var(--accent)] transition-colors">
            Переглянути продукти
          </a>
        </div>
        <div className="relative min-h-[50vh] md:min-h-screen bg-[var(--sand)]">
          <img
            src="https://i.ibb.co/8LfTV0xM/photo.webp"
            alt="Олена Богута"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        </div>
      </section>

      {/* ПРОДУКТИ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--cream)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4">
          Продукти
        </p>
        <h2 className="font-cormorant text-4xl md:text-5xl font-light text-center text-[var(--dark)] mb-16 leading-tight">
          Чим я можу тобі допомогти
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] max-w-5xl mx-auto">
          {[
            { icon: '🏛️', title: 'Кемп Архітектор Бренду', desc: 'Навчання для християн які хочуть розвивати особистий бренд', tag: 'Курс' },
            { icon: '📖', title: 'Книги', desc: 'Практичні матеріали для розвитку бренду та експертності', tag: 'Книги' },
            { icon: '💬', title: 'Консультації', desc: 'Особиста робота над твоїм брендом та стратегією', tag: 'Сесія' },
          ].map((item) => (
            <div key={item.title} className="bg-[var(--warm-white)] p-10 hover:-translate-y-1 transition-transform">
              <span className="text-2xl block mb-4">{item.icon}</span>
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-3">{item.tag}</p>
              <h3 className="font-cormorant text-xl font-normal text-[var(--dark)] mb-4">{item.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--light-text)]">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/products" className="inline-block px-10 py-4 border border-[var(--dark)] text-[var(--dark)] no-underline text-xs tracking-widest uppercase hover:bg-[var(--dark)] hover:text-[var(--cream)] transition-colors">
            Всі продукти
          </a>
        </div>
      </section>

      {/* КОНТАКТ */}
      <section id="contact" className="px-6 md:px-20 py-20 md:py-32 bg-[var(--dark)] text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--taupe)] mb-4">
          Зв'язок
        </p>
        <h2 className="font-cormorant text-5xl md:text-7xl font-light text-[var(--cream)] leading-tight mb-8">
          Давай побудуємо<br />
          <em className="italic text-[var(--accent)]">твій бренд</em><br />
          разом
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="https://t.me/olenabohuta" target="_blank" className="px-10 py-4 bg-[var(--accent)] text-white no-underline text-xs tracking-widest uppercase hover:bg-[var(--brown)] transition-colors">
            Telegram
          </a>
          <a href="https://www.instagram.com/olenka.bohuta" target="_blank" className="px-10 py-4 border border-[var(--taupe)] text-[var(--taupe)] no-underline text-xs tracking-widest uppercase hover:border-[var(--cream)] hover:text-[var(--cream)] transition-colors">
            Instagram
          </a>
        </div>
      </section>

    </main>
  );
}