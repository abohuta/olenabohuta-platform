import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Політика конфіденційності — Олена Богута",
  description: "Політика конфіденційності та обробки персональних даних на платформі Олени Богути.",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
