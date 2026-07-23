import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function activateSchoolPayment(orderRef: string) {
  const { data } = await supabase
    .from('course_payments')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('order_ref', orderRef)
    .eq('status', 'pending')
    .select('*, school_users!inner(telegram_id), courses(*)')
    .maybeSingle();

  if (!data) return null;

  const telegramId = (data.school_users as any).telegram_id as number;
  const course = data.courses as any;

  await supabase
    .from('course_enrollments')
    .upsert(
      { user_id: data.user_id, course_id: data.course_id, payment_id: data.id },
      { onConflict: 'user_id,course_id' }
    );

  return { telegramId, course };
}

export async function sendSchoolAccess(telegramId: number, course: any) {
  const token = process.env.SCHOOL_BOT_TOKEN!;
  let text: string;

  if (course.access_type === 'url') {
    text = `✅ *Доступ відкрито\\!*\n\n*${course.name}*\n\n👇 Твоє посилання на матеріали:\n${course.access_value}`;
  } else {
    const inviteRes = await fetch(`https://api.telegram.org/bot${token}/createChatInviteLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: course.access_value,
        member_limit: 1,
        expire_date: Math.floor(Date.now() / 1000) + 3600,
      }),
    });
    const inviteData = (await inviteRes.json()) as any;
    text = `✅ *Доступ відкрито\\!*\n\n*${course.name}*\n\n👇 Посилання в Telegram \\(1 година\\):\n${inviteData.result.invite_link}`;
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: telegramId, text, parse_mode: 'MarkdownV2' }),
  });
}
