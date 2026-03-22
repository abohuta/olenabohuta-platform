import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";

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
  title: "Олена Богута",
  description: "Платформа для християн які хочуть розвивати особистий бренд",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${cormorant.variable} ${nunito.variable} antialiased`} suppressHydrationWarning>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}