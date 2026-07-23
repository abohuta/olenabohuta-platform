import { Bot } from 'grammy';
import { config } from '../config';
import { getStats, grantManualAccess } from '../subscription';
import { sendAccessLinks } from '../access';

function isAdmin(id: number) {
  return BigInt(id) === config.ADMIN_TELEGRAM_ID;
}

export function registerAdminHandlers(bot: Bot) {
  // /admin — статистика
  bot.command('admin', async (ctx) => {
    if (!isAdmin(ctx.from!.id)) return;
    const s = await getStats();
    await ctx.reply(
      `📊 *Статистика клубу*\n\n` +
      `Активних підписників: *${s.active_total}*\n` +
      `— Сезон: ${s.season_count}\n` +
      `— Рік: ${s.year_count}\n` +
      `— Вручну: ${s.manual_count}\n\n` +
      `Виручка:\n` +
      `— UAH: ${Number(s.total_uah).toLocaleString('uk-UA')} грн\n` +
      `— USD: $${Number(s.total_usd).toLocaleString('en-US')}`,
      { parse_mode: 'Markdown' }
    );
  });

  // /grant 123456789 3 — надати доступ вручну
  bot.command('grant', async (ctx) => {
    if (!isAdmin(ctx.from!.id)) return;
    const args = ctx.message?.text?.split(' ').slice(1) ?? [];

    if (args.length < 2) {
      await ctx.reply('Використання: /grant TELEGRAM_ID МІСЯЦІ\nПриклад: /grant 123456789 3');
      return;
    }

    const [rawId, rawMonths] = args;
    const telegramId = BigInt(rawId);
    const months = parseInt(rawMonths);

    if (isNaN(months) || months < 1) {
      await ctx.reply('Кількість місяців має бути числом > 0');
      return;
    }

    try {
      await grantManualAccess(telegramId, months);
      await sendAccessLinks(telegramId);
      await ctx.reply(`✅ Надано доступ на ${months} міс для ID ${telegramId}`);
    } catch (e: any) {
      await ctx.reply(`❌ Помилка: ${e.message}`);
    }
  });
}
