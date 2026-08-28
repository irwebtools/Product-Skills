-- Settings presets: per-user saved System Settings configurations
create table public.settings_presets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  settings jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint settings_presets_name_not_empty check (char_length(trim(name)) > 0)
);

create index settings_presets_user_id_idx on public.settings_presets (user_id);

create or replace function public.set_settings_presets_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger settings_presets_set_updated_at
  before update on public.settings_presets
  for each row
  execute function public.set_settings_presets_updated_at();

alter table public.settings_presets enable row level security;

create policy "Users can view own presets"
  on public.settings_presets
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can create own presets"
  on public.settings_presets
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can modify own presets"
  on public.settings_presets
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own presets"
  on public.settings_presets
  for delete
  to authenticated
  using (auth.uid() = user_id);
