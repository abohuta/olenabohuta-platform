import dotenv from 'dotenv';
dotenv.config();

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const config = {
  BOT_TOKEN: required('BOT_TOKEN'),
  CHANNEL_ID: required('CHANNEL_ID'),
  GROUP_ID: required('GROUP_ID'),
  SUPABASE_URL: required('SUPABASE_URL'),
  SUPABASE_SERVICE_KEY: required('SUPABASE_SERVICE_KEY'),
  WAYFORPAY_MERCHANT_LOGIN: required('WAYFORPAY_MERCHANT_LOGIN'),
  WAYFORPAY_SECRET_KEY: required('WAYFORPAY_SECRET_KEY'),
  PAYPAL_CLIENT_ID: required('PAYPAL_CLIENT_ID'),
  PAYPAL_SECRET: required('PAYPAL_SECRET'),
  PAYPAL_API_BASE: process.env.PAYPAL_API_BASE || 'https://api-m.paypal.com',
  WEBHOOK_URL: required('WEBHOOK_URL'),
  ADMIN_TELEGRAM_ID: BigInt(required('ADMIN_TELEGRAM_ID')),
  PORT: parseInt(process.env.PORT || '3001'),
};

export const PLANS = {
  season: {
    id: 'season' as const,
    name: 'Сезон',
    months: 3,
    usd: 45,
    label: '🌿 Сезон — $45 / 3 місяці',
    description: 'Ідеально, щоб спробувати та відчути клуб',
  },
  year: {
    id: 'year' as const,
    name: 'Рік',
    months: 12,
    usd: 144,
    label: '⭐ Рік — $144 / 12 місяців',
    description: 'Найкраща ціна — $12/міс замість $15',
  },
} as const;

export type PlanId = keyof typeof PLANS;
