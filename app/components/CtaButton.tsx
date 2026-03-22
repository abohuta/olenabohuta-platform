interface CtaButtonProps {
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "outline";
  newTab?: boolean;
}

export default function CtaButton({ text, href, variant = "primary", newTab = false }: CtaButtonProps) {
  const styles: Record<string, string> = {
    primary: "bg-[var(--accent)] text-white hover:bg-[var(--brown)]",
    secondary: "bg-[var(--dark)] text-[var(--cream)] hover:bg-[var(--accent)]",
    outline: "border border-[var(--dark)] text-[var(--dark)] hover:bg-[var(--dark)] hover:text-[var(--cream)]",
  };

  const className = `inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline transition-colors ${styles[variant]}`;

  if (newTab) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{text}</a>;
  }

  return <a href={href} className={className}>{text}</a>;
}