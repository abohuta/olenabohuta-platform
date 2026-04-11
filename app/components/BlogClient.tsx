"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { CATEGORIES } from "../../lib/sanity";

const POSTS_PER_PAGE = 9;
const CAROUSEL_COUNT = 5;

type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  excerpt: string;
  coverImage?: any;
  publishedAt?: string;
  featured?: boolean;
  readTime?: number;
  coverUrl?: string;
};

function getCoverUrl(post: Post): string | null {
  return post.coverUrl || null;
}

// ── Carousel card ────────────────────────────────────────────
function CarouselCard({ post }: { post: Post }) {
  const img = getCoverUrl(post);
  return (
    <a
      href={`/blog/${post.slug.current}`}
      className="no-underline flex-shrink-0 group"
      style={{ width: "280px" }}
    >
      <div
        className="overflow-hidden"
        style={{ borderRadius: "2px", background: "var(--cream)" }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          {img ? (
            <img
              src={img}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "var(--sand)" }}
            >
              <span style={{ color: "var(--taupe)", fontSize: "1.5rem" }}>✦</span>
            </div>
          )}
          {post.category && (
            <span
              className="absolute top-3 left-3 text-xs tracking-widest uppercase px-2 py-1"
              style={{ background: "var(--dark)", color: "var(--accent)", fontSize: "0.6rem" }}
            >
              {CATEGORIES[post.category] || post.category}
            </span>
          )}
        </div>
        <div className="p-5">
          <h3
            className="text-base font-medium leading-snug mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-2"
            style={{ fontFamily: "var(--font-heading)", color: "var(--dark)" }}
          >
            {post.title}
          </h3>
          {post.readTime && (
            <span className="text-xs" style={{ color: "var(--taupe)" }}>
              {post.readTime} хв читання
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

// ── Grid card ─────────────────────────────────────────────────
function GridCard({ post }: { post: Post }) {
  const img = getCoverUrl(post);
  return (
    <a
      href={`/blog/${post.slug.current}`}
      className="no-underline block group"
      style={{ background: "var(--cream)" }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        {img ? (
          <img
            src={img}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "var(--sand)" }}
          >
            <span style={{ color: "var(--taupe)", fontSize: "2rem" }}>✦</span>
          </div>
        )}
      </div>
      <div className="p-7">
        <div className="flex items-center justify-between mb-3">
          {post.category && (
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              {CATEGORIES[post.category] || post.category}
            </span>
          )}
          {post.readTime && (
            <span className="text-xs" style={{ color: "var(--taupe)" }}>
              {post.readTime} хв
            </span>
          )}
        </div>
        <h3
          className="text-xl font-medium leading-tight mb-3 group-hover:text-[var(--accent)] transition-colors"
          style={{ fontFamily: "var(--font-heading)", color: "var(--dark)" }}
        >
          {post.title}
        </h3>
        <p
          className="text-sm leading-relaxed line-clamp-2"
          style={{ color: "var(--light-text)" }}
        >
          {post.excerpt}
        </p>
      </div>
    </a>
  );
}

// ── Main component ────────────────────────────────────────────
export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showCount, setShowCount] = useState(POSTS_PER_PAGE);

  // Categories that actually exist in posts
  const availableCategories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
    return cats;
  }, [posts]);

  // Carousel: featured first, then recent
  const carouselPosts = useMemo(() => {
    const featured = posts.filter((p) => p.featured);
    const rest = posts.filter((p) => !p.featured);
    return [...featured, ...rest].slice(0, CAROUSEL_COUNT);
  }, [posts]);

  // Filtered posts for grid
  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return posts;
    return posts.filter((p) => p.category === activeCategory);
  }, [posts, activeCategory]);

  const visiblePosts = filteredPosts.slice(0, showCount);
  const hasMore = showCount < filteredPosts.length;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setShowCount(POSTS_PER_PAGE);
  };

  return (
    <>
      {/* ── CAROUSEL ────────────────────────────────────────── */}
      {carouselPosts.length > 0 && (
        <section className="py-12 bg-[var(--warm-white)]">
          <div className="px-6 md:px-20 mb-6">
            <p className="text-xs tracking-[0.35em] uppercase" style={{ color: "var(--accent)" }}>
              Популярне
            </p>
          </div>
          <div
            className="flex gap-4 overflow-x-auto pb-4"
            style={{
              paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
              paddingRight: "clamp(1.5rem, 5vw, 5rem)",
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {carouselPosts.map((post) => (
              <div key={post._id} style={{ scrollSnapAlign: "start" }}>
                <CarouselCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FILTERS + GRID ──────────────────────────────────── */}
      <section className="px-6 md:px-20 pb-24 bg-[var(--warm-white)]">
        {/* Filter tabs */}
        <div className="mb-10">
          <div
            className="flex flex-wrap gap-2"
            style={{ borderBottom: "1px solid var(--sand)", paddingBottom: "1rem" }}
          >
            {/* All */}
            <button
              onClick={() => handleCategoryChange("all")}
              className="text-xs tracking-widest uppercase px-4 py-2 transition-all cursor-pointer"
              style={{
                background: activeCategory === "all" ? "var(--dark)" : "transparent",
                color: activeCategory === "all" ? "var(--cream)" : "var(--light-text)",
                border: "1px solid",
                borderColor: activeCategory === "all" ? "var(--dark)" : "var(--sand)",
              }}
            >
              Всі ({posts.length})
            </button>

            {availableCategories.map((cat) => {
              const count = posts.filter((p) => p.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="text-xs tracking-widest uppercase px-4 py-2 transition-all cursor-pointer"
                  style={{
                    background: isActive ? "var(--dark)" : "transparent",
                    color: isActive ? "var(--cream)" : "var(--light-text)",
                    border: "1px solid",
                    borderColor: isActive ? "var(--dark)" : "var(--sand)",
                  }}
                >
                  {CATEGORIES[cat] || cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {visiblePosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: "var(--taupe)" }}>
              Статей у цій категорії поки немає
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
              {visiblePosts.map((post) => (
                <GridCard key={post._id} post={post} />
              ))}
            </div>

            {/* Load more */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowCount((c) => c + 6)}
                  className="text-xs tracking-widest uppercase px-10 py-4 transition-all cursor-pointer hover:opacity-70"
                  style={{
                    border: "1px solid var(--sand)",
                    color: "var(--light-text)",
                    background: "transparent",
                  }}
                >
                  Завантажити ще ({filteredPosts.length - showCount})
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
