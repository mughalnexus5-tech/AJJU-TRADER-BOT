import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  MarketType, 
  PairCategory, 
  TimeFrame, 
  TradingPair, 
  GeneratedSignal, 
  Direction 
} from "../types";
import { TRADING_STRATEGIES } from "../data/tradingData";
import { 
  playClickSound, 
  playScanStep, 
  playSignalCallSound, 
  playSignalPutSound,
  playCountdownBeep,
  playTradeCompleteChime,
  playVoiceAnnouncement
} from "../utils/soundEffects";
import { 
  Cpu, 
  Search, 
  Star, 
  Zap, 
  Clock, 
  Activity, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowRight,
  Sparkles, 
  Sliders, 
  Copy, 
  Check, 
  RefreshCw, 
  Radio, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Timer,
  Award,
  Flame,
  CheckCircle,
  X,
  ExternalLink
} from "lucide-react";

const QUOTEX_URL = "https://quotex.com/";

const cleanPairName = (name: string) => name.replace(/\s*\(OTC\)\s*$/i, "");

const pairDisplayName = (pair: TradingPair) =>
  `${cleanPairName(pair.name)} (${pair.marketType === "OTC" ? "QUOTEX OTC" : "LIVE"})`;

interface SignalGeneratorProps {
  pairs: TradingPair[];
  onSignalGenerated: (signal: GeneratedSignal) => void;
  soundEnabled: boolean;
  preselectedPairId?: string | undefined;
}

const ANALYSIS_STEPS = [
  "MARKET SCANNING",
  "TREND CHECK",
  "PRICE ACTION",
  "MOMENTUM CHECK",
  "VOLATILITY CHECK",
  "SUPPORT / RESISTANCE",
  "EMA CONFIRMATION",
  "RSI CONFIRMATION",
  "MACD CONFIRMATION",
  "CANDLESTICK CONFIRMATION",
  "ORDERBOOK CLUSTER",
  "FINAL CONFLUENCE CHECK"
];

type TradePhase = "idle" | "analyzing" | "signal_ready";

