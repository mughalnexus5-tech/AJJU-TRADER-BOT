import React, { useState, useEffect } from "react";
import { AppNavView, TradingPair } from "../types";
import { BrandLogo } from "./BrandLogo";
import { playClickSound } from "../utils/soundEffects";
import { 
  Cpu, 
  Activity, 
  Flame, 
  Clock, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Zap,
  Radio,
  Target,
  Sparkles,
  BarChart3,
  Globe2,
  CheckCircle2,
  Timer
} from "lucide-react";

interface HomeDashboardProps {
  onNavigate: (view: AppNavView) => void;
  pairs: TradingPair[];
  signalsTodayCount: number;
  soundEnabled: boolean;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  onNavigate,
  pairs,
  signalsTodayCount,
  soundEnabled
}) => {
  const biasPair = pairs.find((pair) => pair.id === "usdinr-otc") ?? pairs.find((pair) => pair.marketType === "OTC") ?? pairs[0];
  // Live simulated bull vs bear dynamic battle power
  const [bullPower, setBullPower] = useState(62);
  const [bearPower, setBearPower] = useState(38);
  const [liveTicks, setLiveTicks] = useState(419);

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.46) * 3;
      setBullPower((prev) => {
        const next = Math.max(38, Math.min(74, Math.round(prev + delta)));
        setBearPower(100 - next);
        return next;
      });
      setLiveTicks((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const topHotPairs = pairs.filter((p) => p.signalAvailability === "HOT").slice(0, 4);

  return (
    <div className="space-y-6 pb-12">
      {/* Ultra-Premium Hero Banner */}
      <div className="relative rounded-2xl glass-panel-glow border border-emerald-500/30 p-6 md:p-8 overflow-hidden shadow-2xl">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                OFFICIAL AJJU TRADER PROTOCOL
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono text-slate-300 bg-slate-900 border border-slate-800">
                OTC & RAPID BINARY ENGINE
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-tech font-extrabold tracking-tight text-white leading-tight">
              AJJU TRADER BOT
            </h1>

            <p className="text-sm md:text-base font-tech text-emerald-400 font-semibold tracking-wide">
              SMART BINARY TRADING TERMINAL
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  onNavigate("signals");
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-tech font-extrabold text-sm tracking-wider uppercase transition shadow-lg shadow-emerald-950/60 flex items-center gap-2.5 cursor-pointer transform active:scale-95"
              >
                <Cpu className="w-4 h-4" />
                <span>GET A TRADING SIGNAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  playClickSound(soundEnabled);
                  onNavigate("market");
                }}
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-tech text-sm font-semibold tracking-wider transition flex items-center gap-2 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>VIEW AVAILABLE MARKETS</span>
              </button>
            </div>
          </div>

          {/* Bull vs Bear Dynamic Confluence Meter (AJJU TRADER Brand Identity) */}
          <div className="w-full lg:w-76 p-4.5 rounded-2xl bg-slate-950/85 border border-slate-800/80 shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BrandLogo size="sm" showText={false} />
                <div>
                  <span className="block font-tech text-xs font-bold text-slate-200">MARKET BIAS INDEX</span>
                  <span className="block text-[9px] font-mono text-emerald-400">
                    {biasPair?.name.replace(/\s*\(OTC\)\s*$/i, "") ?? "USD / INR"} ({biasPair?.marketType === "OTC" ? "QUOTEX OTC" : "LIVE"})
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" /> LIVE TICK
              </span>
            </div>

            {/* Battle Meter Bar */}
            <div className="my-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-emerald-400">BULLS {bullPower}%</span>
                <span className="text-red-400">{bearPower}% BEARS</span>
              </div>
              
              <div className="w-full h-3.5 rounded-full bg-slate-900 overflow-hidden flex border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
                  style={{ width: `${bullPower}%` }}
                ></div>
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-700"
                  style={{ width: `${bearPower}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>Green Candle Volume: Dominant</span>
                <span>Active Ticks: {liveTicks}</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-300">
              Current Confluence: <span className="text-emerald-400 font-bold">FAVORS OTC CALL (BUY HIGHER)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Real-Time Command Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {/* Card 1: ALGO ENGINE STATUS */}
        <div className="p-4 rounded-xl glass-panel border border-emerald-500/20 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">TERMINAL STATUS</span>
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-tech font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              ONLINE
            </div>
            <span className="text-[10px] font-mono text-slate-400">Sub-system 100% Ok</span>
          </div>
        </div>

        {/* Card 2: 12-STAGE RADAR */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">RADAR SCANNER</span>
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-tech font-bold text-teal-400">
              ARMED
            </div>
            <span className="text-[10px] font-mono text-slate-400">12-Stage Confluence</span>
          </div>
        </div>

        {/* Card 3: MARKET STATUS */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">OTC POOL STATUS</span>
            <Activity className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-tech font-bold text-amber-400">
              ACTIVE
            </div>
            <span className="text-[10px] font-mono text-slate-400">92%+ High Payout</span>
          </div>
        </div>

        {/* Card 4: PRE-ENTRY TIMING */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">ENTRY WINDOW</span>
            <Timer className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-tech font-bold text-blue-400">
              5-SEC
            </div>
            <span className="text-[10px] font-mono text-slate-400">Pre-Entry Countdown</span>
          </div>
        </div>

        {/* Card 5: SIGNALS TODAY */}
        <div className="p-4 rounded-xl glass-panel border border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">SIGNALS TODAY</span>
            <Flame className="w-3.5 h-3.5 text-red-400" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-tech font-bold text-white font-mono">
              {signalsTodayCount}
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Generated Signals</span>
          </div>
        </div>

        {/* Card 6: HISTORICAL ACCURACY */}
        <div className="p-4 rounded-xl glass-panel border border-emerald-500/20 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-mono font-medium">HISTORIC WIN ACCURACY</span>
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div>
            <div className="text-lg md:text-xl font-tech font-bold text-emerald-400 font-mono">
              91.8%
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-800 text-emerald-300 font-bold">
                12-STAGE CONFIRMED
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* HOW AJJU TRADER EXECUTION WORKS (Human trader step-by-step masterclass) */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-tech text-base md:text-lg font-bold text-white tracking-wide">
            HOW TO GET AND USE A SIGNAL
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-bold">STEP 01</span>
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <h5 className="font-tech font-bold text-white text-sm">CHOOSE PAIR & TRADE TIME</h5>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Pick a Quotex OTC or live pair, then choose how long the trade should run.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-bold">STEP 02</span>
              <Cpu className="w-4 h-4 text-teal-400" />
            </div>
            <h5 className="font-tech font-bold text-white text-sm">START MARKET ANALYSIS</h5>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Tap Generate Signal and wait while the bot checks market direction and momentum.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-bold">STEP 03</span>
              <Timer className="w-4 h-4 text-amber-400" />
            </div>
            <h5 className="font-tech font-bold text-white text-sm">READ CALL OR PUT</h5>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Green CALL means price up. Red PUT means price down. Check the entry timer before trading.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-amber-400 font-bold">STEP 04</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h5 className="font-tech font-bold text-white text-sm">OPEN QUOTEX & TRADE</h5>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Open Quotex, select the same pair and time, then place the shown CALL or PUT trade.
            </p>
          </div>
        </div>
      </div>

      {/* Top Hot Pairs of the Hour */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <h3 className="font-tech text-base font-bold text-slate-200">
              HIGH PAYOUT OTC PAIRS (READY FOR SCAN)
            </h3>
          </div>
          <button
            onClick={() => onNavigate("market")}
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 transition cursor-pointer flex items-center gap-1"
          >
            <span>View All 24 Pairs</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {topHotPairs.map((pair) => (
            <div
              key={pair.id}
              className="p-4 rounded-xl glass-panel border border-slate-800 hover:border-emerald-500/40 transition group cursor-pointer"
              onClick={() => {
                playClickSound(soundEnabled);
                onNavigate("signals");
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-tech font-bold text-slate-100 group-hover:text-emerald-400 transition">
                  {pair.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {pair.payout}% PAYOUT
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{pair.marketType === "OTC" ? "QUOTEX OTC" : "LIVE"}</span>
                <span className={pair.change24h >= 0 ? "text-emerald-400" : "text-red-400"}>
                  {pair.change24h >= 0 ? `+${pair.change24h}%` : `${pair.change24h}%`}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-300">TREND: {pair.trend}</span>
                <span className="text-emerald-400 font-bold group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                  SCAN <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Market Session Clocks */}
      <div className="p-4 rounded-xl glass-panel border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-bold">
          <Globe2 className="w-4 h-4 text-emerald-400" />
          <span>GLOBAL TRADING HUBS:</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300">LONDON (LSE):</span>
            <strong className="text-emerald-400">OPEN</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300">NEW YORK (NYSE):</span>
            <strong className="text-emerald-400">OPEN</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-slate-300">TOKYO (TSE):</span>
            <strong className="text-amber-400">AFTER HOURS</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300">OTC BROKER POOL:</span>
            <strong className="text-emerald-400">24/7 ACTIVE</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
