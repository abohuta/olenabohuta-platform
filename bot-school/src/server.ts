import express from 'express';
import { Bot } from 'grammy';
import { verifyWebhookSignature, buildConfirmResponse } from './wayforpay';
import { captureOrder } from './paypal';
import { activatePayment } from './school';
import { sendCourseAccess } from './access';

export function createServer(bot: Bot) {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/health', (_, res) => res.json({ ok: true }));

  // WayForPay webhook
  app.post('/webhook/wayforpay', async (req, res) => {
    const body = req.body as Record<string, string>;

    if (!verifyWebhookSignature(body)) {
      console.warn('[WayForPay] Invalid signature');
      return res.status(400).send('Invalid signature');
    }

    if (body.transactionStatus === 'Approved') {
      const result = await activatePayment(body.orderReference);
      if (result) {
        await sendCourseAccess(result.telegramId, result.course);
        console.log(`[WayForPay] Activated: ${body.orderReference}`);
      }
    }

    res.set('Content-Type', 'application/json');
    res.send(buildConfirmResponse(body.orderReference));
  });

  // PayPal return URL
  app.get('/payment/paypal/capture', async (req, res) => {
    const { token: paypalOrderId } = req.query as { token: string };

    if (!paypalOrderId) {
      return res.send(page('Помилка: невірне посилання'));
    }

    try {
      const { status, orderRef } = await captureOrder(paypalOrderId);

      if (status === 'COMPLETED') {
        const result = await activatePayment(orderRef);
        if (result) {
          await sendCourseAccess(result.telegramId, result.course);
        }
        res.send(page('✅ Оплата успішна! Поверніться до Telegram — доступ вже чекає на вас.'));
      } else {
        res.send(page('Оплата в обробці. Якщо виникли питання — @olenabohuta'));
      }
    } catch (e) {
      console.error('[PayPal capture]', e);
      res.send(page('Помилка при обробці. Напишіть @olenabohuta'));
    }
  });

  app.get('/payment/paypal/cancel', (_, res) => {
    res.send(page('Оплату скасовано. Поверніться до Telegram та спробуйте знову.'));
  });

  app.get('/payment/success', (_, res) => {
    res.send(page('✅ Оплата успішна! Поверніться до Telegram — доступ вже чекає на вас.'));
  });

  return app;
}

function page(message: string): string {
  return `<!DOCTYPE html><html lang="uk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Школа Олени Богути</title><style>body{font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f5f0eb}div{text-align:center;max-width:400px;padding:2rem}p{font-size:1.1rem;color:#333;line-height:1.6}a{color:#B8936A;text-decoration:none;font-weight:600}</style></head><body><div><p>${message}</p><p><a href="https://t.me/OlenaBohutaSchool_bot">← Повернутися до бота</a></p></div></body></html>`;
}
