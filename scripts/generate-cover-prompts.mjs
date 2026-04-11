// scripts/generate-cover-prompts.mjs
// Генерує промпти для AI-генерації обкладинок для кожної статті блогу
// Run: node scripts/generate-cover-prompts.mjs
// Output: scripts/cover-prompts.md

import { createClient } from '@sanity/client'
import { readFileSync, writeFileSync } from 'fs'

const envRaw = readFileSync('.env.local', 'utf8')
const env = Object.fromEntries(
  envRaw.split('\n')
    .filter(l => l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^"|"$/g, '')] })
)

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
})

// ── Visual style base ─────────────────────────────────────────
// Consistent style for all blog covers
const STYLE_BASE = `Editorial photography style. Warm, minimal aesthetic. Soft natural light. Beige, cream and warm white tones (#F9F5EF palette). Clean composition with negative space. Professional Ukrainian woman, confident and calm. Faith-based lifestyle. No text. No logos. Shot on film-like quality. Horizontal orientation, 3:2 ratio.`

// ── Category-specific visual contexts ────────────────────────
const CATEGORY_CONTEXT = {
  instagram:   'Woman looking at phone or laptop, cozy home office setup, warm sunlight through window.',
  mindset:     'Woman journaling at a wooden desk, morning light, cup of coffee or tea nearby.',
  faith:       'Open Bible on a light wooden surface, soft morning light, dried flowers, cross necklace detail.',
  cases:       'Woman smiling at laptop screen, looking at results, bright minimal home workspace.',
  smm:         'Flat lay of phone, notebook with notes, coffee, minimal styled desk, top-down view.',
  brand:       'Woman confidently looking at camera, soft bokeh background, clean white or cream interior.',
  motivation:  'Woman walking in natural light outdoors, relaxed posture, warm tones, slight motion blur.',
  finance:     'Notepad with numbers, laptop, pen, minimalist styled desk. Calm, organized atmosphere.',
  books:       'Stack of books on bedside table, morning light, candle, calm reading corner.',
}

// ── Article-specific overrides ────────────────────────────────
// For articles where the category context is too generic,
// specify a more precise visual scene
const ARTICLE_OVERRIDES = {
  'dystsyplina-instagram-bez-vyhorannia':
    'Woman taking a mindful break from phone, looking out window, calm expression, morning light.',
  'gtd-dlia-khrystyianskoi-zhinky':
    'Organized planner open on desk, woman writing with pen, coffee beside, clean minimal setup.',
  'dystsyplina-povahy-do-sebe-i-boha':
    'Open Bible beside a journal, dried flowers, soft natural light on wooden table.',
  'zapustyty-infoprodukt-instagram':
    'Woman at laptop with notebooks and sticky notes around, focused expression, home office.',
  'avtorskyi-pidkhid-bez-prohrivu-tysha':
    'Woman recording a short video story on phone, cozy interior, relaxed and authentic.',
  'keis-natalia-7000-tysha':
    'Woman celebrating small win at desk, smiling at laptop screen, cozy workspace.',
  'yak-rozpochaty-christian-bloh-z-nulia':
    'Woman typing on laptop, cross visible in background, warm home setup, beginning energy.',
  'osobystyi-brend-christian-zhinky-osnovy':
    'Confident woman looking directly at camera, minimal cream background, faith accessory detail.',
  'shcho-take-kemp-100-zhinok':
    'Group of women on video call, laughing and engaged, laptop screen, community feeling.',
  '7-oznak-bloh-ne-roste':
    'Woman looking at Instagram analytics on phone, slightly concerned but thoughtful expression.',
  'audyt-blohu-storonnia-dumka':
    'Two women in a coaching session, one taking notes, warm minimal interior, collaborative energy.',
  'osobysta-sesiia-z-olenoiu-formaty':
    'Woman on Zoom call, listening attentively, notepad in hand, warm home office setting.',
}

// ── Image spec ─────────────────────────────────────────────────
const IMAGE_SPEC = {
  width: 1200,
  height: 800,
  ratio: '3:2',
  format: 'JPG or WebP',
  note: 'Will be cropped to 16:10 in blog grid and 4:3 in featured card. Keep main subject centered.',
}

async function main() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id, title, slug, category, excerpt
    }
  `)

  let md = `# Промпти для AI-обкладинок блогу\n\n`
  md += `**Інструмент:** Midjourney, DALL-E 3, Ideogram, або Leonardo AI\n`
  md += `**Розмір:** ${IMAGE_SPEC.width}×${IMAGE_SPEC.height}px (співвідношення ${IMAGE_SPEC.ratio})\n`
  md += `**Формат:** ${IMAGE_SPEC.format}\n`
  md += `**Примітка:** ${IMAGE_SPEC.note}\n\n`
  md += `---\n\n`

  for (const post of posts) {
    const slug = post.slug?.current || 'unknown'
    const scene = ARTICLE_OVERRIDES[slug] || CATEGORY_CONTEXT[post.category] || CATEGORY_CONTEXT.brand
    const fullPrompt = `${scene} ${STYLE_BASE}`

    md += `## ${post.title}\n\n`
    md += `**Slug:** \`${slug}\`\n`
    md += `**Категорія:** ${post.category}\n`
    md += `**Файл:** \`cover-${slug}.jpg\`\n\n`
    md += `**Промпт:**\n`
    md += `\`\`\`\n${fullPrompt}\n\`\`\`\n\n`

    // Negative prompt (useful for Midjourney --no / DALL-E negative)
    md += `**Негативний промпт (що виключити):**\n`
    md += `\`\`\`\ntext, watermark, logo, blurry, dark background, low quality, illustration, cartoon, men, children, clutter, bright colors, neon, oversaturated\n\`\`\`\n\n`
    md += `---\n\n`
  }

  // Summary table
  md += `## Зведена таблиця\n\n`
  md += `| # | Стаття | Файл |\n`
  md += `|---|--------|------|\n`
  posts.forEach((post, i) => {
    const slug = post.slug?.current || 'unknown'
    md += `| ${i + 1} | ${post.title} | \`cover-${slug}.jpg\` |\n`
  })

  md += `\n---\n`
  md += `\n**Як завантажити** після генерації:\n`
  md += `1. Завантаж всі файли в Cloudinary (папка \`blog-covers/\`)\n`
  md += `2. Скопіюй Cloudinary URL кожного файлу\n`
  md += `3. Оновлю скрипт \`add-cover-images.mjs\` з новими URL\n`
  md += `4. Запусти: \`node scripts/add-cover-images.mjs\`\n`

  writeFileSync('scripts/cover-prompts.md', md)
  console.log(`✓ Згенеровано ${posts.length} промптів → scripts/cover-prompts.md`)
}

main().catch(console.error)
