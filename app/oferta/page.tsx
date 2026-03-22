"use client";
import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function Oferta() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <section className="px-6 md:px-20 py-32 min-h-screen max-w-3xl">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-4">Документи</p>
        <h1 className="text-5xl font-light text-[var(--dark)] mb-8">Договір оферти</h1>
        <p className="text-lg text-[var(--light-text)]">Текст договору оферти буде додано.</p>
      </section>
      <Footer />
    </main>
  );
}