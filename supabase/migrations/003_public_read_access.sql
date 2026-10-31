
-- LiqFlav Atlas: Public Read-Only Access
-- Migration 003

-- Allow API roles to access the public schema.
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Allow reading our public reference tables.
GRANT SELECT ON TABLE
    public.countries,
    public.categories,
    public.flavors
TO anon, authenticated;

-- Ensure RLS is enabled.
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flavors ENABLE ROW LEVEL SECURITY;

-- Create public read policies.
CREATE POLICY "Public can read countries"
ON public.countries
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Public can read categories"
ON public.categories
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Public can read flavors"
ON public.flavors
FOR SELECT
TO anon, authenticated
USING (true);
