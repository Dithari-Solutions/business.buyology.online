# Buyology Business

Next.js 16 + TypeScript partner website for `business.buyology.online`.

## Local development

```sh
npm ci
npm run dev
```

Development uses Webpack, matching the production build, to avoid Turbopack persistence errors on external macOS drives.

The two public routes are `/` and `/become-partner/`. `npm run build` generates a static export in `out/`. The site reuses the v2 Buyology logos, Raleway font and brand palette (#FFBE12, #402F75, black and white). The laptop illustration is an existing v2 asset.

Set `NEXT_PUBLIC_API_BASE_URL` before building if the API is not `https://api.buyology.online`. This is a public URL, never a secret. Local submissions require the backend running, with the site's local origin included in `CORS_ALLOWED_ORIGINS`.

## Form

The qualification questions come from `Buyology_Stockist_Partner_Quick_Qualification_Form.docx`. Its final confirmation section is incorporated into step 5 to preserve the requested five-step flow. Email is added as a required contact field for the confirmation email. Website/social media is optional. Every Yes/No answer is required, and No is a valid answer. Investment requires one selection; preferred partnership requires exactly one selection. Forms stay in memory; a refresh discards an unsubmitted application.

Client and backend validate all required answers. Requests use a UUID reference to make retries of the same submission idempotent. A response containing the saved request ID is required before displaying success. No application data is saved in browser storage.

## Backend and dashboard

The accompanying backend changes provide:

- `POST /api/partnership/requests`: public, validated, rate limited, idempotent creation.
- `GET /api/admin/partnership/requests?page=0`: authenticated, authorized, 25 requests per page.
- `PATCH /api/admin/partnership/requests/{id}/status`: authorized status/internal note updates.
- Flyway migration `V63__partnership_requests.sql` for durable requests and email queue state.
- Confirmation email delivery through the existing SendGrid service, after the database commit, with up to five attempts. `SENT` means provider acceptance, not guaranteed inbox delivery. Row locks prevent two backend instances processing the same queued email concurrently. Like ordinary transactional outboxes, a process crash after provider acceptance but before commit may result in a duplicate confirmation.

The dashboard sidebar has **Partnership requests** at `/partnership-requests`. It shows all submitted forms through pagination, every answer in the detail view, partnership interests, investment, internal notes, review status, and email status. Superadmins and customer support may access it; legacy admins follow the existing RBAC policy.

## Production rollout

1. Deploy the backend changes first; Flyway runs migration V63. Retain the existing SendGrid configuration. No new email credentials are required.
2. Deploy the dashboard changes so reviewers can access Partnership requests.
3. Build and host this project's `out/` directory. Configure the host to serve `/become-partner/index.html` for `/become-partner/` rather than an SPA fallback.
4. Route `business.buyology.online` to the chosen host and verify TLS. Its origin is included in the backend CORS allowlist. A preview origin must be explicitly added to `CORS_ALLOWED_ORIGINS` if preview submissions are needed.
5. Submit an authorized test application and verify the database record, dashboard detail, and actual confirmation receipt. Local checks mock email delivery and do not send to applicants.

SEO includes route-specific titles/descriptions, canonical URLs, Open Graph and Twitter metadata, Organization JSON-LD, sitemap and robots files. Canonical URLs target the requested production domain; a private hosted preview is not intended for indexing.

## Static serving with PM2

Use `deploy/serve-config.json` with the `serve` static server. `cleanUrls` must be enabled so `/` and `/become-partner/` resolve to their exported `index.html` files. Disabling it while directory listings are disabled returns the exported Next.js 404 page on direct visits.

For an existing PM2 deployment created with a root-level `serve-config.json`:

```sh
cp deploy/serve-config.json serve-config.json
pm2 restart business.buyology.online
```

For a new deployment after building (with `pm2` and `serve` installed):

```sh
pm2 start "$(command -v serve)" --name business.buyology.online --cwd "$PWD" -- out --listen tcp://127.0.0.1:9999 --config "$PWD/deploy/serve-config.json"
pm2 save
```

Nginx can proxy requests unchanged to `http://127.0.0.1:9999`. Check both the homepage and `/become-partner/` with a direct request after deployment.
