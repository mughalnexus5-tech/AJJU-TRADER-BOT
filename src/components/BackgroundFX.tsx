import React, { useMemo } from "react";

interface BackgroundFXProps {
  intensity?: "cyber-emerald" | "deep-onyx" | "neon-matrix";
  reducedMotion?: boolean;
  animationMode?: "cinematic" | "optimized";
}

export const BackgroundFX: React.FC<BackgroundFXProps> = ({
  reducedMotion = false,
  animationMode = "cinematic"
}) => {
  const isReduced = reducedMotion || animationMode === "optimized";
  // Pre-generate random floating candlestick bars
  const floatingCandles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.6 + (i % 3) * 2) % 96}%`,
      top: `${(i * 9 + 12) % 85}%`,
      height: 18 + (i % 5) * 8,
      wickTop: 6 + (i % 4) * 3,
      wickBottom: 6 + (i % 3) * 4,
      isGreen: i % 2 === 0,
      duration: 18 + (i % 6) * 4,
      delay: -(i * 1.8),
      opacity: 0.12 + (i % 4) * 0.04
    }));
  }, []);

  // Pre-generate market ticker coordinates
  const telemetryLines = useMemo(() => {
    return [
      { text: "EURUSD.OTC 1.08742 ▲ +0.42%", x: "8%", y: "15%", color: "text-emerald-500/30" },
      { text: "GBPUSD.OTC 1.29415 ▼ -0.38%", x: "78%", y: "22%", color: "text-red-500/30" },
      { text: "BTCUSD.OTC 68420.5 ▲ +3.45%", x: "18%", y: "68%", color: "text-emerald-500/30" },
      { text: "XAUUSD.OTC 2684.90 ▲ +0.88%", x: "65%", y: "82%", color: "text-emerald-500/30" },
      { text: "VOLATILITY: HIGH [IV 38.2%]", x: "42%", y: "8%", color: "text-slate-500/20" },
      { text: "FEED: TOKYO OTC_FAST_L2", x: "85%", y: "62%", color: "text-slate-500/20" },
      { text: "ALGO: CONFLUENCE 12-PT ACTIVE", x: "12%", y: "42%", color: "text-emerald-500/25" }
    ];
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#040609]">
      {/* Dynamic Radial Vignettes */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px]"></div>
      <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-[150px]"></div>
      <div className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] bg-emerald-950/20 rounded-full blur-[160px]"></div>

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>

      {/* Subtle Digital Dots Texture */}
      <div className="absolute inset-0 cyber-dots opacity-20"></div>

      {/* Floating Animated Candlestick Bars */}
      {!isReduced && (
        <div className="absolute inset-0 overflow-hidden">
          {floatingCandles.map((c) => (
            <div
              key={c.id}
              className="absolute flex flex-col items-center transition-transform"
              style={{
                left: c.left,
                top: c.top,
                opacity: c.opacity,
                animation: `floatY ${c.duration}s ease-in-out infinite alternate`,
                animationDelay: `${c.delay}s`
              }}
            >
              {/* Top Wick */}
              <div
                className={`w-[1px] ${c.isGreen ? "bg-emerald-400" : "bg-red-400"}`}
                style={{ height: `${c.wickTop}px` }}
              />
              {/* Candle Body */}
              <div
                className={`w-2.5 rounded-xs ${
                  c.isGreen 
                    ? "bg-emerald-500/80 border border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]" 
                    : "bg-red-500/80 border border-red-400 shadow-[0_0_8px_rgba(239,68,68,0.3)]"
                }`}
                style={{ height: `${c.height}px` }}
              />
              {/* Bottom Wick */}
              <div
                className={`w-[1px] ${c.isGreen ? "bg-emerald-400" : "bg-red-400"}`}
                style={{ height: `${c.wickBottom}px` }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Ambient Moving Telemetry Strings */}
      <div className="absolute inset-0 font-mono text-[11px] tracking-wider select-none">
        {telemetryLines.map((item, idx) => (
          <div
            key={idx}
            className={`absolute ${item.color} hidden sm:block`}
            style={{ left: item.x, top: item.y }}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Moving Cyber Scanline Beam */}
      {!isReduced && (
        <div className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent animate-scanline opacity-60 pointer-events-none"></div>
      )}

      {/* Bull & Bear Watermark Crest in the Center Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.035] pointer-events-none select-none flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor">
          <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="2" strokeDasharray="4 8" fill="none" />
          <path d="M 50 70 L 80 40 L 90 70 Z" fill="white" />
          <path d="M 150 70 L 120 40 L 110 70 Z" fill="white" />
          <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <style>{`
        @keyframes floatY {
          0% { transform: translateY(0px) scale(0.95); }
          50% { transform: translateY(-30px) scale(1.05); }
          100% { transform: translateY(15px) scale(0.98); }
        }
      `}</style>
    </div>
  );
};
