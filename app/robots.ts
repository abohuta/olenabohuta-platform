import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Основні пошукові боти
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio/',      // Sanity адмінка
          '/api/',         // API endpoints
          '/_next/',       // Next.js внутрішні файли
          '/static/',      // Статичні файли
        ],
      },
      {
        // Блокуємо агресивних SEO-ботів
        userAgent: 'AhrefsBot',
        disallow: '/',
      },
      {
        userAgent: 'SemrushBot',
        disallow: '/',
      },
      {
        userAgent: 'MJ12bot',
        disallow: '/',
      },
      {
        userAgent: 'DotBot',
        disallow: '/',
      },
      {
        // AI боти — блокуємо щоб не використовували контент для навчання
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
    sitemap: 'https://olenabohuta.com/sitemap.xml',
    host: 'https://olenabohuta.com',
  }
}