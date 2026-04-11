import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог — Олена Богута",
  description: "Думки, натхнення і практичні поради для Christian-блогерів і підприємців. Про бренд, монетизацію, контент і віру.",
  keywords: ["блог", "Christian блогер", "особистий бренд", "Instagram", "монетизація", "Олена Богута"],
  openGraph: {
    title: "Блог — Олена Богута",
    description: "Думки, натхнення і практичні поради для Christian-блогерів і підприємців.",
    url: "https://olenabohuta.com/blog",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_face/v1774359969/Olena_Bohuta_htaxhd.webp", width: 1200, height: 630, alt: "Блог — Олена Богута" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
