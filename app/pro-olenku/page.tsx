"use client";
import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function ProOlenku() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <section className="px-6 md:px-20 py-32 min-h-screen">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-4">Про автора</p>
<h1 className="text-5xl md:text-7xl font-light text-[var(--dark)] mb-8">Олена Богута</h1>
        <p className="text-lg text-[var(--light-text)]">Скоро тут з'явиться більше інформації.</p>
      </section>
      <Footer />
      
    </main>
  );
}