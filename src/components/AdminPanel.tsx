import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@/lib/rpc";
import { Link } from "@/lib/rpc";
import {
  Lock,
  KeyRound,
  ShieldCheck,
  Plus,
  Trash2,
  Ban,
  Check,
  Copy,
  RefreshCw,
  Monitor,
  Pencil,
  LogOut,
  Users,
  CalendarClock,
  Infinity as InfinityIcon,
  AlertCircle,
  X,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import {
  adminLogin,
  listLicenses,
  createLicense,
  updateLicense,
  deleteLicense,
  removeDevice,
  type License,
} from "@/lib/license.functions";

const PW_STORE = "ajju_admin_pw";

const DURATIONS = [
  { label: "1 DAY", days: 1 },
  { label: "7 DAYS", days: 7 },
  { label: "15 DAYS", days: 15 },
  { label: "30 DAYS", days: 30 },
  { label: "90 DAYS", days: 90 },
  { label: "180 DAYS", days: 180 },
  { label: "365 DAYS", days: 365 },
  { label: "LIFETIME", days: 0 },
];

const DEVICE_PRESETS = [
  { label: "1 DEVICE", value: 1 },
  { label: "2 DEVICES", value: 2 },
  { label: "3 DEVICES", value: 3 },
  { label: "5 DEVICES", value: 5 },
  { label: "UNLIMITED", value: 0 },
];

function fmt(d: string | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusOf(l: License) {
  if (l.revoked) return { text: "REVOKED", cls: "bg-red-500/10 text-red-400 border-red-500/30" };
  if (new Date(l.expires_at).getTime() < Date.now())
    return { text: "EXPIRED", cls: "bg-amber-500/10 text-amber-400 border-amber-500/30" };
  return { text: "ACTIVE", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" };
}

export const AdminPanel: React.FC = () => {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [copied, setCopied] = useState("");
  const [search, setSearch] = useState("");
  const [freshKey, setFreshKey] = useState("");

  // Create form
  const [label, setLabel] = useState("VIP MEMBER");
  const [tier, setTier] = useState("ULTRA_PREMIUM");
  const [deviceLimit, setDeviceLimit] = useState(1);
  const [customDevices, setCustomDevices] = useState("");
  const [durationDays, setDurationDays] = useState(30);
  const [customDays, setCustomDays] = useState("");
  const [notes, setNotes] = useState("");

  const login = useServerFn(adminLogin);
  const load = useServerFn(listLicenses);
  const create = useServerFn(createLicense);
  const update = useServerFn(updateLicense);
  const remove = useServerFn(deleteLicense);
  const dropDevice = useServerFn(removeDevice);

  const refresh = useCallback(
    async (pw: string) => {
      setBusy(true);
      try {
        const res = await load({ data: { password: pw } });
        setLicenses(res.licenses);
        setError("");
      } catch {
        setError("Session expired. Enter the admin password again.");
        setAuthed(false);
        sessionStorage.removeItem(PW_STORE);
      } finally {
        setBusy(false);
      }
    },
    [load],
  );

  useEffect(() => {
    const saved = sessionStorage.getItem(PW_STORE);
    if (saved) {
      setPassword(saved);
      setAuthed(true);
      void refresh(saved);
    }
  }, [refresh]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await login({ data: { password } });
      if (!res.ok) {
        setError(res.error ?? "Incorrect admin password.");
        return;
      }
      sessionStorage.setItem(PW_STORE, password);
      setAuthed(true);
      await refresh(password);
    } catch {
      setError("Incorrect admin password.");
    } finally {
      setBusy(false);
    }
  };

  const handleCreate = async () => {
    setBusy(true);
    setError("");
    try {
      const devices = customDevices.trim() ? Math.max(0, parseInt(customDevices, 10) || 0) : deviceLimit;
      const days = customDays.trim() ? Math.max(0, parseInt(customDays, 10) || 0) : durationDays;
      const res = await create({
        data: { password, label, tier, deviceLimit: devices, durationDays: days, notes },
      });
      setFreshKey(res.key);
      setNotes("");
      setCustomDays("");
      setCustomDevices("");
      await refresh(password);
    } catch {
      setError("Could not generate the key. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const act = async (fn: () => Promise<unknown>) => {
    setBusy(true);
    try {
      await fn();
      await refresh(password);
    } catch {
      setError("Action failed.");
    } finally {
      setBusy(false);
    }
  };

  const copy = (text: string) => {
    void navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(""), 1500);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return licenses;
    return licenses.filter(
      (l) => l.key.toLowerCase().includes(q) || l.label.toLowerCase().includes(q),
    );
  }, [licenses, search]);

  const stats = useMemo(() => {
    const active = licenses.filter((l) => statusOf(l).text === "ACTIVE").length;
    const devices = licenses.reduce((n, l) => n + l.devices.length, 0);
    return { total: licenses.length, active, devices };
  }, [licenses]);

  /* ---------------- LOCK SCREEN ---------------- */
  if (!authed) {
    return (
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl glass-panel-red border border-red-500/30 p-7 shadow-2xl shadow-black/70"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <BrandLogo size="lg" showText={false} className="justify-center mb-3" />
            <h1 className="font-tech text-xl font-extrabold tracking-widest text-slate-100">
              ADMIN CONTROL
            </h1>
            <p className="text-[11px] font-mono text-red-400 tracking-[0.2em] mt-1">
              /AJJUBOT • PASSWORD PROTECTED
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className="w-full px-4 py-3.5 pl-11 rounded-xl bg-slate-950/90 border border-red-500/30 text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-red-400"
            />
            <Lock className="w-4 h-4 text-red-400 absolute left-3.5 top-4" />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-tech font-extrabold tracking-widest text-sm uppercase disabled:opacity-50 cursor-pointer"
          >
            {busy ? "VERIFYING..." : "UNLOCK PANEL"}
          </button>

          <Link
            to="/"
            className="mt-4 block text-center text-[11px] font-mono text-slate-500 hover:text-slate-300"
          >
            ← BACK TO TERMINAL
          </Link>
        </form>
      </div>
    );
  }

  /* ---------------- PANEL ---------------- */
  return (
    <div className="relative z-10 min-h-screen p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl glass-panel-red border border-red-500/25 p-4 md:p-5">
        <div className="flex items-center gap-3">
          <BrandLogo size="md" showText={false} />
          <div>
            <h1 className="font-tech text-lg md:text-xl font-extrabold tracking-widest text-slate-100">
              ADMIN CONTROL CENTER
            </h1>
            <p className="text-[10px] font-mono text-red-400 tracking-[0.2em]">
              LICENSE • DEVICES • EXPIRY
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => void refresh(password)}
            disabled={busy}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-2 cursor-pointer hover:border-emerald-500/50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${busy ? "animate-spin" : ""}`} /> REFRESH
          </button>
          <button
            onClick={() => {
              sessionStorage.removeItem(PW_STORE);
              setAuthed(false);
              setPassword("");
            }}
            className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-xs font-mono text-red-400 flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> LOCK
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {[
          { label: "TOTAL KEYS", value: stats.total, icon: KeyRound },
          { label: "ACTIVE", value: stats.active, icon: ShieldCheck },
          { label: "DEVICES", value: stats.devices, icon: Monitor },
        ].map((s) => (
          <div key={s.label} className="rounded-xl glass-panel p-4 border border-slate-800">
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 tracking-widest">
              <s.icon className="w-3.5 h-3.5 text-emerald-400" /> {s.label}
            </div>
            <div className="mt-1 font-tech text-2xl font-extrabold text-slate-100">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Generate key */}
      <div className="rounded-2xl glass-panel-glow border border-emerald-500/25 p-4 md:p-6 space-y-4">
        <h2 className="font-tech text-sm font-extrabold tracking-widest text-emerald-400 flex items-center gap-2">
          <Plus className="w-4 h-4" /> GENERATE NEW ACCESS KEY
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="text-[10px] font-mono text-slate-400 tracking-widest">MEMBER NAME / LABEL</span>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-lg bg-slate-950/90 border border-slate-700 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </label>

          <label className="block">
            <span className="text-[10px] font-mono text-slate-400 tracking-widest">TIER</span>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-lg bg-slate-950/90 border border-slate-700 text-sm font-mono text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="ULTRA_PREMIUM">ULTRA_PREMIUM</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="STANDARD">STANDARD</option>
              <option value="TRIAL">TRIAL</option>
            </select>
          </label>

          <div>
            <span className="text-[10px] font-mono text-slate-400 tracking-widest">DEVICE LIMIT</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {DEVICE_PRESETS.map((d) => (
                <button
                  key={d.label}
                  onClick={() => {
                    setDeviceLimit(d.value);
                    setCustomDevices("");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono border cursor-pointer ${
                    !customDevices && deviceLimit === d.value
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold"
                      : "bg-slate-900 text-slate-300 border-slate-700"
                  }`}
                >
                  {d.label}
                </button>
              ))}
              <input
                value={customDevices}
                onChange={(e) => setCustomDevices(e.target.value)}
                placeholder="Custom devices"
                inputMode="numeric"
                className="px-3 py-1.5 w-32 rounded-lg bg-slate-950/90 border border-slate-700 text-[11px] font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono text-slate-400 tracking-widest">EXPIRY DURATION</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {DURATIONS.map((d) => (
                <button
                  key={d.label}
                  onClick={() => {
                    setDurationDays(d.days);
                    setCustomDays("");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono border cursor-pointer ${
                    !customDays && durationDays === d.days
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold"
                      : "bg-slate-900 text-slate-300 border-slate-700"
                  }`}
                >
                  {d.label}
                </button>
              ))}
              <input
                value={customDays}
                onChange={(e) => setCustomDays(e.target.value)}
                placeholder="Custom days"
                inputMode="numeric"
                className="px-3 py-1.5 w-32 rounded-lg bg-slate-950/90 border border-slate-700 text-[11px] font-mono text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <label className="block md:col-span-2">
            <span className="text-[10px] font-mono text-slate-400 tracking-widest">NOTES (OPTIONAL)</span>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 w-full px-3 py-2.5 rounded-lg bg-slate-950/90 border border-slate-700 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </label>
        </div>

        <button
          onClick={() => void handleCreate()}
          disabled={busy}
          className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-tech font-extrabold tracking-widest text-sm uppercase disabled:opacity-50 cursor-pointer"
        >
          {busy ? "WORKING..." : "GENERATE KEY"}
        </button>

        {freshKey && (
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="font-mono text-sm text-emerald-300 tracking-widest">{freshKey}</div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => copy(freshKey)}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 text-[11px] font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                {copied === freshKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                COPY
              </button>
              <button onClick={() => setFreshKey("")} className="text-slate-400 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* License list */}
      <div className="rounded-2xl glass-panel border border-slate-800 p-4 md:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-tech text-sm font-extrabold tracking-widest text-slate-100 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" /> ALL LICENSES ({filtered.length})
          </h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search key or member..."
            className="px-3 py-2 rounded-lg bg-slate-950/90 border border-slate-700 text-xs font-mono text-white focus:outline-none focus:border-emerald-500 w-full sm:w-64"
          />
        </div>

        {filtered.length === 0 && (
          <p className="text-xs font-mono text-slate-500 py-6 text-center">
            No keys yet. Generate the first VIP access key above.
          </p>
        )}

        <div className="space-y-3">
          {filtered.map((l) => {
            const st = statusOf(l);
            return (
              <div key={l.id} className="rounded-xl bg-slate-950/70 border border-slate-800 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-sm text-emerald-300 tracking-widest">{l.key}</span>
                      <button onClick={() => copy(l.key)} className="text-slate-400 cursor-pointer">
                        {copied === l.key ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold ${st.cls}`}>
                        {st.text}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] font-mono text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
                      <span className="text-slate-200">{l.label}</span>
                      <span>{l.tier}</span>
                      <span className="flex items-center gap-1">
                        <Monitor className="w-3 h-3" />
                        {l.devices.length}/
                        {l.device_limit === 0 ? <InfinityIcon className="w-3 h-3" /> : l.device_limit}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarClock className="w-3 h-3" /> {fmt(l.expires_at)}
                      </span>
                      <span>LAST LOGIN: {fmt(l.last_login_at)}</span>
                    </div>
                    {l.notes && (
                      <p className="mt-1 text-[11px] font-mono text-slate-500">NOTE: {l.notes}</p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => {
                        const name = window.prompt("New member name / label", l.label);
                        if (name) void act(() => update({ data: { password, id: l.id, label: name } }));
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" /> RENAME
                    </button>
                    <button
                      onClick={() => {
                        const n = window.prompt("Device limit (0 = unlimited)", String(l.device_limit));
                        if (n !== null)
                          void act(() =>
                            update({ data: { password, id: l.id, deviceLimit: parseInt(n, 10) || 0 } }),
                          );
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Monitor className="w-3.5 h-3.5" /> DEVICES
                    </button>
                    <button
                      onClick={() => {
                        const d = window.prompt(
                          "Extend / set expiry in days from now (0 = lifetime)",
                          "30",
                        );
                        if (d !== null) {
                          const days = parseInt(d, 10) || 0;
                          const iso = new Date(
                            Date.now() + (days > 0 ? days : 36500) * 86400000,
                          ).toISOString();
                          void act(() => update({ data: { password, id: l.id, expiresAt: iso } }));
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] font-mono text-slate-200 flex items-center gap-1.5 cursor-pointer"
                    >
                      <CalendarClock className="w-3.5 h-3.5" /> EXPIRY
                    </button>
                    <button
                      onClick={() => void act(() => update({ data: { password, id: l.id, revoked: !l.revoked } }))}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono flex items-center gap-1.5 cursor-pointer border ${
                        l.revoked
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      {l.revoked ? <Check className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                      {l.revoked ? "RESTORE" : "REVOKE"}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete key ${l.key}? This cannot be undone.`))
                          void act(() => remove({ data: { password, id: l.id } }));
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-[11px] font-mono text-red-400 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> DELETE
                    </button>
                  </div>
                </div>

                {l.devices.length > 0 && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {l.devices.map((d) => (
                      <div
                        key={d.id}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900/70 border border-slate-800"
                      >
                        <div className="min-w-0">
                          <p className="text-[11px] font-mono text-slate-200 truncate">{d.device_name}</p>
                          <p className="text-[10px] font-mono text-slate-500">
                            LAST SEEN: {fmt(d.last_seen)}
                          </p>
                        </div>
                        <button
                          onClick={() => void act(() => dropDevice({ data: { password, deviceRowId: d.id } }))}
                          className="px-2 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-[10px] font-mono text-red-400 cursor-pointer shrink-0"
                        >
                          REMOVE
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Link
        to="/"
        className="block text-center text-[11px] font-mono text-slate-500 hover:text-slate-300 pb-6"
      >
        ← BACK TO TRADING TERMINAL
      </Link>
    </div>
  );
};

export default AdminPanel;
