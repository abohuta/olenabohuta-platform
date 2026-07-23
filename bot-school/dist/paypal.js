"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.captureOrder = captureOrder;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
async function getToken() {
    const auth = Buffer.from(`${config_1.config.PAYPAL_CLIENT_ID}:${config_1.config.PAYPAL_SECRET}`).toString('base64');
    const { data } = await axios_1.default.post(`${config_1.config.PAYPAL_API_BASE}/v1/oauth2/token`, 'grant_type=client_credentials', { headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' } });
    return data.access_token;
}
async function createOrder(params) {
    const token = await getToken();
    const { data } = await axios_1.default.post(`${config_1.config.PAYPAL_API_BASE}/v2/checkout/orders`, {
        intent: 'CAPTURE',
        purchase_units: [{
                reference_id: params.orderRef,
                amount: { currency_code: 'USD', value: params.amountUSD.toFixed(2) },
                description: params.courseName,
            }],
        application_context: {
            brand_name: 'Олена Богута — Школа',
            return_url: `${config_1.config.WEBHOOK_URL}/payment/paypal/capture`,
            cancel_url: `${config_1.config.WEBHOOK_URL}/payment/paypal/cancel`,
            user_action: 'PAY_NOW',
        },
    }, { headers: { Authorization: `Bearer ${token}` } });
    const approvalUrl = data.links.find((l) => l.rel === 'approve')?.href;
    return { orderId: data.id, approvalUrl };
}
async function captureOrder(paypalOrderId) {
    const token = await getToken();
    const { data } = await axios_1.default.post(`${config_1.config.PAYPAL_API_BASE}/v2/checkout/orders/${paypalOrderId}/capture`, {}, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
    return {
        status: data.status,
        orderRef: data.purchase_units?.[0]?.reference_id,
    };
}
