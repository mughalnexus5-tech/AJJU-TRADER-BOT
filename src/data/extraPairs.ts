import type { TradingPair, PairCategory } from "../types";
import { INITIAL_PAIRS } from "./tradingData";

type Seed = { code: string; name: string; category: PairCategory; rate: number };

// Full broker coverage: Forex majors/minors/exotics, Crypto, Metals, Indices, Stocks, Commodities
const SEEDS: Seed[] = [
  // FOREX majors & minors
  { code: "EURUSD", name: "EUR / USD", category: "FOREX", rate: 1.0874 },
  { code: "GBPUSD", name: "GBP / USD", category: "FOREX", rate: 1.2941 },
  { code: "USDJPY", name: "USD / JPY", category: "FOREX", rate: 151.42 },
  { code: "USDCHF", name: "USD / CHF", category: "FOREX", rate: 0.8842 },
  { code: "USDCAD", name: "USD / CAD", category: "FOREX", rate: 1.3612 },
  { code: "AUDUSD", name: "AUD / USD", category: "FOREX", rate: 0.6612 },
  { code: "NZDUSD", name: "NZD / USD", category: "FOREX", rate: 0.6084 },
  { code: "EURGBP", name: "EUR / GBP", category: "FOREX", rate: 0.8402 },
  { code: "EURJPY", name: "EUR / JPY", category: "FOREX", rate: 164.62 },
  { code: "EURCHF", name: "EUR / CHF", category: "FOREX", rate: 0.9612 },
  { code: "EURAUD", name: "EUR / AUD", category: "FOREX", rate: 1.6442 },
  { code: "EURCAD", name: "EUR / CAD", category: "FOREX", rate: 1.4802 },
  { code: "EURNZD", name: "EUR / NZD", category: "FOREX", rate: 1.7872 },
  { code: "GBPJPY", name: "GBP / JPY", category: "FOREX", rate: 195.84 },
  { code: "GBPCHF", name: "GBP / CHF", category: "FOREX", rate: 1.1442 },
  { code: "GBPAUD", name: "GBP / AUD", category: "FOREX", rate: 1.9572 },
  { code: "GBPCAD", name: "GBP / CAD", category: "FOREX", rate: 1.7612 },
  { code: "GBPNZD", name: "GBP / NZD", category: "FOREX", rate: 2.1272 },
  { code: "AUDJPY", name: "AUD / JPY", category: "FOREX", rate: 100.14 },
  { code: "AUDCAD", name: "AUD / CAD", category: "FOREX", rate: 0.9002 },
  { code: "AUDCHF", name: "AUD / CHF", category: "FOREX", rate: 0.5842 },
  { code: "AUDNZD", name: "AUD / NZD", category: "FOREX", rate: 1.0872 },
  { code: "CADJPY", name: "CAD / JPY", category: "FOREX", rate: 111.22 },
  { code: "CADCHF", name: "CAD / CHF", category: "FOREX", rate: 0.6492 },
  { code: "CHFJPY", name: "CHF / JPY", category: "FOREX", rate: 171.32 },
  { code: "NZDJPY", name: "NZD / JPY", category: "FOREX", rate: 92.14 },
  { code: "NZDCAD", name: "NZD / CAD", category: "FOREX", rate: 0.8282 },
  { code: "NZDCHF", name: "NZD / CHF", category: "FOREX", rate: 0.5372 },
  // FOREX exotics (OTC favourites)
  { code: "USDINR", name: "USD / INR", category: "FOREX", rate: 86.84 },
  { code: "USDPKR", name: "USD / PKR", category: "FOREX", rate: 282.45 },
  { code: "USDBDT", name: "USD / BDT", category: "FOREX", rate: 121.35 },
  { code: "USDBRL", name: "USD / BRL", category: "FOREX", rate: 5.684 },
  { code: "USDIDR", name: "USD / IDR", category: "FOREX", rate: 16180 },
  { code: "USDEGP", name: "USD / EGP", category: "FOREX", rate: 48.72 },
  { code: "USDTRY", name: "USD / TRY", category: "FOREX", rate: 34.86 },
  { code: "USDZAR", name: "USD / ZAR", category: "FOREX", rate: 18.24 },
  { code: "USDMXN", name: "USD / MXN", category: "FOREX", rate: 17.42 },
  { code: "USDPHP", name: "USD / PHP", category: "FOREX", rate: 57.32 },
  { code: "USDNGN", name: "USD / NGN", category: "FOREX", rate: 1542.6 },
  { code: "USDCOP", name: "USD / COP", category: "FOREX", rate: 4120.5 },
  { code: "USDARS", name: "USD / ARS", category: "FOREX", rate: 985.4 },
  { code: "USDVND", name: "USD / VND", category: "FOREX", rate: 25320 },
  { code: "USDTHB", name: "USD / THB", category: "FOREX", rate: 34.12 },
  { code: "USDMYR", name: "USD / MYR", category: "FOREX", rate: 4.512 },
  { code: "USDSGD", name: "USD / SGD", category: "FOREX", rate: 1.3412 },
  { code: "USDHKD", name: "USD / HKD", category: "FOREX", rate: 7.812 },
  { code: "USDCNH", name: "USD / CNH", category: "FOREX", rate: 7.242 },
  { code: "USDRUB", name: "USD / RUB", category: "FOREX", rate: 92.45 },
  { code: "USDUAH", name: "USD / UAH", category: "FOREX", rate: 41.32 },
  { code: "USDCLP", name: "USD / CLP", category: "FOREX", rate: 942.3 },
  { code: "USDPEN", name: "USD / PEN", category: "FOREX", rate: 3.742 },
  { code: "USDDZD", name: "USD / DZD", category: "FOREX", rate: 134.2 },
  { code: "USDMAD", name: "USD / MAD", category: "FOREX", rate: 9.912 },
  { code: "USDJOD", name: "USD / JOD", category: "FOREX", rate: 0.709 },
  { code: "USDSAR", name: "USD / SAR", category: "FOREX", rate: 3.752 },
  { code: "USDAED", name: "USD / AED", category: "FOREX", rate: 3.673 },
  { code: "USDKES", name: "USD / KES", category: "FOREX", rate: 129.4 },
  { code: "USDGHS", name: "USD / GHS", category: "FOREX", rate: 15.42 },
  { code: "USDTZS", name: "USD / TZS", category: "FOREX", rate: 2712.0 },
  { code: "USDBND", name: "USD / BND", category: "FOREX", rate: 1.342 },
  { code: "USDLKR", name: "USD / LKR", category: "FOREX", rate: 292.4 },
  { code: "USDNPR", name: "USD / NPR", category: "FOREX", rate: 138.9 },
  { code: "EURTRY", name: "EUR / TRY", category: "FOREX", rate: 37.92 },
  { code: "EURSGD", name: "EUR / SGD", category: "FOREX", rate: 1.4582 },
  { code: "EURHUF", name: "EUR / HUF", category: "FOREX", rate: 392.4 },
  { code: "EURPLN", name: "EUR / PLN", category: "FOREX", rate: 4.312 },
  { code: "EURNOK", name: "EUR / NOK", category: "FOREX", rate: 11.62 },
  { code: "EURSEK", name: "EUR / SEK", category: "FOREX", rate: 11.42 },
  { code: "EURZAR", name: "EUR / ZAR", category: "FOREX", rate: 19.84 },
  { code: "GBPINR", name: "GBP / INR", category: "FOREX", rate: 112.4 },
  { code: "AUDSGD", name: "AUD / SGD", category: "FOREX", rate: 0.8872 },
  { code: "CHFNOK", name: "CHF / NOK", category: "FOREX", rate: 13.14 },
  // CRYPTO
  { code: "BTCUSD", name: "Bitcoin / USD", category: "CRYPTO", rate: 94210.5 },
  { code: "ETHUSD", name: "Ethereum / USD", category: "CRYPTO", rate: 3284.2 },
  { code: "BNBUSD", name: "BNB / USD", category: "CRYPTO", rate: 712.4 },
  { code: "SOLUSD", name: "Solana / USD", category: "CRYPTO", rate: 214.6 },
  { code: "XRPUSD", name: "XRP / USD", category: "CRYPTO", rate: 2.42 },
  { code: "ADAUSD", name: "Cardano / USD", category: "CRYPTO", rate: 1.04 },
  { code: "DOGEUSD", name: "Dogecoin / USD", category: "CRYPTO", rate: 0.382 },
  { code: "TONUSD", name: "Toncoin / USD", category: "CRYPTO", rate: 5.42 },
  { code: "TRXUSD", name: "TRON / USD", category: "CRYPTO", rate: 0.242 },
  { code: "AVAXUSD", name: "Avalanche / USD", category: "CRYPTO", rate: 42.3 },
  { code: "DOTUSD", name: "Polkadot / USD", category: "CRYPTO", rate: 8.14 },
  { code: "LINKUSD", name: "Chainlink / USD", category: "CRYPTO", rate: 24.6 },
  { code: "MATICUSD", name: "Polygon / USD", category: "CRYPTO", rate: 0.612 },
  { code: "LTCUSD", name: "Litecoin / USD", category: "CRYPTO", rate: 132.4 },
  { code: "BCHUSD", name: "Bitcoin Cash / USD", category: "CRYPTO", rate: 462.8 },
  { code: "SHIBUSD", name: "Shiba Inu / USD", category: "CRYPTO", rate: 0.0000242 },
  { code: "PEPEUSD", name: "Pepe / USD", category: "CRYPTO", rate: 0.0000182 },
  { code: "ATOMUSD", name: "Cosmos / USD", category: "CRYPTO", rate: 9.42 },
  { code: "NEARUSD", name: "NEAR / USD", category: "CRYPTO", rate: 6.12 },
  { code: "APTUSD", name: "Aptos / USD", category: "CRYPTO", rate: 11.8 },
  // METALS & COMMODITIES
  { code: "XAUUSD", name: "Gold / USD", category: "METALS", rate: 2648.4 },
  { code: "XAGUSD", name: "Silver / USD", category: "METALS", rate: 31.24 },
  { code: "XPTUSD", name: "Platinum / USD", category: "METALS", rate: 982.4 },
  { code: "XPDUSD", name: "Palladium / USD", category: "METALS", rate: 1024.6 },
  { code: "COPPER", name: "Copper Spot", category: "METALS", rate: 4.312 },
  { code: "UKBRENT", name: "Brent Crude Oil", category: "OTHER", rate: 74.62 },
  { code: "USCRUDE", name: "WTI Crude Oil", category: "OTHER", rate: 70.84 },
  { code: "NATGAS", name: "Natural Gas", category: "OTHER", rate: 3.142 },
  // INDICES & STOCKS
  { code: "US100", name: "Nasdaq 100 Index", category: "OTHER", rate: 21240.5 },
  { code: "US30", name: "Dow Jones 30", category: "OTHER", rate: 44120.2 },
  { code: "US500", name: "S&P 500 Index", category: "OTHER", rate: 6042.4 },
  { code: "GER40", name: "Germany 40 (DAX)", category: "OTHER", rate: 20142.6 },
  { code: "UK100", name: "FTSE 100 Index", category: "OTHER", rate: 8242.4 },
  { code: "JPN225", name: "Nikkei 225", category: "OTHER", rate: 39420.8 },
  { code: "AUS200", name: "ASX 200 Index", category: "OTHER", rate: 8342.2 },
  { code: "HK50", name: "Hang Seng 50", category: "OTHER", rate: 19842.4 },
  { code: "AAPL", name: "Apple Inc.", category: "OTHER", rate: 232.4 },
  { code: "TSLA", name: "Tesla Inc.", category: "OTHER", rate: 412.6 },
  { code: "AMZN", name: "Amazon.com", category: "OTHER", rate: 224.2 },
  { code: "MSFT", name: "Microsoft Corp.", category: "OTHER", rate: 438.4 },
  { code: "GOOGL", name: "Alphabet Inc.", category: "OTHER", rate: 192.4 },
  { code: "META", name: "Meta Platforms", category: "OTHER", rate: 612.8 },
  { code: "NVDA", name: "NVIDIA Corp.", category: "OTHER", rate: 142.6 },
  { code: "NFLX", name: "Netflix Inc.", category: "OTHER", rate: 902.4 },
  { code: "INTC", name: "Intel Corp.", category: "OTHER", rate: 21.4 },
  { code: "BABA", name: "Alibaba Group", category: "OTHER", rate: 88.6 },
];

