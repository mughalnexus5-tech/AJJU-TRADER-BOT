import React, { useState } from "react";
import { TRADING_STRATEGIES } from "../data/tradingData";
import { TradingStrategy } from "../types";
import { playClickSound } from "../utils/soundEffects";
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  ShieldCheck,
  Search
} from "lucide-react";

interface StrategiesLibraryProps {
  soundEnabled: boolean;
}

export const StrategiesLibrary: React.FC<StrategiesLibraryProps> = ({ soundEnabled }) => {
  const [expandedId, setExpandedId] = useState<string>("strat-price-action");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (id: string) => {
    playClickSound(soundEnabled);
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  const filteredStrategies = TRADING_STRATEGIES.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.tag.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-tech font-bold text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-400" />
            <span>QUANTITATIVE BINARY STRATEGY LIBRARY</span>
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Institutional algorithmic rulebooks, entry criteria, and confluence filters for high-probability setups.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search strategy..."
            className="w-full px-3 py-2 pl-9 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Strategies List (10 Expandable Cards - Section 14) */}
      <div className="space-y-3">
        {filteredStrategies.map((strat: TradingStrategy) => {
          const isExpanded = expandedId === strat.id;

          return (
            <div
              key={strat.id}
              className={`rounded-2xl glass-panel border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "border-emerald-500/50 shadow-xl shadow-emerald-950/40"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {/* Header Bar (Always Visible) */}
              <div
                onClick={() => toggleExpand(strat.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none group"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border transition ${
                    isExpanded 
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" 
                      : "bg-slate-900 border-slate-800 text-slate-400 group-hover:text-emerald-400"
                  }`}>
                    <Sparkles className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-tech text-base md:text-lg font-bold text-white group-hover:text-emerald-300 transition">
                        {strat.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-slate-900 text-emerald-400 border border-slate-800">
                        {strat.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans mt-0.5 max-w-2xl line-clamp-1">
                      {strat.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden md:inline-block text-xs font-mono text-emerald-400/90">
                    {strat.winRateObserved}
                  </span>
                  <div className="p-1 rounded-lg bg-slate-900 text-slate-400 group-hover:text-white transition">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expandable Details Drawer */}
              {isExpanded && (
                <div className="p-6 pt-0 border-t border-slate-800/80 space-y-6 font-mono text-xs">
                  {/* Overview */}
                  <div className="pt-4">
                    <h4 className="text-slate-300 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      OVERVIEW & THEORETICAL FOUNDATION
                    </h4>
                    <p className="text-slate-300 font-sans text-sm leading-relaxed">
                      {strat.overview}
                    </p>
                  </div>

                  {/* Entry Conditions (CALL vs PUT) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* CALL Conditions */}
                    <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold font-tech text-sm">
                        <ArrowUpRight className="w-4 h-4" />
                        <span>CALL (BUY) ENTRY CONDITIONS</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-300 font-sans text-xs">
                        {strat.entryConditionsCall.map((cond, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-0.5">✔</span>
                            <span>{cond}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* PUT Conditions */}
                    <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-red-400 font-bold font-tech text-sm">
                        <ArrowDownRight className="w-4 h-4" />
                        <span>PUT (SELL) ENTRY CONDITIONS</span>
                      </div>
                      <ul className="space-y-1.5 text-slate-300 font-sans text-xs">
                        {strat.entryConditionsPut.map((cond, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">✔</span>
                            <span>{cond}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Confirmation Rules */}
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <h5 className="text-slate-300 font-bold tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>ALGORITHMIC CONFIRMATION RULES</span>
                    </h5>
                    <ul className="space-y-1 text-slate-400 font-sans text-xs">
                      {strat.confirmationRules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-slate-500">•</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Example & Risk Notes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs">
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <strong className="text-slate-200 block mb-1 font-mono text-[11px] uppercase text-emerald-400">
                        EXAMPLE EXECUTION SCENARIO
                      </strong>
                      <p className="text-slate-300 leading-relaxed">
                        {strat.exampleScenario}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                      <strong className="text-slate-200 block mb-1 font-mono text-[11px] uppercase text-amber-400 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        RISK WARNING & LIMITATIONS
                      </strong>
                      <p className="text-slate-400 leading-relaxed">
                        {strat.riskNotes}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
