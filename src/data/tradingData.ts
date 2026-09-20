import { TradingPair, TradingStrategy, SignalHistoryItem } from "../types";

export const INITIAL_PAIRS: TradingPair[] = [
  // OTC Binary Pairs (Quotex / PocketOption / OlympTrade)
  {
    id: "usdinr-otc",
    name: "USD / INR (OTC)",
    symbol: "USDINR_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 94,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 86.842,
    change24h: 0.65,
    isFavorite: true
  },
  {
    id: "usdpkr-otc",
    name: "USD / PKR (OTC)",
    symbol: "USDPKR_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 93,
    trend: "BEARISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 282.450,
    change24h: -0.48,
    isFavorite: true
  },
  {
    id: "usdbrl-otc",
    name: "USD / BRL (OTC)",
    symbol: "USDBRL_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 92,
    trend: "BULLISH",
    volatility: "NORMAL",
    signalAvailability: "HOT",
    rate: 5.684,
    change24h: 0.72,
    isFavorite: true
  },
  {
    id: "usdbdt-otc",
    name: "USD / BDT (OTC)",
    symbol: "USDBDT_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 91,
    trend: "BULLISH",
    volatility: "NORMAL",
    signalAvailability: "HOT",
    rate: 121.350,
    change24h: 0.38
  },
  {
    id: "usdidr-otc",
    name: "USD / IDR (OTC)",
    symbol: "USDIDR_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 90,
    trend: "BEARISH",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 16180.00,
    change24h: -0.22
  },
  {
    id: "usdegp-otc",
    name: "USD / EGP (OTC)",
    symbol: "USDEGP_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 91,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 48.720,
    change24h: 0.54
  },
  {
    id: "usdtry-otc",
    name: "USD / TRY (OTC)",
    symbol: "USDTRY_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 89,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "READY",
    rate: 34.860,
    change24h: 0.85
  },
  {
    id: "usdzar-otc",
    name: "USD / ZAR (OTC)",
    symbol: "USDZAR_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 88,
    trend: "BEARISH",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 18.240,
    change24h: -0.31
  },
  {
    id: "eurusd-otc",
    name: "EUR / USD (OTC)",
    symbol: "EURUSD_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 93,
    trend: "BULLISH",
    volatility: "NORMAL",
    signalAvailability: "HOT",
    rate: 1.08742,
    change24h: 0.42,
    isFavorite: true
  },
  {
    id: "gbpusd-otc",
    name: "GBP / USD (OTC)",
    symbol: "GBPUSD_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 92,
    trend: "BEARISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 1.29415,
    change24h: -0.38,
    isFavorite: true
  },
  {
    id: "usdjpy-otc",
    name: "USD / JPY (OTC)",
    symbol: "USDJPY_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 90,
    trend: "BULLISH",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 154.280,
    change24h: 0.65,
    isFavorite: true
  },
  {
    id: "audcad-otc",
    name: "AUD / CAD (OTC)",
    symbol: "AUDCAD_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 89,
    trend: "NEUTRAL",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 0.90145,
    change24h: 0.05
  },
  {
    id: "eurjpy-otc",
    name: "EUR / JPY (OTC)",
    symbol: "EURJPY_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 91,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 167.740,
    change24h: 1.12,
    isFavorite: true
  },
  {
    id: "gbpjpy-otc",
    name: "GBP / JPY (OTC)",
    symbol: "GBPJPY_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 92,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 196.850,
    change24h: 0.95
  },
  {
    id: "audusd-otc",
    name: "AUD / USD (OTC)",
    symbol: "AUDUSD_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 88,
    trend: "BEARISH",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 0.66820,
    change24h: -0.25
  },
  {
    id: "nzdusd-otc",
    name: "NZD / USD (OTC)",
    symbol: "NZDUSD_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 87,
    trend: "NEUTRAL",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 0.60410,
    change24h: 0.12
  },
  {
    id: "usdcad-otc",
    name: "USD / CAD (OTC)",
    symbol: "USDCAD_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 88,
    trend: "BEARISH",
    volatility: "LOW",
    signalAvailability: "READY",
    rate: 1.36210,
    change24h: -0.19
  },
  {
    id: "usdchf-otc",
    name: "USD / CHF (OTC)",
    symbol: "USDCHF_OTC",
    category: "FOREX",
    marketType: "OTC",
    payout: 87,
    trend: "BULLISH",
    volatility: "LOW",
    signalAvailability: "READY",
    rate: 0.89320,
    change24h: 0.15
  },

  // OTC Crypto Pairs
  {
    id: "btcusd-otc",
    name: "BTC / USD (OTC)",
    symbol: "BTCUSD_OTC",
    category: "CRYPTO",
    marketType: "OTC",
    payout: 94,
    trend: "BULLISH",
    volatility: "EXTREME",
    signalAvailability: "HOT",
    rate: 68420.50,
    change24h: 3.45,
    isFavorite: true
  },
  {
    id: "ethusd-otc",
    name: "ETH / USD (OTC)",
    symbol: "ETHUSD_OTC",
    category: "CRYPTO",
    marketType: "OTC",
    payout: 91,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 3512.80,
    change24h: 2.80
  },

  // OTC Metals & Commodities
  {
    id: "xauusd-otc",
    name: "XAU / USD (Gold OTC)",
    symbol: "XAUUSD_OTC",
    category: "METALS",
    marketType: "OTC",
    payout: 93,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 2684.90,
    change24h: 0.88,
    isFavorite: true
  },
  {
    id: "xagusd-otc",
    name: "XAG / USD (Silver OTC)",
    symbol: "XAGUSD_OTC",
    category: "METALS",
    marketType: "OTC",
    payout: 88,
    trend: "NEUTRAL",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 31.84,
    change24h: 0.12
  },

  // LIVE Market Forex Pairs (Standard Real Market Feed)
  {
    id: "eurusd-live",
    name: "EUR / USD",
    symbol: "EURUSD",
    category: "FOREX",
    marketType: "LIVE",
    payout: 85,
    trend: "BULLISH",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 1.08735,
    change24h: 0.35,
    isFavorite: true
  },
  {
    id: "gbpusd-live",
    name: "GBP / USD",
    symbol: "GBPUSD",
    category: "FOREX",
    marketType: "LIVE",
    payout: 85,
    trend: "BEARISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 1.29402,
    change24h: -0.42,
    isFavorite: true
  },
  {
    id: "usdjpy-live",
    name: "USD / JPY",
    symbol: "USDJPY",
    category: "FOREX",
    marketType: "LIVE",
    payout: 84,
    trend: "BULLISH",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 154.265,
    change24h: 0.58,
    isFavorite: true
  },
  {
    id: "audusd-live",
    name: "AUD / USD",
    symbol: "AUDUSD",
    category: "FOREX",
    marketType: "LIVE",
    payout: 82,
    trend: "BEARISH",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 0.66780,
    change24h: -0.28
  },
  {
    id: "usdcad-live",
    name: "USD / CAD",
    symbol: "USDCAD",
    category: "FOREX",
    marketType: "LIVE",
    payout: 83,
    trend: "BEARISH",
    volatility: "LOW",
    signalAvailability: "READY",
    rate: 1.36190,
    change24h: -0.21
  },
  {
    id: "usdchf-live",
    name: "USD / CHF",
    symbol: "USDCHF",
    category: "FOREX",
    marketType: "LIVE",
    payout: 82,
    trend: "BULLISH",
    volatility: "LOW",
    signalAvailability: "READY",
    rate: 0.89310,
    change24h: 0.14
  },
  {
    id: "nzdusd-live",
    name: "NZD / USD",
    symbol: "NZDUSD",
    category: "FOREX",
    marketType: "LIVE",
    payout: 81,
    trend: "NEUTRAL",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 0.60390,
    change24h: 0.08
  },
  {
    id: "eurgbp-live",
    name: "EUR / GBP",
    symbol: "EURGBP",
    category: "FOREX",
    marketType: "LIVE",
    payout: 83,
    trend: "BULLISH",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 0.84025,
    change24h: 0.18
  },
  {
    id: "eurjpy-live",
    name: "EUR / JPY",
    symbol: "EURJPY",
    category: "FOREX",
    marketType: "LIVE",
    payout: 84,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 167.710,
    change24h: 1.05
  },
  {
    id: "gbpjpy-live",
    name: "GBP / JPY",
    symbol: "GBPJPY",
    category: "FOREX",
    marketType: "LIVE",
    payout: 85,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 196.810,
    change24h: 0.89
  },
  {
    id: "audjpy-live",
    name: "AUD / JPY",
    symbol: "AUDJPY",
    category: "FOREX",
    marketType: "LIVE",
    payout: 82,
    trend: "BULLISH",
    volatility: "NORMAL",
    signalAvailability: "READY",
    rate: 103.020,
    change24h: 0.45
  },
  {
    id: "btcusd-live",
    name: "BTC / USD (Crypto Spot)",
    symbol: "BTCUSD",
    category: "CRYPTO",
    marketType: "LIVE",
    payout: 86,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 68410.00,
    change24h: 3.20,
    isFavorite: true
  },
  {
    id: "xauusd-live",
    name: "GOLD (Spot)",
    symbol: "XAUUSD",
    category: "METALS",
    marketType: "LIVE",
    payout: 85,
    trend: "BULLISH",
    volatility: "HIGH",
    signalAvailability: "HOT",
    rate: 2684.50,
    change24h: 0.82,
    isFavorite: true
  }
];

