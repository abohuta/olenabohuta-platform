import { Bot, InlineKeyboard } from 'grammy';
import { upsertUser, getUserEnrollments } from '../school';

export function registerMyHandler(bot: Bot) {
  const showMyCourses = async (ctx: any, edit = false) => {
    const from = ctx.from!;
    const user = await upsertUser(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
    const enrollments = await getUserEnrollments(user.id);

    if (!enrollments.length) {
      const text = `У тебе ще немає придбаних курсів.\n\nПереглянь каталог 👇`;
      const kb = new InlineKeyboard().text('📚 Курси', 'courses');
      if (edit) await ctx.editMessageText(text, { reply_markup: kb });
      else await ctx.reply(text, { reply_markup: kb });
      return;
    }

    const lines = enrollments.map((e: any) => `📗 *${e.courses.name}*`).join('\n');
    const text = `🎓 *Мої курси*\n\n${lines}\n\nЯкщо потрібне посилання — напиши @olenabohuta`;
    const kb = new InlineKeyboard().text('📚 До каталогу', 'courses');

    if (edit) await ctx.editMessageText(text, { parse_mode: 'Markdown', reply_markup: kb });
    else await ctx.reply(text, { parse_mode: 'Markdown', reply_markup: kb });
  };

  bot.command('my', (ctx) => showMyCourses(ctx, false));
  bot.callbackQuery('my_courses', async (ctx) => { await ctx.answerCallbackQuery(); await showMyCourses(ctx, true); });
}
