import cron from 'node-cron';
import { Bot, InlineKeyboard } from 'grammy';
import { getExpiringSubscriptions, getExpiredSubscriptions, markExpired } from './subscription';
import { revokeAccess } from './access';

export function startScheduler(bot: Bot) {
  // Щодня о 09:00 за Києвом
  cron.schedule('0 9 * * *', async () => {
    console.log('[Scheduler] Daily subscription check');

    // Нагадування за 7 днів
    const expiring = await getExpiringSubscriptions(7);
    for (const sub of expiring) {
      const daysLeft = Math.ceil((new Date(sub.expires_at).getTime() - Date.now()) / 86_400_000);
      if (daysLeft < 4) continue; // 3-day warning handled below

      try {
        await bot.api.sendMessage(
          Number(sub.telegram_id),
          `⏰ Твоя підписка закінчується через *${daysLeft} днів*.\n\nПродовж зараз, щоб не втратити доступ до клубу.`,
          {
            parse_mode: 'Markdown',
            reply_markup: new InlineKeyboard().text('🔄 Продовжити підписку', 'renew'),
          }
        );
      } catch {}
    }

    // Фінальне нагадування за 3 дні
    const expiring3 = await getExpiringSubscriptions(3);
    for (const sub of expiring3) {
      const daysLeft = Math.ceil((new Date(sub.expires_at).getTime() - Date.now()) / 86_400_000);
      try {
        await bot.api.sendMessage(
          Number(sub.telegram_id),
          `🔴 Залишилось *${daysLeft} ${daysLeft === 1 ? 'день' : 'дні'}* підписки!\n\nНе зволікай — продовж зараз, щоб не втратити доступ.`,
          {
            parse_mode: 'Markdown',
            reply_markup: new InlineKeyboard().text('🔄 Продовжити', 'renew'),
          }
        );
      } catch {}
    }

    // Відкликати прострочений доступ
    const expired = await getExpiredSubscriptions();
    for (const sub of expired) {
      try {
        await revokeAccess(BigInt(sub.telegram_id));
        await markExpired(sub.id);
        await bot.api.sendMessage(
          Number(sub.telegram_id),
          `Твоя підписка до Закритого клубу завершилась.\n\nПродовж підписку, щоб відновити доступ до каналу та групи.`,
          {
            reply_markup: new InlineKeyboard().text('🔄 Поновити підписку', 'plans'),
          }
        );
      } catch {}
    }

    console.log(`[Scheduler] Done — expiring: ${expiring.length}, expired: ${expired.length}`);
  }, { timezone: 'Europe/Kyiv' });
}
