import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кемп Архітектор Бренду — Олена Богута",
  description: "8-тижневий кемп для Christian-блогерів і підприємців. Побудуй особистий бренд, залучай аудиторію і продавай з цінностями.",
  openGraph: {
    title: "Кемп Архітектор Бренду",
    description: "8-тижневий кемп для Christian-блогерів і підприємців",
    url: "https://olenabohuta.com/products/kemp",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1774359948/architect_zhdzma.png", width: 1200, height: 630, alt: "Кемп Архітектор Бренду" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}