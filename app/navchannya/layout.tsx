import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Навчання — Програми для Christian-блогерів · Олена Богута",
  description: "Практичні програми для християн: від першого блогу до системної монетизації в Instagram. Марафони, курси, особисті консультації.",
  keywords: ["навчання для християн", "Christian блог", "курси Instagram", "особистий бренд", "Олена Богута", "монетизація блогу"],
  openGraph: {
    title: "Навчання — Програми для Christian-блогерів · Олена Богута",
    description: "Практичні програми для тих, хто хоче вести блог і заробляти в Instagram з вірою і сенсом.",
    url: "https://olenabohuta.com/navchannya",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill/v1775908998/olenka_couse_light_uwmjnw.webp", width: 1200, height: 630, alt: "Навчання — Олена Богута" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
