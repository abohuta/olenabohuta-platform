import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Публічна оферта — Олена Богута",
  description: "Публічна оферта на надання освітніх послуг. Умови придбання програм та курсів на платформі Олени Богути.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
