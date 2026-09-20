import React, { useState, useMemo } from "react";
import { TradingPair, MarketType, PairCategory } from "../types";
import { playClickSound } from "../utils/soundEffects";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  Star, 
  Zap, 
  Activity, 
  ArrowRight,
  Flame,
  Radio
} from "lucide-react";

interface MarketCenterProps {
  pairs: TradingPair[];
  onSelectPairForScan: (pairId: string) => void;
  soundEnabled: boolean;
}

export const MarketCenter: React.FC<MarketCenterProps> = ({
  pairs,
  onSelectPairForScan,
  soundEnabled
}) => {
  const [marketFilter, setMarketFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["eurusd-otc", "btcusd-otc", "xauusd-otc"]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound(soundEnabled);
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredPairs = useMemo(() => {
    return pairs.filter((p) => {
      if (marketFilter !== "ALL" && p.marketType !== marketFilter) return false;
      if (categoryFilter !== "ALL" && p.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.symbol.toLowerCase().includes(q);
      }
      return true;
    });
  }, [pairs, marketFilter, categoryFilter, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-tech font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <span>MARKET SCANNING RADAR</span>
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Real-time OTC and Live binary market telemetry cards with trend ratings & liquidity payouts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>16 ASSETS STREAMING</span>
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl glass-panel border border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search market asset..."
            className="w-full px-3 py-2 pl-9 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Market Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">MARKET:</span>
          <select
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">ALL PROTOCOLS</option>
            <option value="OTC">OTC ONLY (HIGH PAYOUT)</option>
            <option value="LIVE">LIVE ONLY</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">CATEGORY:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">ALL CATEGORIES</option>
            <option value="FOREX">FOREX</option>
            <option value="CRYPTO">CRYPTO</option>
            <option value="METALS">METALS</option>
          </select>
        </div>
      </div>

      {/* Market Cards Grid (NO CHARTS - Section 13) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPairs.map((pair) => {
          const isFav = favorites.includes(pair.id);
          const isBull = pair.trend === "BULLISH";
          const isBear = pair.trend === "BEARISH";

          return (
            <div
              key={pair.id}
              className="p-5 rounded-2xl glass-panel border border-slate-800/90 hover:border-emerald-500/50 transition-all duration-300 group flex flex-col justify-between shadow-lg relative overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div
                className={`absolute top-0 inset-x-0 h-1 ${
                  isBull ? "bg-emerald-500" : isBear ? "bg-red-500" : "bg-slate-600"
                }`}
              ></div>

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(pair.id, e)}
                      className="p-1 hover:text-amber-400 text-slate-500 transition cursor-pointer"
                    >
                      <Star className={`w-4 h-4 ${isFav ? "fill-amber-400 text-amber-400" : ""}`} />
                    </button>
                    <div>
                      <h4 className="font-tech text-base font-bold text-white group-hover:text-emerald-300 transition">
                        {pair.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400">
                        {pair.category} • {pair.marketType}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs">
                    {pair.payout}% PAYOUT
                  </span>
                </div>

                {/* Price & Change Row */}
                <div className="my-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">CURRENT QUOTE</span>
                    <span className="text-sm font-bold text-slate-200">
                      {pair.rate.toFixed(pair.rate > 100 ? 2 : 5)}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">24H CHANGE</span>
                    <span className={`text-xs font-bold ${pair.change24h >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                      {pair.change24h >= 0 ? `+${pair.change24h}%` : `${pair.change24h}%`}
                    </span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mb-4">
                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/70">
                    <span className="text-[10px] text-slate-500 block">TREND BIAS</span>
                    <span className={`font-bold flex items-center gap-1 ${
                      isBull ? "text-emerald-400" : isBear ? "text-red-400" : "text-slate-400"
                    }`}>
                      {isBull ? <TrendingUp className="w-3.5 h-3.5" /> : isBear ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                      {pair.trend}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/70">
                    <span className="text-[10px] text-slate-500 block">VOLATILITY</span>
                    <span className={`font-bold ${
                      pair.volatility === "EXTREME" || pair.volatility === "HIGH" ? "text-amber-400" : "text-slate-300"
                    }`}>
                      {pair.volatility}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Jump to Signal Generator */}
              <button
                type="button"
                onClick={() => {
                  playClickSound(soundEnabled);
                  onSelectPairForScan(pair.id);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500/50 text-slate-200 hover:text-emerald-300 font-tech text-xs font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-md"
              >
                <span>SCAN IN SIGNAL ENGINE</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
