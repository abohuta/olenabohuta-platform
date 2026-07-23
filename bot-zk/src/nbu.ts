import axios from 'axios';

let cachedRate: number | null = null;
let cacheTime = 0;
const CACHE_TTL = 3_600_000; // 1 hour

export async function getUSDRate(): Promise<number> {
  if (cachedRate && Date.now() - cacheTime < CACHE_TTL) return cachedRate;
  try {
    const { data } = await axios.get(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json',
      { timeout: 5000 }
    );
    cachedRate = data[0].rate as number;
    cacheTime = Date.now();
    return cachedRate;
  } catch {
    console.warn('[NBU] Failed to fetch rate, using fallback');
    return cachedRate ?? 42;
  }
}

export async function toUAH(usd: number): Promise<number> {
  const rate = await getUSDRate();
  return Math.ceil(usd * rate);
}
