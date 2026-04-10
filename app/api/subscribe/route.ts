import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '1 h'),
  analytics: false,
})

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
    const { success } = await ratelimit.limit(ip)
    if (!success) {
      return NextResponse.json({ error: 'Забагато запитів. Спробуй пізніше.' }, { status: 429 })
    }

    const { email, source } = await req.json()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Невірний email' }, { status: 400 })
    }

    const generalGroupId = process.env.MAILERLITE_GROUP_ID!
    const groups: string[] = [generalGroupId]

    if (source === 'leadmagnet') {
      groups.push(process.env.MAILERLITE_LEADMAGNET_GROUP_ID!)
    } else if (source === 'era-mozhlyvostei') {
      groups.push(process.env.MAILERLITE_ERA_GROUP_ID!)
    }

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups,
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Помилка підписки' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Помилка сервера' }, { status: 500 })
  }
}