import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Консультації — Олена Богута",
  description: "Особиста робота з Оленою над твоїм брендом, стратегією та контентом. Розбір бренду, контент-стратегія, запуск продукту.",
  alternates: { canonical: 'https://olenabohuta.com/products/konsultatsii' },
  openGraph: {
    title: "Консультації — Олена Богута",
    description: "Особиста робота з Оленою над твоїм брендом і стратегією",
    url: "https://olenabohuta.com/products/konsultatsii",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_face/v1774359969/Olena_Bohuta_htaxhd.webp", width: 1200, height: 630, alt: "Консультації" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}