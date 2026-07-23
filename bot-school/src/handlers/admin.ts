import { Bot } from 'grammy';
import { config } from '../config';
import { getStats, getAllUsers, addCourse, getAllCourses, toggleCourse, getAdmin, addAdmin, setAdminPerms, removeAdmin, getAllAdmins } from '../school';

function isSuperAdmin(id: number) {
  return BigInt(id) === config.ADMIN_TELEGRAM_ID;
}

async function hasPermission(telegramId: number, perm: 'broadcast' | 'courses' | 'stats'): Promise<boolean> {
  if (isSuperAdmin(telegramId)) return true;
  const admin = await getAdmin(BigInt(telegramId));
  if (!admin) return false;
  return admin[`can_${perm}`] as boolean;
}

const pendingBroadcast = new Set<number>();

export function registerAdminHandlers(bot: Bot) {

  // /admin — статистика
  bot.command('admin', async (ctx) => {
    if (!await hasPermission(ctx.from!.id, 'stats')) return;
    const s = await getStats();
    await ctx.reply(
      `📊 *Статистика школи*\n\n` +
      `Підписників бота: *${s.total_users}*\n` +
      `Куплено курсів: *${s.total_enrollments}*\n\n` +
      `Виручка:\n` +
      `— UAH: ${Number(s.total_uah).toLocaleString('uk-UA')} грн\n` +
      `— USD: $${Number(s.total_usd).toLocaleString('en-US')}`,
      { parse_mode: 'Markdown' }
    );
  });

  // /broadcast — розсилка
  bot.command('broadcast', async (ctx) => {
    if (!await hasPermission(ctx.from!.id, 'broadcast')) return;
    const text = ctx.message?.text?.split(' ').slice(1).join(' ');
    if (!text) {
      pendingBroadcast.add(ctx.from!.id);
      await ctx.reply('Надішли повідомлення для розсилки (текст, фото, відео):');
      return;
    }
    await sendBroadcast(bot, ctx, text);
  });

  bot.on('message', async (ctx, next) => {
    const id = ctx.from!.id;
    if (!pendingBroadcast.has(id)) return next();
    if (!await hasPermission(id, 'broadcast')) { pendingBroadcast.delete(id); return next(); }

    pendingBroadcast.delete(id);
    const users = await getAllUsers();
    let sent = 0, failed = 0;
    await ctx.reply(`Розсилаю ${users.length} підписникам...`);
    for (const telegramId of users) {
      try { await bot.api.copyMessage(telegramId, ctx.chat.id, ctx.message!.message_id); sent++; }
      catch { failed++; }
      await new Promise(r => setTimeout(r, 50));
    }
    await ctx.reply(`✅ Розсилка завершена\nНадіслано: ${sent}\nПомилок: ${failed}`);
  });

  // /addcourse
  bot.command('addcourse', async (ctx) => {
    if (!await hasPermission(ctx.from!.id, 'courses')) return;
    const args = ctx.message?.text?.replace('/addcourse', '').trim() ?? '';
    if (!args.includes('|')) {
      await ctx.reply(
        'Формат:\n`/addcourse Назва | Опис | ціна_USD | тип | значення`\n\n' +
        'Типи: `url` або `telegram`\n\n' +
        'Приклади:\n' +
        '`/addcourse Курс | Опис | 97 | url | https://notion.so/...`\n' +
        '`/addcourse Курс | Опис | 49 | telegram | -1001234567890`',
        { parse_mode: 'Markdown' }
      );
      return;
    }
    const parts = args.split('|').map(s => s.trim());
    if (parts.length < 5) { await ctx.reply('Потрібно 5 частин: Назва | Опис | Ціна | Тип | Значення'); return; }
    const [name, description, priceStr, access_type, access_value] = parts;
    const price_usd = parseFloat(priceStr);
    if (isNaN(price_usd) || price_usd <= 0) { await ctx.reply('Ціна має бути числом > 0'); return; }
    if (!['url', 'telegram'].includes(access_type)) { await ctx.reply('Тип: `url` або `telegram`', { parse_mode: 'Markdown' }); return; }
    try {
      const course = await addCourse({ name, description, price_usd, access_type, access_value });
      await ctx.reply(`✅ Курс додано!\n\nID: *${course.id}*\nНазва: *${course.name}*\nЦіна: $${course.price_usd}`, { parse_mode: 'Markdown' });
    } catch (e: any) { await ctx.reply(`❌ Помилка: ${e.message}`); }
  });

  // /courselist
  bot.command('courselist', async (ctx) => {
    if (!await hasPermission(ctx.from!.id, 'courses')) return;
    const courses = await getAllCourses();
    if (!courses.length) { await ctx.reply('Курсів немає'); return; }
    const lines = courses.map((c: any) => `${c.active ? '✅' : '❌'} *ID ${c.id}* — ${c.name} ($${c.price_usd})`).join('\n');
    await ctx.reply(`*Всі курси:*\n\n${lines}\n\n/deactivate ID або /activate ID`, { parse_mode: 'Markdown' });
  });

  // /deactivate /activate
  bot.command('deactivate', async (ctx) => {
    if (!await hasPermission(ctx.from!.id, 'courses')) return;
    const id = parseInt(ctx.message?.text?.split(' ')[1] ?? '');
    if (isNaN(id)) { await ctx.reply('Вкажи ID: /deactivate 3'); return; }
    await toggleCourse(id, false);
    await ctx.reply(`✅ Курс ${id} вимкнено`);
  });

  bot.command('activate', async (ctx) => {
    if (!await hasPermission(ctx.from!.id, 'courses')) return;
    const id = parseInt(ctx.message?.text?.split(' ')[1] ?? '');
    if (isNaN(id)) { await ctx.reply('Вкажи ID: /activate 3'); return; }
    await toggleCourse(id, true);
    await ctx.reply(`✅ Курс ${id} увімкнено`);
  });

  // ── Управління адмінами (тільки супер-адмін) ──

  // /addadmin 123456789
  bot.command('addadmin', async (ctx) => {
    if (!isSuperAdmin(ctx.from!.id)) return;
    const args = ctx.message?.text?.split(' ').slice(1) ?? [];
    if (!args[0]) { await ctx.reply('Використання: /addadmin TELEGRAM_ID'); return; }
    const telegramId = BigInt(args[0]);
    try {
      await addAdmin(telegramId, null);
      await ctx.reply(
        `✅ Адміна додано: \`${telegramId}\`\n\nПрав поки немає. Встанови:\n/setperms ${telegramId} broadcast,courses,stats`,
        { parse_mode: 'Markdown' }
      );
    } catch (e: any) { await ctx.reply(`❌ ${e.message}`); }
  });

  // /setperms 123456789 broadcast,courses,stats
  bot.command('setperms', async (ctx) => {
    if (!isSuperAdmin(ctx.from!.id)) return;
    const args = ctx.message?.text?.split(' ').slice(1) ?? [];
    if (args.length < 2) {
      await ctx.reply('Використання: /setperms TELEGRAM_ID broadcast,courses,stats\n\nДоступні права:\n• `broadcast` — розсилка\n• `courses` — курси\n• `stats` — статистика', { parse_mode: 'Markdown' });
      return;
    }
    const telegramId = BigInt(args[0]);
    const perms = args[1].split(',').map(s => s.trim());
    const update = {
      can_broadcast: perms.includes('broadcast'),
      can_courses: perms.includes('courses'),
      can_stats: perms.includes('stats'),
    };
    try {
      await setAdminPerms(telegramId, update);
      const active = Object.entries(update).filter(([, v]) => v).map(([k]) => k.replace('can_', '')).join(', ') || 'немає';
      await ctx.reply(`✅ Права для \`${telegramId}\`:\n${active}`, { parse_mode: 'Markdown' });
    } catch (e: any) { await ctx.reply(`❌ ${e.message}`); }
  });

  // /removeadmin 123456789
  bot.command('removeadmin', async (ctx) => {
    if (!isSuperAdmin(ctx.from!.id)) return;
    const id = ctx.message?.text?.split(' ')[1];
    if (!id) { await ctx.reply('Використання: /removeadmin TELEGRAM_ID'); return; }
    await removeAdmin(BigInt(id));
    await ctx.reply(`✅ Адміна ${id} видалено`);
  });

  // /admins — список
  bot.command('admins', async (ctx) => {
    if (!isSuperAdmin(ctx.from!.id)) return;
    const admins = await getAllAdmins();
    if (!admins.length) { await ctx.reply('Додаткових адмінів немає.'); return; }
    const lines = admins.map(a => {
      const perms = [
        a.can_broadcast ? '📢 розсилка' : '',
        a.can_courses ? '📚 курси' : '',
        a.can_stats ? '📊 статистика' : '',
      ].filter(Boolean).join(', ') || 'без прав';
      return `• \`${a.telegram_id}\`${a.username ? ` @${a.username}` : ''} — ${perms}`;
    }).join('\n');
    await ctx.reply(`*Адміни школи:*\n\n${lines}`, { parse_mode: 'Markdown' });
  });
}

async function sendBroadcast(bot: Bot, ctx: any, text: string) {
  const users = await getAllUsers();
  let sent = 0, failed = 0;
  await ctx.reply(`Розсилаю ${users.length} підписникам...`);
  for (const telegramId of users) {
    try { await bot.api.sendMessage(telegramId, text); sent++; }
    catch { failed++; }
    await new Promise(r => setTimeout(r, 50));
  }
  await ctx.reply(`✅ Розсилка завершена\nНадіслано: ${sent}\nПомилок: ${failed}`);
}