export const TRADING_STRATEGIES: TradingStrategy[] = [
  {
    id: "strat-price-action",
    name: "PRICE ACTION",
    tag: "PURE STRUCTURE",
    summary: "Clean candlestick interaction with historical levels and impulse rejection wicks.",
    overview: "Price Action relies exclusively on raw candlestick behaviour without lagging mathematical indicators. Focuses on exhaustion wicks, swing highs/lows, and dynamic channel boundaries.",
    entryConditionsCall: [
      "Rejection pinbar candle off strong horizontal support",
      "Bullish engulfing candle closing above prior 2 candle highs",
      "Higher swing low formed on M1/M5 structure"
    ],
    entryConditionsPut: [
      "Long upper shadow rejection candle kissing key resistance",
      "Bearish engulfing candle with full body conviction",
      "Lower swing high printing after failed bullish test"
    ],
    confirmationRules: [
      "Wait for current candle to close before triggering entry",
      "Ensure rejection wick is at least 2.5x larger than candle body",
      "Avoid trading during major high-impact macroeconomic news releases"
    ],
    riskNotes: "High probability during trending and consolidating markets. False breaks occur during sudden spread widenings.",
    exampleScenario: "EUR/USD tests 1.08500 support level, creates a 5-sec wick downwards and closes green with an engulfing body. Trigger CALL for 1 Min expiry.",
    winRateObserved: "88.4% (Observed Demo Confluence)"
  },
  {
    id: "strat-ema-trend",
    name: "EMA TREND",
    tag: "DYNAMIC CONFLUENCE",
    summary: "Exponential Moving Average dynamic confluence using EMA 9 and EMA 21 crossover cycles.",
    overview: "This strategy utilizes fast exponential moving averages to catch high-momentum trend continuations immediately following dynamic pullbacks.",
    entryConditionsCall: [
      "EMA 9 crosses upward over EMA 21 with positive angle",
      "Price pulls back to test EMA 9/21 zone and bounces with bullish wick",
      "Both moving averages are ascending above the benchmark 200 EMA"
    ],
    entryConditionsPut: [
      "EMA 9 crosses downward below EMA 21",
      "Price retraces up to kiss EMA 9 and exhibits downward rejection",
      "Slope of both EMAs is steep and facing south"
    ],
    confirmationRules: [
      "Only trade in the direction of the macro EMA slope",
      "Skip entries if EMAs are tangled horizontally in tight range"
    ],
    riskNotes: "Susceptible to whipsaws in flat ranging conditions. Best utilized during London/New York session overlap.",
    exampleScenario: "GBP/USD M1 shows EMA 9 curling above EMA 21, price touches 1.29380 dynamic band and prints a green hammer. Trigger CALL.",
    winRateObserved: "86.1% (Observed Demo Confluence)"
  },
  {
    id: "strat-rsi-momentum",
    name: "RSI MOMENTUM",
    tag: "OSCILLATOR REVERSAL",
    summary: "Relative Strength Index (14) extreme boundary re-entries combined with divergence filters.",
    overview: "Detects overbought (>70) and oversold (<30) market conditions. Rather than entering when RSI touches the extreme, it enters when RSI crosses back into the neutral zone with confirmed momentum.",
    entryConditionsCall: [
      "RSI dipped below 30 and sharply crosses back above 30-35",
      "Bullish divergence: Lower low on price while RSI prints a higher low",
      "Bullish confirmation candle closed in direction of signal"
    ],
    entryConditionsPut: [
      "RSI spiked above 70 and curls back down below 70",
      "Bearish divergence: Higher high on price while RSI prints a lower high",
      "Bearish rejection candle closed downward"
    ],
    confirmationRules: [
      "Filter out RSI signals when Bollinger Bands are expanding aggressively",
      "Wait for the crossing candle to close fully before binary execution"
    ],
    riskNotes: "Strong runaway trends can keep RSI pinned in extreme territory for prolonged durations.",
    exampleScenario: "XAU/USD OTC hits RSI 18 on sudden spike down, then curls up to 32 while forming a green candle. Trigger CALL for 30s/1m.",
    winRateObserved: "89.2% (Observed Demo Confluence)"
  },
  {
    id: "strat-macd-confluence",
    name: "MACD",
    tag: "HISTOGRAM MOMENTUM",
    summary: "Moving Average Convergence Divergence baseline crossing and histogram expansion.",
    overview: "Combines trend direction with momentum strength. High-volume binary signals are generated when histogram bars flip color and expand in direction of trend.",
    entryConditionsCall: [
      "MACD line crosses above Signal line below the zero axis",
      "Histogram shifts from dark red to bright green",
      "Price establishes firm close above local pivot point"
    ],
    entryConditionsPut: [
      "MACD line crosses below Signal line above the zero axis",
      "Histogram shifts from green to intense crimson red",
      "Price breaks below micro support floor"
    ],
    confirmationRules: [
      "Signal is invalid if volume is declining across the last 3 candles",
      "Prefer trades where histogram momentum is visibly expanding"
    ],
    riskNotes: "Lagging indicator characteristics mean timing must be synced with entry candle close.",
    exampleScenario: "USD/JPY M1 displays MACD bullish cross under zero, histogram expands green. Trigger CALL for next candle expiry.",
    winRateObserved: "85.8% (Observed Demo Confluence)"
  },
  {
    id: "strat-support-resistance",
    name: "SUPPORT & RESISTANCE",
    tag: "KEY LEVELS",
    summary: "Institutional liquidity zones, round psychological numbers, and multi-touch bounce levels.",
    overview: "Exploits the reaction of binary participants at institutional round figures (.000, .500) and historical horizontal price memories where supply and demand are imbalanced.",
    entryConditionsCall: [
      "Price touches verified Support Level that has held at least 2 previous tests",
      "Exhaustion volume observed on approach",
      "Instant wick formation showing buyer absorption"
    ],
    entryConditionsPut: [
      "Price touches verified Resistance ceiling with 2+ historical rejections",
      "Decreasing candle bodies showing buyer fatigue",
      "Upper wick showing seller dominance"
    ],
    confirmationRules: [
      "Level must be visible on M5 or M15 timeframe for higher confluence",
      "Do not enter on 4th or 5th consecutive test as breakout risk surges"
    ],
    riskNotes: "Breakouts invalidate binary reversals instantly; maintain strict stop discipline.",
    exampleScenario: "EUR/USD hits psychological 1.09000 triple zero resistance, wicks 12 pips back down. Trigger PUT for 1 Min expiry.",
    winRateObserved: "90.1% (Observed Demo Confluence)"
  },
  {
    id: "strat-candlestick-patterns",
    name: "CANDLESTICK PATTERNS",
    tag: "ANATOMY SCANNER",
    summary: "High-probability binary formations: Pinbars, Engulfing, Morning/Evening Stars, Marubozu.",
    overview: "Analyzes the ratio of upper wick, body, and lower wick to identify exact shifting power dynamics between bulls and bears inside single or double candle windows.",
    entryConditionsCall: [
      "Dragonfly Doji or Hammer at base of minor correction",
      "Bullish Morning Star 3-candle sequence",
      "Piercing line pattern piercing > 50% into prior red candle body"
    ],
    entryConditionsPut: [
      "Shooting Star or Gravestone Doji at peak of push",
      "Bearish Evening Star 3-candle sequence",
      "Dark Cloud Cover piercing > 50% into prior green candle body"
    ],
    confirmationRules: [
      "Volume on confirmation candle must exceed prior candle volume",
      "Execution must take place at the exact open of the next candle"
    ],
    riskNotes: "Small dojis in the middle of trading channels carry low signal reliability.",
    exampleScenario: "BTC/USD OTC forms an elongated hammer candle with a 75% lower wick. Trigger CALL immediately on open of the new candle.",
    winRateObserved: "87.9% (Observed Demo Confluence)"
  },
  {
    id: "strat-market-structure",
    name: "MARKET STRUCTURE",
    tag: "BOS & CHOCH",
    summary: "Break of Structure (BOS) and Change of Character (CHoCH) institutional liquidity mapping.",
    overview: "Maps higher highs, higher lows, lower lows, and lower highs. Identifies when smart money transitions market control from supply to demand or vice-versa.",
    entryConditionsCall: [
      "CHoCH confirmed: Price breaks above the most recent lower high",
      "Order Block mitigation with bullish reaction wick",
      "Liquidity swept below prior session low"
    ],
    entryConditionsPut: [
      "CHoCH confirmed: Price breaks below the most recent higher low",
      "Bearish order block retest with rejection",
      "Liquidity swept above prior session high"
    ],
    confirmationRules: [
      "Requires high timeframe alignment (M5 structure confirming M1 entry)",
      "Look for energetic displacement candle leaving fair value gaps"
    ],
    riskNotes: "Complex market environments require patience; avoids noise in choppy consolidation.",
    exampleScenario: "AUD/CAD prints a clean CHoCH on M1 by breaking 0.90180 swing high, retests mitigation block. Trigger CALL.",
    winRateObserved: "91.3% (Observed Demo Confluence)"
  },
  {
    id: "strat-breakout",
    name: "BREAKOUT",
    tag: "VOLATILITY EXPANSION",
    summary: "Compression squeeze breakout following tight Bollinger Band consolidation or triangles.",
    overview: "When market volatility contracts to extreme lows, explosive expansions follow. This model triggers binary signals in the direction of high-velocity range breaks.",
    entryConditionsCall: [
      "Full body candle closes decisively outside resistance boundary",
      "Bollinger Bands opening outwards like an alligator jaw",
      "Volume indicator shows 200%+ surge"
    ],
    entryConditionsPut: [
      "Full body candle closes decisively below support floor",
      "Bollinger Bands expanding downward",
      "Bearish volume surge confirms aggressive selling"
    ],
    confirmationRules: [
      "Never enter if candle leaves 50%+ rejection wick inside the broken channel",
      "Timeframe should be matched to at least 1-2 candle duration"
    ],
    riskNotes: "Beware of fakeouts (false breakouts) designed to trap retail momentum traders.",
    exampleScenario: "EUR/JPY ranges between 167.60-167.70 for 25 minutes, then prints a giant green candle closing at 167.75. Trigger CALL.",
    winRateObserved: "87.2% (Observed Demo Confluence)"
  },
  {
    id: "strat-reversal",
    name: "REVERSAL",
    tag: "EXHAUSTION TRAP",
    summary: "Climactic exhaustion volume followed by rapid rejection at extreme standard deviation bands.",
    overview: "Identifies overextended price moves that run out of gas. When binary price spikes aggressively into 3.0 Standard Deviation bands, mean reversion likelihood is elevated.",
    entryConditionsCall: [
      "3 or more consecutive large red candles with expanding volume",
      "Price pierces below lower Bollinger Band (3.0 SD)",
      "Immediate bottom wick appears on the current candle"
    ],
    entryConditionsPut: [
      "3 or more consecutive large green candles with explosive volume",
      "Price pierces above upper Bollinger Band (3.0 SD)",
      "Immediate rejection at ceiling"
    ],
    confirmationRules: [
      "Wait for candle close to confirm exhaustion wick",
      "Pairs with high payout (>90%) ensure maximum risk-reward profile"
    ],
    riskNotes: "Do not attempt reversals against strong fundamental news drivers.",
    exampleScenario: "GBP/USD OTC spikes vertically 25 pips in 15 seconds, wicks off top band and curls red. Trigger PUT for 30s/1m.",
    winRateObserved: "88.7% (Observed Demo Confluence)"
  },
  {
    id: "strat-momentum",
    name: "MOMENTUM",
    tag: "IMPULSE FLOW",
    summary: "High-speed impulse follow-through using multi-timeframe volume and stochastic velocity.",
    overview: "Designed for fast binary expiries (5s, 10s, 15s, 30s). Captures the second wave of directional impulse immediately following an algorithmic burst.",
    entryConditionsCall: [
      "Consecutive green candles with no upper wicks (bullish Marubozu)",
      "Stochastic %K and %D both angled vertically above 60",
      "Short term moving average accelerating upwards"
    ],
    entryConditionsPut: [
      "Consecutive red candles with no lower wicks (bearish Marubozu)",
      "Stochastic lines plunging steeply downwards",
      "Short term moving average accelerating south"
    ],
    confirmationRules: [
      "Execution must be instantaneous; ideal for quick-touch or turbo OTC expiries",
      "Verify spread is tight (< 0.5 pip) before taking turbo trades"
    ],
    riskNotes: "Fast timeframes exhibit higher noise; best applied during peak OTC volume hours.",
    exampleScenario: "BTC/USD OTC accelerates upward with three solid green bars. Trigger CALL for 15s turbo expiry.",
    winRateObserved: "86.9% (Observed Demo Confluence)"
  }
];

