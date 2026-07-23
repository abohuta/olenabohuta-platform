import crypto from 'crypto';
import axios from 'axios';
import { config } from './config';

const API = 'https://api.wayforpay.com/api';

function sign(params: (string | number)[]): string {
  return crypto.createHmac('md5', config.WAYFORPAY_SECRET_KEY).update(params.join(';')).digest('hex');
}

export async function createInvoice(params: {
  orderRef: string;
  amountUAH: number;
  courseName: string;
}): Promise<string> {
  const { orderRef, amountUAH, courseName } = params;
  const orderDate = Math.floor(Date.now() / 1000);

  const body = {
    transactionType: 'CREATE_INVOICE',
    merchantAccount: config.WAYFORPAY_MERCHANT_LOGIN,
    merchantDomainName: 'olenabohuta.com',
    merchantSignature: sign([
      config.WAYFORPAY_MERCHANT_LOGIN,
      'olenabohuta.com',
      orderRef,
      orderDate,
      amountUAH,
      'UAH',
      courseName,
      1,
      amountUAH,
    ]),
    apiVersion: '1',
    language: 'UA',
    serviceUrl: `${config.WEBHOOK_URL}/webhook/wayforpay`,
    returnUrl: `${config.WEBHOOK_URL}/payment/success`,
    orderReference: orderRef,
    orderDate,
    amount: amountUAH,
    currency: 'UAH',
    productName: [courseName],
    productCount: [1],
    productPrice: [amountUAH],
  };

  const { data } = await axios.post(API, body);
  if (!data.invoiceUrl) throw new Error(`WayForPay error: ${JSON.stringify(data)}`);
  return data.invoiceUrl as string;
}

export function verifyWebhookSignature(body: Record<string, string>): boolean {
  const { merchantAccount, orderReference, amount, currency, authCode, cardPan, transactionStatus, reasonCode, merchantSignature } = body;
  const expected = sign([merchantAccount, orderReference, amount, currency, authCode, cardPan, transactionStatus, reasonCode]);
  return expected === merchantSignature;
}

export function buildConfirmResponse(orderReference: string): string {
  const time = Math.floor(Date.now() / 1000);
  return JSON.stringify({
    orderReference,
    status: 'accept',
    time,
    signature: sign([orderReference, 'accept', time]),
  });
}
