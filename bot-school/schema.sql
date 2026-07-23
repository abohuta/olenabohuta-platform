-- Школа Олени Богути — схема БД

create table if not exists school_users (
  id bigserial primary key,
  telegram_id bigint unique not null,
  username text,
  first_name text,
  last_name text,
  created_at timestamptz default now()
);

create table if not exists courses (
  id serial primary key,
  name text not null,
  description text,
  price_usd numeric(10,2) not null,
  access_type text not null default 'url',   -- 'url' або 'telegram'
  access_value text not null,                 -- URL або Telegram chat_id
  active boolean default true,
  created_at timestamptz default now()
);

create table if not exists course_payments (
  id bigserial primary key,
  user_id bigint references school_users(id),
  course_id int references courses(id),
  order_ref text unique not null,
  amount numeric(10,2) not null,
  currency text not null,
  payment_method text not null,
  paypal_order_id text,
  status text not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists course_enrollments (
  id bigserial primary key,
  user_id bigint references school_users(id),
  course_id int references courses(id),
  payment_id bigint references course_payments(id),
  created_at timestamptz default now(),
  unique(user_id, course_id)
);
