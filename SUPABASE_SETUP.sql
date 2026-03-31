-- PKP PLK Ratownik v15 - konfiguracja Supabase
-- Uruchom cały skrypt w Supabase SQL Editor.

create table if not exists public.rescuers (
  id text primary key,
  name text not null,
  phone text,
  zone text,
  location text,
  shift text,
  skills text,
  active boolean default true,
  "alarmGroup" boolean default true
);

create table if not exists public.aeds (
  id text primary key,
  name text not null,
  location text not null,
  lat double precision,
  lon double precision
);

create table if not exists public.kits (
  id text primary key,
  name text not null,
  type text,
  location text not null,
  categories text[] default '{}',
  items jsonb default '[]'::jsonb
);

create table if not exists public.topics (
  id text primary key,
  n integer,
  category text,
  icon text,
  t text not null,
  img text,
  images text[] default '{}',
  lead text,
  "leadTitle" text,
  "leadColor" text,
  "stepsColor" text,
  "warnColor" text,
  "notesColor" text,
  s jsonb default '[]'::jsonb,
  "relatedAlgorithmIds" text[] default '{}'
);

create table if not exists public.algorithms (
  id text primary key,
  icon text,
  title text not null,
  category text,
  accent text,
  steps text[] default '{}'
);


create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb
);

-- Aktualizacja istniejÄ…cych instalacji do obecnej wersji aplikacji
alter table public.rescuers add column if not exists phone text;
alter table public.rescuers add column if not exists zone text;
alter table public.rescuers add column if not exists location text;
alter table public.rescuers add column if not exists shift text;
alter table public.rescuers add column if not exists skills text;
alter table public.rescuers add column if not exists active boolean default true;
alter table public.rescuers add column if not exists "alarmGroup" boolean default true;

alter table public.aeds add column if not exists location text;
alter table public.aeds add column if not exists lat double precision;
alter table public.aeds add column if not exists lon double precision;

alter table public.kits add column if not exists type text;
alter table public.kits add column if not exists location text;
alter table public.kits add column if not exists categories text[] default '{}';
alter table public.kits add column if not exists items jsonb default '[]'::jsonb;

alter table public.topics add column if not exists n integer;
alter table public.topics add column if not exists category text;
alter table public.topics add column if not exists icon text;
alter table public.topics add column if not exists t text;
alter table public.topics add column if not exists img text;
alter table public.topics add column if not exists images text[] default '{}';
alter table public.topics add column if not exists lead text;
alter table public.topics add column if not exists "leadTitle" text;
alter table public.topics add column if not exists "leadColor" text;
alter table public.topics add column if not exists "stepsColor" text;
alter table public.topics add column if not exists "warnColor" text;
alter table public.topics add column if not exists "notesColor" text;
alter table public.topics add column if not exists s jsonb default '[]'::jsonb;
alter table public.topics add column if not exists "relatedAlgorithmIds" text[] default '{}';

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'topics'
      and column_name = 'title'
  ) then
    execute 'update public.topics set t = coalesce(nullif(t, ''''), title) where coalesce(t, '''') = ''''';
  end if;
end $$;

update public.topics
set t = 'Temat'
where coalesce(t, '') = '';

alter table public.algorithms add column if not exists icon text;
alter table public.algorithms add column if not exists category text;
alter table public.algorithms add column if not exists accent text;
alter table public.algorithms add column if not exists steps text[] default '{}';

alter table public.app_settings add column if not exists value jsonb not null default '{}'::jsonb;

alter table public.rescuers enable row level security;
alter table public.aeds enable row level security;
alter table public.kits enable row level security;
alter table public.topics enable row level security;
alter table public.algorithms enable row level security;
alter table public.app_settings enable row level security;

drop policy if exists rescuers_public_read on public.rescuers;
drop policy if exists rescuers_auth_write on public.rescuers;
create policy rescuers_public_read on public.rescuers for select to anon, authenticated using (true);
create policy rescuers_auth_write on public.rescuers for all to authenticated using (true) with check (true);

drop policy if exists aeds_public_read on public.aeds;
drop policy if exists aeds_auth_write on public.aeds;
create policy aeds_public_read on public.aeds for select to anon, authenticated using (true);
create policy aeds_auth_write on public.aeds for all to authenticated using (true) with check (true);

drop policy if exists kits_public_read on public.kits;
drop policy if exists kits_auth_write on public.kits;
create policy kits_public_read on public.kits for select to anon, authenticated using (true);
create policy kits_auth_write on public.kits for all to authenticated using (true) with check (true);

drop policy if exists topics_public_read on public.topics;
drop policy if exists topics_auth_write on public.topics;
create policy topics_public_read on public.topics for select to anon, authenticated using (true);
create policy topics_auth_write on public.topics for all to authenticated using (true) with check (true);

drop policy if exists algorithms_public_read on public.algorithms;
drop policy if exists algorithms_auth_write on public.algorithms;
create policy algorithms_public_read on public.algorithms for select to anon, authenticated using (true);
create policy algorithms_auth_write on public.algorithms for all to authenticated using (true) with check (true);

drop policy if exists app_settings_public_read on public.app_settings;
drop policy if exists app_settings_auth_write on public.app_settings;
create policy app_settings_public_read on public.app_settings for select to anon, authenticated using (true);
create policy app_settings_auth_write on public.app_settings for all to authenticated using (true) with check (true);

grant usage on schema public to anon, authenticated;
grant select on public.rescuers, public.aeds, public.kits, public.topics, public.algorithms, public.app_settings to anon, authenticated;
grant insert, update, delete on public.rescuers, public.aeds, public.kits, public.topics, public.algorithms, public.app_settings to authenticated;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'rescuers') then
      alter publication supabase_realtime add table public.rescuers;
    end if;
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'aeds') then
      alter publication supabase_realtime add table public.aeds;
    end if;
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'kits') then
      alter publication supabase_realtime add table public.kits;
    end if;
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'topics') then
      alter publication supabase_realtime add table public.topics;
    end if;
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'algorithms') then
      alter publication supabase_realtime add table public.algorithms;
    end if;
    if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'app_settings') then
      alter publication supabase_realtime add table public.app_settings;
    end if;
  end if;
end $$;

insert into app_settings (key, value) values
('eventTypes', '["Brak przytomności","Brak oddechu / RKO","Silny krwotok","Oparzenie termiczne","Drgawki","Uraz w terenie","Zadławienie","Porażenie prądem","Wypadek kolejowy"]'::jsonb)
on conflict (key) do nothing;
