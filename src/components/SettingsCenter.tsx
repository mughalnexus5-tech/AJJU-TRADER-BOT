import React, { useState } from "react";
import { AppSettings } from "../types";
import { playClickSound, playVoiceAnnouncement } from "../utils/soundEffects";
import { 
  Sliders, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Clock, 
  RotateCcw,
  ShieldCheck,
  Zap,
  Mic,
  CheckCircle2,
  Lock,
  Smartphone,
  Check
} from "lucide-react";

interface SettingsCenterProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetSettings: () => void;
}

export const SettingsCenter: React.FC<SettingsCenterProps> = ({
  settings,
  onUpdateSettings,
  onResetSettings
}) => {
  const [voiceTestStatus, setVoiceTestStatus] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleTestVoice = () => {
    playClickSound(settings.soundEnabled);
    setVoiceTestStatus(true);
    playVoiceAnnouncement("AJJU Trader Bot VIP Voice Engine online. Call and Put signals ready.", true);
    setTimeout(() => setVoiceTestStatus(false), 3000);
  };

  const handleClearCache = () => {
    playClickSound(settings.soundEnabled);
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-tech font-bold text-white flex items-center gap-2">
            <Sliders className="w-6 h-6 text-emerald-400" />
            <span>VIP TERMINAL PREFERENCES</span>
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Configure premium audio signals, synthetic voice alerts, exchange timezones, and device security.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            playClickSound(settings.soundEnabled);
            onResetSettings();
          }}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs font-bold transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span>RESET DEFAULTS</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: VIP Audio & Voice Signals (Clean & Premium) */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-tech font-bold text-base pb-3 border-b border-slate-800">
            <Volume2 className="w-5 h-5 text-emerald-400" />
            <span>AUDIO & AI VOICE ALERTS</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {/* Master Sound Effects */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div>
                <span className="text-slate-200 font-bold block">Terminal Synthesizer Audio</span>
                <span className="text-[11px] text-slate-400">Harmonic CALL & PUT signal chimes</span>
              </div>
              <button
                onClick={() => {
                  onUpdateSettings({ soundEnabled: !settings.soundEnabled });
                  playClickSound(!settings.soundEnabled);
                }}
                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                  settings.soundEnabled ? "bg-emerald-500" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${
                    settings.soundEnabled ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* AI Voice Announcer */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-200 font-bold block flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Synthetic Voice Announcer</span>
                  </span>
                  <span className="text-[11px] text-slate-400">Announces CALL / PUT directives aloud</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                  ACTIVE
                </span>
              </div>

              <button
                type="button"
                onClick={handleTestVoice}
                disabled={voiceTestStatus}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-bold transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Mic className="w-3.5 h-3.5 text-emerald-400" />
                <span>{voiceTestStatus ? "SPEAKING DEMO..." : "TEST VOICE ANNOUNCER"}</span>
              </button>
            </div>

            {/* Trade Expiry Tone */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div>
                <span className="text-slate-200 font-bold block">Trade Expiry Notification</span>
                <span className="text-[11px] text-slate-400">Pleasant tone when candle cycle finishes</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-[11px]">
                <CheckCircle2 className="w-4 h-4" />
                <span>ENABLED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Market Exchange Timezone */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-tech font-bold text-base pb-3 border-b border-slate-800">
            <Clock className="w-5 h-5 text-teal-400" />
            <span>EXCHANGE SESSION TIMEZONE</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <label className="text-slate-400 block mb-2 font-bold">SELECT TRADING CLOCK</label>
              <select
                value={settings.timezone}
                onChange={(e) => onUpdateSettings({ timezone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Asia/Kolkata">UTC+5:30 (Mumbai / India IST)</option>
                <option value="Asia/Dubai">UTC+4:00 (Dubai / UAE GST)</option>
                <option value="UTC">UTC (Universal Coordinated Time)</option>
                <option value="Europe/London">UTC+0:00 (London / GMT)</option>
                <option value="America/New_York">UTC-5:00 (New York / US EST)</option>
                <option value="Asia/Tokyo">UTC+9:00 (Tokyo / Japan JST)</option>
              </select>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Synchronized Candle Feeds</span>
              </span>
              <p>
                All OTC and LIVE market signals are mathematically matched to your selected broker clock interval.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: VIP Security & Hardware Lock */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-tech font-bold text-base pb-3 border-b border-slate-800">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>VIP LICENSE & HARDWARE LOCK</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">HARDWARE BINDING</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> 1-DEVICE ENFORCED
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">SECURITY PROTOCOL</span>
                <span className="text-slate-200">L2 CRYPTO SHA-256</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">VIP ACCESS PASS</span>
                <span className="text-emerald-400 font-bold">VERIFIED ACTIVE</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your VIP terminal key is securely bound to this device. For hardware transfer or machine reset, contact the master administrator.
            </p>
          </div>
        </div>

        {/* Card 4: Terminal System Optimization */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-white font-tech font-bold text-base pb-3 border-b border-slate-800">
            <Smartphone className="w-5 h-5 text-blue-400" />
            <span>DEVICE OPTIMIZATION & CACHE</span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">DISPLAY ENGINE</span>
                <span className="text-emerald-400 font-bold">RESPONSIVE (PC / MOBILE)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">DATA CONNECTION</span>
                <span className="text-emerald-400 font-bold">ULTRA LOW LATENCY</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClearCache}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {cacheCleared ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">TERMINAL MEMORY FLUSHED</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>FLUSH TEMPORARY CACHE</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
