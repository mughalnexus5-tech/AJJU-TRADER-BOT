import React, { useState, useEffect } from "react";
import { 
  AppNavView, 
  UserSession, 
  TradingPair, 
  GeneratedSignal, 
  SignalHistoryItem, 
  AppSettings 
} from "@/types";
import { INITIAL_SIGNAL_HISTORY } from "@/data/tradingData";
import { ALL_PAIRS } from "@/data/extraPairs";
import { BackgroundFX } from "@/components/BackgroundFX";
import { LoginScreen } from "@/components/LoginScreen";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { HomeDashboard } from "@/components/HomeDashboard";
import { SignalGenerator } from "@/components/SignalGenerator";
import { MarketCenter } from "@/components/MarketCenter";
import { StrategiesLibrary } from "@/components/StrategiesLibrary";
import { SignalHistory } from "@/components/SignalHistory";
import { StatisticsCenter } from "@/components/StatisticsCenter";
import { ProfileCenter } from "@/components/ProfileCenter";
import { SettingsCenter } from "@/components/SettingsCenter";
import { 
  LayoutDashboard, 
  Cpu, 
  TrendingUp, 
  History, 
  Sliders 
} from "lucide-react";

const DEFAULT_SETTINGS: AppSettings = {
  soundEnabled: true,
  animationMode: "cinematic",
  themeIntensity: "cyber-emerald",
  notificationAlert: true,
  timezone: "UTC",
  compactMode: false
};

