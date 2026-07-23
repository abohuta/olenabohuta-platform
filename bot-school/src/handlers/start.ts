import { Bot, InlineKeyboard } from 'grammy';
import { upsertUser } from '../school';

export function registerStartHandler(bot: Bot) {
  bot.command('start', async (ctx) => {
    const from = ctx.from!;
    await upsertUser(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);

    const kb = new InlineKeyboard()
      .text('📚 Курси', 'courses').row()
      .text('🎓 Мої курси', 'my_courses');

    await ctx.reply(
      `Привіт, *${from.first_name}*! 👋\n\n` +
      `Я бот школи Олени Богути — тут ти можеш переглянути курси та отримати доступ до матеріалів після оплати.`,
      { parse_mode: 'Markdown', reply_markup: kb }
    );
  });
}
