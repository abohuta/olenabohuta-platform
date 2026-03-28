import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ТИША — Premium навчання для експертів · Олена Богута",
  description: "8 тижнів — від ідеї до запуску Premium-продукту. Навчання для Christian-експертів які хочуть масштабуватись.",
  openGraph: {
    title: "ТИША — Premium навчання для експертів",
    description: "8 тижнів — від ідеї до запуску Premium-продукту",
    url: "https://olenabohuta.com/products/tysha",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1774448751/photo_2026-03-25_15.17.06_sw70mx.jpg", width: 1200, height: 630, alt: "ТИША" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "ТИША — Premium навчання для експертів",
            "description": "8 тижнів — від ідеї до запуску Premium-продукту. Навчання для Christian-експертів які хочуть масштабуватись.",
            "url": "https://olenabohuta.com/products/tysha",
            "image": "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774448751/photo_2026-03-25_15.17.06_sw70mx.jpg",
            "provider": {
              "@type": "Person",
              "name": "Олена Богута",
              "url": "https://olenabohuta.com"
            },
            "instructor": {
              "@type": "Person",
              "name": "Олена Богута",
              "url": "https://olenabohuta.com"
            },
            "educationalLevel": "Advanced",
            "inLanguage": "uk",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "url": "https://olenabohuta.com/products/tysha"
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "duration": "P8W"
            }
          })
        }}
      />
      {children}
    </>
  );
}