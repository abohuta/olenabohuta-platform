import Link from "next/link";

interface HeroProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  btnText?: string;
  btnHref?: string;
  dark?: boolean;
  rightContent?: React.ReactNode;
}

export default function Hero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  btnText,
  btnHref = "#",
  dark = false,
  rightContent,
}: HeroProps) {
  return (
    <section className={`min-h-screen grid grid-cols-1 md:grid-cols-2 pt-[70px] ${dark ? 'bg-[var(--dark)]' : 'bg-[var(--warm-white)]'}`}>
      <div className="px-6 md:px-20 py-20 md:py-32 flex flex-col justify-center">
        {eyebrow && (
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-6">{eyebrow}</p>
        )}
        <h1 className={`text-5xl md:text-7xl font-medium leading-tight mb-6 ${dark ? 'text-[var(--cream)]' : 'text-[var(--dark)]'}`}>
          {title}<br />
          {titleAccent && <em className="italic text-[var(--accent)]">{titleAccent}</em>}
        </h1>
        {subtitle && (
          <p className={`text-lg md:text-xl leading-relaxed max-w-md mb-10 text-justify ${dark ? 'text-[var(--taupe)]' : 'text-[var(--light-text)]'}`}>
            {subtitle}
          </p>
        )}
        {btnText && (
          <Link href={btnHref} className="inline-block px-10 py-4 bg-[var(--accent)] text-white no-underline text-xs tracking-widest uppercase self-start hover:bg-[var(--brown)] transition-colors">
            {btnText}
          </Link>
        )}
      </div>
      {rightContent && (
        <div className="hidden md:flex items-center justify-center bg-[var(--sand)]">
          {rightContent}
        </div>
      )}
    </section>
  );
}