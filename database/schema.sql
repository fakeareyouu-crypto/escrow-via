create extension if not exists "pgcrypto";

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  email text unique not null,
  role text not null check (role in ('buyer', 'seller', 'admin')),
  telegram_id text unique,
  rating numeric(2,1) default 5.0,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references users(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  price numeric(12,2) not null check (price > 0),
  images text[] default '{}',
  created_at timestamptz default now()
);

create table if not exists deals (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references users(id) on delete cascade,
  seller_id uuid not null references users(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  amount numeric(12,2) not null check (amount > 0),
  status text not null check (status in ('pending','accepted','escrow funded','delivered','completed','disputed')),
  escrow_status text not null check (escrow_status in ('unfunded','funded','released','refunded')),
  created_at timestamptz default now()
);

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  deal_id uuid not null references deals(id) on delete cascade,
  amount numeric(12,2) not null,
  status text not null,
  created_at timestamptz default now()
);

create table if not exists notifications_queue (
  id bigserial primary key,
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  payload jsonb not null,
  processed boolean default false,
  created_at timestamptz default now()
);
