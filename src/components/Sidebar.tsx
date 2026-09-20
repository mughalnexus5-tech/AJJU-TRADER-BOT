import React from "react";
import { AppNavView } from "../types";
import { playClickSound } from "../utils/soundEffects";
import { 
  LayoutDashboard, 
  Cpu, 
  TrendingUp, 
  BookOpen, 
  History, 
  BarChart3, 
  UserCircle, 
  Sliders,
  Sparkles,
  ShieldAlert
} from "lucide-react";

interface SidebarProps {
  activeView: AppNavView;
  onSelectView: (view: AppNavView) => void;
  soundEnabled: boolean;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

interface NavItem {
  id: AppNavView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  isPrimary?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "HOME", icon: LayoutDashboard },
  { id: "signals", label: "SIGNAL GENERATOR", icon: Cpu, badge: "CORE", isPrimary: true },
  { id: "market", label: "MARKET", icon: TrendingUp },
  { id: "strategies", label: "STRATEGIES", icon: BookOpen, badge: "10" },
  { id: "history", label: "SIGNAL HISTORY", icon: History },
  { id: "statistics", label: "STATISTICS", icon: BarChart3 },
  { id: "profile", label: "PROFILE", icon: UserCircle },
  { id: "settings", label: "SETTINGS", icon: Sliders }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  soundEnabled,
  mobileMenuOpen,
  onCloseMobileMenu
}) => {
  const handleNavClick = (view: AppNavView) => {
    playClickSound(soundEnabled);
    onSelectView(view);
    onCloseMobileMenu();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={onCloseMobileMenu}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 glass-panel border-r border-slate-800/80 p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Navigation List */}
        <div className="space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center justify-between">
            <span>TERMINAL MODULES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            if (item.isPrimary) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative w-full group flex items-center justify-between px-3.5 py-3 rounded-xl font-tech text-sm tracking-wider font-bold transition-all duration-200 cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 shadow-lg shadow-emerald-950/80 border border-emerald-400"
                      : "bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 border border-emerald-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? "text-slate-950" : "text-emerald-400 animate-pulse"}`} />
                    <span>{item.label}</span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      isActive ? "bg-slate-950 text-emerald-300" : "bg-emerald-500/20 text-emerald-300"
                    }`}
                  >
                    VIP
                  </span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-tech text-xs tracking-wider font-semibold transition cursor-pointer ${
                  isActive
                    ? "bg-slate-800/90 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-950/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-500"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Terminal Status Box */}
        <div className="pt-4 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 font-mono text-[11px] space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span>ALGO ENGINE</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> v4.8 ACTIVE
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>SECURITY</span>
              <span className="text-emerald-400 font-bold">L2 ENCRYPTED</span>
            </div>
            <div className="flex items-center justify-between text-slate-500 text-[10px] pt-1">
              <span>LATENCY</span>
              <span className="text-slate-400 font-mono">12 MS ULTRA-FAST</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
