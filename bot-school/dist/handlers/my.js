"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMyHandler = registerMyHandler;
const grammy_1 = require("grammy");
const school_1 = require("../school");
function registerMyHandler(bot) {
    const showMyCourses = async (ctx, edit = false) => {
        const from = ctx.from;
        const user = await (0, school_1.upsertUser)(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
        const enrollments = await (0, school_1.getUserEnrollments)(user.id);
        if (!enrollments.length) {
            const text = `У тебе ще немає придбаних курсів.\n\nПереглянь каталог 👇`;
            const kb = new grammy_1.InlineKeyboard().text('📚 Курси', 'courses');
            if (edit)
                await ctx.editMessageText(text, { reply_markup: kb });
            else
                await ctx.reply(text, { reply_markup: kb });
            return;
        }
        const lines = enrollments.map((e) => `📗 *${e.courses.name}*`).join('\n');
        const text = `🎓 *Мої курси*\n\n${lines}\n\nЯкщо потрібне посилання — напиши @olenabohuta`;
        const kb = new grammy_1.InlineKeyboard().text('📚 До каталогу', 'courses');
        if (edit)
            await ctx.editMessageText(text, { parse_mode: 'Markdown', reply_markup: kb });
        else
            await ctx.reply(text, { parse_mode: 'Markdown', reply_markup: kb });
    };
    bot.command('my', (ctx) => showMyCourses(ctx, false));
    bot.callbackQuery('my_courses', async (ctx) => { await ctx.answerCallbackQuery(); await showMyCourses(ctx, true); });
}