export const TerminalApp: React.FC = () => {
  // Navigation & Screen States
  const [phase, setPhase] = useState<"loader" | "login" | "dashboard">("login");
  const [activeView, setActiveView] = useState<AppNavView>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [preselectedPairId, setPreselectedPairId] = useState<string | undefined>();

  // Application Data States
  const [userSession, setUserSession] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem("ajju_user_session");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem("ajju_terminal_settings");
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [tradingPairs, setTradingPairs] = useState<TradingPair[]>(ALL_PAIRS);
  const [signalHistory, setSignalHistory] = useState<SignalHistoryItem[]>(() => {
    const saved = localStorage.getItem("ajju_signal_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SIGNAL_HISTORY;
      }
    }
    return INITIAL_SIGNAL_HISTORY;
  });

  const [signalsTodayCount, setSignalsTodayCount] = useState(38);

  // Sync settings & history to localStorage
  useEffect(() => {
    localStorage.setItem("ajju_terminal_settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem("ajju_signal_history", JSON.stringify(signalHistory));
  }, [signalHistory]);

  // Restored session goes straight to the dashboard (no intro screen)
  useEffect(() => {
    if (userSession) setPhase("dashboard");
  }, [userSession]);

  // Handle Login Success
  const handleLoginSuccess = (data: { username: string; role: string; tier: string; key: string; expiryDate: string }) => {
    const session: UserSession = {
      username: data.username,
      role: data.role,
      tier: data.tier,
      key: data.key,
      expiryDate: data.expiryDate,
      sessionStarted: new Date().toISOString(),
      rememberSession: true
    };
    setUserSession(session);
    localStorage.setItem("ajju_user_session", JSON.stringify(session));
    setPhase("dashboard");
  };

  // Handle Logout
  const handleLogout = () => {
    setUserSession(null);
    localStorage.removeItem("ajju_user_session");
    setPhase("login");
  };

  // Handle Generated Signal
  const handleSignalGenerated = (signal: GeneratedSignal) => {
    setSignalsTodayCount((prev) => prev + 1);

    const newHistoryItem: SignalHistoryItem = {
      id: signal.id,
      pair: signal.pair,
      market: signal.market,
      timeframe: signal.timeframe,
      direction: signal.direction,
      status: "PENDING",
      timestamp: signal.generatedAt,
      entryPrice: signal.entryPrice,
      payoutPercent: signal.market === "OTC" ? 92 : 82,
      confidence: signal.confidenceScore
    };

    setSignalHistory((prev) => [newHistoryItem, ...prev]);

    // Simulate verified resolution after candle expiry for demonstration
    setTimeout(() => {
      setSignalHistory((prev) =>
        prev.map((item) => {
          if (item.id === signal.id) {
            return {
              ...item,
              status: Math.random() > 0.12 ? "WIN" : "LOSS"
            };
          }
          return item;
        })
      );
    }, 7000);
  };

  // Handle Direct Scan from Market Center
  const handleSelectPairForScan = (pairId: string) => {
    setPreselectedPairId(pairId);
    setActiveView("signals");
  };

  // Profile Username Update
  const handleUpdateUsername = (newUsername: string) => {
    if (!userSession) return;
    const updated = { ...userSession, username: newUsername };
    setUserSession(updated);
    localStorage.setItem("ajju_user_session", JSON.stringify(updated));
  };

  // Settings Update
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  // Phase 2: VIP Access Key Login Screen (Section 4)
  if (phase === "login") {
    return (
      <LoginScreen
        onLoginSuccess={handleLoginSuccess}
        soundEnabled={settings.soundEnabled}
      />
    );
  }

  // Phase 3: Main Trading Command Center (Section 5)
  return (
    <div className="min-h-screen text-white bg-[#030712] relative flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Cinematic Ambient Background */}
      <BackgroundFX animationMode={settings.animationMode} />

      {/* Main Terminal Header */}
      {userSession && (
        <Header
          userSession={userSession}
          onLogout={handleLogout}
          onOpenProfile={() => setActiveView("profile")}
          soundEnabled={settings.soundEnabled}
          onToggleSound={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      )}

      {/* Body Area with Sidebar + Content */}
      <div className="flex-1 flex relative z-10">
        {/* Navigation Sidebar (Zero admin option per requirements) */}
        <Sidebar
          activeView={activeView}
          onSelectView={setActiveView}
          soundEnabled={settings.soundEnabled}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
        />

        {/* Main Content Area (Extra bottom padding on mobile for bottom bar) */}
        <main className={`flex-1 md:ml-64 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full pb-24 md:pb-8 ${settings.compactMode ? "space-y-4" : "space-y-6"}`}>
          {activeView === "home" && (
            <HomeDashboard
              onNavigate={setActiveView}
              pairs={tradingPairs}
              signalsTodayCount={signalsTodayCount}
              soundEnabled={settings.soundEnabled}
            />
          )}

          {activeView === "signals" && (
            <SignalGenerator
              pairs={tradingPairs}
              onSignalGenerated={handleSignalGenerated}
              soundEnabled={settings.soundEnabled}
              preselectedPairId={preselectedPairId}
            />
          )}

          {activeView === "market" && (
            <MarketCenter
              pairs={tradingPairs}
              onSelectPairForScan={handleSelectPairForScan}
              soundEnabled={settings.soundEnabled}
            />
          )}

          {activeView === "strategies" && (
            <StrategiesLibrary soundEnabled={settings.soundEnabled} />
          )}

          {activeView === "history" && (
            <SignalHistory
              history={signalHistory}
              onClearHistory={() => setSignalHistory([])}
              soundEnabled={settings.soundEnabled}
            />
          )}

          {activeView === "statistics" && (
            <StatisticsCenter
              history={signalHistory}
              totalSignalsCount={signalsTodayCount}
            />
          )}

          {activeView === "profile" && userSession && (
            <ProfileCenter
              userSession={userSession}
              onUpdateUsername={handleUpdateUsername}
              onLogout={handleLogout}
              soundEnabled={settings.soundEnabled}
            />
          )}

          {activeView === "settings" && (
            <SettingsCenter
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onResetSettings={handleResetSettings}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Optimized for Mobile Phone Ergonomics) */}
      {userSession && (
        <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden glass-panel border-t border-slate-800/90 bg-slate-950/95 backdrop-blur-xl px-2 py-1.5 flex items-center justify-around">
          <button
            onClick={() => setActiveView("home")}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition cursor-pointer ${
              activeView === "home" ? "text-emerald-400 font-bold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-tech tracking-wider">HOME</span>
          </button>

          <button
            onClick={() => setActiveView("signals")}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer relative ${
              activeView === "signals"
                ? "text-emerald-300 font-bold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
              <div className={`p-1.5 rounded-xl transition ${activeView === "signals" ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/50" : "text-slate-500"}`}>
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-tech tracking-wider">SIGNALS</span>
          </button>

          <button
            onClick={() => setActiveView("market")}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition cursor-pointer ${
              activeView === "market" ? "text-emerald-400 font-bold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px] font-tech tracking-wider">MARKET</span>
          </button>

          <button
            onClick={() => setActiveView("history")}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition cursor-pointer ${
              activeView === "history" ? "text-emerald-400 font-bold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <History className="w-5 h-5" />
            <span className="text-[10px] font-tech tracking-wider">HISTORY</span>
          </button>

          <button
            onClick={() => setActiveView("settings")}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition cursor-pointer ${
              activeView === "settings" ? "text-emerald-400 font-bold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="w-5 h-5" />
            <span className="text-[10px] font-tech tracking-wider">SETTINGS</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default TerminalApp;
