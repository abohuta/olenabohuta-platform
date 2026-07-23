"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertUser = upsertUser;
exports.getUserByTelegramId = getUserByTelegramId;
exports.getCourses = getCourses;
exports.getAllCourses = getAllCourses;
exports.getCourse = getCourse;
exports.addCourse = addCourse;
exports.toggleCourse = toggleCourse;
exports.getEnrollment = getEnrollment;
exports.getUserEnrollments = getUserEnrollments;
exports.createPendingPayment = createPendingPayment;
exports.activatePayment = activatePayment;
exports.getAllUsers = getAllUsers;
exports.getStats = getStats;
const db_1 = require("./db");
async function upsertUser(telegramId, username, firstName, lastName) {
    const { data, error } = await db_1.supabase
        .from('school_users')
        .upsert({ telegram_id: Number(telegramId), username, first_name: firstName, last_name: lastName }, { onConflict: 'telegram_id' })
        .select()
        .single();
    if (error)
        throw error;
    return data;
}
async function getUserByTelegramId(telegramId) {
    const { data } = await db_1.supabase
        .from('school_users')
        .select('*')
        .eq('telegram_id', Number(telegramId))
        .single();
    return data ?? null;
}
async function getCourses() {
    const { data } = await db_1.supabase
        .from('courses')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: true });
    return data ?? [];
}
async function getAllCourses() {
    const { data } = await db_1.supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });
    return data ?? [];
}
async function getCourse(id) {
    const { data } = await db_1.supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
    return data ?? null;
}
async function addCourse(params) {
    const { data, error } = await db_1.supabase
        .from('courses')
        .insert(params)
        .select()
        .single();
    if (error)
        throw error;
    return data;
}
async function toggleCourse(id, active) {
    await db_1.supabase.from('courses').update({ active }).eq('id', id);
}
async function getEnrollment(userId, courseId) {
    const { data } = await db_1.supabase
        .from('course_enrollments')
        .select('*')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .maybeSingle();
    return data ?? null;
}
async function getUserEnrollments(userId) {
    const { data } = await db_1.supabase
        .from('course_enrollments')
        .select('*, courses(*)')
        .eq('user_id', userId);
    return data ?? [];
}
async function createPendingPayment(params) {
    const { data, error } = await db_1.supabase
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
    if (error)
        throw error;
    return data;
}
async function activatePayment(orderRef) {
    // Atomic: UPDATE WHERE status='pending' — захист від race condition
    const { data } = await db_1.supabase
        .from('course_payments')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('order_ref', orderRef)
        .eq('status', 'pending')
        .select('*, school_users!inner(telegram_id, first_name), courses(*)')
        .maybeSingle();
    if (!data)
        return null;
    const telegramId = data.school_users.telegram_id;
    const course = data.courses;
    await db_1.supabase
        .from('course_enrollments')
        .upsert({ user_id: data.user_id, course_id: data.course_id, payment_id: data.id }, { onConflict: 'user_id,course_id' });
    return { telegramId, course, payment: data };
}
async function getAllUsers() {
    const { data } = await db_1.supabase.from('school_users').select('telegram_id');
    return (data ?? []).map((r) => r.telegram_id);
}
async function getStats() {
    const [users, enrollments, uah, usd] = await Promise.all([
        db_1.supabase.from('school_users').select('*', { count: 'exact', head: true }),
        db_1.supabase.from('course_enrollments').select('*', { count: 'exact', head: true }),
        db_1.supabase.from('course_payments').select('amount').eq('status', 'paid').eq('currency', 'UAH'),
        db_1.supabase.from('course_payments').select('amount').eq('status', 'paid').eq('currency', 'USD'),
    ]);
    const sumUAH = (uah.data ?? []).reduce((s, r) => s + Number(r.amount), 0);
    const sumUSD = (usd.data ?? []).reduce((s, r) => s + Number(r.amount), 0);
    return {
        total_users: users.count ?? 0,
        total_enrollments: enrollments.count ?? 0,
        total_uah: sumUAH,
        total_usd: sumUSD,
    };
}
