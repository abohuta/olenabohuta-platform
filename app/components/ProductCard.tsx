interface ProductCardProps {
  title: string;
  desc: string;
  tag: string;
  level?: string;
  price?: string;
  href?: string;
}

export default function ProductCard({
  title,
  desc,
  tag,
  level,
  price,
  href = "#",
}: ProductCardProps) {
  return (
    <a href={href} className="bg-[var(--cream)] p-8 hover:-translate-y-1 transition-transform no-underline block">
      <div className="flex justify-between items-start mb-4">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent)]">{tag}</p>
        {level && <p className="text-xs tracking-widest uppercase text-[var(--taupe)]">{level}</p>}
      </div>
      <h3 className="text-xl font-medium text-[var(--dark)] mb-3">{title}</h3>
      <p className="text-sm leading-relaxed text-[var(--light-text)] mb-6 text-justify">{desc}</p>
      {price && (
        <div className="flex justify-between items-center">
          <p className="text-base font-normal text-[var(--dark)]">{price}</p>
          <span className="text-xs tracking-widest uppercase text-[var(--accent)] border-b border-[var(--accent)]">Детальніше →</span>
        </div>
      )}
    </a>
  );
}