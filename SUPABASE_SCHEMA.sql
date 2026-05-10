create table if not exists orders (
  id text primary key,
  name text not null,
  email text not null,
  phone text,
  consent boolean default false,
  status text not null default 'pending',
  amount numeric not null default 149,
  currency text not null default 'ILS',
  product_name text,
  cardcom_low_profile_code text,
  cardcom_transaction_id text,
  cardcom_deal_response text,
  cardcom_operation_response text,
  cardcom_return_value text,
  guide_access_token text,
  email_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists events (
  id bigserial primary key,
  order_id text references orders(id) on delete set null,
  type text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create index if not exists orders_email_idx on orders(email);
create index if not exists orders_status_idx on orders(status);
create index if not exists orders_guide_access_token_idx on orders(guide_access_token);
create index if not exists events_order_id_idx on events(order_id);
