"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCoursesHandler = registerCoursesHandler;
const grammy_1 = require("grammy");
const school_1 = require("../school");
const nbu_1 = require("../nbu");
const wayforpay_1 = require("../wayforpay");
const paypal_1 = require("../paypal");
function registerCoursesHandler(bot) {
    const showCourses = async (ctx, edit = false) => {
        const courses = await (0, school_1.getCourses)();
        if (!courses.length) {
            const text = 'Наразі активних курсів немає. Слідкуй за оновленнями!';
            if (edit)
                await ctx.editMessageText(text);
            else
                await ctx.reply(text);
            return;
        }
        const kb = new grammy_1.InlineKeyboard();
        for (const c of courses) {
            kb.text(`${c.name} — $${c.price_usd}`, `course_${c.id}`).row();
        }
        kb.text('🎓 Мої курси', 'my_courses');
        const text = `📚 *Курси школи*\n\nОбери курс для детальнішої інформації:`;
        if (edit)
            await ctx.editMessageText(text, { parse_mode: 'Markdown', reply_markup: kb });
        else
            await ctx.reply(text, { parse_mode: 'Markdown', reply_markup: kb });
    };
    bot.command('courses', (ctx) => showCourses(ctx, false));
    bot.callbackQuery('courses', async (ctx) => { await ctx.answerCallbackQuery(); await showCourses(ctx, true); });
    // Course detail
    bot.callbackQuery(/^course_(\d+)$/, async (ctx) => {
        await ctx.answerCallbackQuery();
        const courseId = parseInt(ctx.match[1]);
        const course = await (0, school_1.getCourse)(courseId);
        if (!course) {
            await ctx.editMessageText('Курс не знайдено.');
            return;
        }
        const from = ctx.from;
        const user = await (0, school_1.upsertUser)(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
        const enrolled = await (0, school_1.getEnrollment)(user.id, courseId);
        const kb = new grammy_1.InlineKeyboard();
        if (enrolled) {
            kb.text('✅ Вже придбано', 'my_courses').row();
        }
        else {
            kb.text(`💳 Купити — $${course.price_usd}`, `buy_${courseId}`).row();
        }
        kb.text('← Назад', 'courses');
        await ctx.editMessageText(`*${course.name}*\n\n${course.description ?? ''}\n\n💰 Ціна: *$${course.price_usd}*`, { parse_mode: 'Markdown', reply_markup: kb });
    });
    // Ask location before payment
    bot.callbackQuery(/^buy_(\d+)$/, async (ctx) => {
        await ctx.answerCallbackQuery();
        const courseId = ctx.match[1];
        const course = await (0, school_1.getCourse)(parseInt(courseId));
        if (!course)
            return;
        await ctx.editMessageText(`Курс: *${course.name}* — $${course.price_usd}\n\nДе ти зараз знаходишся?`, {
            parse_mode: 'Markdown',
            reply_markup: new grammy_1.InlineKeyboard()
                .text('🇺🇦 Я в Україні', `buy_ua_${courseId}`).row()
                .text('🌍 Я за кордоном', `buy_int_${courseId}`).row()
                .text('← Назад', `course_${courseId}`),
        });
    });
    // Ukraine → WayForPay
    bot.callbackQuery(/^buy_ua_(\d+)$/, async (ctx) => {
        await ctx.answerCallbackQuery('Генерую посилання на оплату...');
        const courseId = parseInt(ctx.match[1]);
        const course = await (0, school_1.getCourse)(courseId);
        if (!course)
            return;
        const from = ctx.from;
        try {
            const user = await (0, school_1.upsertUser)(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
            const amountUAH = await (0, nbu_1.toUAH)(Number(course.price_usd));
            const orderRef = `SCH-${from.id}-${courseId}-${Date.now()}`;
            await (0, school_1.createPendingPayment)({
                userId: user.id,
                courseId,
                orderRef,
                amount: amountUAH,
                currency: 'UAH',
                method: 'wayforpay',
            });
            const invoiceUrl = await (0, wayforpay_1.createInvoice)({ orderRef, amountUAH, courseName: course.name });
            await ctx.editMessageText(`💳 *Оплата через WayForPay*\n\n` +
                `Курс: *${course.name}*\n` +
                `Сума: *${amountUAH} грн* (~$${course.price_usd})\n\n` +
                `Після оплати ти автоматично отримаєш доступ.`, {
                parse_mode: 'Markdown',
                reply_markup: new grammy_1.InlineKeyboard().url('💳 Перейти до оплати', invoiceUrl),
            });
        }
        catch (e) {
            console.error('[WayForPay]', e);
            await ctx.reply('Помилка при створенні платежу. Спробуй ще раз або напиши @olenabohuta');
        }
    });
    // International → PayPal
    bot.callbackQuery(/^buy_int_(\d+)$/, async (ctx) => {
        await ctx.answerCallbackQuery('Генерую посилання PayPal...');
        const courseId = parseInt(ctx.match[1]);
        const course = await (0, school_1.getCourse)(courseId);
        if (!course)
            return;
        const from = ctx.from;
        try {
            const user = await (0, school_1.upsertUser)(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
            const orderRef = `SCH-${from.id}-${courseId}-${Date.now()}`;
            const { orderId, approvalUrl } = await (0, paypal_1.createOrder)({
                orderRef,
                amountUSD: Number(course.price_usd),
                courseName: course.name,
            });
            await (0, school_1.createPendingPayment)({
                userId: user.id,
                courseId,
                orderRef,
                amount: Number(course.price_usd),
                currency: 'USD',
                method: 'paypal',
                paypalOrderId: orderId,
            });
            await ctx.editMessageText(`💳 *Оплата через PayPal*\n\n` +
                `Курс: *${course.name}*\n` +
                `Сума: *$${course.price_usd}*\n\n` +
                `Після оплати ти автоматично отримаєш доступ.`, {
                parse_mode: 'Markdown',
                reply_markup: new grammy_1.InlineKeyboard().url('💳 Оплатити через PayPal', approvalUrl),
            });
        }
        catch (e) {
            console.error('[PayPal]', e);
            await ctx.reply('Помилка при створенні платежу. Спробуй ще раз або напиши @olenabohuta');
        }
    });
}
