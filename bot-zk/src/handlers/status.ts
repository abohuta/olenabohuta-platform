import { Bot, InlineKeyboard } from 'grammy';
import { upsertUser, getActiveSub } from '../subscription';

const PLAN_LABEL: Record<string, string> = {
  season: '🌿 Сезон (3 місяці)',
  year: '⭐ Рік (12 місяців)',
  manual: '🎁 Подарований доступ',
};

async function buildStatusReply(telegramId: bigint, username: string | null, firstName: string | null, lastName: string | null) {
  const user = await upsertUser(telegramId, username, firstName, lastName);
  const sub = await getActiveSub(user.id);

  if (!sub) {
    return {
      text: 'У тебе немає активної підписки.\n\nХочеш вступити до Закритого клубу?',
      kb: new InlineKeyboard().text('💳 Вступити', 'plans'),
    };
  }

  const expires = new Date(sub.expires_at);
  const daysLeft = Math.ceil((expires.getTime() - Date.now()) / 86_400_000);
  const expiresStr = expires.toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' });

  return {
    text:
      `📊 *Твоя підписка*\n\n` +
      `Тариф: *${PLAN_LABEL[sub.plan] ?? sub.plan}*\n` +
      `Діє до: *${expiresStr}*\n` +
      `Залишилось: *${daysLeft} ${daysLeft === 1 ? 'день' : daysLeft < 5 ? 'дні' : 'днів'}*`,
    kb: new InlineKeyboard().text('🔄 Продовжити', 'plans'),
  };
}

export function registerStatusHandler(bot: Bot) {
  bot.command('status', async (ctx) => {
    const from = ctx.from!;
    const { text, kb } = await buildStatusReply(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
    await ctx.reply(text, { parse_mode: 'Markdown', reply_markup: kb });
  });

  bot.callbackQuery('status', async (ctx) => {
    await ctx.answerCallbackQuery();
    const from = ctx.from!;
    const { text, kb } = await buildStatusReply(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
    await ctx.editMessageText(text, { parse_mode: 'Markdown', reply_markup: kb });
  });
}