const trends = ["BULLISH", "BEARISH", "NEUTRAL"] as const;
const vols = ["LOW", "NORMAL", "HIGH", "EXTREME"] as const;
const avail = ["HOT", "READY", "VOLATILE", "SCANNING"] as const;

// Deterministic pseudo-random so the terminal stays stable between renders
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function build(seed: Seed, market: "OTC" | "LIVE"): TradingPair {
  const h = hash(seed.code + market);
  const isCrypto = seed.category === "CRYPTO";
  return {
    id: `${seed.code.toLowerCase()}-${market.toLowerCase()}`,
    name: `${seed.name}${market === "OTC" ? " (OTC)" : ""}`,
    symbol: market === "OTC" ? `${seed.code}_OTC` : seed.code,
    category: seed.category,
    marketType: market,
    payout: market === "OTC" ? 86 + (h % 9) : 76 + (h % 9),
    trend: trends[h % 3]!,
    volatility: vols[h % 4]!,
    signalAvailability: avail[h % 4]!,
    rate: seed.rate,
    change24h: Number((((h % 400) - 200) / (isCrypto ? 40 : 200)).toFixed(2)),
  };
}

const GENERATED: TradingPair[] = SEEDS.flatMap((s) => [build(s, "OTC"), build(s, "LIVE")]);

const seen = new Set(INITIAL_PAIRS.map((p) => p.id));
export const ALL_PAIRS: TradingPair[] = [
  ...INITIAL_PAIRS,
  ...GENERATED.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  }),
];
