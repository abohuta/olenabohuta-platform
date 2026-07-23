"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoice = createInvoice;
exports.verifyWebhookSignature = verifyWebhookSignature;
exports.buildConfirmResponse = buildConfirmResponse;
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = __importDefault(require("axios"));
const config_1 = require("./config");
const API = 'https://api.wayforpay.com/api';
function sign(params) {
    return crypto_1.default.createHmac('md5', config_1.config.WAYFORPAY_SECRET_KEY).update(params.join(';')).digest('hex');
}
async function createInvoice(params) {
    const { orderRef, amountUAH, courseName } = params;
    const orderDate = Math.floor(Date.now() / 1000);
    const body = {
        transactionType: 'CREATE_INVOICE',
        merchantAccount: config_1.config.WAYFORPAY_MERCHANT_LOGIN,
        merchantDomainName: 'olenabohuta.com',
        merchantSignature: sign([
            config_1.config.WAYFORPAY_MERCHANT_LOGIN,
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
        serviceUrl: `${config_1.config.WEBHOOK_URL}/webhook/wayforpay`,
        returnUrl: `${config_1.config.WEBHOOK_URL}/payment/success`,
        orderReference: orderRef,
        orderDate,
        amount: amountUAH,
        currency: 'UAH',
        productName: [courseName],
        productCount: [1],
        productPrice: [amountUAH],
    };
    const { data } = await axios_1.default.post(API, body);
    if (!data.invoiceUrl)
        throw new Error(`WayForPay error: ${JSON.stringify(data)}`);
    return data.invoiceUrl;
}
function verifyWebhookSignature(body) {
    const { merchantAccount, orderReference, amount, currency, authCode, cardPan, transactionStatus, reasonCode, merchantSignature } = body;
    const expected = sign([merchantAccount, orderReference, amount, currency, authCode, cardPan, transactionStatus, reasonCode]);
    return expected === merchantSignature;
}
function buildConfirmResponse(orderReference) {
    const time = Math.floor(Date.now() / 1000);
    return JSON.stringify({
        orderReference,
        status: 'accept',
        time,
        signature: sign([orderReference, 'accept', time]),
    });
}
