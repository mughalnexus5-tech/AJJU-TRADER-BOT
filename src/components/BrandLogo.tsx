import React, { useState } from "react";
import logoUrl from "@/assets/ajju-logo.jpg";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  showText?: boolean;
  className?: string;
  animateGlow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = "md",
  showText = true,
  className = "",
  animateGlow = true
}) => {
  const [imageError, setImageError] = useState(false);

  // Pixel dimensions mapping
  const sizeMap = {
    sm: { img: "w-8 h-8", text: "text-base", sub: "text-[9px]" },
    md: { img: "w-11 h-11", text: "text-lg", sub: "text-[10px]" },
    lg: { img: "w-16 h-16", text: "text-2xl", sub: "text-xs" },
    xl: { img: "w-24 h-24", text: "text-3xl", sub: "text-sm" },
    hero: { img: "w-32 h-32 md:w-36 md:h-36", text: "text-4xl md:text-5xl", sub: "text-sm" }
  };

  const curr = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Visual Emblem */}
      <div className="relative group shrink-0">
        {/* Ambient Glow Aura */}
        {animateGlow && (
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-transparent to-red-500/30 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
        )}
        
        <div className={`relative ${curr.img} rounded-full overflow-hidden border border-emerald-500/40 shadow-lg shadow-emerald-950/40 bg-black flex items-center justify-center`}>
          {!imageError ? (
            <img
              src={logoUrl}
              alt="AJJU TRADER Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
            />
          ) : (
            // High-fidelity SVG fallback representing Green Bear + Red Bull + Candlesticks
            <svg viewBox="0 0 100 100" className="w-full h-full p-1.5" fill="none">
              <circle cx="50" cy="50" r="46" fill="#070b11" stroke="url(#ringGrad)" strokeWidth="2.5" />
              {/* Green Bear Profile (Left) */}
              <path
                d="M 28 32 C 22 28, 14 36, 18 48 C 15 54, 22 65, 34 62 C 30 56, 32 46, 36 42 Z"
                fill="#10b981"
                opacity="0.9"
              />
              <circle cx="26" cy="40" r="2" fill="#ffffff" />
              {/* Red Bull Profile (Right) */}
              <path
                d="M 72 32 C 78 28, 86 36, 82 48 C 85 54, 78 65, 66 62 C 70 56, 68 46, 64 42 Z"
                fill="#ef4444"
                opacity="0.9"
              />
              <circle cx="74" cy="40" r="2" fill="#ffffff" />
              {/* Bull Horn */}
              <path d="M 76 34 C 82 22, 70 20, 68 26" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              {/* Central Candlesticks */}
              <line x1="45" y1="36" x2="45" y2="60" stroke="#10b981" strokeWidth="1.5" />
              <rect x="42.5" y="42" width="5" height="12" fill="#10b981" rx="1" />
              
              <line x1="55" y1="38" x2="55" y2="62" stroke="#ef4444" strokeWidth="1.5" />
              <rect x="52.5" y="44" width="5" height="12" fill="#ef4444" rx="1" />
              {/* Rising Arrow */}
              <path d="M 44 32 Q 52 24, 60 22 M 60 22 L 55 22 M 60 22 L 58 27" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              
              <defs>
                <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </div>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-center tracking-wider font-tech font-bold leading-none">
            <span className="text-red-500 font-extrabold text-shadow-sm drop-shadow-[0_2px_8px_rgba(239,68,68,0.5)]">
              AJJU
            </span>
            <span className="text-emerald-400 font-extrabold ml-1.5 drop-shadow-[0_2px_8px_rgba(16,185,129,0.5)]">
              TRADER
            </span>
            <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              BOT
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[2px] w-3 bg-red-500 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-emerald-400 rotate-45"></span>
            <span className={`text-slate-400 font-mono tracking-widest uppercase ${curr.sub}`}>
              PREMIUM BINARY TERMINAL
            </span>
            <span className="h-[2px] w-3 bg-emerald-500 rounded-full"></span>
          </div>
        </div>
      )}
    </div>
  );
};
