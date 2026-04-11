// scripts/patch-covers-batch2.mjs
// Run: node scripts/patch-covers-batch2.mjs
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

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

// Matching by filename:
// Ранкове натхнення за ноутбуком       → yak-rozpochaty-christian-bloh (laptop, beginning)
// Елегантна жінка з теплою усмішкою   → osobystyi-brend (confident woman, dusty rose)
// Gemini gzj2h8                        → osobysta-sesiia (Zoom call, lavender)
// Сонячна розмова з подругами          → shcho-take-kemp (group, terracotta)
// Мить радості на тлі тепла            → keis-natalia (celebrating win, amber)
// Gemini 53epga                        → 7-oznak-bloh (phone analytics, cool stone)
// Жінки на коучинговій зустрічі в офісі → audyt-blohu (coaching session)

const COVERS = [
  {
    slug: 'yak-rozpochaty-christian-bloh-z-nulia',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775918539/%D0%A0%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2%D0%B5_%D0%BD%D0%B0%D1%82%D1%85%D0%BD%D0%B5%D0%BD%D0%BD%D1%8F_%D0%B7%D0%B0_%D0%BD%D0%BE%D1%83%D1%82%D0%B1%D1%83%D0%BA%D0%BE%D0%BC_p0t60d.png',
    filename: 'cover-yak-rozpochaty-bloh.png',
  },
  {
    slug: 'osobystyi-brend-christian-zhinky-osnovy',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775918539/%D0%95%D0%BB%D0%B5%D0%B3%D0%B0%D0%BD%D1%82%D0%BD%D0%B0_%D0%B6%D1%96%D0%BD%D0%BA%D0%B0_%D0%B7_%D1%82%D0%B5%D0%BF%D0%BB%D0%BE%D1%8E_%D1%83%D1%81%D0%BC%D1%96%D1%88%D0%BA%D0%BE%D1%8E_ecuwvg.png',
    filename: 'cover-osobystyi-brend.png',
  },
  {
    slug: 'osobysta-sesiia-z-olenoiu-formaty',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775918539/Gemini_Generated_Image_gzj2h8gzj2h8gzj2_deubdn.png',
    filename: 'cover-osobysta-sesiia.png',
  },
  {
    slug: 'shcho-take-kemp-100-zhinok',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775918539/%D0%A1%D0%BE%D0%BD%D1%8F%D1%87%D0%BD%D0%B0_%D1%80%D0%BE%D0%B7%D0%BC%D0%BE%D0%B2%D0%B0_%D0%B7_%D0%BF%D0%BE%D0%B4%D1%80%D1%83%D0%B3%D0%B0%D0%BC%D0%B8_ac1ao5.png',
    filename: 'cover-kemp-spilnota.png',
  },
  {
    slug: 'keis-natalia-7000-tysha',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775918539/%D0%9C%D0%B8%D1%82%D1%8C_%D1%80%D0%B0%D0%B4%D0%BE%D1%81%D1%82%D1%96_%D0%BD%D0%B0_%D1%82%D0%BB%D1%96_%D1%82%D0%B5%D0%BF%D0%BB%D0%B0_xebg4v.png',
    filename: 'cover-keis-natalia.png',
  },
  {
    slug: '7-oznak-bloh-ne-roste',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775918540/Gemini_Generated_Image_53epga53epga53ep_zwghka.png',
    filename: 'cover-7-oznak.png',
  },
  {
    slug: 'audyt-blohu-storonnia-dumka',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775918540/%D0%96%D1%96%D0%BD%D0%BA%D0%B8_%D0%BD%D0%B0_%D0%BA%D0%BE%D1%83%D1%87%D0%B8%D0%BD%D0%B3%D0%BE%D0%B2%D1%96%D0%B8%CC%86_%D0%B7%D1%83%D1%81%D1%82%D1%80%D1%96%D1%87%D1%96_%D0%B2_%D0%BE%D1%84%D1%96%D1%81%D1%96_o53g3s.png',
    filename: 'cover-audyt-blohu.png',
  },
]

async function uploadImageFromUrl(url, filename) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get('content-type') || 'image/png'
  return await client.assets.upload('image', buffer, { filename, contentType })
}

async function main() {
  console.log(`Patching covers for ${COVERS.length} posts...\n`)

  for (const cover of COVERS) {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{ _id, title }`,
      { slug: cover.slug }
    )
    if (!post) { console.warn(`⚠ Not found: ${cover.slug}`); continue }

    process.stdout.write(`  ↑ Uploading ${cover.filename}... `)
    const asset = await uploadImageFromUrl(cover.url, cover.filename)
    console.log('done')

    await client.patch(post._id).set({
      coverImage: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    }).commit()

    console.log(`✓ "${post.title}"\n`)
  }

  console.log('Done!')
}

main().catch(console.error)
