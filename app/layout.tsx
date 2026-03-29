import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";
import Script from "next/script";
import ProgressBar from "./components/ProgressBar";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const nunito = Nunito({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Олена Богута — особистий бренд для християн",
  description: "Платформа для християн які хочуть розвивати особистий бренд, вести блог та продавати послуги з цінностями й сенсом.",
  keywords: ["особистий бренд", "християни", "блог", "Instagram", "онлайн навчання", "Олена Богута"],
  authors: [{ name: "Олена Богута" }],
  openGraph: {
    title: "Олена Богута — особистий бренд для християн",
    description: "Платформа для християн які хочуть розвивати особистий бренд",
    url: "https://olenabohuta.com",
    siteName: "Олена Богута",
    locale: "uk_UA",
    type: "website",
    images: [{ url: "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_face/v1774359969/Olena_Bohuta_htaxhd.webp", width: 1200, height: 630, alt: "Олена Богута" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Олена Богута — особистий бренд для християн",
    description: "Платформа для християн які хочуть розвивати особистий бренд",
    images: ["https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200,h_630,c_fill,g_face/v1774359969/Olena_Bohuta_htaxhd.webp"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" data-scroll-behavior="smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1SK0KTZ8NV"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1SK0KTZ8NV');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Олена Богута",
              "url": "https://olenabohuta.com",
              "image": "https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto/v1774359969/Olena_Bohuta_htaxhd.webp",
              "sameAs": [
                "https://www.instagram.com/olenka.bohuta",
                "https://t.me/olenabohuta"
              ],
              "jobTitle": "Наставник особистого бренду",
              "description": "Засновниця першого в Україні навчання для християн у соцмережах. Понад 400 клієнтів та учнів.",
              "knowsAbout": ["Особистий бренд", "Instagram", "Блогінг", "Онлайн навчання", "Christian бізнес"],
              "worksFor": {
                "@type": "Organization",
                "name": "Олена Богута — особистий бренд",
                "url": "https://olenabohuta.com"
              }
            })
          }}
        />
      </head>
      <body className={`${cormorant.variable} ${nunito.variable} antialiased`} suppressHydrationWarning>
        <ProgressBar />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}