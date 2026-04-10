import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ера Можливостей — Як християнам заробляти в Instagram · Олена Богута",
  description: "Безкоштовний майстер-клас: мислення, техніка та холодна воронка, яка приносить дохід без щоденного контенту. Дивись відео зараз.",
  openGraph: {
    title: "Ера Можливостей — Безкоштовний майстер-клас",
    description: "Як християнам заробляти в Instagram: мислення, техніка, воронки та реальні результати учасниць.",
    url: "https://olenabohuta.com/era-mozhlyvostei",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1774448751/photo_2026-03-25_15.17.06_sw70mx.jpg", width: 1200, height: 630 }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
