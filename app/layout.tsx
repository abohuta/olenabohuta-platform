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
});

const nunito = Nunito({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Олена Богута — особистий бренд для християн",
    description: "Платформа для християн які хочуть розвивати особистий бренд",
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
    <html lang="uk">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1SK0KTZ8NV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1SK0KTZ8NV');
          `}
        </Script>
      </head>
      <body className={`${cormorant.variable} ${nunito.variable} antialiased`} suppressHydrationWarning>
        <ProgressBar />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}