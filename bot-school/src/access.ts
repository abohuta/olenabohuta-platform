import { Bot } from 'grammy';

let _bot: Bot;

export function setBot(bot: Bot) { _bot = bot; }

export async function sendCourseAccess(telegramId: number, course: { name: string; access_type: string; access_value: string }) {
  if (course.access_type === 'url') {
    await _bot.api.sendMessage(
      telegramId,
      `✅ *Доступ відкрито!*\n\n*${course.name}*\n\n👇 Твоє посилання на матеріали:\n${course.access_value}`,
      { parse_mode: 'Markdown' }
    );
  } else if (course.access_type === 'telegram') {
    const invite = await _bot.api.createChatInviteLink(course.access_value, {
      member_limit: 1,
      expire_date: Math.floor(Date.now() / 1000) + 3600,
    });
    await _bot.api.sendMessage(
      telegramId,
      `✅ *Доступ відкрито!*\n\n*${course.name}*\n\n👇 Посилання в Telegram (дійсне 1 годину):\n${invite.invite_link}`,
      { parse_mode: 'Markdown' }
    );
  }
}
