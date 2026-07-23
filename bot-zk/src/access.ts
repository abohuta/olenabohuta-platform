import { Bot } from 'grammy';
import { config } from './config';

let _bot: Bot;

export function setBot(bot: Bot) {
  _bot = bot;
}

export async function generateInviteLink(chatId: string): Promise<string> {
  const link = await _bot.api.createChatInviteLink(chatId, {
    creates_join_request: false,
    expire_date: Math.floor(Date.now() / 1000) + 3_600, // valid 1 hour
    member_limit: 1,                                      // single-use
  });
  return link.invite_link;
}

export async function sendAccessLinks(telegramId: bigint): Promise<void> {
  const channelLink = await generateInviteLink(config.CHANNEL_ID);
  const groupLink = await generateInviteLink(config.GROUP_ID);

  await _bot.api.sendMessage(
    Number(telegramId),
    `🎉 *Ласкаво просимо до Закритого клубу!*\n\n` +
    `Ось твої персональні посилання:\n\n` +
    `📢 *Канал* — публікації та матеріали:\n${channelLink}\n\n` +
    `💬 *Група* — спілкування спільноти:\n${groupLink}\n\n` +
    `_Посилання одноразові та діють 1 годину._\n` +
    `_Якщо не встиг — напиши /start_`,
    { parse_mode: 'Markdown' }
  );
}

export async function revokeAccess(telegramId: bigint): Promise<void> {
  const id = Number(telegramId);
  for (const chatId of [config.CHANNEL_ID, config.GROUP_ID]) {
    try {
      await _bot.api.banChatMember(chatId, id);
      await _bot.api.unbanChatMember(chatId, id);
    } catch {
      // Ignore if user was already not a member
    }
  }
}
