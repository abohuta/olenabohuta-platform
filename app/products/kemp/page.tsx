"use client";
import React from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Cross from "../../components/Cross";
export default function Kemp() {
  return (
    <main className="w-full overflow-x-hidden kemp-page">
  <style>{`
    .kemp-page {
      --cream: #FEF8E0;
      --warm-white: #FEF8E0;
      --sand: #F5EDCA;
      --dark: #59020B;
      --text: #000000;
      --light-text: #333333;
      --taupe: #8B6A4A;
    }
  `}</style>

      {/* НАВІГАЦІЯ */}
      <Navbar />

      {/* HERO */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-[70px] bg-[var(--dark)]">
        <div className="px-6 md:px-20 py-20 md:py-32 flex flex-col justify-center">
          <a href="/products" className="text-xs tracking-widest uppercase text-[var(--taupe)] no-underline mb-8 hover:text-[var(--accent)] transition-colors">
            ← Всі продукти
          </a>
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-6">
            Кемп · Навчання · Особистий бренд
          </p>
          <h1 className="text-5xl md:text-7xl font-light leading-tight text-[var(--cream)] mb-6">
            Кемп<br />
            <em className="italic text-[var(--accent)]">Архітектор</em><br />
            Бренду
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-[var(--taupe)] max-w-md mb-10 text-justify">
            Навчання для християн, які хочуть розвивати особистий бренд, вести блог та продавати свої послуги з цінностями й сенсом.
          </p>
          <a href="https://docs.google.com/forms/d/1GTJ6oijlCOO7GfUMlhvGealas2Vo5GI7bh-uaAljfdQ/edit" target="_blank" className="inline-block px-10 py-4 bg-[var(--accent)] text-white no-underline text-xs tracking-widest uppercase self-start hover:bg-[var(--brown)] transition-colors">
            Заповнити анкету передзапису
          </a>
        </div>
        <div className="hidden md:flex items-center justify-center p-20">
          <div className="text-center">
            <span className="text-4xl text-[var(--taupe)] block mb-6"><Cross size={24} color="var(--accent)" /></span>
            <p className="text-2xl italic font-light leading-relaxed text-[var(--taupe)]">
              "Ти покликаний впливати.<br />Твій голос — частина<br />Його задуму."
            </p>
          </div>
        </div>
      </section>

      {/* ДЛЯ КОГО */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--cream)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4">Для кого</p>
        <h2 className="text-4xl md:text-5xl font-light text-center text-[var(--dark)] mb-16 leading-tight">
          Цей кемп — для тебе,<br />якщо ти...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px] max-w-4xl mx-auto">
          <div className="bg-[var(--warm-white)] p-10">
            <h3 className="text-2xl font-light text-[var(--dark)] mb-4">Починаєш вести блог</h3>
            <p className="text-base leading-relaxed text-[var(--light-text)] text-justify">
              Хочеш розпочати особистий християнський блог, але не знаєш, з чого почати, як упакувати себе і дійти до першого результату.
            </p>
          </div>
          <div className="bg-[var(--warm-white)] p-10">
            <h3 className="text-2xl font-light text-[var(--dark)] mb-4">Експерт із покликанням</h3>
            <p className="text-base leading-relaxed text-[var(--light-text)] text-justify">
              Вже маєш знання та послуги, але хочеш вибудувати системний особистий бренд і почати продавати з позиції цінностей.
            </p>
          </div>
        </div>
      </section>

      {/* РЕЗУЛЬТАТИ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--dark)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--taupe)] text-center mb-4">Результати</p>
        <h2 className="text-4xl md:text-5xl font-light text-center text-[var(--cream)] mb-16 leading-tight">
          Що ти отримаєш після кемпу
        </h2>
        <div className="max-w-3xl mx-auto">
          {[
            "Почнеш вести особистий блог із чіткою концепцією, місією та позиціонуванням",
            "Запустиш свою нішу в напрямку експертного християнського блогу",
            "Розпочнеш продавати свої послуги через особистий бренд та контент",
            "Запустиш свій перший інфопродукт із готовою воронкою продажів",
            "Станеш впливовим християнином, чий голос змінює серця й аудиторію",
          ].map((result, i) => (
            <div key={i} className="flex items-start gap-8 py-6 border-b border-[rgba(196,180,154,0.2)]">
              <span className="text-5xl font-light text-[var(--taupe)] opacity-40 min-w-[60px]">
                0{i + 1}
              </span>
              <p className="text-lg leading-relaxed text-[var(--cream)] pt-2">{result}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ПРОГРАМА */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--warm-white)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4">Програма</p>
        <h2 className="text-4xl md:text-5xl font-light text-center text-[var(--dark)] mb-16 leading-tight">
          6 модулів — від основи до запуску
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] max-w-6xl mx-auto">
          {[
            { num: "0", tag: "Вступний модуль", title: "Окреслюємо шлях", items: ["Визначаємо, де ти зараз", "Ідея, місія, бачення", "Образ християнина у соцмережах", "Перші кроки до результату", "Активи блогу"] },
            { num: "1", tag: "Перший модуль", title: "Основа та пакування бренду", items: ["Позиціонування та концепція", "ДНК особистого бренду", "ДНК експертності", "Пакування від початку до продажів", "Як не вигоріти у блозі"] },
            { num: "2", tag: "Другий модуль", title: "Аудиторія", items: ["Аналіз конкурентів", "Лояльність аудиторії", "Сегментація цільової аудиторії", "Продуктова лінійка", "Як створити те, що захочуть купити"] },
            { num: "3", tag: "Третій модуль", title: "Архітектор контенту", items: ["Рівні та види контенту", "Архітектор сторітелінгу", "Прийоми для сторіс", "Концепція візуалу", "Reels та автоворонки"] },
            { num: "4", tag: "Четвертий модуль", title: "Архітектор Автопрогріву", items: ["Карта особистості та сенсів", "Особистість, яка продає", "Контентна воронка продажів", "Reels-стратегії для пакування", "Воронки з хайлайтс"] },
            { num: "5", tag: "П'ятий модуль", title: "Архітектор Продажів", items: ["Фундамент продажів", "Стратегії пошуку клієнтів", "Продажі на теплу аудиторію", "Робота із запереченнями", "Продажі в директ"] },
          ].map((mod) => (
            <div key={mod.num} className="bg-[var(--cream)] p-8 relative hover:bg-[var(--sand)] transition-colors">
              <span className="absolute top-4 right-6 text-6xl font-light text-[var(--taupe)] opacity-20">{mod.num}</span>
              <p className="text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-3">{mod.tag}</p>
              <h3 className="text-lg font-normal text-[var(--dark)] mb-4">{mod.title}</h3>
              <ul className="list-none space-y-1">
                {mod.items.map((item) => (
                  <li key={item} className="text-sm text-[var(--light-text)] before:content-['—'] before:mr-2 before:text-[var(--taupe)]">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ТАРИФИ */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--cream)]">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] text-center mb-4">Тарифи</p>
        <h2 className="text-4xl md:text-5xl font-light text-center text-[var(--dark)] mb-16 leading-tight">
          Обери свій формат
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px] max-w-5xl mx-auto">
          {[
            { tag: "Початківець", title: "Старт", desc: "З куратором — для тих, хто починає з нуля", price: "550", features: ["Доступ до всіх 6 модулів", "Підтримка куратора", "Зворотний зв'язок", "Чат учасників"], featured: false },
            { tag: "Експерт", title: "Разом з автором", desc: "Особиста робота з Оленою Богутою", price: "690", features: ["Все з тарифу Старт", "Сесії з автором курсу", "Персональна стратегія", "Пріоритетна підтримка"], featured: true },
            { tag: "VIP", title: "Запуск", desc: "Повний супровід запуску інфопродукту", price: "990", features: ["Все з тарифу Експерт", "Стратегія запуску продукту", "VIP-уроки з воронок", "Супровід запуску"], featured: false },
          ].map((plan) => (
            <div key={plan.title} className={`p-10 relative hover:-translate-y-1 transition-transform ${plan.featured ? 'bg-[var(--dark)]' : 'bg-[var(--warm-white)]'}`}>
              {plan.featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-xs tracking-widest uppercase px-4 py-1">Популярний</span>}
              <p className={`text-xs tracking-[0.35em] uppercase mb-2 ${plan.featured ? 'text-[var(--taupe)]' : 'text-[var(--accent)]'}`}>{plan.tag}</p>
              <h3 className={`text-2xl font-light mb-2 ${plan.featured ? 'text-[var(--cream)]' : 'text-[var(--dark)]'}`}>{plan.title}</h3>
              <p className={`text-sm mb-6 leading-relaxed ${plan.featured ? 'text-[var(--taupe)]' : 'text-[var(--light-text)]'}`}>{plan.desc}</p>
              <p className={`text-5xl font-light mb-1 ${plan.featured ? 'text-[var(--cream)]' : 'text-[var(--dark)]'}`}><span className="text-xl align-super">$</span>{plan.price}</p>
              <p className={`text-xs mb-8 ${plan.featured ? 'text-[var(--taupe)]' : 'text-[var(--light-text)]'}`}>USD · повна оплата</p>
              <ul className="list-none space-y-2 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className={`text-sm before:content-['✓'] before:mr-2 before:text-[var(--accent)] ${plan.featured ? 'text-[rgba(253,251,248,0.7)]' : 'text-[var(--light-text)]'}`}>{f}</li>
                ))}
              </ul>
              <a href="https://docs.google.com/forms/d/1GTJ6oijlCOO7GfUMlhvGealas2Vo5GI7bh-uaAljfdQ/edit" target="_blank"
                className={`block text-center py-3 text-xs tracking-widest uppercase no-underline transition-colors ${plan.featured ? 'bg-[var(--accent)] text-white hover:bg-[var(--brown)]' : 'border border-[var(--dark)] text-[var(--dark)] hover:bg-[var(--dark)] hover:text-[var(--cream)]'}`}>
                Залишити заявку
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-20 md:py-32 bg-[var(--dark)] text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-[var(--taupe)] mb-4">Почни сьогодні</p>
        <h2 className="text-5xl md:text-7xl font-light text-[var(--cream)] leading-tight mb-8">
          Готовий(а) стати<br />
          <em className="italic text-[var(--accent)]">Архітектором</em><br />
          свого бренду?
        </h2>
        <p className="text-lg text-[var(--taupe)] max-w-lg mx-auto mb-10 leading-relaxed">
          Заповни анкету передзапису — і ми зв'яжемося з тобою з деталями про старт та умови участі.
        </p>
        <a href="https://docs.google.com/forms/d/1GTJ6oijlCOO7GfUMlhvGealas2Vo5GI7bh-uaAljfdQ/edit" target="_blank"
          className="inline-block px-12 py-4 bg-[var(--accent)] text-white no-underline text-xs tracking-widest uppercase hover:bg-[var(--brown)] transition-colors">
          Заповнити анкету передзапису
        </a>
      </section>
      <Footer />

    </main>
  );
}