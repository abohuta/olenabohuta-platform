import { Bot, InlineKeyboard } from 'grammy';
import { PLANS, PlanId } from '../config';
import { toUAH } from '../nbu';
import { upsertUser, createPendingPayment } from '../subscription';
import { createInvoice } from '../wayforpay';
import { createOrder } from '../paypal';

export function registerPlansHandler(bot: Bot) {
  const showPlans = async (ctx: any, edit = false) => {
    const text =
      `Обери тариф:\n\n` +
      `🌿 *Сезон* — $45 / 3 місяці\nІдеально, щоб спробувати та відчути клуб\n\n` +
      `⭐ *Рік* — $144 / 12 місяців\nНайкраща ціна — $12/місяць замість $15`;
    const kb = new InlineKeyboard()
      .text('🌿 Сезон — $45 / 3 міс', 'pick_season').row()
      .text('⭐ Рік — $144 / 12 міс', 'pick_year').row()
      .text('← Назад', 'about');

    if (edit) await ctx.editMessageText(text, { parse_mode: 'Markdown', reply_markup: kb });
    else await ctx.reply(text, { parse_mode: 'Markdown', reply_markup: kb });
  };

  bot.command('plans', (ctx) => showPlans(ctx, false));
  bot.command('renew', (ctx) => showPlans(ctx, false));
  bot.callbackQuery('plans', async (ctx) => { await ctx.answerCallbackQuery(); await showPlans(ctx, true); });
  bot.callbackQuery('renew', async (ctx) => { await ctx.answerCallbackQuery(); await showPlans(ctx, true); });

  // Plan selected → ask location
  bot.callbackQuery(/^pick_(season|year)$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    const planId = ctx.match[1] as PlanId;
    const plan = PLANS[planId];
    await ctx.editMessageText(
      `Тариф: *${plan.name}* — $${plan.usd} / ${plan.months} міс\n\nДе ти зараз знаходишся?`,
      {
        parse_mode: 'Markdown',
        reply_markup: new InlineKeyboard()
          .text('🇺🇦 Я в Україні', `pay_ua_${planId}`).row()
          .text('🌍 Я за кордоном', `pay_int_${planId}`).row()
          .text('← Назад', 'plans'),
      }
    );
  });

  // Ukraine → WayForPay
  bot.callbackQuery(/^pay_ua_(season|year)$/, async (ctx) => {
    await ctx.answerCallbackQuery('Генерую посилання на оплату...');
    const planId = ctx.match[1] as PlanId;
    const plan = PLANS[planId];
    const from = ctx.from!;

    try {
      const user = await upsertUser(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
      const amountUAH = await toUAH(plan.usd);
      const orderRef = `ZK-${from.id}-${Date.now()}`;

      await createPendingPayment({
        userId: user.id,
        orderRef,
        amount: amountUAH,
        currency: 'UAH',
        plan: planId,
        months: plan.months,
        method: 'wayforpay',
      });

      const invoiceUrl = await createInvoice({
        orderRef,
        amountUAH,
        planName: `Закритий клуб — ${plan.name}`,
      });

      await ctx.editMessageText(
        `💳 *Оплата через WayForPay*\n\n` +
        `Тариф: *${plan.name}* / ${plan.months} місяці\n` +
        `Сума: *${amountUAH} грн* (~$${plan.usd})\n\n` +
        `Після оплати ти автоматично отримаєш посилання на канал та групу.`,
        {
          parse_mode: 'Markdown',
          reply_markup: new InlineKeyboard().url('💳 Перейти до оплати', invoiceUrl),
        }
      );
    } catch (e) {
      console.error('[WayForPay]', e);
      await ctx.reply('Помилка при створенні платежу. Спробуй ще раз або напиши @olenabohuta');
    }
  });

  // International → PayPal
  bot.callbackQuery(/^pay_int_(season|year)$/, async (ctx) => {
    await ctx.answerCallbackQuery('Генерую посилання PayPal...');
    const planId = ctx.match[1] as PlanId;
    const plan = PLANS[planId];
    const from = ctx.from!;

    try {
      const user = await upsertUser(BigInt(from.id), from.username ?? null, from.first_name ?? null, from.last_name ?? null);
      const orderRef = `ZK-${from.id}-${Date.now()}`;

      const { orderId, approvalUrl } = await createOrder({
        orderRef,
        amountUSD: plan.usd,
        planName: `Закритий клуб — ${plan.name}`,
      });

      await createPendingPayment({
        userId: user.id,
        orderRef,
        amount: plan.usd,
        currency: 'USD',
        plan: planId,
        months: plan.months,
        method: 'paypal',
        paypalOrderId: orderId,
      });

      await ctx.editMessageText(
        `💳 *Оплата через PayPal*\n\n` +
        `Тариф: *${plan.name}* / ${plan.months} місяці\n` +
        `Сума: *$${plan.usd}*\n\n` +
        `Після оплати на сайті PayPal ти автоматично отримаєш посилання на канал та групу.`,
        {
          parse_mode: 'Markdown',
          reply_markup: new InlineKeyboard().url('💳 Оплатити через PayPal', approvalUrl),
        }
      );
    } catch (e) {
      console.error('[PayPal]', e);
      await ctx.reply('Помилка при створенні платежу. Спробуй ще раз або напиши @olenabohuta');
    }
  });
}
