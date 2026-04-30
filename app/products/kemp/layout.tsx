import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кемп Архітектор Бренду — Олена Богута",
  description: "8-тижневий кемп для Christian-блогерів і підприємців. Побудуй особистий бренд, залучай аудиторію і продавай з цінностями.",
  alternates: { canonical: 'https://olenabohuta.com/products/kemp' },
  openGraph: {
    title: "Кемп Архітектор Бренду",
    description: "8-тижневий кемп для Christian-блогерів і підприємців",
    url: "https://olenabohuta.com/products/kemp",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1774359948/architect_zhdzma.png", width: 1200, height: 630, alt: "Кемп Архітектор Бренду" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "Кемп Архітектор Бренду",
              "description": "8-тижневий кемп для Christian-блогерів і підприємців.",
              "url": "https://olenabohuta.com/products/kemp",
              "provider": { "@type": "Person", "name": "Олена Богута", "url": "https://olenabohuta.com" },
              "instructor": { "@type": "Person", "name": "Олена Богута" },
              "inLanguage": "uk",
              "offers": { "@type": "Offer", "price": "550", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
              "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "duration": "P8W" }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Чи підходить кемп якщо я повний новачок?", "acceptedAnswer": { "@type": "Answer", "text": "Так! Кемп починається з нуля — з визначення де ти зараз і побудови фундаменту." } },
                { "@type": "Question", "name": "Скільки часу займає навчання на тиждень?", "acceptedAnswer": { "@type": "Answer", "text": "В середньому 3–5 годин на тиждень. Всі матеріали залишаються у тебе назавжди." } },
                { "@type": "Question", "name": "Чи є розстрочка або часткова оплата?", "acceptedAnswer": { "@type": "Answer", "text": "Так, для деяких тарифів доступна часткова оплата. Напиши нам у Telegram." } },
                { "@type": "Question", "name": "Чи отримаю я сертифікат?", "acceptedAnswer": { "@type": "Answer", "text": "Так, після завершення кемпу видається сертифікат про проходження навчання." } },
              ]
            }
          ])
        }}
      />
      {children}
    </>
  );
}