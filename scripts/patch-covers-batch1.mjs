// scripts/patch-covers-batch1.mjs
// Run: node scripts/patch-covers-batch1.mjs
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

// Matching by filename content:
// Жінка за робочим столом вдома → запустити інфопродукт (laptop + notebooks)
// Ранок з планувальником і кавою → GTD (planner + coffee)
// Жінка записує відео на смартфоні → авторський підхід (recording video)
// Тиха атмосфера з Біблією і квітами → дисципліна як повага (Bible + flowers)
// Тиха ранкова рефлексія у світлі → дисципліна в Instagram (morning reflection)

const COVERS = [
  {
    slug: 'zapustyty-infoprodukt-instagram',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775917837/%D0%96%D1%96%D0%BD%D0%BA%D0%B0_%D0%B7%D0%B0_%D1%80%D0%BE%D0%B1%D0%BE%D1%87%D0%B8%D0%BC_%D1%81%D1%82%D0%BE%D0%BB%D0%BE%D0%BC_%D0%B2%D0%B4%D0%BE%D0%BC%D0%B0_fwmzbj.png',
    filename: 'cover-zapustyty-infoprodukt.png',
  },
  {
    slug: 'gtd-dlia-khrystyianskoi-zhinky',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775917837/%D0%A0%D0%B0%D0%BD%D0%BE%D0%BA_%D0%B7_%D0%BF%D0%BB%D0%B0%D0%BD%D1%83%D0%B2%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%BE%D0%BC_%D1%96_%D0%BA%D0%B0%D0%B2%D0%BE%D1%8E_fggrgw.png',
    filename: 'cover-gtd-planner.png',
  },
  {
    slug: 'avtorskyi-pidkhid-bez-prohrivu-tysha',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775917837/%D0%96%D1%96%D0%BD%D0%BA%D0%B0_%D0%B7%D0%B0%D0%BF%D0%B8%D1%81%D1%83%D1%94_%D0%B2%D1%96%D0%B4%D0%B5%D0%BE_%D0%BD%D0%B0_%D1%81%D0%BC%D0%B0%D1%80%D1%82%D1%84%D0%BE%D0%BD%D1%96_asbk7t.png',
    filename: 'cover-avtorskyi-video.png',
  },
  {
    slug: 'dystsyplina-povahy-do-sebe-i-boha',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775917837/%D0%A2%D0%B8%D1%85%D0%B0_%D0%B0%D1%82%D0%BC%D0%BE%D1%81%D1%84%D0%B5%D1%80%D0%B0_%D0%B7_%D0%91%D1%96%D0%B1%D0%BB%D1%96%D1%94%D1%8E_%D1%96_%D0%BA%D0%B2%D1%96%D1%82%D0%B0%D0%BC%D0%B8_fanqog.png',
    filename: 'cover-dystsyplina-bible.png',
  },
  {
    slug: 'dystsyplina-instagram-bez-vyhorannia',
    url: 'https://res.cloudinary.com/dd6aymza7/image/upload/q_auto,f_auto,w_1200/v1775917837/%D0%A2%D0%B8%D1%85%D0%B0_%D1%80%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2%D0%B0_%D1%80%D0%B5%D1%84%D0%BB%D0%B5%D0%BA%D1%81%D1%96%D1%8F_%D1%83_%D1%81%D0%B2%D1%96%D1%82%D0%BB%D1%96_dddy1x.png',
    filename: 'cover-dystsyplina-instagram.png',
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
