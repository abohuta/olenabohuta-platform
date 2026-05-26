import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог — Олена Богута",
  description: "Думки, натхнення і практичні поради для Christian-блогерів і підприємців. Про бренд, монетизацію, контент і віру.",
  keywords: ["блог", "Christian блогер", "особистий бренд", "Instagram", "монетизація", "Олена Богута"],
  alternates: { canonical: 'https://olenabohuta.com/blog' },
  openGraph: {
    title: "Блог — Олена Богута",
    description: "Думки, натхнення і практичні поради для Christian-блогерів і підприємців.",
    url: "https://olenabohuta.com/blog",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_face/v1774359969/Olena_Bohuta_htaxhd.webp", width: 1200, height: 630, alt: "Блог — Олена Богута" }],
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": "https://olenabohuta.com/blog#blog",
      "url": "https://olenabohuta.com/blog",
      "name": "Блог Олени Богути",
      "description": "Думки, натхнення і практичні поради для Christian-блогерів і підприємців.",
      "inLanguage": "uk",
      "author": { "@id": "https://olenabohuta.com/#person" },
      "publisher": { "@id": "https://olenabohuta.com/#organization" },
      "isPartOf": { "@id": "https://olenabohuta.com/#website" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Головна", "item": "https://olenabohuta.com" },
        { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://olenabohuta.com/blog" }
      ]
    }
  ]
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      {children}
    </>
  );
}
