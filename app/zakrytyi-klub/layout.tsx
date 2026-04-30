import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Закритий Клуб — Олена Богута",
  description: "Закрита спільнота Christian-підприємців і блогерів. Щомісячні зустрічі, підтримка та розвиток разом.",
  alternates: { canonical: 'https://olenabohuta.com/zakrytyi-klub' },
  openGraph: {
    title: "Закритий Клуб — Олена Богута",
    description: "Закрита спільнота Christian-підприємців і блогерів",
    url: "https://olenabohuta.com/zakrytyi-klub",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1774359896/comunity_pbopmh.webp", width: 1200, height: 630, alt: "Закритий Клуб" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}