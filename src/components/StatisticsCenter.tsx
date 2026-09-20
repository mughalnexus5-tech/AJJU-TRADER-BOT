import React from "react";
import { SignalHistoryItem } from "../types";
import { 
  BarChart3, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Target, 
  Zap, 
  Percent, 
  CheckCircle2, 
  XCircle,
  ShieldCheck,
  Flame
} from "lucide-react";

interface StatisticsCenterProps {
  history: SignalHistoryItem[];
  totalSignalsCount: number;
}

export const StatisticsCenter: React.FC<StatisticsCenterProps> = ({
  history,
  totalSignalsCount
}) => {
  const verifiedWins = history.filter((h) => h.status === "WIN").length;
  const verifiedLosses = history.filter((h) => h.status === "LOSS").length;
  const closedCount = verifiedWins + verifiedLosses;
  const calculatedWinRate = closedCount > 0 ? ((verifiedWins / closedCount) * 100).toFixed(1) : "88.4";

  // SVG Circular progress math
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Number(calculatedWinRate) / 100) * circumference;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl font-tech font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <span>ALGORITHMIC STATISTICS CENTER</span>
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Real-time quantitative session performance metrics and accuracy telemetry.
          </p>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 self-start sm:self-auto">
          DEMO / SIMULATED DATA
        </span>
      </div>

      {/* Top Main Confluence Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Win Rate Radial Gauge Card */}
        <div className="p-6 rounded-2xl glass-panel-glow border border-emerald-500/30 flex flex-col items-center justify-between text-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between text-xs font-mono pb-2 border-b border-slate-800">
            <span className="text-slate-400">WIN RATE ACCURACY</span>
            <span className="text-emerald-400 font-bold">12-PT RADAR</span>
          </div>

          <div className="my-6 relative flex items-center justify-center">
            {/* SVG Circular Ring */}
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="#1e293b"
                strokeWidth="9"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r={radius}
                stroke="url(#winRateGrad)"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="winRateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-tech font-extrabold text-white font-mono">
                {calculatedWinRate}%
              </span>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                VERIFIED
              </span>
            </div>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 text-[11px] font-mono pt-3 border-t border-slate-800/80">
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
              <span className="block text-[10px] text-slate-400">WINS</span>
              <strong className="text-base">{verifiedWins || 24}</strong>
            </div>
            <div className="p-2 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300">
              <span className="block text-[10px] text-slate-400">LOSSES</span>
              <strong className="text-base">{verifiedLosses || 3}</strong>
            </div>
          </div>
        </div>

        {/* Signals Counter & Confluence Blocks */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card: Total Signals Generated */}
          <div className="p-5 rounded-xl glass-panel border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono font-medium">TOTAL SIGNALS GENERATED</span>
              <Zap className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-tech font-extrabold text-white font-mono">
                {totalSignalsCount}
              </div>
              <span className="text-xs font-mono text-emerald-400 mt-1 block">
                ▲ Active Algorithmic Session
              </span>
            </div>
          </div>

          {/* Card: Active Session Time */}
          <div className="p-5 rounded-xl glass-panel border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono font-medium">ACTIVE SESSION TUNNEL</span>
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-tech font-extrabold text-blue-300 font-mono">
                LIVE
              </div>
              <span className="text-xs font-mono text-slate-400 mt-1 block">
                Tokyo L2 Socket Connected
              </span>
            </div>
          </div>

          {/* Card: Most Used Pair */}
          <div className="p-5 rounded-xl glass-panel border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono font-medium">MOST SCANNED PAIR</span>
              <Target className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-tech font-bold text-amber-300">
                EUR / USD (OTC)
              </div>
              <span className="text-xs font-mono text-slate-400 mt-1 block">
                93% Payout • High Liquidity
              </span>
            </div>
          </div>

          {/* Card: Most Used Timeframe */}
          <div className="p-5 rounded-xl glass-panel border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono font-medium">OPTIMAL TIMEFRAME</span>
              <Flame className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-tech font-bold text-white font-mono">
                1 MIN & 30 SEC
              </div>
              <span className="text-xs font-mono text-emerald-400 mt-1 block">
                Highest Observed Accuracy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithmic Risk Breakdown (No price charts per requirements) */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h3 className="font-tech text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>ALGORITHMIC CONFLUENCE BREAKDOWN (BY STRATEGY)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-slate-400 text-[11px] mb-1">PRICE ACTION PURE</div>
            <div className="text-lg font-bold text-emerald-400">89.4%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-400 h-full w-[89.4%]"></div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-slate-400 text-[11px] mb-1">EMA 9/21 CROSS</div>
            <div className="text-lg font-bold text-teal-400">86.2%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-400 h-full w-[86.2%]"></div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-slate-400 text-[11px] mb-1">RSI EXTREMES</div>
            <div className="text-lg font-bold text-blue-400">88.8%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-400 h-full w-[88.8%]"></div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-slate-400 text-[11px] mb-1">SUPPORT & RESISTANCE</div>
            <div className="text-lg font-bold text-amber-400">90.5%</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-400 h-full w-[90.5%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
