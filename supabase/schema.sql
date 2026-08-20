-- SmartFlow Myanmar CRM schema
-- Run this once in Supabase SQL Editor before using the database-backed workspace.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null default '',
  email text not null default '',
  company text not null default '',
  status text not null default 'lead' check (status in ('lead','active','inactive','archived')),
  source text not null default 'Messenger' check (source in ('Messenger','Viber','Website','Phone','Other')),
  notes text not null default '',
  tags text[] not null default '{}',
  last_touch timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  order_number text not null unique,
  amount numeric(14,2) not null default 0 check (amount >= 0),
  status text not null default 'new' check (status in ('new','processing','confirmed','completed','cancelled')),
  channel text not null default 'Messenger' check (channel in ('Messenger','Viber','Website','Phone','Other')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  type text not null default 'note' check (type in ('note','call','meeting','email')),
  title text not null,
  description text not null default '',
  activity_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists customers_status_idx on public.customers(status);
create index if not exists customers_source_idx on public.customers(source);
create index if not exists customers_last_touch_idx on public.customers(last_touch);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_customer_idx on public.orders(customer_id);
create index if not exists activities_customer_idx on public.activities(customer_id);
create index if not exists activities_activity_at_idx on public.activities(activity_at desc);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists customers_touch_updated_at on public.customers;
create trigger customers_touch_updated_at before update on public.customers for each row execute function public.touch_updated_at();
drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at before update on public.orders for each row execute function public.touch_updated_at();

create or replace function public.is_smartflow_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid());
$$;

alter table public.admin_users enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.activities enable row level security;

drop policy if exists "Admins can read admin allowlist" on public.admin_users;
create policy "Admins can read admin allowlist" on public.admin_users for select to authenticated using (user_id = auth.uid());

drop policy if exists "Admins can manage customers" on public.customers;
create policy "Admins can manage customers" on public.customers for all to authenticated using (public.is_smartflow_admin()) with check (public.is_smartflow_admin());

drop policy if exists "Admins can manage orders" on public.orders;
create policy "Admins can manage orders" on public.orders for all to authenticated using (public.is_smartflow_admin()) with check (public.is_smartflow_admin());

drop policy if exists "Admins can manage activities" on public.activities;
create policy "Admins can manage activities" on public.activities for all to authenticated using (public.is_smartflow_admin()) with check (public.is_smartflow_admin());

-- After creating the Admin user in Supabase Auth, grant that exact user access:
-- insert into public.admin_users (user_id) values ('PASTE_AUTH_USER_UUID_HERE');
