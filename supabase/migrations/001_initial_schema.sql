
-- LiqFlav Atlas: Initial Beverage Database Schema
-- Migration 001

CREATE TABLE IF NOT EXISTS public.countries (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    iso_code CHAR(2) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS public.categories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.brands (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    country_id BIGINT REFERENCES public.countries(id),
    website TEXT,
    UNIQUE (name, country_id)
);

CREATE TABLE IF NOT EXISTS public.flavors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.products (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    brand_id BIGINT REFERENCES public.brands(id),
    category_id BIGINT REFERENCES public.categories(id),
    origin_country_id BIGINT REFERENCES public.countries(id),
    abv NUMERIC(5,2) CHECK (abv >= 0 AND abv <= 100),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.product_flavors (
    product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    flavor_id BIGINT NOT NULL REFERENCES public.flavors(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, flavor_id)
);

-- Explicitly enable RLS on all created tables.
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flavors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_flavors ENABLE ROW LEVEL SECURITY;

-- No public access policies yet.
-- We will add carefully scoped read-only policies later.
