import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Початок — Олена Богута",
  description: "Курс Початок — незабаром. Слідкуй за оновленнями в Instagram та Telegram.",
  openGraph: {
    title: "Початок — Олена Богута",
    description: "Курс Початок — незабаром",
    url: "https://olenabohuta.com/products/pochatok",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1774359969/Olena_Bohuta_htaxhd.webp", width: 1200, height: 630, alt: "Початок" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}