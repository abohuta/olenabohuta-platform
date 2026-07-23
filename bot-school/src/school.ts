import { supabase } from './db';

export interface AdminRecord {
  telegram_id: number;
  username: string | null;
  can_broadcast: boolean;
  can_courses: boolean;
  can_stats: boolean;
}

export async function getAdmin(telegramId: bigint): Promise<AdminRecord | null> {
  const { data } = await supabase
    .from('school_admins')
    .select('*')
    .eq('telegram_id', Number(telegramId))
    .maybeSingle();
  return data ?? null;
}

export async function addAdmin(telegramId: bigint, username: string | null) {
  const { data, error } = await supabase
    .from('school_admins')
    .upsert({ telegram_id: Number(telegramId), username }, { onConflict: 'telegram_id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function setAdminPerms(telegramId: bigint, perms: { can_broadcast?: boolean; can_courses?: boolean; can_stats?: boolean }) {
  const { error } = await supabase
    .from('school_admins')
    .update(perms)
    .eq('telegram_id', Number(telegramId));
  if (error) throw error;
}

export async function removeAdmin(telegramId: bigint) {
  await supabase.from('school_admins').delete().eq('telegram_id', Number(telegramId));
}

export async function getAllAdmins(): Promise<AdminRecord[]> {
  const { data } = await supabase.from('school_admins').select('*').order('created_at');
  return data ?? [];
}

export async function upsertUser(telegramId: bigint, username: string | null, firstName: string | null, lastName: string | null) {
  const { data, error } = await supabase
    .from('school_users')
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
    .from('school_users')
    .select('*')
    .eq('telegram_id', Number(telegramId))
    .single();
  return data ?? null;
}

export async function getCourses() {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: true });
  return data ?? [];
}

export async function getAllCourses() {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: true });
  return data ?? [];
}

export async function getCourse(id: number) {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();
  return data ?? null;
}

export async function addCourse(params: {
  name: string;
  description: string;
  price_usd: number;
  access_type: string;
  access_value: string;
}) {
  const { data, error } = await supabase
    .from('courses')
    .insert(params)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function toggleCourse(id: number, active: boolean) {
  await supabase.from('courses').update({ active }).eq('id', id);
}

export async function getEnrollment(userId: number, courseId: number) {
  const { data } = await supabase
    .from('course_enrollments')
    .select('*')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .maybeSingle();
  return data ?? null;
}

export async function getUserEnrollments(userId: number) {
  const { data } = await supabase
    .from('course_enrollments')
    .select('*, courses(*)')
    .eq('user_id', userId);
  return data ?? [];
}

export async function createPendingPayment(params: {
  userId: number;
  courseId: number;
  orderRef: string;
  amount: number;
  currency: string;
  method: 'wayforpay' | 'paypal';
  paypalOrderId?: string;
}) {
  const { data, error } = await supabase
    .from('course_payments')
    .insert({
      user_id: params.userId,
      course_id: params.courseId,
      order_ref: params.orderRef,
      amount: params.amount,
      currency: params.currency,
      payment_method: params.method,
      paypal_order_id: params.paypalOrderId ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function activatePayment(orderRef: string) {
  // Atomic: UPDATE WHERE status='pending' — захист від race condition
  const { data } = await supabase
    .from('course_payments')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('order_ref', orderRef)
    .eq('status', 'pending')
    .select('*, school_users!inner(telegram_id, first_name), courses(*)')
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

  return { telegramId, course, payment: data };
}

export async function getAllUsers(): Promise<number[]> {
  const { data } = await supabase.from('school_users').select('telegram_id');
  return (data ?? []).map((r: any) => r.telegram_id as number);
}

export async function getStats() {
  const [users, enrollments, uah, usd] = await Promise.all([
    supabase.from('school_users').select('*', { count: 'exact', head: true }),
    supabase.from('course_enrollments').select('*', { count: 'exact', head: true }),
    supabase.from('course_payments').select('amount').eq('status', 'paid').eq('currency', 'UAH'),
    supabase.from('course_payments').select('amount').eq('status', 'paid').eq('currency', 'USD'),
  ]);

  const sumUAH = (uah.data ?? []).reduce((s: number, r: any) => s + Number(r.amount), 0);
  const sumUSD = (usd.data ?? []).reduce((s: number, r: any) => s + Number(r.amount), 0);

  return {
    total_users: users.count ?? 0,
    total_enrollments: enrollments.count ?? 0,
    total_uah: sumUAH,
    total_usd: sumUSD,
  };
}
