import React, { useState, useEffect } from "react";
import { BrandLogo } from "./BrandLogo";
import { UserSession } from "../types";
import { playClickSound } from "../utils/soundEffects";
import { 
  Radio, 
  Clock, 
  Volume2, 
  VolumeX, 
  LogOut, 
  ShieldCheck,
  Menu,
  X,
  User,
  Zap
} from "lucide-react";

interface HeaderProps {
  userSession: UserSession;
  onLogout: () => void;
  onOpenProfile: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userSession,
  onLogout,
  onOpenProfile,
  soundEnabled,
  onToggleSound,
  mobileMenuOpen,
  onToggleMobileMenu
}) => {
  const [sessionSeconds, setSessionSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatSessionTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 glass-panel border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Brand Identity + Mobile Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-emerald-400" /> : <Menu className="w-5 h-5" />}
        </button>

        <BrandLogo size="sm" showText={true} />
      </div>

      {/* Center Telemetry: Connection & Market Status (hidden on very small screens) */}
      <div className="hidden lg:flex items-center gap-4 font-mono text-xs">
        {/* Node & Latency */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-emerald-400">TOKYO-1 NODE</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Radio className="w-3 h-3 text-emerald-400" />
            <span>12ms</span>
          </div>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px]">
          <Zap className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span className="font-bold">SYSTEM: ONLINE</span>
          <span className="text-emerald-500/50">•</span>
          <span className="text-emerald-400/90">HIGH CONFLUENCE</span>
        </div>

        {/* Current Active Session Timer */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-[11px]">
          <Clock className="w-3 h-3 text-amber-400" />
          <span className="text-slate-400">SESSION:</span>
          <span className="text-amber-300 font-bold">{formatSessionTime(sessionSeconds)}</span>
        </div>
      </div>

      {/* Right: Sound Control, User Profile, Logout */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Audio Mute/Unmute */}
        <button
          onClick={() => {
            playClickSound(!soundEnabled);
            onToggleSound();
          }}
          title={soundEnabled ? "Mute Terminal Sounds" : "Unmute Terminal Sounds"}
          className={`p-2 rounded-lg border transition cursor-pointer ${
            soundEnabled
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
              : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* User Profile Trigger */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition cursor-pointer group"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold text-xs">
            <User className="w-3.5 h-3.5" />
          </div>
          <div className="hidden sm:flex flex-col text-left font-mono">
            <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition truncate max-w-[120px]">
              {userSession.username}
            </span>
            <span className="text-[9px] text-emerald-400 flex items-center gap-0.5">
              <ShieldCheck className="w-2.5 h-2.5" /> VIP PASS
            </span>
          </div>
        </button>

        {/* Quick Logout Button */}
        <button
          onClick={onLogout}
          title="Disconnect Session"
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
