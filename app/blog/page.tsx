import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EmailSubscribeForm from "../components/EmailSubscribeForm";
import BlogClient from "../components/BlogClient";
import { getPosts, urlFor } from "../../lib/sanity";

export const revalidate = 60;

export default async function Blog() {
  const rawPosts = await getPosts();

  // Pre-compute cover URLs server-side so BlogClient stays a pure client component
  const posts = rawPosts.map((post: any) => ({
    ...post,
    coverUrl: post.coverImage
      ? urlFor(post.coverImage).width(800).height(500).url()
      : null,
  }));

  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />

      {/* HERO — compact */}
      <section className="px-6 md:px-20 pt-32 pb-16 bg-[var(--dark)] relative overflow-hidden">
        {/* Typographic watermark */}
        <div
          className="absolute inset-0 flex items-center pointer-events-none select-none"
          aria-hidden="true"
          style={{ paddingLeft: "clamp(1.5rem, 5vw, 5rem)" }}
        >
          <span
            className="font-medium leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(120px, 22vw, 340px)",
              opacity: 1,
              letterSpacing: "-0.04em",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(196,180,154,0.12)",
            }}
          >
            ДУМКИ
          </span>
        </div>

        <div className="max-w-3xl relative z-10">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-5">Блог</p>
          <h1
            className="font-medium text-[var(--cream)] leading-none mb-5"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              lineHeight: 0.95,
            }}
          >
            Думки,{" "}
            <em className="italic text-[var(--accent)]">натхнення</em>
            <br />
            та кейси
          </h1>
          <p
            className="text-base leading-relaxed max-w-lg"
            style={{ color: "var(--taupe)" }}
          >
            Статті про особистий бренд, віру, соцмережі та розвиток — для тих хто будує з сенсом.
          </p>
        </div>
      </section>

      {/* CAROUSEL + FILTERS + GRID */}
      {posts.length === 0 ? (
        <section className="px-6 md:px-20 py-32 bg-[var(--warm-white)]">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-4">Незабаром</p>
            <h2
              className="text-3xl md:text-4xl font-medium text-[var(--dark)] mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Статті скоро з'являться
            </h2>
            <p className="text-base text-[var(--light-text)] leading-relaxed">
              Підпишись на розсилку щоб першою дізнатись про нові публікації.
            </p>
          </div>
        </section>
      ) : (
        <BlogClient posts={posts} />
      )}

      {/* CTA — email subscribe */}
      <section className="px-6 md:px-20 py-20 bg-[var(--dark)] text-center">
        <p className="text-xs tracking-[0.35em] uppercase mb-4" style={{ color: "var(--taupe)" }}>
          Розсилка
        </p>
        <h2
          className="text-3xl md:text-4xl font-medium mb-6 leading-tight"
          style={{ fontFamily: "var(--font-heading)", color: "var(--cream)" }}
        >
          Отримуй нові статті
          <br />
          <em className="italic" style={{ color: "var(--accent)" }}>
            на email
          </em>
        </h2>
        <p
          className="text-base mb-8 max-w-md mx-auto leading-relaxed"
          style={{ color: "var(--taupe)" }}
        >
          Підпишись і отримуй корисні матеріали про бренд, віру та соцмережі прямо на пошту.
        </p>
        <EmailSubscribeForm dark={true} />
      </section>

      <Footer />
    </main>
  );
}
