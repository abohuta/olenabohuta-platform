import { Bot, InlineKeyboard } from 'grammy';

export function registerAboutHandler(bot: Bot) {
  bot.callbackQuery('about', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(
      `*Закритий клуб Олени Богути* — це приватна спільнота для людей, які будують особистий бренд у соцмережах.\n\n` +
      `Щомісяця ти отримуєш:\n` +
      `— Нові матеріали та стратегії від Олени\n` +
      `— Закриті прямі ефіри та розбори\n` +
      `— Доступ до групи однодумців\n` +
      `— Ексклюзивні бонуси тільки для клубу\n\n` +
      `Що хочеш дізнатися?`,
      {
        parse_mode: 'Markdown',
        reply_markup: new InlineKeyboard()
          .text('👥 Хто у клубі?', 'about_who').row()
          .text('📅 Що щомісяця?', 'about_monthly').row()
          .text('💳 Вступити', 'plans'),
      }
    );
  });

  bot.callbackQuery('about_who', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(
      `У клубі — підприємці, блогери, фрілансери та всі, хто будує себе як бренд.\n\n` +
      `Це люди, які хочуть:\n` +
      `— Рости у соцмережах осмислено\n` +
      `— Монетизувати свою експертизу\n` +
      `— Бути частиною підтримуючої спільноти\n\n` +
      `Де і як вони спілкуються?`,
      {
        reply_markup: new InlineKeyboard()
          .text('📅 Що щомісяця?', 'about_monthly').row()
          .text('💳 Вступити', 'plans').row()
          .text('← Назад', 'about'),
      }
    );
  });

  bot.callbackQuery('about_monthly', async (ctx) => {
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(
      `Кожного місяця в клубі:\n\n` +
      `📚 *Матеріали* — стратегії, інструкції, шаблони\n` +
      `🎥 *Закриті ефіри* — розбори та навчання\n` +
      `💬 *Чат* — відповіді на питання, підтримка\n` +
      `🎁 *Бонуси* — ексклюзивні матеріали клубу\n\n` +
      `Готовий(а) приєднатися?`,
      {
        parse_mode: 'Markdown',
        reply_markup: new InlineKeyboard()
          .text('💳 Вступити зараз', 'plans').row()
          .text('← Назад', 'about'),
      }
    );
  });
}
