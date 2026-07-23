"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAdminHandlers = registerAdminHandlers;
const config_1 = require("../config");
const school_1 = require("../school");
function isAdmin(id) {
    return BigInt(id) === config_1.config.ADMIN_TELEGRAM_ID;
}
// pending broadcast state: adminId → waiting for message
const pendingBroadcast = new Set();
function registerAdminHandlers(bot) {
    // /admin — статистика
    bot.command('admin', async (ctx) => {
        if (!isAdmin(ctx.from.id))
            return;
        const s = await (0, school_1.getStats)();
        await ctx.reply(`📊 *Статистика школи*\n\n` +
            `Підписників бота: *${s.total_users}*\n` +
            `Куплено курсів: *${s.total_enrollments}*\n\n` +
            `Виручка:\n` +
            `— UAH: ${Number(s.total_uah).toLocaleString('uk-UA')} грн\n` +
            `— USD: $${Number(s.total_usd).toLocaleString('en-US')}`, { parse_mode: 'Markdown' });
    });
    // /broadcast — розсилка
    bot.command('broadcast', async (ctx) => {
        if (!isAdmin(ctx.from.id))
            return;
        const text = ctx.message?.text?.split(' ').slice(1).join(' ');
        if (!text) {
            pendingBroadcast.add(ctx.from.id);
            await ctx.reply('Надішли повідомлення для розсилки (текст, фото, відео):');
            return;
        }
        await sendBroadcast(bot, ctx, text);
    });
    // Catch broadcast message from admin
    bot.on('message', async (ctx, next) => {
        if (!isAdmin(ctx.from.id) || !pendingBroadcast.has(ctx.from.id)) {
            return next();
        }
        pendingBroadcast.delete(ctx.from.id);
        const users = await (0, school_1.getAllUsers)();
        let sent = 0, failed = 0;
        await ctx.reply(`Розсилаю ${users.length} підписникам...`);
        for (const telegramId of users) {
            try {
                await bot.api.copyMessage(telegramId, ctx.chat.id, ctx.message.message_id);
                sent++;
            }
            catch {
                failed++;
            }
            await new Promise(r => setTimeout(r, 50)); // rate limit
        }
        await ctx.reply(`✅ Розсилка завершена\nНадіслано: ${sent}\nПомилок: ${failed}`);
    });
    // /addcourse Назва | Опис | 99.00 | url | https://...
    bot.command('addcourse', async (ctx) => {
        if (!isAdmin(ctx.from.id))
            return;
        const args = ctx.message?.text?.split('\n').slice(1).join('\n') ||
            ctx.message?.text?.replace('/addcourse', '').trim() || '';
        if (!args.includes('|')) {
            await ctx.reply('Формат:\n`/addcourse Назва | Опис | ціна_USD | тип | значення`\n\n' +
                'Типи доступу:\n• `url` — посилання на матеріали\n• `telegram` — ID Telegram каналу/групи\n\n' +
                'Приклади:\n' +
                '`/addcourse Курс дисципліни | Практичний курс | 97 | url | https://notion.so/...`\n' +
                '`/addcourse Майстер-клас | Онлайн зустріч | 49 | telegram | -1001234567890`', { parse_mode: 'Markdown' });
            return;
        }
        const parts = args.split('|').map(s => s.trim());
        if (parts.length < 5) {
            await ctx.reply('Потрібно 5 частин: Назва | Опис | Ціна | Тип | Значення');
            return;
        }
        const [name, description, priceStr, access_type, access_value] = parts;
        const price_usd = parseFloat(priceStr);
        if (isNaN(price_usd) || price_usd <= 0) {
            await ctx.reply('Ціна має бути числом більше 0');
            return;
        }
        if (!['url', 'telegram'].includes(access_type)) {
            await ctx.reply('Тип доступу: `url` або `telegram`', { parse_mode: 'Markdown' });
            return;
        }
        try {
            const course = await (0, school_1.addCourse)({ name, description, price_usd, access_type, access_value });
            await ctx.reply(`✅ Курс додано!\n\nID: *${course.id}*\nНазва: *${course.name}*\nЦіна: $${course.price_usd}\nТип: ${course.access_type}`, { parse_mode: 'Markdown' });
        }
        catch (e) {
            await ctx.reply(`❌ Помилка: ${e.message}`);
        }
    });
    // /courselist — список всіх курсів
    bot.command('courselist', async (ctx) => {
        if (!isAdmin(ctx.from.id))
            return;
        const courses = await (0, school_1.getAllCourses)();
        if (!courses.length) {
            await ctx.reply('Курсів немає');
            return;
        }
        const lines = courses.map((c) => `${c.active ? '✅' : '❌'} *ID ${c.id}* — ${c.name} ($${c.price_usd})`).join('\n');
        await ctx.reply(`*Всі курси:*\n\n${lines}\n\nВимкнути/увімкнути: /deactivate ID або /activate ID`, { parse_mode: 'Markdown' });
    });
    // /deactivate <id>
    bot.command('deactivate', async (ctx) => {
        if (!isAdmin(ctx.from.id))
            return;
        const id = parseInt(ctx.message?.text?.split(' ')[1] ?? '');
        if (isNaN(id)) {
            await ctx.reply('Вкажи ID: /deactivate 3');
            return;
        }
        await (0, school_1.toggleCourse)(id, false);
        await ctx.reply(`✅ Курс ${id} вимкнено`);
    });
    // /activate <id>
    bot.command('activate', async (ctx) => {
        if (!isAdmin(ctx.from.id))
            return;
        const id = parseInt(ctx.message?.text?.split(' ')[1] ?? '');
        if (isNaN(id)) {
            await ctx.reply('Вкажи ID: /activate 3');
            return;
        }
        await (0, school_1.toggleCourse)(id, true);
        await ctx.reply(`✅ Курс ${id} увімкнено`);
    });
}
async function sendBroadcast(bot, ctx, text) {
    const users = await (0, school_1.getAllUsers)();
    let sent = 0, failed = 0;
    await ctx.reply(`Розсилаю ${users.length} підписникам...`);
    for (const telegramId of users) {
        try {
            await bot.api.sendMessage(telegramId, text);
            sent++;
        }
        catch {
            failed++;
        }
        await new Promise(r => setTimeout(r, 50));
    }
    await ctx.reply(`✅ Розсилка завершена\nНадіслано: ${sent}\nПомилок: ${failed}`);
}
