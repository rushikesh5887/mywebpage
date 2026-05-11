create table if not exists public.visitors (
  id bigint generated always as identity primary key,
  city text,
  country text,
  latitude double precision,
  longitude double precision,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table public.visitors
add column if not exists latitude double precision;

alter table public.visitors
add column if not exists longitude double precision;

alter table public.visitors enable row level security;

drop policy if exists "Allow public insert" on public.visitors;
drop policy if exists "Allow public read" on public.visitors;

create policy "Allow public insert"
on public.visitors
for insert
to anon
with check (true);

create policy "Allow public read"
on public.visitors
for select
to anon
using (true);
