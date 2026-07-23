import { Bot } from 'grammy';

export function registerHelpHandler(bot: Bot) {
  bot.command('help', async (ctx) => {
    await ctx.reply(
      `*Закритий клуб Олени Богути*\n\n` +
      `Команди:\n` +
      `/start — Головне меню\n` +
      `/plans — Тарифи та оплата\n` +
      `/status — Моя підписка\n` +
      `/renew — Продовжити підписку\n` +
      `/help — Ця довідка\n\n` +
      `Питання? Пиши @olenabohuta`,
      { parse_mode: 'Markdown' }
    );
  });
}
