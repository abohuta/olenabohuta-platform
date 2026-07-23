"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
function required(name) {
    const val = process.env[name];
    if (!val)
        throw new Error(`Missing required env var: ${name}`);
    return val;
}
exports.config = {
    BOT_TOKEN: required('BOT_TOKEN'),
    SUPABASE_URL: required('SUPABASE_URL'),
    SUPABASE_SERVICE_KEY: required('SUPABASE_SERVICE_KEY'),
    WAYFORPAY_MERCHANT_LOGIN: required('WAYFORPAY_MERCHANT_LOGIN'),
    WAYFORPAY_SECRET_KEY: required('WAYFORPAY_SECRET_KEY'),
    PAYPAL_CLIENT_ID: required('PAYPAL_CLIENT_ID'),
    PAYPAL_SECRET: required('PAYPAL_SECRET'),
    PAYPAL_API_BASE: required('PAYPAL_API_BASE'),
    WEBHOOK_URL: required('WEBHOOK_URL'),
    ADMIN_TELEGRAM_ID: BigInt(required('ADMIN_TELEGRAM_ID')),
    PORT: parseInt(process.env.PORT ?? '3002'),
};
