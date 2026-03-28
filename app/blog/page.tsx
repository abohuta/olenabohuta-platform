import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPosts, urlFor, CATEGORIES } from "../../lib/sanity";
import EmailSubscribeForm from "../components/EmailSubscribeForm";

export const revalidate = 0;
export const metadata: Metadata = {
  title: "Блог — Олена Богута",
  description: "Статті про особистий бренд, віру, соцмережі та розвиток для Christian-підприємців і блогерів.",
  openGraph: {
    title: "Блог — Олена Богута",
    description: "Статті про особистий бренд, віру та соцмережі",
    url: "https://olenabohuta.com/blog",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1774359969/Olena_Bohuta_htaxhd.webp", width: 1200, height: 630 }],
  },
};

export default async function Blog() {
  const posts = await getPosts();

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="px-6 md:px-20 py-32 md:py-40 bg-[var(--dark)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-6">Блог</p>
        <h1 className="font-medium text-[var(--cream)] leading-tight mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 0.95 }}>
          Думки,<br />
          <em className="italic text-[var(--accent)]">натхнення</em><br />
          та кейси
        </h1>
        <p className="text-lg text-[var(--taupe)] max-w-xl leading-relaxed">
          Статті про особистий бренд, віру, соцмережі та розвиток — для тих хто будує з сенсом.
        </p>
      </section>

      {/* СТАТТІ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)]">
        {posts.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center py-20">
            <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-4">Незабаром</p>
            <h2 className="text-3xl md:text-4xl font-medium text-[var(--dark)] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Статті скоро з'являться
            </h2>
            <p className="text-base text-[var(--light-text)] leading-relaxed">
              Підпишись на розсилку щоб першою дізнатись про нові публікації.
            </p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Головна стаття */}
            {(() => {
              const featured = posts.find((p: any) => p.featured === true);
              if (!featured) return null;
              return (
                <a href={`/blog/${featured.slug.current}`} className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-4 no-underline block group" style={{ background: 'var(--cream)' }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {featured.coverImage ? (
                      <img src={urlFor(featured.coverImage).width(800).url()} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full bg-[var(--sand)] flex items-center justify-center">
                        <span className="text-[var(--taupe)] text-4xl">✦</span>
                      </div>
                    )}
                  </div>
                  <div className="p-10 md:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs tracking-widest uppercase px-3 py-1" style={{ background: 'var(--accent)', color: 'white' }}>Головна стаття</span>
                      {featured.category && (
                        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{CATEGORIES[featured.category]}</span>
                      )}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-medium text-[var(--dark)] mb-4 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>{featured.title}</h2>
                    <p className="text-sm leading-relaxed text-[var(--light-text)] mb-6 text-justify">{featured.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs tracking-widest uppercase text-[var(--accent)] border-b border-[var(--accent)] pb-1">Читати →</span>
                      {featured.readTime && <span className="text-xs text-[var(--taupe)]">{featured.readTime} хв читання</span>}
                    </div>
                  </div>
                </a>
              );
            })()}

            {/* Сітка статей */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
              {posts.filter((p: any) => {
  const featured = posts.find((p: any) => p.featured === true);
  return p._id !== featured?._id;
}).map((post: any) => (
                <a key={post._id} href={`/blog/${post.slug.current}`} className="no-underline block group" style={{ background: 'var(--cream)' }}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={urlFor(post.coverImage).width(600).url()}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-[var(--sand)] flex items-center justify-center">
                        <span className="text-[var(--taupe)] text-3xl">✦</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-3">
                      {post.category && (
                        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--accent)' }}>{CATEGORIES[post.category]}</span>
                      )}
                      {post.readTime && (
                        <span className="text-xs" style={{ color: 'var(--taupe)' }}>{post.readTime} хв</span>
                      )}
                    </div>
                    <h3 className="text-xl font-medium text-[var(--dark)] mb-3 leading-tight group-hover:text-[var(--accent)] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[var(--light-text)] line-clamp-3">{post.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-20 bg-[var(--dark)] text-center">
        <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--taupe)' }}>Розсилка</p>
        <h2 className="text-3xl md:text-4xl font-medium mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)', color: 'var(--cream)' }}>
          Отримуй нові статті<br />
          <em className="italic" style={{ color: 'var(--accent)' }}>на email</em>
        </h2>
        <p className="text-base mb-8 max-w-md mx-auto leading-relaxed" style={{ color: 'var(--taupe)' }}>
          Підпишись і отримуй корисні матеріали про бренд, віру та соцмережі прямо на пошту.
        </p>
        <EmailSubscribeForm dark={true} />
      </section>

      <Footer />
    </main>
  );
}