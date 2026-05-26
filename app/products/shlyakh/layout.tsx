import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Шлях — Олена Богута",
  description: "Курс Шлях — дисципліна, сила волі та мислення для Christian-жінок. Навчись будувати звички, вести Instagram без вигорання і знайти баланс між вірою, сім'єю і ціллю.",
  alternates: { canonical: 'https://olenabohuta.com/products/shlyakh' },
  openGraph: {
    title: "Шлях — Дисципліна та сила волі для Christian-жінок",
    description: "Практичний курс про звички, мислення і баланс. Для тих хто хоче рости з вірою і сенсом.",
    url: "https://olenabohuta.com/products/shlyakh",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_face/v1774359969/Olena_Bohuta_htaxhd.webp", width: 1200, height: 630, alt: "Шлях" }],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Головна", "item": "https://olenabohuta.com" },
    { "@type": "ListItem", "position": 2, "name": "Навчання", "item": "https://olenabohuta.com/navchannya" },
    { "@type": "ListItem", "position": 3, "name": "Шлях", "item": "https://olenabohuta.com/products/shlyakh" }
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
