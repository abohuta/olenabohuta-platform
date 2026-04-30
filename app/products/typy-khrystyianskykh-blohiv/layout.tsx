import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Які типи Christian-блогів зростають в Instagram · Олена Богута",
  description: "Безкоштовний відео-урок: дізнайся свій тип блогу серед 5 моделей, які зростають в Instagram серед Christian-аудиторії. Дивись без реєстрації.",
  keywords: ["типи блогів", "Christian блог", "Instagram блог", "як вести блог", "Олена Богута", "безкоштовний урок"],
  alternates: { canonical: 'https://olenabohuta.com/products/typy-khrystyianskykh-blohiv' },
  openGraph: {
    title: "Які типи Christian-блогів зростають в Instagram · Олена Богута",
    description: "Безкоштовний відео-урок: знайди свій тип блогу — і не копіюй чужу модель.",
    url: "https://olenabohuta.com/products/typy-khrystyianskykh-blohiv",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_face/v1774359969/Olena_Bohuta_htaxhd.webp", width: 1200, height: 630, alt: "Які типи Christian-блогів зростають" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
