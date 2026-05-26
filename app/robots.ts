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
        // AI боти для цитувань — дозволяємо (з'являємось у відповідях ChatGPT/Perplexity)
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      {
        // Блокуємо боти що збирають дані для навчання AI моделей
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