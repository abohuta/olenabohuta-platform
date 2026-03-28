import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 254) {
      return NextResponse.json({ error: 'Невірний email' }, { status: 400 })
    }

    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        groups: [process.env.MAILERLITE_GROUP_ID],
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