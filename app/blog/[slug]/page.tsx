import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getPost, urlFor, CATEGORIES } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";

export const revalidate = 60;

const ptComponents = {
  block: {
    normal: ({ children }: any) => <p className="text-base leading-relaxed mb-6 text-justify" style={{ color: 'var(--light-text)' }}>{children}</p>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-medium mt-10 mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-medium mt-8 mb-3" style={{ fontFamily: 'var(--font-heading)', color: 'var(--dark)' }}>{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="pl-6 py-2 my-8 text-lg italic" style={{ borderLeft: '3px solid var(--accent)', color: 'var(--brown)' }}>{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-none space-y-2 mb-6 ml-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal space-y-2 mb-6 ml-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-2 text-base" style={{ color: 'var(--light-text)' }}>
        <span style={{ color: 'var(--accent)', flexShrink: 0 }}>—</span>{children}
      </li>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <figure className="my-10">
        <img src={urlFor(value).width(900).url()} alt={value.caption || ''} className="w-full rounded-sm" loading="lazy" />
        {value.caption && <figcaption className="text-xs text-center mt-3" style={{ color: 'var(--taupe)' }}>{value.caption}</figcaption>}
      </figure>
    ),
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return (
      <main className="w-full overflow-x-hidden">
        <Navbar />
        <section className="px-6 md:px-20 py-32 min-h-screen flex items-center justify-center bg-[var(--warm-white)]">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-[var(--dark)] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>Статтю не знайдено</h1>
            <Link href="/blog" className="text-xs tracking-widest uppercase text-[var(--accent)] no-underline border-b border-[var(--accent)]">← Повернутись до блогу</Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO статті */}
      <section className="pt-[70px] bg-[var(--dark)]">
        {post.coverImage && (
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            <img
              src={urlFor(post.coverImage).width(1400).url()}
              alt={post.title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.5)' }}
              fetchPriority="high"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(42,31,20,0.9), transparent)' }} />
          </div>
        )}
        <div className="px-6 md:px-20 py-12 md:py-16" style={{ background: post.coverImage ? 'var(--dark)' : 'var(--dark)', marginTop: post.coverImage ? '-6rem' : 0, position: 'relative', zIndex: 10 }}>
          <div className="max-w-3xl mx-auto">
            <Link href="/blog" className="text-xs tracking-widest uppercase no-underline hover:opacity-60 transition-opacity inline-block mb-6" style={{ color: 'rgba(196,180,154,0.6)' }}>← Блог</Link>
            <div className="flex items-center gap-4 mb-4">
              {post.category && (
                <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{CATEGORIES[post.category]}</span>
              )}
              {post.readTime && (
                <span className="text-xs" style={{ color: 'var(--taupe)' }}>{post.readTime} хв читання</span>
              )}
            </div>
            <h1 className="font-medium text-[var(--cream)] leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1 }}>
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg leading-relaxed" style={{ color: 'var(--taupe)' }}>{post.excerpt}</p>
            )}
          </div>
        </div>
      </section>

      {/* КОНТЕНТ статті */}
      <section className="px-6 md:px-20 py-16 md:py-24 bg-[var(--warm-white)]">
        <div className="max-w-3xl mx-auto">
          {post.body && <PortableText value={post.body} components={ptComponents} />}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-16 bg-[var(--cream)] text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-4">Читати далі</p>
        <h2 className="text-3xl font-medium text-[var(--dark)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          Більше статей у блозі
        </h2>
        <Link href="/blog" className="inline-block px-10 py-4 text-xs tracking-widest uppercase no-underline hover:opacity-80 transition-opacity" style={{ background: 'var(--dark)', color: 'var(--cream)' }}>
          Всі статті
        </Link>
      </section>

      <Footer />
    </main>
  );
}