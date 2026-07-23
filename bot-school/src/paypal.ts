import axios from 'axios';
import { config } from './config';

async function getToken(): Promise<string> {
  const auth = Buffer.from(`${config.PAYPAL_CLIENT_ID}:${config.PAYPAL_SECRET}`).toString('base64');
  const { data } = await axios.post(
    `${config.PAYPAL_API_BASE}/v1/oauth2/token`,
    'grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  return data.access_token as string;
}

export async function createOrder(params: {
  orderRef: string;
  amountUSD: number;
  courseName: string;
}): Promise<{ orderId: string; approvalUrl: string }> {
  const token = await getToken();
  const { data } = await axios.post(
    `${config.PAYPAL_API_BASE}/v2/checkout/orders`,
    {
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: params.orderRef,
        amount: { currency_code: 'USD', value: params.amountUSD.toFixed(2) },
        description: params.courseName,
      }],
      application_context: {
        brand_name: 'Олена Богута — Школа',
        return_url: `${config.WEBHOOK_URL}/payment/paypal/capture`,
        cancel_url: `${config.WEBHOOK_URL}/payment/paypal/cancel`,
        user_action: 'PAY_NOW',
      },
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const approvalUrl = data.links.find((l: { rel: string }) => l.rel === 'approve')?.href;
  return { orderId: data.id, approvalUrl };
}

export async function captureOrder(paypalOrderId: string): Promise<{ status: string; orderRef: string }> {
  const token = await getToken();
  const { data } = await axios.post(
    `${config.PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}/capture`,
    {},
    { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
  );
  return {
    status: data.status,
    orderRef: data.purchase_units?.[0]?.reference_id,
  };
}
