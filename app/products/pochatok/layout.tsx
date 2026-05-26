import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Початок — Олена Богута",
  description: "Стартова програма для Christian-жінок які хочуть почати вести блог в Instagram. Перші кроки, перші підписники і перші продажі — без вигорання.",
  alternates: { canonical: 'https://olenabohuta.com/products/pochatok' },
  openGraph: {
    title: "Початок — Старт блогу для Christian-жінок",
    description: "Стартова програма для тих, хто хоче почати вести Instagram-блог з вірою і сенсом.",
    url: "https://olenabohuta.com/products/pochatok",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_face/v1774359969/Olena_Bohuta_htaxhd.webp", width: 1200, height: 630, alt: "Початок" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Головна", "item": "https://olenabohuta.com" },
    { "@type": "ListItem", "position": 2, "name": "Навчання", "item": "https://olenabohuta.com/navchannya" },
    { "@type": "ListItem", "position": 3, "name": "Початок", "item": "https://olenabohuta.com/products/pochatok" }
  ]
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}