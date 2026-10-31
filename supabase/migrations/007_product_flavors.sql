
-- LiqFlav Atlas
-- Migration 007: Initial Product Flavor Relationships
-- Flavor assignments are descriptive starting points.

INSERT INTO public.product_flavors (product_id, flavor_id)
SELECT p.id, f.id
FROM (
    VALUES
        ('Coors Light', 'Caramel'),
        ('Asahi Super Dry', 'Mineral'),
        ('Guinness Draught', 'Coffee'),
        ('Guinness Draught', 'Chocolate'),
        ('Corona Extra', 'Citrus'),
        ('Maker''s Mark Bourbon', 'Caramel'),
        ('Maker''s Mark Bourbon', 'Vanilla'),
        ('Maker''s Mark Bourbon', 'Oak'),
        ('Coopers Original Pale Ale', 'Citrus'),
        ('Tsingtao Lager', 'Caramel'),
        ('Jacob''s Creek Classic Shiraz', 'Berry'),
        ('Jacob''s Creek Classic Shiraz', 'Spice')
) AS v(product_name, flavor_name)
JOIN public.products p
    ON p.name = v.product_name
JOIN public.flavors f
    ON f.name = v.flavor_name
ON CONFLICT DO NOTHING;
