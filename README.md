# DCT Survival Kit

Production web build for the Rork-exported DCT Survival Kit.

## Local Development

```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```

## Production Plumbing

Implemented:

- Supabase email/password auth and optional magic-link sign-in.
- Supabase schema for profiles, modules, toolkits, bookmarks, progress, Trust settings, and reported issues.
- Account sync for bookmarks, read progress, toolkit checklist state, and My Trust settings.
- Stripe Checkout for the annual subscription and Stripe Customer Portal for billing/cancellation.
- Stripe webhook endpoint with signature verification. Subscription access is never simulated client-side.
- Vercel configuration for SPA routing, serverless API functions, and deployment under `dctsurvivalkit.co.uk`.

## Supabase Setup

1. Create a Supabase project.
2. Run `web/supabase/migrations/001_initial_product_schema.sql` in Supabase SQL editor or through the Supabase CLI.
3. Add the Site URL and redirect URLs:
   - `http://localhost:8080`
   - `http://localhost:8080/app/billing`
   - `https://dctsurvivalkit.co.uk`
   - `https://dctsurvivalkit.co.uk/app/billing`
4. Add environment variables from `web/.env.example`.
5. Seed content:

```bash
cd web
npm run db:seed
```

## Stripe Setup

1. Create a recurring annual GBP price for £60.
2. Set `STRIPE_ANNUAL_PRICE_ID`.
3. Configure a webhook to `https://dctsurvivalkit.co.uk/api/stripe-webhook`.
4. Subscribe to:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Set `STRIPE_WEBHOOK_SECRET`.
6. Configure the Stripe Customer Portal.

## Vercel / Domain

Set the Vercel project root to `web`, then add:

- `dctsurvivalkit.co.uk`
- `www.dctsurvivalkit.co.uk` if wanted

Point DNS to Vercel using the records Vercel gives for the project. Set `APP_URL` and `VITE_APP_URL` to `https://dctsurvivalkit.co.uk`.

## Launch Blockers

- Clinical review and sign-off remain required for content marked `Needs clinical review`.
- Legal review is still required for terms, privacy policy, disclaimer, refund/cancellation wording, and clinical risk language.
- Live Supabase, Stripe, Vercel, and DNS credentials were not available in this coding session and must be configured in dashboards.
- The Rork SPA still includes fallback bundled content for offline/PWA use. For strict server-only content protection, move module/toolkit reads fully behind authenticated API endpoints before launch.
