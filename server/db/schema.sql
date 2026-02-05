 create table app_user (
    id uuid primary key,
    created_at timestamptz not null default now()
  );

  create table traveler (
    id bigserial primary key,
    user_id uuid not null references app_user(id) on delete cascade,
    name text not null,
    city_iata text,
    latitude double precision,
    longitude double precision,
    max_flight_duration integer,
    max_transfers integer,
    created_at timestamptz not null default now()
  );

  create table destination (
    id bigserial primary key,
    user_id uuid not null references app_user(id) on delete cascade,
    city_name text not null,
    city_iata text,
    latitude double precision,
    longitude double precision,
    distance_score double precision,
    total_cost double precision,
    created_at timestamptz not null default now()
  );

  create index idx_traveler_user_id on traveler(user_id);
  create index idx_destination_user_id on destination(user_id);
