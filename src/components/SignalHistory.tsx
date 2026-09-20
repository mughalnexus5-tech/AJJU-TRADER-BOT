import React, { useState, useMemo } from "react";
import { SignalHistoryItem, MarketType } from "../types";
import { playClickSound } from "../utils/soundEffects";
import { 
  History, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle,
  HelpCircle,
  Trash2
} from "lucide-react";

interface SignalHistoryProps {
  history: SignalHistoryItem[];
  onClearHistory: () => void;
  soundEnabled: boolean;
}

export const SignalHistory: React.FC<SignalHistoryProps> = ({
  history,
  onClearHistory,
  soundEnabled
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [marketFilter, setMarketFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [directionFilter, setDirectionFilter] = useState<string>("ALL");

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      if (marketFilter !== "ALL" && item.market !== marketFilter) return false;
      if (statusFilter !== "ALL" && item.status !== statusFilter) return false;
      if (directionFilter !== "ALL" && item.direction !== directionFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return item.pair.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
      }
      return true;
    });
  }, [history, marketFilter, statusFilter, directionFilter, searchQuery]);

  const exportHistoryCSV = () => {
    playClickSound(soundEnabled);
    if (history.length === 0) return;
    const headers = ["ID", "Pair", "Market", "Timeframe", "Direction", "Status", "Timestamp", "EntryPrice", "Payout", "Confidence"];
    const rows = history.map((h) => [
      h.id,
      `"${h.pair}"`,
      h.market,
      h.timeframe,
      h.direction,
      h.status,
      `"${h.timestamp}"`,
      h.entryPrice,
      `${h.payoutPercent}%`,
      `${h.confidence}%`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ajju_signals_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: SignalHistoryItem["status"]) => {
    switch (status) {
      case "WIN":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> WIN
          </span>
        );
      case "LOSS":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
            <XCircle className="w-3 h-3" /> LOSS
          </span>
        );
      case "PENDING":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
            <Clock className="w-3 h-3" /> PENDING
          </span>
        );
      case "EXPIRED":
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> EXPIRED
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> UNVERIFIED
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-tech font-bold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-emerald-400" />
            <span>SIGNAL HISTORY TERMINAL</span>
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Logged execution outcomes, confluence records, and binary performance audit.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportHistoryCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>EXPORT CSV</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={() => {
                if (confirm("Reset current session history logs?")) {
                  onClearHistory();
                  playClickSound(soundEnabled);
                }
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-red-950/40 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition cursor-pointer"
              title="Clear Session History"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl glass-panel border border-slate-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pair or signal ID..."
            className="w-full px-3 py-2 pl-9 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        {/* Market Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[11px]">MARKET:</span>
          <select
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">ALL</option>
            <option value="OTC">OTC</option>
            <option value="LIVE">LIVE</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[11px]">STATUS:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">ALL</option>
            <option value="WIN">WIN</option>
            <option value="LOSS">LOSS</option>
            <option value="PENDING">PENDING</option>
            <option value="EXPIRED">EXPIRED</option>
            <option value="UNVERIFIED">UNVERIFIED</option>
          </select>
        </div>

        {/* Direction Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 text-[11px]">DIR:</span>
          <select
            value={directionFilter}
            onChange={(e) => setDirectionFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="ALL">ALL</option>
            <option value="CALL">CALL</option>
            <option value="PUT">PUT</option>
          </select>
        </div>
      </div>

      {/* History Cards Grid (NOT A BORING SPREADSHEET!) */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 rounded-2xl glass-panel border border-slate-800 text-center space-y-3">
          <History className="w-8 h-8 text-slate-600 mx-auto" />
          <h4 className="font-tech text-base font-bold text-slate-300">
            NO SIGNALS FOUND MATCHING CRITERIA
          </h4>
          <p className="text-xs font-mono text-slate-500">
            Generate signals in the Signal Generator to populate your real-time terminal audit trail.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHistory.map((item) => {
            const isCall = item.direction === "CALL";
            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl glass-panel border transition-all duration-200 space-y-3 ${
                  item.status === "WIN"
                    ? "border-emerald-500/30 hover:border-emerald-500/60"
                    : item.status === "LOSS"
                    ? "border-red-500/30 hover:border-red-500/60"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Top Row: Pair Name + Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="font-tech text-sm font-bold text-white flex items-center gap-2">
                    <span>{item.pair}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {item.market}
                    </span>
                  </div>
                  {getStatusBadge(item.status)}
                </div>

                {/* Direction + Timeframe Banner */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span
                      className={`p-1.5 rounded-md flex items-center justify-center font-bold ${
                        isCall ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {isCall ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    </span>
                    <span
                      className={`font-tech text-base font-extrabold ${
                        isCall ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {item.direction}
                    </span>
                  </div>

                  <div className="text-right font-mono">
                    <span className="text-[10px] text-slate-500 block">TIMEFRAME</span>
                    <span className="text-xs font-bold text-amber-400">{item.timeframe}</span>
                  </div>
                </div>

                {/* Telemetry Row */}
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-slate-400 border-t border-slate-800/60 pt-2">
                  <div>
                    <span className="block text-slate-500">ENTRY</span>
                    <span className="text-slate-200 font-bold">{item.entryPrice}</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">PAYOUT</span>
                    <span className="text-emerald-400 font-bold">+{item.payoutPercent}%</span>
                  </div>
                  <div>
                    <span className="block text-slate-500">CONFLUENCE</span>
                    <span className="text-slate-200 font-bold">{item.confidence}%</span>
                  </div>
                </div>

                {/* Footer: Timestamp */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                  <span>ID: {item.id}</span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
