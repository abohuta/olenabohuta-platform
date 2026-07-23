-- Run this SQL in Supabase → SQL Editor

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  plan TEXT NOT NULL CHECK (plan IN ('season', 'year', 'manual')),
  months INTEGER NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  subscription_id INTEGER REFERENCES subscriptions(id),
  order_ref TEXT UNIQUE NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL,
  plan TEXT NOT NULL,
  months INTEGER NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('wayforpay', 'paypal')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  paypal_order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status_expires ON subscriptions(status, expires_at);
CREATE INDEX IF NOT EXISTS idx_payments_order_ref ON payments(order_ref);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
