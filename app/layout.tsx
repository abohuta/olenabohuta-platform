import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
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
      <body className={`${cormorant.variable} ${jost.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}