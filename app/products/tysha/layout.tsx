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
  return <>{children}</>;
}