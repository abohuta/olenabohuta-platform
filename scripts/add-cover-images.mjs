// scripts/add-cover-images.mjs
// Run: node scripts/add-cover-images.mjs
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

// Cloudinary base — без трансформацій, Sanity сам зберігає оригінал
const CL = 'https://res.cloudinary.com/dd6aymza7/image/upload'

const COVERS = [
  // ── ШЛЯХ ──────────────────────────────────────────────────
  {
    slug: 'dystsyplina-instagram-bez-vyhorannia',
    url: `${CL}/q_auto,f_auto,w_1200/v1774985584/2026-03-31_22.25.43_ax1bfe.jpg`,
    filename: 'shlyakh-hero.jpg',
  },
  {
    slug: 'gtd-dlia-khrystyianskoi-zhinky',
    url: `${CL}/q_auto,f_auto,w_1200/v1775908998/olenka_couse_light_uwmjnw.webp`,
    filename: 'olenka-course-light.webp',
  },
  {
    slug: 'dystsyplina-povahy-do-sebe-i-boha',
    url: `${CL}/q_auto,f_auto,w_1200/v1774359881/about_olenka_fq9fxo.webp`,
    filename: 'olena-about.webp',
  },

  // ── ТИША ──────────────────────────────────────────────────
  {
    slug: 'zapustyty-infoprodukt-instagram',
    url: `${CL}/q_auto,f_auto,w_1200/v1774448751/photo_2026-03-25_15.17.06_sw70mx.jpg`,
    filename: 'tysha-hero.jpg',
  },
  {
    slug: 'avtorskyi-pidkhid-bez-prohrivu-tysha',
    url: `${CL}/q_auto,f_auto,w_1200/v1774450115/2026-03-25_16.38.52_gdyr5e.jpg`,
    filename: 'tysha-hero-2.jpg',
  },
  {
    slug: 'keis-natalia-7000-tysha',
    url: `${CL}/q_auto,f_auto,w_1200/v1774359853/results_olenka_uhgo1i.webp`,
    filename: 'results-olenka.webp',
  },

  // ── КЕМП ──────────────────────────────────────────────────
  {
    slug: 'yak-rozpochaty-christian-bloh-z-nulia',
    url: `${CL}/q_auto,f_auto,w_1200/v1774359840/hero_olenka_lmwbqv.webp`,
    filename: 'kemp-hero-olenka.webp',
  },
  {
    slug: 'osobystyi-brend-christian-zhinky-osnovy',
    url: `${CL}/q_auto,f_auto,w_1200/v1774359896/comunity_pbopmh.webp`,
    filename: 'community.webp',
  },
  {
    slug: 'shcho-take-kemp-100-zhinok',
    url: `${CL}/q_auto,f_auto,w_1200/v1774359969/Olena_Bohuta_htaxhd.webp`,
    filename: 'olena-bohuta.webp',
  },

  // ── КОНСУЛЬТАЦІЇ ──────────────────────────────────────────
  {
    slug: '7-oznak-bloh-ne-roste',
    url: `${CL}/q_auto,f_auto,w_1200/v1774985584/2026-03-31_22.25.43_ax1bfe.jpg`,
    filename: 'shlyakh-hero-2.jpg',
  },
  {
    slug: 'audyt-blohu-storonnia-dumka',
    url: `${CL}/q_auto,f_auto,w_1200/v1774359840/hero_olenka_lmwbqv.webp`,
    filename: 'kemp-hero-olenka-2.webp',
  },
  {
    slug: 'osobysta-sesiia-z-olenoiu-formaty',
    url: `${CL}/q_auto,f_auto,w_1200,h_630,c_fill,g_face/v1774359969/Olena_Bohuta_htaxhd.webp`,
    filename: 'olena-konsultatsii.webp',
  },
]

async function uploadImageFromUrl(url, filename) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const asset = await client.assets.upload('image', buffer, { filename, contentType })
  return asset._id
}

async function main() {
  console.log(`Adding cover images to ${COVERS.length} posts...\n`)

  // Upload images first (deduplicate if same filename)
  const assetCache = {}

  for (const cover of COVERS) {
    const { slug, url, filename } = cover

    // Find the post
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{ _id, title }`,
      { slug }
    )
    if (!post) {
      console.warn(`⚠ Post not found: ${slug}`)
      continue
    }

    // Upload image (reuse if same filename already uploaded)
    let assetId = assetCache[filename]
    if (!assetId) {
      process.stdout.write(`  ↑ Uploading ${filename}... `)
      assetId = await uploadImageFromUrl(url, filename)
      assetCache[filename] = assetId
      console.log('done')
    }

    // Patch post with coverImage
    await client
      .patch(post._id)
      .set({
        coverImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
        },
      })
      .commit()

    console.log(`✓ "${post.title}"`)
  }

  console.log('\nDone!')
}

main().catch(console.error)
