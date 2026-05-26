import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Про автора — Олена Богута",
  description: "Олена Богута — Christian-підприємець, блогер і засновниця освітньої платформи для тих, хто хоче будувати бренд і бізнес з вірою та сенсом.",
  keywords: ["Олена Богута", "про автора", "Christian блогер", "особистий бренд", "Christian підприємець"],
  alternates: { canonical: 'https://olenabohuta.com/pro-olenku' },
  openGraph: {
    title: "Про автора — Олена Богута",
    description: "Christian-підприємець, блогер і засновниця освітньої платформи для тих, хто хоче будувати бренд і бізнес з вірою та сенсом.",
    url: "https://olenabohuta.com/pro-olenku",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_face/v1774359969/Olena_Bohuta_htaxhd.webp", width: 1200, height: 630, alt: "Олена Богута" }],
  },
};

const profileJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://olenabohuta.com/pro-olenku#profilepage",
      "url": "https://olenabohuta.com/pro-olenku",
      "name": "Про автора — Олена Богута",
      "inLanguage": "uk",
      "isPartOf": { "@id": "https://olenabohuta.com/#website" },
      "about": { "@id": "https://olenabohuta.com/#person" },
      "mainEntity": { "@id": "https://olenabohuta.com/#person" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Головна", "item": "https://olenabohuta.com" },
        { "@type": "ListItem", "position": 2, "name": "Про Олену", "item": "https://olenabohuta.com/pro-olenku" }
      ]
    }
  ]
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      {children}
    </>
  );
}
