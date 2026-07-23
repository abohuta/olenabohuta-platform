"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStartHandler = registerStartHandler;
const grammy_1 = require("grammy");
const school_1 = require("../school");
function registerStartHandler(bot) {
    bot.command('start', async (ctx) => {
        const from = ctx.from;
        await (0, school_1.upsertUser)(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
        const kb = new grammy_1.InlineKeyboard()
            .text('📚 Курси', 'courses').row()
            .text('🎓 Мої курси', 'my_courses');
        await ctx.reply(`Привіт, *${from.first_name}*! 👋\n\n` +
            `Я бот школи Олени Богути — тут ти можеш переглянути курси та отримати доступ до матеріалів після оплати.`, { parse_mode: 'Markdown', reply_markup: kb });
    });
}