export const INITIAL_SIGNAL_HISTORY: SignalHistoryItem[] = [
  {
    id: "sig-101",
    pair: "EUR / USD (OTC)",
    market: "OTC",
    timeframe: "1 MIN",
    direction: "CALL",
    status: "WIN",
    timestamp: "2 mins ago",
    entryPrice: 1.08720,
    payoutPercent: 93,
    confidence: 94.2,
    profitEstimate: 93
  },
  {
    id: "sig-102",
    pair: "BTC / USD (OTC)",
    market: "OTC",
    timeframe: "30 SEC",
    direction: "CALL",
    status: "WIN",
    timestamp: "6 mins ago",
    entryPrice: 68390.00,
    payoutPercent: 94,
    confidence: 91.8,
    profitEstimate: 94
  },
  {
    id: "sig-103",
    pair: "GBP / USD (OTC)",
    market: "OTC",
    timeframe: "1 MIN",
    direction: "PUT",
    status: "WIN",
    timestamp: "11 mins ago",
    entryPrice: 1.29460,
    payoutPercent: 91,
    confidence: 89.5,
    profitEstimate: 91
  },
  {
    id: "sig-104",
    pair: "XAU / USD (Gold)",
    market: "OTC",
    timeframe: "15 SEC",
    direction: "PUT",
    status: "LOSS",
    timestamp: "18 mins ago",
    entryPrice: 2686.10,
    payoutPercent: 92,
    confidence: 82.4,
    profitEstimate: -100
  },
  {
    id: "sig-105",
    pair: "EUR / JPY (OTC)",
    market: "OTC",
    timeframe: "1 MIN",
    direction: "CALL",
    status: "WIN",
    timestamp: "24 mins ago",
    entryPrice: 167.680,
    payoutPercent: 92,
    confidence: 93.6,
    profitEstimate: 92
  },
  {
    id: "sig-106",
    pair: "USD / JPY (LIVE)",
    market: "LIVE",
    timeframe: "5 MIN",
    direction: "CALL",
    status: "WIN",
    timestamp: "35 mins ago",
    entryPrice: 154.210,
    payoutPercent: 83,
    confidence: 88.1,
    profitEstimate: 83
  }
];
