"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUSDRate = getUSDRate;
exports.toUAH = toUAH;
const axios_1 = __importDefault(require("axios"));
let cachedRate = null;
let cacheTime = 0;
const CACHE_TTL = 3600000;
async function getUSDRate() {
    if (cachedRate && Date.now() - cacheTime < CACHE_TTL)
        return cachedRate;
    try {
        const { data } = await axios_1.default.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json', { timeout: 5000 });
        cachedRate = data[0].rate;
        cacheTime = Date.now();
        return cachedRate;
    }
    catch {
        console.warn('[NBU] Failed to fetch rate, using fallback');
        return cachedRate ?? 42;
    }
}
async function toUAH(usd) {
    const rate = await getUSDRate();
    return Math.ceil(usd * rate);
}
