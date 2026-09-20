export type MarketType = "OTC" | "LIVE";

export type PairCategory = "FOREX" | "CRYPTO" | "METALS" | "OTHER";

export type TimeFrame = "5 SEC" | "10 SEC" | "15 SEC" | "30 SEC" | "1 MIN" | "5 MIN" | "15 MIN";

export type Direction = "CALL" | "PUT";

export type SignalStatus = "ACTIVE" | "PENDING" | "WIN" | "LOSS" | "EXPIRED" | "UNVERIFIED" | "INSUFFICIENT_DATA";

export interface TradingPair {
  id: string;
  name: string;
  symbol: string;
  category: PairCategory;
  marketType: MarketType;
  payout: number; // e.g. 92%
  trend: "BULLISH" | "BEARISH" | "NEUTRAL";
  volatility: "LOW" | "NORMAL" | "HIGH" | "EXTREME";
  signalAvailability: "HOT" | "READY" | "VOLATILE" | "SCANNING";
  rate: number;
  change24h: number;
  isFavorite?: boolean;
}

export interface IndicatorMetrics {
  rsi14: number;
  emaTrend: "BULLISH" | "BEARISH" | "NEUTRAL";
  macdHistogram: "POSITIVE" | "NEGATIVE" | "CROSSING";
  supportLevel: number;
  resistanceLevel: number;
  candlestickPattern: string;
  volatilityIndex: number;
}

export interface GeneratedSignal {
  id: string;
  pair: string;
  market: MarketType;
  timeframe: TimeFrame;
  direction: Direction;
  expirySeconds: number;
  generatedAt: string;
  confidenceScore: number;
  status: SignalStatus;
  strategy: string;
  entryPrice: number;
  indicators: IndicatorMetrics;
  logSteps: string[];
}

export interface SignalHistoryItem {
  id: string;
  pair: string;
  market: MarketType;
  timeframe: TimeFrame;
  direction: Direction;
  status: "WIN" | "LOSS" | "PENDING" | "EXPIRED" | "UNVERIFIED";
  timestamp: string;
  entryPrice: number;
  payoutPercent: number;
  confidence: number;
  profitEstimate?: number;
}

export interface TradingStrategy {
  id: string;
  name: string;
  tag: string;
  summary: string;
  overview: string;
  entryConditionsCall: string[];
  entryConditionsPut: string[];
  confirmationRules: string[];
  riskNotes: string;
  exampleScenario: string;
  winRateObserved: string;
}

export interface UserSession {
  username: string;
  role: string;
  tier: string;
  key: string;
  expiryDate: string;
  sessionStarted: string;
  rememberSession: boolean;
}

export interface AppSettings {
  soundEnabled: boolean;
  animationMode: "cinematic" | "optimized";
  themeIntensity: "cyber-emerald" | "deep-onyx" | "neon-matrix";
  timezone: string;
  compactMode: boolean;
  notificationAlert: boolean;
}

export type AppNavView = 
  | "home"
  | "signals"
  | "market"
  | "strategies"
  | "history"
  | "statistics"
  | "profile"
  | "settings";
