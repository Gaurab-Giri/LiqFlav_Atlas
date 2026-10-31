GRANT SELECT ON TABLE
    public.brands,
    public.products,
    public.product_flavors
TO anon, authenticated;

CREATE POLICY "Public can read brands"
ON public.brands
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Public can read products"
ON public.products
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Public can read product flavors"
ON public.product_flavors
FOR SELECT
TO anon, authenticated
USING (true);