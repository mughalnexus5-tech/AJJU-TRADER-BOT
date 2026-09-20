// Standalone license client: talks to the Lovable Cloud license API over HTTPS.
// Set VITE_LICENSE_API in Vercel env vars if your cloud URL changes.

const API =
  (import.meta.env["VITE_LICENSE_API"] as string | undefined) ??
  "https://ajjutraderbot.lovable.app/api/public/license";

export type LicenseDevice = {
  id: string;
  device_id: string;
  device_name: string;
  ip: string | null;
  first_seen: string;
  last_seen: string;
};

export type License = {
  id: string;
  key: string;
  label: string;
  tier: string;
  device_limit: number;
  expires_at: string;
  revoked: boolean;
  notes: string | null;
  last_login_at: string | null;
  created_at: string;
  devices: LicenseDevice[];
};

async function call<T>(action: string, payload: Record<string, unknown>): Promise<T> {
  let res: Response;
  try {
    res = await fetch(API, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, ...payload }),
    });
  } catch {
    throw new Error("License server unreachable. Check your internet connection.");
  }
  const body = (await res.json().catch(() => ({}))) as { error?: string } & T;
  if (!res.ok) throw new Error(body.error || `License server error (${res.status})`);
  return body;
}

export const verifyAccessKey = ({
  data,
}: {
  data: { key: string; deviceId: string; deviceName: string };
}) =>
  call<
    | { ok: true; session: { username: string; role: string; tier: string; key: string; expiryDate: string } }
    | { ok: false; error: string }
  >("verify", data);

export const adminLogin = ({ data }: { data: { password: string } }) =>
  call<{ ok: true } | { ok: false; error: string }>("adminLogin", data);

export const listLicenses = ({ data }: { data: { password: string } }) =>
  call<{ licenses: License[] }>("list", data);

export const createLicense = ({
  data,
}: {
  data: {
    password: string;
    label: string;
    tier: string;
    deviceLimit: number;
    durationDays: number;
    notes?: string;
  };
}) => call<{ key: string }>("create", data);

export const updateLicense = ({
  data,
}: {
  data: {
    password: string;
    id: string;
    label?: string;
    tier?: string;
    deviceLimit?: number;
    expiresAt?: string;
    revoked?: boolean;
    notes?: string;
  };
}) => call<{ ok: true }>("update", data);

export const deleteLicense = ({ data }: { data: { password: string; id: string } }) =>
  call<{ ok: true }>("delete", data);

export const removeDevice = ({ data }: { data: { password: string; deviceRowId: string } }) =>
  call<{ ok: true }>("removeDevice", data);
