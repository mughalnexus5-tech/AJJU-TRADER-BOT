import React, { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { BackgroundFX } from "@/components/BackgroundFX";
import { playClickSound, playReadyAlert } from "@/utils/soundEffects";
import { useServerFn } from "@/lib/rpc";
import { verifyAccessKey } from "@/lib/license.functions";
import { getDeviceId, getDeviceName } from "@/lib/device";
import { ShieldCheck, Cpu, KeyRound, Sparkles, AlertCircle, Radio } from "lucide-react";

interface LoginScreenProps {
  onLoginSuccess: (userData: { username: string; role: string; tier: string; key: string; expiryDate: string }) => void;
  soundEnabled: boolean;
  onGoToAdmin?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  soundEnabled,
  onGoToAdmin
}) => {
  const verify = useServerFn(verifyAccessKey);
  const [accessKey, setAccessKey] = useState("");
  const [rememberSession, setRememberSession] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim()) {
      setErrorMsg("Please enter your VIP access key");
      return;
    }

    setErrorMsg("");
    setIsLoading(true);
    playClickSound(soundEnabled);

    try {
      const res = await verify({
        data: {
          key: accessKey.trim(),
          deviceId: getDeviceId(),
          deviceName: getDeviceName(),
        },
      });

      if (!res.ok) {
        setErrorMsg(res.error);
        return;
      }

      playReadyAlert(soundEnabled);
      if (rememberSession) {
        localStorage.setItem("ajju_user_session", JSON.stringify(res.session));
      }
      onLoginSuccess(res.session);
    } catch {
      setErrorMsg("Verification service unreachable. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-[#040609]">
      {/* Cinematic Background Atmosphere */}
      <BackgroundFX />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md my-auto">
        {/* Glowing Border Card */}
        <div className="relative rounded-2xl glass-panel-glow border border-emerald-500/30 p-7 md:p-9 shadow-2xl shadow-black/80 overflow-hidden">
          {/* Subtle Top Gradient Accent */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500"></div>

          {/* Center Brand Identity */}
          <div className="flex flex-col items-center text-center mb-7">
            <BrandLogo size="hero" showText={false} className="justify-center mb-4" />
            
            <h1 className="text-2xl md:text-3xl font-tech font-extrabold tracking-wider text-slate-100 flex items-center gap-2">
              <span className="text-red-500">AJJU</span>
              <span className="text-emerald-400">TRADER</span>
              <span className="text-slate-300">BOT</span>
            </h1>

            <div className="flex items-center gap-2 mt-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <p className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-400 font-semibold">
                PREMIUM BINARY TRADING SYSTEM
              </p>
            </div>

            <p className="text-xs text-slate-400 mt-2 max-w-xs font-sans">
              Algorithmic Confluence Engine • OTC & Live High-Precision Signals
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold tracking-wider text-slate-200 mb-2 flex items-center justify-between">
                <span>ENTER ACCESS KEY</span>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> VIP ACCESS ONLY
                </span>
              </label>
              
              <div className="relative">
                <input
                  type="text"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="AJJU-XXXX-XXXX-XXXX"
                  autoFocus
                  className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-950/90 border border-emerald-500/30 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition shadow-inner"
                />
                <KeyRound className="w-4 h-4 text-emerald-400 absolute left-3.5 top-4" />
              </div>
            </div>

            {/* Remember Session Toggle */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberSession}
                  onChange={(e) => setRememberSession(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-emerald-500"
                />
                <span className="text-xs font-mono text-slate-300">REMEMBER SESSION</span>
              </label>

              <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>ACTIVE ENCRYPTION</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-tech font-extrabold text-sm md:text-base tracking-widest uppercase transition duration-200 transform active:scale-[0.98] shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  <span>ACTIVATING VIP TERMINAL...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>ACTIVATE VIP ACCESS</span>
                </>
              )}
            </button>
          </form>

          {/* Connection Telemetry Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>NODE: TOKYO-1 PRIMARY</span>
            </div>
            <div className="flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>LATENCY: 12ms</span>
            </div>
            <span className="text-emerald-400 font-bold">STATUS: READY</span>
          </div>

          {/* Discreet Master Admin Portal Trigger */}
          {onGoToAdmin && (
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={onGoToAdmin}
                className="text-[10px] font-mono text-slate-500 hover:text-emerald-400 transition cursor-pointer tracking-wider"
              >
                MASTER ADMIN ACCESS (AJJUADMIN)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
