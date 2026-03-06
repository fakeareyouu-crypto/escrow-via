# Escrovia

**Escrovia** is a Telegram-focused escrow marketplace designed for secure digital trading between buyers and sellers.

The platform combines a **public product marketplace** with a **secure escrow deal system** so payments are only released after buyers confirm delivery.

Escrovia is built primarily for **Telegram-based trading communities**, where deals often start in chats but require a trusted escrow layer.

Owner: **Naitik**
Project: **Escrovia**

---

# Project Overview

Escrovia acts as a **middle layer of trust** between buyers and sellers.

Instead of sending money directly, buyers deposit funds into **escrow**, and the system releases payment only when the deal is successfully completed.

Key capabilities:

• Public marketplace catalogue
• Seller storefront pages
• Direct deal creation links
• Escrow deal lifecycle tracking
• Telegram bot notifications
• Admin monitoring panel

---

# Project Structure

```
escrovia/
│
├── frontend/
│   ├── app/
│   ├── components/
│   └── lib/
│
├── backend/
│   └── api/
│
├── bot/
│
├── database/
│
├── .env.example
├── package.json
└── README.md
```

---

# Technology Stack

Frontend

* Next.js (App Router)
* TailwindCSS
* Responsive mobile-first UI

Backend

* Node.js API handlers
* Supabase (Authentication + PostgreSQL)

Notifications

* Telegram Bot API

Hosting

* Vercel

---

# User Roles

## Buyer

Buyers can:

* Browse marketplace catalogue
* Start escrow deals
* Fund escrow payments
* Confirm delivery
* Open disputes if needed

---

## Seller

Sellers can:

* Create product listings
* Edit and manage products
* Accept buyer deals
* Deliver digital goods
* Receive released escrow payments

---

## Admin

Admins can:

* Monitor all deals
* Review disputes
* Suspend fraudulent users
* Track transaction history

---

# Core Features

## Public Marketplace

Anyone can browse available listings.

Marketplace includes:

* Product cards
* Seller information
* Pricing
* Start deal button

Product page route:

```
/product/[id]
```

---

## Seller Store Pages

Each seller has a public storefront.

Example:

```
/store/username
```

This page shows:

* Seller profile
* Seller rating
* All listed products

---

## Direct Deal Creation

Deals can also be created **outside the marketplace**.

Example use case:

Buyer and seller negotiate in Telegram chat, then open a deal using:

```
/deal/create?seller=username&amount=10
```

This creates a deal without needing a product listing.

---

# Escrow Workflow

Escrovia follows a clear deal lifecycle.

1. Buyer starts deal → `pending`

2. Seller accepts deal → `accepted`

3. Buyer funds escrow → `escrow_funded`

4. Seller delivers product → `delivered`

5. Buyer confirms delivery → `completed`

6. Escrow payment is released to seller.

Exception path:

`disputed`

---

# Telegram Bot Integration

Escrovia uses a Telegram bot to notify users about deal activity.

Notifications include:

• New deal created
• Deal accepted
• Escrow funded
• Product delivered
• Payment released

---

## Telegram Commands

```
/start
```

Links Telegram account with Escrovia.

```
/deals
```

Shows active deals.

```
/notifications
```

Manage notification settings.

---

# Database Schema

Main tables:

Users

```
users
- id
- username
- email
- role
- telegram_id
- rating
- created_at
```

Products

```
products
- id
- seller_id
- title
- description
- category
- price
- images
- created_at
```

Deals

```
deals
- id
- buyer_id
- seller_id
- product_id
- amount
- status
- created_at
```

Transactions

```
transactions
- id
- deal_id
- amount
- status
- created_at
```

---

# Environment Variables

Create `.env` from `.env.example`.

Required variables:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

TELEGRAM_BOT_TOKEN=

APP_URL=
```

---

# Installation

Clone repository

```
git clone <your-repository-url>
cd escrovia
```

Install dependencies

```
npm install
```

Create environment file

```
cp .env.example .env
```

Add your Supabase and Telegram credentials.

---

# Database Setup

Create a project in Supabase.

Open SQL Editor and run:

```
database/schema.sql
```

This will create required tables.

Recommended production improvements:

* Row Level Security policies
* Audit logs
* Payment idempotency protection
* Webhook verification

---

# Running Locally

Start development server

```
npm run dev
```

Local site:

```
http://localhost:3000
```

---

Start Telegram bot (separate terminal):

```
node bot/telegramBot.js
```

---

# Backend API Endpoints

Available API handlers:

```
GET  /api/getProducts
POST /api/createProduct
POST /api/createDeal
POST /api/releaseEscrow
```

These functions live inside:

```
backend/api
```

For production deployment they can be moved into Next.js API routes.

---

# Deployment

Recommended deployment platform:

Vercel

Steps:

1. Push project to GitHub
2. Import repository in Vercel
3. Configure environment variables
4. Deploy

---

# Security Recommendations

For production use:

* Enable Supabase Row Level Security
* Validate API payloads
* Add rate limiting
* Implement anti-fraud checks
* Protect payment webhooks
* Use server-side logging

---

# Future Roadmap

Potential upgrades:

• Ratings and review system
• Internal wallet system
• Dispute evidence uploads
• Seller reputation scoring
• Multi-language support
• Crypto payment support

---

# License

This project is currently proprietary.

License terms may be updated in future releases.

---

# Final Notes

Escrovia aims to become a **trusted escrow infrastructure for Telegram-based digital trading communities**.

The current version provides a solid MVP foundation and can be expanded with payment integrations, wallet systems, and advanced dispute resolution features.
