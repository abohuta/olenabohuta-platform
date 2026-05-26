import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Навчання — Програми для Christian-блогерів · Олена Богута",
  description: "Практичні програми для християн: від першого блогу до системної монетизації в Instagram. Марафони, курси, особисті консультації.",
  keywords: ["навчання для християн", "Christian блог", "курси Instagram", "особистий бренд", "Олена Богута", "монетизація блогу"],
  alternates: { canonical: 'https://olenabohuta.com/navchannya' },
  openGraph: {
    title: "Навчання — Програми для Christian-блогерів · Олена Богута",
    description: "Практичні програми для тих, хто хоче вести блог і заробляти в Instagram з вірою і сенсом.",
    url: "https://olenabohuta.com/navchannya",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1775908998/olenka_couse_light_uwmjnw.webp", width: 1200, height: 630, alt: "Навчання — Олена Богута" }],
  },
};

const navchannyaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ItemList",
      "@id": "https://olenabohuta.com/navchannya#courses",
      "name": "Навчальні програми Олени Богути",
      "description": "Практичні програми для Christian-блогерів і підприємців",
      "url": "https://olenabohuta.com/navchannya",
      "numberOfItems": 6,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Кемп Архітектор Бренду", "url": "https://olenabohuta.com/products/kemp" },
        { "@type": "ListItem", "position": 2, "name": "ТИША — Premium навчання", "url": "https://olenabohuta.com/products/tysha" },
        { "@type": "ListItem", "position": 3, "name": "Шлях", "url": "https://olenabohuta.com/products/shlyakh" },
        { "@type": "ListItem", "position": 4, "name": "Початок", "url": "https://olenabohuta.com/products/pochatok" },
        { "@type": "ListItem", "position": 5, "name": "Ера Можливостей", "url": "https://olenabohuta.com/products/era-mozhlyvostei" },
        { "@type": "ListItem", "position": 6, "name": "Консультації", "url": "https://olenabohuta.com/products/konsultatsii" }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Головна", "item": "https://olenabohuta.com" },
        { "@type": "ListItem", "position": 2, "name": "Навчання", "item": "https://olenabohuta.com/navchannya" }
      ]
    }
  ]
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(navchannyaJsonLd) }} />
      {children}
    </>
  );
}
