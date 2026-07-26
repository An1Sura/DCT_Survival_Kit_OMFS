alter table public.profiles
  add column if not exists active_session_id text,
  add column if not exists active_session_at timestamptz;
