export default function Home() {
  return (
    <main style={{ fontFamily: 'var(--font-jost)' }}>

      {/* НАВІГАЦІЯ */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1rem 4rem', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', background: 'rgba(253,251,248,0.94)',
        backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(196,180,154,0.2)'
      }}>
        <span style={{
          fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem',
          letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--dark)'
        }}>
          Олена Богута
        </span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="/products" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)', textDecoration: 'none' }}>Продукти</a>
          <a href="/blog" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text)', textDecoration: 'none' }}>Блог</a>
          <a href="#contact" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none', borderBottom: '1px solid var(--accent)' }}>Контакт</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr',
        paddingTop: '70px'
      }}>
        <div style={{
          padding: '8rem 3rem 6rem 5rem', display: 'flex',
          flexDirection: 'column', justifyContent: 'center'
        }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem' }}>
            Засновниця · Наставник · Архітектор брендів
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3rem, 5vw, 5rem)',
            fontWeight: 300, lineHeight: 1.1, color: 'var(--dark)', marginBottom: '1.5rem'
          }}>
            Олена<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Богута</em>
          </h1>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--light-text)', maxWidth: '420px', marginBottom: '3rem' }}>
            Допомагаю християнам будувати особистий бренд, який відображає їхнє покликання — з вірою, стратегією і сенсом.
          </p>
          <a href="/products" style={{
            display: 'inline-block', padding: '1rem 2.5rem',
            background: 'var(--dark)', color: 'var(--cream)',
            textDecoration: 'none', fontSize: '0.75rem',
            letterSpacing: '0.2em', textTransform: 'uppercase', alignSelf: 'flex-start'
          }}>
            Переглянути продукти
          </a>
        </div>
        <div style={{
  background: 'var(--sand)', display: 'flex',
  alignItems: 'center', justifyContent: 'center',
  position: 'relative', overflow: 'hidden'
}}>
  <img
    src="/photo.webp"
    alt="Олена Богута"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center top',
      position: 'absolute',
      top: 0, left: 0
    }}
  />
</div>
      </section>

      {/* ПРОДУКТИ — АНОНС */}
      <section style={{ padding: '8rem 5rem', background: 'var(--cream)' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center', marginBottom: '1rem' }}>
          Продукти
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)',
          fontWeight: 300, textAlign: 'center', color: 'var(--dark)', marginBottom: '4rem', lineHeight: 1.2
        }}>
          Чим я можу тобі допомогти
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { icon: '🏛️', title: 'Кемп Архітектор Бренду', desc: 'Навчання для християн які хочуть розвивати особистий бренд', tag: 'Курс' },
            { icon: '📖', title: 'Книги', desc: 'Практичні матеріали для розвитку бренду та експертності', tag: 'Книги' },
            { icon: '💬', title: 'Консультації', desc: 'Особиста робота над твоїм брендом та стратегією', tag: 'Сесія' },
          ].map((item) => (
            <div key={item.title} style={{ background: 'var(--warm-white)', padding: '3rem', transition: 'transform 0.3s' }}>
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>{item.icon}</span>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.8rem' }}>{item.tag}</p>
              <h3 style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--dark)', marginBottom: '1rem' }}>{item.title}</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'var(--light-text)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="/products" style={{
            display: 'inline-block', padding: '1rem 2.5rem',
            border: '1px solid var(--dark)', color: 'var(--dark)',
            textDecoration: 'none', fontSize: '0.75rem',
            letterSpacing: '0.2em', textTransform: 'uppercase'
          }}>
            Всі продукти
          </a>
        </div>
      </section>

      {/* КОНТАКТ */}
      <section id="contact" style={{ padding: '8rem 5rem', background: 'var(--dark)', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--taupe)', marginBottom: '1rem' }}>
          Зв'язок
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 5vw, 5rem)',
          fontWeight: 300, color: 'var(--cream)', lineHeight: 1.15,
          marginBottom: '2rem'
        }}>
          Давай побудуємо<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>твій бренд</em><br />разом
        </h2>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
          <a href="https://t.me/olenabohuta" target="_blank" style={{
            padding: '1rem 2.5rem', background: 'var(--accent)', color: 'white',
            textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase'
          }}>Telegram</a>
          <a href="https://www.instagram.com/olenka.bohuta" target="_blank" style={{
            padding: '1rem 2.5rem', border: '1px solid var(--taupe)', color: 'var(--taupe)',
            textDecoration: 'none', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase'
          }}>Instagram</a>
        </div>
      </section>

    </main>
  );
}