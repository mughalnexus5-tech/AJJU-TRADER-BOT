import React, { useState } from "react";
import { UserSession } from "../types";
import { playClickSound } from "../utils/soundEffects";
import { 
  UserCircle, 
  ShieldCheck, 
  Laptop, 
  Calendar, 
  Clock, 
  KeyRound, 
  LogOut, 
  Edit3, 
  Check, 
  X,
  Radio
} from "lucide-react";

interface ProfileCenterProps {
  userSession: UserSession;
  onUpdateUsername: (newUsername: string) => void;
  onLogout: () => void;
  soundEnabled: boolean;
}

export const ProfileCenter: React.FC<ProfileCenterProps> = ({
  userSession,
  onUpdateUsername,
  onLogout,
  soundEnabled
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [usernameInput, setUsernameInput] = useState(userSession.username);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim()) {
      onUpdateUsername(usernameInput.trim());
      setIsEditing(false);
      playClickSound(soundEnabled);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-tech font-bold text-white flex items-center gap-2">
          <UserCircle className="w-6 h-6 text-emerald-400" />
          <span>USER PROFILE & SESSION CREDENTIALS</span>
        </h2>
        <p className="text-xs font-mono text-slate-400 mt-1">
          Authorized binary terminal subscription, security posture, and client credentials.
        </p>
      </div>

      {/* Main Profile Card */}
      <div className="p-6 md:p-8 rounded-2xl glass-panel-glow border border-emerald-500/30 space-y-6 shadow-xl">
        {/* Profile Avatar & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-tech font-extrabold text-2xl shadow-lg shadow-emerald-950/60">
              {userSession.username.slice(0, 2).toUpperCase()}
            </div>

            <div>
              {isEditing ? (
                <form onSubmit={handleSave} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="px-3 py-1 rounded bg-slate-900 border border-emerald-500 text-white font-mono text-sm focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="p-1.5 rounded bg-emerald-500 text-slate-950 hover:bg-emerald-400"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-xl md:text-2xl font-tech font-bold text-white">
                    {userSession.username}
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      playClickSound(soundEnabled);
                      setIsEditing(true);
                    }}
                    className="text-slate-400 hover:text-emerald-400 p-1"
                    title="Edit Display Name"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> {userSession.tier}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  KEY: {userSession.key}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound(soundEnabled);
              onLogout();
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-950/40 border border-slate-700 hover:border-red-500/40 text-slate-300 hover:text-red-400 font-mono text-xs font-bold transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4" />
            <span>DISCONNECT SESSION</span>
          </button>
        </div>

        {/* Info Grid (Section 16 requirements) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
          {/* Account Status */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">ACCOUNT STATUS</span>
            <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              VIP ACTIVE LICENSE
            </span>
          </div>

          {/* Session Status */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">SESSION STATUS</span>
            <span className="text-teal-400 font-bold text-sm flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              AUTHENTICATED
            </span>
          </div>

          {/* Current Device Status */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">DEVICE STATUS</span>
            <span className="text-slate-200 font-bold text-sm flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-emerald-400" />
              AUTHORIZED TERMINAL
            </span>
          </div>

          {/* Join Date */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">JOIN DATE</span>
            <span className="text-slate-200 font-bold text-sm flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              AUG 10, 2026
            </span>
          </div>

          {/* Last Login */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">LAST LOGIN</span>
            <span className="text-slate-200 font-bold text-sm flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              TODAY, 11:20 AM
            </span>
          </div>

          {/* License Expiry */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">KEY EXPIRATION</span>
            <span className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              {new Date(userSession.expiryDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Security & Confluence Guarantee Notice */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs font-sans text-slate-300 leading-relaxed">
            Your terminal session is protected with end-to-end symmetric encryption. Do not share your VIP Access Key with unauthorized third parties. Maximum hardware concurrency limit applies per subscription tier.
          </div>
        </div>
      </div>
    </div>
  );
};
