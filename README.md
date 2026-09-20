# AJJU TRADER BOT — Vercel package

Same bot, same logo, same license system. The license keys and devices still live in
your Lovable Cloud database; this app talks to it over HTTPS.

## Deploy on Vercel

1. Upload / import this folder into Vercel (or drag the ZIP into a new project).
2. Framework preset: **Vite** (already set in `vercel.json`).
3. Deploy. That's it — no database keys needed here.

## License server URL

By default the app calls:

    https://ajjutraderbot.lovable.app/api/public/license

If your Lovable URL is different, add this Environment Variable in Vercel:

    VITE_LICENSE_API = https://<your-lovable-domain>/api/public/license

Important: the Lovable app must be **published** once so this endpoint is live.

## Routes

- `/` — trader terminal (access key login)
- `/ajjubot` — admin panel (password only, keys / devices / expiry / revoke / delete)
