export default function ProOlenku() {
  return (
    <main className="w-full overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 py-4 flex justify-between items-center bg-[rgba(253,251,248,0.94)] backdrop-blur-md border-b border-[rgba(196,180,154,0.2)]">
        <a href="/" className="text-lg tracking-widest uppercase text-[var(--dark)] no-underline">Олена Богута</a>
        <a href="/" className="text-xs tracking-widest uppercase text-[var(--accent)] no-underline border-b border-[var(--accent)]">← Головна</a>
      </nav>
      <section className="px-6 md:px-20 py-32 min-h-screen">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-4">Про автора</p>
<h1 className="text-5xl md:text-7xl font-light text-[var(--dark)] mb-8">Олена Богута</h1>
        <p className="text-lg text-[var(--light-text)]">Скоро тут з'явиться більше інформації.</p>
      </section>
    </main>
  );
}