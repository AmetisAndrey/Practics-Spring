create extension not exists "pgcrypto";

drop table if exists items cascade;

create table items (
     id uuid primary key default gen_random_uuid(),
    name varchar(50) not null,
    description varchar(255),
    createdAt timestamptz not null default  now(),
    updatedAt timestamptz not null default now()
);


create index idx_items_name
    on items(name);

create index idx_items_description
    on items(description);

create or replace function set_updated_at()
returns trigger as $$
       begin
       new.updated_at := now();
        return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_updated_at on items;

create trigger trg_set_updated_at
    before update on items
    for each row
    execute function set_updated_at();

insert into items(name, description)
values('Пример 1', 'Первый тестовый объект'),
      ('Пример 2', 'Второй тестовый объект'),
      ('Тестовый объект', 'Объект для проверки поиска и пагинации');

