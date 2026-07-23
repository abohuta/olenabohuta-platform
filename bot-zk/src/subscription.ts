import { supabase } from './db';

export async function upsertUser(telegramId: bigint, username: string | null, firstName: string | null, lastName: string | null) {
  const { data, error } = await supabase
    .from('users')
    .upsert(
      { telegram_id: Number(telegramId), username, first_name: firstName, last_name: lastName },
      { onConflict: 'telegram_id' }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getUserByTelegramId(telegramId: bigint) {
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('telegram_id', Number(telegramId))
    .single();
  return data ?? null;
}

export async function getActiveSub(userId: number) {
  const { data } = await supabase
    .from('subscriptions')
    .select('*, payments!inner(status)')
    .eq('user_id', userId)
    .eq('status', 'active')
    .eq('payments.status', 'paid')
    .gt('expires_at', new Date().toISOString())
    .order('expires_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ?? null;
}

export async function createSubscription(userId: number, plan: string, months: number) {
  const expiresAt = new Date();
  expiresAt.setMonth(expiresAt.getMonth() + months);
  const { data, error } = await supabase
    .from('subscriptions')
    .insert({ user_id: userId, plan, months, expires_at: expiresAt.toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function createPendingPayment(params: {
  userId: number;
  orderRef: string;
  amount: number;
  currency: string;
  plan: string;
  months: number;
  method: 'wayforpay' | 'paypal';
  paypalOrderId?: string;
}) {
  const { data, error } = await supabase
    .from('payments')
    .insert({
      user_id: params.userId,
      order_ref: params.orderRef,
      amount: params.amount,
      currency: params.currency,
      plan: params.plan,
      months: params.months,
      payment_method: params.method,
      paypal_order_id: params.paypalOrderId ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getPendingPayment(orderRef: string) {
  const { data } = await supabase
    .from('payments')
    .select('*, users!inner(telegram_id, first_name)')
    .eq('order_ref', orderRef)
    .eq('status', 'pending')
    .maybeSingle();
  if (!data) return null;
  // Flatten for easy access
  return { ...data, telegram_id: (data.users as any).telegram_id, first_name: (data.users as any).first_name };
}

export async function activatePayment(orderRef: string) {
  const payment = await getPendingPayment(orderRef);
  if (!payment) return null;

  const sub = await createSubscription(payment.user_id, payment.plan, payment.months);

  await supabase
    .from('payments')
    .update({ status: 'paid', paid_at: new Date().toISOString(), subscription_id: sub.id })
    .eq('order_ref', orderRef);

  return { payment, subscription: sub };
}

export async function grantManualAccess(telegramId: bigint, months: number) {
  const user = await getUserByTelegramId(telegramId);
  if (!user) throw new Error(`Користувача з ID ${telegramId} не знайдено в системі. Він має написати /start боту.`);

  const sub = await createSubscription(user.id, 'manual', months);

  await supabase.from('payments').insert({
    user_id: user.id,
    subscription_id: sub.id,
    order_ref: `MANUAL-${user.id}-${Date.now()}`,
    amount: 0,
    currency: 'UAH',
    plan: 'manual',
    months,
    payment_method: 'wayforpay',
    status: 'paid',
    paid_at: new Date().toISOString(),
  });

  return sub;
}

export async function getExpiringSubscriptions(daysAhead: number) {
  const now = new Date().toISOString();
  const target = new Date(Date.now() + daysAhead * 86_400_000).toISOString();
  const { data } = await supabase
    .from('subscriptions')
    .select('*, users!inner(telegram_id)')
    .eq('status', 'active')
    .gt('expires_at', now)
    .lte('expires_at', target);
  return (data ?? []).map((r: any) => ({ ...r, telegram_id: r.users.telegram_id }));
}

export async function getExpiredSubscriptions() {
  const { data } = await supabase
    .from('subscriptions')
    .select('*, users!inner(telegram_id)')
    .eq('status', 'active')
    .lte('expires_at', new Date().toISOString());
  return (data ?? []).map((r: any) => ({ ...r, telegram_id: r.users.telegram_id }));
}

export async function markExpired(subscriptionId: number) {
  await supabase.from('subscriptions').update({ status: 'expired' }).eq('id', subscriptionId);
}

export async function getStats() {
  const now = new Date().toISOString();

  const [total, season, year, manual, uah, usd] = await Promise.all([
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active').gt('expires_at', now),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active').eq('plan', 'season').gt('expires_at', now),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active').eq('plan', 'year').gt('expires_at', now),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active').eq('plan', 'manual').gt('expires_at', now),
    supabase.from('payments').select('amount').eq('status', 'paid').eq('currency', 'UAH'),
    supabase.from('payments').select('amount').eq('status', 'paid').eq('currency', 'USD'),
  ]);

  const sumUAH = (uah.data ?? []).reduce((s: number, r: any) => s + Number(r.amount), 0);
  const sumUSD = (usd.data ?? []).reduce((s: number, r: any) => s + Number(r.amount), 0);

  return {
    active_total: total.count ?? 0,
    season_count: season.count ?? 0,
    year_count: year.count ?? 0,
    manual_count: manual.count ?? 0,
    total_uah: sumUAH,
    total_usd: sumUSD,
  };
}
