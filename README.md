# Escrovia

Escrovia is a Telegram-focused escrow marketplace platform for secure digital product trading between buyers and sellers.

It combines:
- **Public marketplace discovery** (catalogue + product pages)
- **Direct deal creation** for trades initiated outside the marketplace (for example in Telegram chats)
- **Escrow workflow** so funds are only released after buyer confirmation
- **Telegram bot notifications** for deal lifecycle updates

Owner: **NAITIK**  
Developer: **NAITIK**

---

## Project Architecture

```txt
escrovia/
├── frontend/
│   ├── app/
│   ├── components/
│   └── lib/
├── backend/
│   └── api/
├── bot/
├── database/
├── .env.example
├── package.json
└── README.md
```

### Stack
- **Frontend:** Next.js (App Router), TailwindCSS, mobile-first responsive UI
- **Backend:** Node.js REST-style handlers, Supabase (Auth + PostgreSQL)
- **Notifications:** Telegram Bot API
- **Hosting:** Vercel (frontend + serverless API)

---

## Core User Roles

### Buyer
- Browse marketplace catalogue
- Start escrow deals
- Fund escrow
- Confirm delivery
- Open disputes

### Seller
- Create, update, delete listings
- Accept deals
- Deliver products
- Receive released funds

### Admin
- View all deals and disputes
- Suspend users
- Monitor escrow transactions

---

## Feature Coverage in MVP Scaffold

- Authentication pages (login/register UI)
- Public marketplace and product details pages
- Seller dashboard and product management pages
- Deals page with escrow timeline status indicator
- Direct deal creation route: `/deal/create?seller=username&amount=10`
- Public seller store page: `/store/[username]`
- Admin panel page
- Backend API handlers:
  - `createDeal`
  - `createProduct`
  - `releaseEscrow`
  - `getProducts`
- Telegram bot commands:
  - `/start`
  - `/deals`
  - `/notifications`
- SQL schema for users, products, deals, transactions

---

## Installation

### 1) Clone repository

```bash
git clone <your-repo-url>
cd escrow-via
```

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

```bash
cp .env.example .env
```

Fill `.env` values for Supabase and Telegram.

---

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Browser client Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Browser client Supabase anon key |
| `SUPABASE_URL` | Yes | Server-side Supabase URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-side privileged key |
| `TELEGRAM_BOT_TOKEN` | Yes | Telegram bot token from BotFather |
| `APP_URL` | Yes | Public app URL used by bot deep links |

---

## Database Setup (Supabase)

1. Create a new Supabase project.
2. Open SQL editor.
3. Execute:

```sql
-- Run entire file
database/schema.sql
```

This creates:
- `users`
- `products`
- `deals`
- `transactions`
- `notifications_queue`

### Recommended production additions
- Row Level Security (RLS) policies for each table
- Audit trail table for status transitions
- Idempotency keys for payment operations
- Webhook signature verification for payment provider events

---

## Running Locally

### Start frontend

```bash
npm run dev
```

Default local URL: `http://localhost:3000`

### Start Telegram bot (separate terminal)

```bash
node bot/telegramBot.js
```

---

## API Endpoints (Backend Handlers)

Current handlers are in `backend/api` and follow REST-style function signatures.

- `GET /api/getProducts`
- `POST /api/createProduct`
- `POST /api/createDeal`
- `POST /api/releaseEscrow`

> In Vercel deployment, map these to serverless functions or move them under Next.js route handlers (`frontend/app/api/*`).

---

## Escrow Deal Lifecycle

1. Buyer starts deal (`pending`)
2. Seller accepts (`accepted`)
3. Buyer funds escrow (`escrow funded`)
4. Seller delivers (`delivered`)
5. Buyer confirms (`completed` + escrow release)
6. Optional exception path: `disputed`

---

## Telegram Bot Setup

1. Open Telegram and create a bot via **@BotFather**.
2. Copy bot token into `.env` as `TELEGRAM_BOT_TOKEN`.
3. Ensure `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set.
4. Run:

```bash
node bot/telegramBot.js
```

### Implemented commands
- `/start`: account-link prompt
- `/deals`: shows active deals for linked user
- `/notifications`: notification preference placeholder

### Automatic notifications
Use `notifications_queue` plus a worker/cron to push deal event updates to users.

---

## Deploying to Vercel

1. Push repository to GitHub.
2. Import project into Vercel.
3. Configure root project settings (or monorepo settings for `frontend`).
4. Add environment variables from `.env.example`.
5. Deploy.

### Notes
- Ensure server-side keys are never exposed to the client bundle.
- For production, move API handlers to Vercel-compatible serverless paths if needed.
- Add monitoring/logging (e.g. Sentry + Vercel logs).

---

## Security and Scalability Notes

- Validate all API payloads with schema validation (e.g. Zod)
- Enforce role-based access in API and RLS
- Implement signed webhooks for payment processor
- Use background jobs for bot notifications and retries
- Add rate limiting and anti-fraud checks

---

## Roadmap Extensions

- Ratings/reviews system
- Internal wallet and balance ledger
- Evidence upload for disputes
- Reputation score and risk engine
- Multi-language support for Telegram-first users

---

## License

Proprietary (update as needed).