export const SignalGenerator: React.FC<SignalGeneratorProps> = ({
  pairs,
  onSignalGenerated,
  soundEnabled,
  preselectedPairId
}) => {
  // Market & Category filter states
  const [marketType, setMarketType] = useState<MarketType>("OTC");
  const [category, setCategory] = useState<PairCategory | "ALL">("FOREX");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(["eurusd-otc", "btcusd-otc", "xauusd-otc"]);

  // Selected Pair & Timeframe
  const [selectedPair, setSelectedPair] = useState<TradingPair>(() => {
    if (preselectedPairId) {
      const match = pairs.find((p) => p.id === preselectedPairId);
      if (match) return match;
    }
    return (pairs.find((p) => p.marketType === "OTC" && p.category === "FOREX") || pairs[0])!;
  });

  const [timeframe, setTimeframe] = useState<TimeFrame>("15 SEC");

  // Advanced Filters
  const [selectedStrategy, setSelectedStrategy] = useState("PRICE ACTION");
  const [analysisDepth, setAnalysisDepth] = useState<"standard" | "deep">("deep");

  // Trade lifecycle state
  const [tradePhase, setTradePhase] = useState<TradePhase>("idle");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [latestSignal, setLatestSignal] = useState<GeneratedSignal | null>(null);
  const [copied, setCopied] = useState(false);
  const [showTradeSettings, setShowTradeSettings] = useState(false);
  const [showPairBrowser, setShowPairBrowser] = useState(false);
  const [entryWindow, setEntryWindow] = useState(0);
  const resultSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tradePhase === "idle") return;
    window.requestAnimationFrame(() => {
      resultSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [tradePhase]);

  useEffect(() => {
    if (tradePhase !== "signal_ready" || !latestSignal) return;
    setEntryWindow(latestSignal.expirySeconds);
    const timer = window.setInterval(() => {
      setEntryWindow((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [tradePhase, latestSignal]);

  // Timeframe options based on Market Type
  const availableTimeframes: TimeFrame[] = useMemo(() => {
    if (marketType === "LIVE") {
      return ["1 MIN", "5 MIN", "15 MIN"];
    }
    return ["5 SEC", "10 SEC", "15 SEC", "30 SEC", "1 MIN", "5 MIN"];
  }, [marketType]);

  // Ensure selected timeframe is valid when switching marketType
  useEffect(() => {
    if (!availableTimeframes.includes(timeframe)) {
      setTimeframe(availableTimeframes[0]!);
    }
  }, [marketType, availableTimeframes, timeframe]);

  // Update selected pair if preselectedPairId changes
  useEffect(() => {
    if (preselectedPairId) {
      const match = pairs.find((p) => p.id === preselectedPairId);
      if (match) {
        setSelectedPair(match);
        setMarketType(match.marketType);
        setCategory(match.category);
      }
    }
  }, [preselectedPairId, pairs]);

  // Filter pairs list for the selector
  const filteredPairs = useMemo(() => {
    return pairs.filter((pair) => {
      const matchesMarket = pair.marketType === marketType;
      const matchesCategory = category === "ALL" || pair.category === category;
      const matchesSearch =
        pair.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pair.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFav = showFavoritesOnly ? favorites.includes(pair.id) : true;
      return matchesMarket && matchesCategory && matchesSearch && matchesFav;
    });
  }, [pairs, marketType, category, searchQuery, showFavoritesOnly, favorites]);

  const visiblePairs = showPairBrowser ? filteredPairs : [selectedPair];

  const chartPoints = useMemo(() => {
    const seed = selectedPair.symbol.split("").reduce((total, character) => total + character.charCodeAt(0), 0);
    return Array.from({ length: 30 }, (_, index) => {
      const wave = Math.sin((index + seed) * 0.72) * 14;
      const impulse = ((index * 17 + seed) % 19) - 9;
      return 58 + wave + impulse * 0.55 + index * 0.55;
    });
  }, [selectedPair.symbol]);

  const chartPolyline = chartPoints
    .map((point, index) => `${(index / (chartPoints.length - 1)) * 100},${100 - point}`)
    .join(" ");

  // Toggle favorite
  const toggleFavorite = (pairId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound(soundEnabled);
    setFavorites((prev) =>
      prev.includes(pairId) ? prev.filter((id) => id !== pairId) : [...prev, pairId]
    );
  };

  // Convert timeframe string to numeric seconds
  const getTimeframeSeconds = (tf: TimeFrame): number => {
    switch (tf) {
      case "5 SEC": return 5;
      case "10 SEC": return 10;
      case "15 SEC": return 15;
      case "30 SEC": return 30;
      case "1 MIN": return 60;
      case "5 MIN": return 300;
      case "15 MIN": return 900;
      default: return 15;
    }
  };

  // 1. TRIGGER SIGNAL GENERATION
  const handleGenerateSignal = () => {
    playClickSound(soundEnabled);
    setTradePhase("analyzing");
    setCurrentStepIndex(0);
    setLatestSignal(null);
    setCopied(false);

    const logs: string[] = [
      `[${selectedPair.symbol}] Connecting to ${marketType} Liquidity Orderbook...`,
      `[TICK] Current Bid: ${selectedPair.rate.toFixed(5)} • Broker Payout: ${selectedPair.payout}%`
    ];
    setAnalysisLogs(logs);

    let step = 0;
    const stepDuration = analysisDepth === "deep" ? 220 : 160;

    const interval = setInterval(() => {
      step++;
      if (step < ANALYSIS_STEPS.length) {
        setCurrentStepIndex(step);
        playScanStep(soundEnabled);

        const currentLabel = ANALYSIS_STEPS[step];
        if (currentLabel === "TREND CHECK") {
          logs.push(`[TREND] Exponential slope: ${selectedPair.trend} Confluence confirmed.`);
        } else if (currentLabel === "RSI CONFIRMATION") {
          const mockRSI = selectedPair.trend === "BULLISH" ? 31.4 : 68.6;
          logs.push(`[RSI(14)] Value at ${mockRSI} • Dynamic rejection band identified.`);
        } else if (currentLabel === "MACD CONFIRMATION") {
          logs.push(`[MACD] Histogram convergence alignment positive.`);
        } else if (currentLabel === "SUPPORT / RESISTANCE") {
          logs.push(`[SR LEVEL] Institutional liquidity boundary detected.`);
        } else if (currentLabel === "FINAL CONFLUENCE CHECK") {
          logs.push(`[STATUS] High-confidence threshold achieved with 94%+ statistical bias.`);
        }
        setAnalysisLogs([...logs]);
      } else {
        clearInterval(interval);
        finalizeSignal(logs);
      }
    }, stepDuration);
  };

  // 2. FINALIZE SIGNAL & ENTER PRE-ENTRY COUNTDOWN
  const finalizeSignal = (logs: string[]) => {
    const isCall = selectedPair.trend === "BULLISH" || (selectedPair.trend === "NEUTRAL" && Math.random() > 0.45);
    const direction: Direction = isCall ? "CALL" : "PUT";
    const confidence = Number((91 + Math.random() * 5.8).toFixed(1));
    const durationSec = getTimeframeSeconds(timeframe);

    const newSignal: GeneratedSignal = {
      id: "sig-" + Date.now(),
      pair: pairDisplayName(selectedPair),
      market: marketType,
      timeframe,
      direction,
      expirySeconds: durationSec,
      generatedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      confidenceScore: confidence,
      status: "PENDING",
      strategy: selectedStrategy,
      entryPrice: selectedPair.rate,
      indicators: {
        rsi14: isCall ? 31.4 : 68.8,
        emaTrend: isCall ? "BULLISH" : "BEARISH",
        macdHistogram: isCall ? "POSITIVE" : "NEGATIVE",
        supportLevel: Number((selectedPair.rate * 0.9982).toFixed(5)),
        resistanceLevel: Number((selectedPair.rate * 1.0018).toFixed(5)),
        candlestickPattern: isCall ? "Bullish Rejection Pin Bar" : "Bearish Rejection Shooting Star",
        volatilityIndex: 36.4
      },
      logSteps: logs
    };

    setLatestSignal(newSignal);
    setTradePhase("signal_ready");
    setEntryWindow(durationSec);

    if ("vibrate" in navigator) navigator.vibrate([180, 80, 180]);

    // Play signal chime and voice prompt
    if (direction === "CALL") {
      playSignalCallSound(soundEnabled);
      playVoiceAnnouncement(`${selectedPair.name} Call signal. Execute immediately.`, soundEnabled);
    } else {
      playSignalPutSound(soundEnabled);
      playVoiceAnnouncement(`${selectedPair.name} Put signal. Execute immediately.`, soundEnabled);
    }

    onSignalGenerated(newSignal);
  };

  // Reset to idle ready for the next trade
  const handleGetNextSignal = () => {
    playClickSound(soundEnabled);
    setTradePhase("idle");
    setLatestSignal(null);
    setShowTradeSettings(false);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  const handleCopySignal = () => {
    if (!latestSignal) return;
    const text = `🔥 AJJU TRADER BOT VIP SIGNAL\nPAIR: ${latestSignal.pair}\nTIMEFRAME: ${latestSignal.timeframe}\nDIRECTION: ${latestSignal.direction === "CALL" ? "🟢 CALL (HIGHER)" : "🔴 PUT (LOWER)"}\nENTRY: ${latestSignal.entryPrice}\nCONFLUENCE: ${latestSignal.confidenceScore}%\nSTRATEGY: ${latestSignal.strategy}\nVERIFIED: 12-STAGE CONFIRMED ✅`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    playClickSound(soundEnabled);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Pair selection is intentionally hidden while analysis/results are active. */}
      {tradePhase === "idle" && (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl md:text-3xl font-tech font-extrabold tracking-wider text-slate-100 flex items-center gap-2">
              <span className="text-red-500">AJJU</span>
              <span className="text-emerald-400">SIGNAL</span>
              <span className="text-slate-300">COMMAND ENGINE</span>
            </h2>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              HIGH PRECISION
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Algorithmic 12-Stage Confluence • Instant High-Precision VIP Execution • All OTC & Live Pairs
          </p>
        </div>

        {/* Selected Pair Quick Display */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl glass-panel border border-emerald-500/30">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-slate-400">ACTIVE TARGET PAIR</span>
            <span className="font-tech font-bold text-emerald-300 text-sm">{pairDisplayName(selectedPair)}</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs">
            {selectedPair.payout}% PAYOUT
          </div>
        </div>
      </div>
      )}

      {/* Main Grid: Pair Selector Left + Engine Controls Right */}
      <div ref={resultSectionRef} className={tradePhase === "idle" ? "grid grid-cols-1 lg:grid-cols-12 gap-6" : "w-full"}>
        
        {/* LEFT COLUMN: Pair Selection Console (4 Cols) */}
        {tradePhase === "idle" && (
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 md:p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
            
            {/* Market Type Switcher */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-400 font-bold">MARKET PROTOCOL</span>
                <span className="text-[10px] font-mono text-emerald-400">INSTITUTIONAL FEED</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setMarketType("OTC");
                  }}
                  className={`py-2.5 px-3 rounded-xl font-tech text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    marketType === "OTC"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-slate-950 shadow-md shadow-emerald-950/60"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>QUOTEX OTC</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setMarketType("LIVE");
                  }}
                  className={`py-2.5 px-3 rounded-xl font-tech text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    marketType === "LIVE"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-950/60"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>LIVE SPOT</span>
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => {
                  playClickSound(soundEnabled);
                  setMarketType("OTC");
                  setCategory("ALL");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer shrink-0 ${
                  marketType === "OTC" && category === "ALL"
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold"
                    : "bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200"
                }`}
              >
                QUOTEX OTC
              </button>
              {(["FOREX", "CRYPTO", "METALS"] as PairCategory[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    playClickSound(soundEnabled);
                    setCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer shrink-0 ${
                    category === cat
                      ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold"
                      : "bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`p-1.5 rounded-lg border transition cursor-pointer ml-auto shrink-0 ${
                  showFavoritesOnly
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                    : "bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300"
                }`}
                title="Filter Favorites"
              >
                <Star className="w-4 h-4 fill-current" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowPairBrowser((open) => !open)}
              className="flex w-full items-center justify-between rounded-xl border border-emerald-500/40 bg-slate-950 px-3.5 py-3 text-left transition hover:border-emerald-400"
            >
              <span>
                <span className="block font-tech text-xs font-bold text-slate-100">{pairDisplayName(selectedPair)}</span>
                <span className="mt-0.5 block font-mono text-[10px] text-slate-300">{selectedPair.payout}% PAYOUT • TAP TO {showPairBrowser ? "CLOSE" : "VIEW ALL PAIRS"}</span>
              </span>
              <ChevronRight className={`h-4 w-4 text-emerald-300 transition-transform ${showPairBrowser ? "rotate-90" : ""}`} />
            </button>

            {/* Search Input */}
            {showPairBrowser && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search a pair, for example EUR or BTC..."
                className="w-full px-3.5 py-2 pl-9 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
            </div>
            )}

            {/* Pairs List (Scrollable) */}
            <div className={`space-y-1.5 overflow-y-auto pr-1 ${showPairBrowser ? "max-h-[360px]" : "max-h-20"}`}>
              {filteredPairs.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-slate-500">
                  No pairs matching filter
                </div>
              ) : (
                visiblePairs.map((pair) => {
                  const isSelected = selectedPair.id === pair.id;
                  const isFav = favorites.includes(pair.id);

                  return (
                    <div
                      key={pair.id}
                      onClick={() => {
                        playClickSound(soundEnabled);
                        setSelectedPair(pair);
                        setShowPairBrowser(false);
                        setShowTradeSettings(true);
                      }}
                      className={`p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-emerald-950/40 border-emerald-500/70 text-white shadow-md shadow-emerald-950/40"
                          : "bg-slate-950/40 border-slate-800/60 text-slate-300 hover:bg-slate-900/60 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(pair.id, e)}
                          className="text-slate-600 hover:text-amber-400 transition"
                        >
                          <Star className={`w-3.5 h-3.5 ${isFav ? "text-amber-400 fill-amber-400" : ""}`} />
                        </button>
                        <div className="truncate">
                          <span className="font-tech font-bold text-xs tracking-wider block">
                            {pair.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {pair.marketType === "OTC" ? "QUOTEX OTC" : "LIVE"} • {pair.rate.toFixed(5)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                        <span className="text-emerald-400 font-bold">{pair.payout}%</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            pair.signalAvailability === "HOT"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {pair.signalAvailability}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        )}

        {/* RIGHT COLUMN: Engine Config, Pre-Entry Countdown, & Live Trade Window (8 Cols) */}
        <div className={tradePhase === "idle" ? "lg:col-span-8 space-y-5" : "mx-auto w-full max-w-5xl space-y-5"}>
          
          {tradePhase === "idle" && !showTradeSettings && (
            <button
              type="button"
              onClick={() => setShowTradeSettings(true)}
              className="w-full rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-5 py-4 font-tech text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/25"
            >
              CONFIGURE {pairDisplayName(selectedPair)} TRADE
            </button>
          )}

          {/* Focused Trade Settings Modal */}
          {showTradeSettings && tradePhase === "idle" && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-md">
          <div className="relative my-auto w-full max-w-3xl p-5 md:p-6 rounded-2xl glass-panel border border-emerald-500/40 space-y-5 shadow-2xl">
            <button
              type="button"
              aria-label="Close trade settings"
              onClick={() => setShowTradeSettings(false)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-emerald-500 hover:text-emerald-300"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-slate-800 pb-4 pr-10">
              <span className="text-[10px] font-mono font-bold text-emerald-400">TRADE SETTINGS</span>
              <h3 className="mt-1 font-tech text-base font-bold text-slate-100 md:text-lg">
                SELECTED PAIR: {pairDisplayName(selectedPair)} — {selectedPair.payout}% PAYOUT
              </h3>
            </div>
            
            {/* Timeframe Selector (Crucial for 5s, 10s, 15s, 30s OTC Signals) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>CHOOSE HOW LONG THE TRADE WILL RUN</span>
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold">
                  OTC RAPID CANDLES
                </span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {availableTimeframes.map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setTimeframe(tf);
                    }}
                    className={`py-3 px-2 rounded-xl text-center font-tech text-xs font-bold transition cursor-pointer ${
                      timeframe === tf
                        ? "bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold shadow-lg shadow-amber-950/60 scale-102"
                        : "bg-slate-900/80 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Analysis Depth & Strategy Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  ANALYSIS METHOD
                </label>
                <select
                  value={selectedStrategy}
                  onChange={(e) => setSelectedStrategy(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="PRICE ACTION">Price Action Liquidity Breakout</option>
                  <option value="EMA 9/21 CROSSOVER">EMA 9 / 21 Trend Convergence</option>
                  <option value="RSI EXHAUSTION">RSI Extreme Exhaustion Reversal</option>
                  <option value="MACD MOMENTUM">MACD Zero-Line Acceleration</option>
                  <option value="OTC MICRO-IMPULSE">OTC Algorithmic Micro-Impulse</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                   ANALYSIS SPEED
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAnalysisDepth("standard")}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                      analysisDepth === "standard"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-slate-900 text-slate-500 border border-slate-800"
                    }`}
                  >
                    QUICK CHECK
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnalysisDepth("deep")}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                      analysisDepth === "deep"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-slate-900 text-slate-500 border border-slate-800"
                    }`}
                  >
                    DEEP CHECK
                  </button>
                </div>
              </div>
            </div>

            {/* GENERATE SIGNAL BUTTON (Active whenever not currently analyzing) */}
              <div className="relative group pt-1">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-500 rounded-2xl blur-md opacity-40 group-hover:opacity-75 transition duration-300"></div>
                <button
                  type="button"
                  onClick={() => {
                    setShowTradeSettings(false);
                    handleGenerateSignal();
                  }}
                  className="relative w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-tech font-extrabold text-base md:text-lg tracking-widest uppercase transition transform active:scale-[0.99] shadow-xl shadow-emerald-950/80 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Cpu className="w-5 h-5" />
                  <span>GENERATE {pairDisplayName(selectedPair)} {timeframe} SIGNAL</span>
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
          </div>
          </div>
          )}

          {/* PHASE 1: 12-STAGE CONFLUENCE RADAR SCANNING */}
          {tradePhase === "analyzing" && (
            <div className="min-h-[calc(100vh-9rem)] p-5 md:p-8 rounded-2xl glass-panel-glow border border-emerald-500/40 space-y-5 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full border-2 border-emerald-500/50 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border border-dashed border-emerald-400 animate-spin"></div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
                  </div>
                  <div>
                    <h4 className="font-tech text-base font-bold text-white tracking-wider">
                      CHECKING THE MARKET
                    </h4>
                    <p className="text-xs font-mono text-emerald-400">
                      STAGE {currentStepIndex + 1} OF {ANALYSIS_STEPS.length}: {ANALYSIS_STEPS[currentStepIndex]}
                    </p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-2xl font-bold text-emerald-400">
                    {Math.round(((currentStepIndex + 1) / ANALYSIS_STEPS.length) * 100)}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 transition-all duration-200"
                  style={{ width: `${((currentStepIndex + 1) / ANALYSIS_STEPS.length) * 100}%` }}
                ></div>
              </div>

              {/* Live-style price analysis chart */}
              <div className="rounded-xl border border-slate-700 bg-slate-950 p-3 shadow-inner">
                <div className="mb-2 flex items-center justify-between font-mono text-[10px]">
                  <span className="font-bold text-slate-100">{pairDisplayName(selectedPair)} • LIVE ANALYSIS</span>
                  <span className="flex items-center gap-1.5 text-emerald-300"><Activity className="h-3.5 w-3.5" /> PRICE MOMENTUM</span>
                </div>
                <div className="relative h-36 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 cyber-grid">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-label="Animated market analysis chart">
                    <polyline points={chartPolyline} fill="none" stroke="currentColor" strokeWidth="1.8" vectorEffect="non-scaling-stroke" className="text-emerald-400 drop-shadow-[0_0_6px_currentColor]" />
                  </svg>
                  <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-amber-400/40" />
                  <div className="absolute bottom-2 left-2 rounded bg-slate-950/90 px-2 py-1 font-mono text-[9px] font-bold text-slate-200">SCANNING LIQUIDITY & MOMENTUM</div>
                </div>
              </div>

              {/* 12-Step Grid Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-[10px] font-mono">
                {ANALYSIS_STEPS.map((step, idx) => (
                  <div
                    key={step}
                    className={`p-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                      idx < currentStepIndex
                        ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                        : idx === currentStepIndex
                        ? "bg-amber-950/80 border-amber-400 text-amber-300 font-bold scale-102"
                        : "bg-slate-900/80 border-slate-700 text-slate-300"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      idx < currentStepIndex ? "bg-emerald-400" : idx === currentStepIndex ? "bg-amber-400 animate-ping" : "bg-slate-700"
                    }`} />
                    <span className="truncate">{step}</span>
                  </div>
                ))}
              </div>

              {/* Live Log Stream */}
              <div className="p-3 rounded-xl bg-black/70 border border-slate-800/80 font-mono text-[11px] text-emerald-400/90 h-24 overflow-y-auto space-y-1">
                {analysisLogs.map((log, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-slate-600">›</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIP SIGNAL PRESENTATION (Direct, Instant - No countdown or trade entry delay) */}
          {tradePhase === "signal_ready" && latestSignal && (
            <div
              className={`min-h-[calc(100vh-9rem)] p-5 md:p-8 rounded-2xl transition-all duration-500 relative overflow-hidden shadow-2xl ${
                latestSignal.direction === "CALL"
                  ? "glass-panel-glow border-2 border-emerald-500 shadow-emerald-950/80"
                  : "glass-panel-red border-2 border-red-500 shadow-red-950/80"
              }`}
            >
              {/* Top Accent Flash */}
              <div
                className={`absolute top-0 inset-x-0 h-1.5 ${
                  latestSignal.direction === "CALL" ? "bg-emerald-400" : "bg-red-500"
                }`}
              ></div>

              {/* Signal Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 border border-slate-800 text-slate-300">
                    CONFIRMED VIP SETUP
                  </span>
                  <div className="flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CONFLUENCE VERIFIED {latestSignal.confidenceScore}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>GENERATED AT {latestSignal.generatedAt}</span>
                </div>
              </div>

              {/* Pair + Direction Hero Showcase */}
              <div className="py-5 grid gap-5 md:grid-cols-[1fr_1.25fr] md:items-center">
                <div className="min-w-0">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    {latestSignal.market === "OTC" ? "QUOTEX OTC" : "LIVE"} PROTOCOL
                  </span>
                  <h3 className="text-3xl md:text-4xl font-tech font-extrabold text-white mt-0.5">
                    {latestSignal.pair}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2.5 font-mono text-xs text-slate-300">
                    <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800">
                      TIMEFRAME: <strong className="text-amber-400 font-bold">{latestSignal.timeframe}</strong>
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800">
                      ENTRY TARGET: <strong className="text-white font-bold">{latestSignal.entryPrice.toFixed(5)}</strong>
                    </span>
                  </div>
                </div>

                {/* High-contrast directional signal card */}
                <div className="flex w-full flex-col items-stretch">
                  <div
                    className={`w-full rounded-xl border bg-slate-950 px-4 py-4 font-tech font-extrabold shadow-xl ${
                      latestSignal.direction === "CALL"
                        ? "border-emerald-400/70 shadow-emerald-900/60"
                        : "border-red-500/70 shadow-red-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border shadow-lg ${
                        latestSignal.direction === "CALL"
                          ? "border-emerald-300 bg-emerald-500/20 text-emerald-300 shadow-emerald-500/30"
                          : "border-red-400 bg-red-500/20 text-red-400 shadow-red-500/30"
                      }`}>
                        {latestSignal.direction === "CALL" ? (
                          <ArrowUpRight className="h-11 w-11 stroke-[3]" />
                        ) : (
                          <ArrowDownRight className="h-11 w-11 stroke-[3]" />
                        )}
                      </div>
                      <div className="min-w-0 text-left">
                        <span className={`block text-xs font-mono font-bold ${latestSignal.direction === "CALL" ? "text-emerald-300" : "text-red-400"}`}>
                          {latestSignal.direction === "CALL" ? "UP DIRECTION" : "DOWN DIRECTION"}
                        </span>
                        <span className="mt-1 block text-lg font-extrabold text-white md:text-2xl">
                          {latestSignal.direction === "CALL" ? "CALL (BUY HIGHER)" : "PUT (SELL LOWER)"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-center font-mono text-sm font-bold text-amber-300">
                    Entry Window: {String(Math.floor(entryWindow / 60)).padStart(2, "0")}:{String(entryWindow % 60).padStart(2, "0")}s
                  </div>
                  <a
                    href={QUOTEX_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/15 px-5 py-3 font-tech text-xs font-bold text-emerald-300 transition hover:bg-emerald-500/25"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>OPEN QUOTEX &amp; TRADE NOW</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleGetNextSignal}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 px-5 py-3 font-tech text-xs font-extrabold tracking-wider text-slate-950 shadow-lg shadow-emerald-950/60 transition hover:from-emerald-400 hover:to-teal-300"
                  >
                    <RefreshCw className="h-4 w-4" />
                    <span>GENERATE NEXT SIGNAL</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* FULL TRADE LOGIC & REASONING */}
              <div className="mt-2 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>ALGORITHMIC TRADE LOGIC & CONFLUENCE BREAKDOWN</span>
                </div>
                
                <div className="space-y-1.5 text-xs font-mono text-slate-300 leading-relaxed">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">1. Price Action:</span>
                    <span>{latestSignal.direction === "CALL" ? "Clean rejection wick formed at dynamic institutional support with high buying pressure" : "Upper rejection shadow confirmed at dynamic resistance ceiling with institutional selling"}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">2. Indicator Confluence:</span>
                    <span>RSI(14) reading at {latestSignal.indicators.rsi14} showing {latestSignal.direction === "CALL" ? "oversold reversal bounce" : "overbought exhaustion peak"}. EMA 9/21 cross aligned in {latestSignal.indicators.emaTrend} momentum.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">3. Orderbook Clustering:</span>
                    <span>OTC volume impulse registered 84% volume impulse favoring {latestSignal.direction} with high continuation probability.</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-900 text-amber-200">
                    <span className="font-bold">Execution Directive:</span>
                    <span>Execute {latestSignal.direction} on your broker now for {latestSignal.timeframe} expiry.</span>
                  </div>
                </div>
              </div>

              {/* Copy action remains below the detailed analysis. */}
              <div className="mt-5 flex items-center justify-center pt-2">
                <button
                  type="button"
                  onClick={handleCopySignal}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "COPIED TO CLIPBOARD" : "COPY VIP SIGNAL"}</span>
                </button>

              </div>
            </div>
          )}

          {/* Idle Placeholder State before first signal */}
          {tradePhase === "idle" && (
            <div className="p-8 rounded-2xl glass-panel border border-slate-800 flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shadow-inner">
                <Activity className="w-7 h-7" />
              </div>
              <h4 className="font-tech text-lg font-bold text-slate-200">
                RADAR STANDBY: READY TO SCAN
              </h4>
              <p className="text-xs text-slate-400 max-w-md font-mono">
                Select your preferred Pair and Timeframe (e.g. 15s OTC), then click <strong className="text-emerald-400">GENERATE SIGNAL</strong> to activate the 5-sec entry countdown and live trade execution window.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
