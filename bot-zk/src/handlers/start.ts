import { Bot, InlineKeyboard } from 'grammy';
import { upsertUser, getActiveSub } from '../subscription';

export function registerStartHandler(bot: Bot) {
  bot.command('start', async (ctx) => {
    const from = ctx.from!;
    const user = await upsertUser(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
    const sub = await getActiveSub(user.id);

    if (sub) {
      const expires = new Date(sub.expires_at).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });
      await ctx.reply(
        `Привіт, ${from.first_name}! 👋\n\nТи вже учасник Закритого клубу.\nПідписка діє до *${expires}*.`,
        {
          parse_mode: 'Markdown',
          reply_markup: new InlineKeyboard()
            .text('📊 Мій статус', 'status').row()
            .text('🔄 Продовжити підписку', 'plans'),
        }
      );
      return;
    }

    await ctx.reply(
      `Привіт, ${from.first_name}! 👋\n\n*Закритий клуб Олени Богути* — це приватна спільнота для тих, хто будує особистий бренд і хоче зростати разом з однодумцями.\n\nЩо хочеш зробити?`,
      {
        parse_mode: 'Markdown',
        reply_markup: new InlineKeyboard()
          .text('🌿 Дізнатися про клуб', 'about').row()
          .text('💳 Вступити зараз', 'plans'),
      }
    );
  });
}
