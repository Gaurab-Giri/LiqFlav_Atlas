
-- LiqFlav Atlas
-- Migration 006: Initial Global Beverage Products

INSERT INTO public.products (
    name,
    brand_id,
    category_id,
    origin_country_id,
    description
)
SELECT
    v.product_name,
    b.id,
    cat.id,
    c.id,
    v.description
FROM (
    VALUES
    (
        'Coors Light', 'Coors', 'Beer', 'US',
        'American light lager with a clean, crisp profile.'
    ),
    (
        'Asahi Super Dry', 'Asahi', 'Beer', 'JP',
        'Japanese dry-style lager known for its crisp finish.'
    ),
    (
        'Guinness Draught', 'Guinness', 'Beer', 'IE',
        'Irish dry stout with roasted malt character.'
    ),
    (
        'Corona Extra', 'Corona', 'Beer', 'MX',
        'Mexican pale lager with a light, refreshing profile.'
    ),
    (
        'Maker''s Mark Bourbon', 'Maker''s Mark', 'Whiskey', 'US',
        'Kentucky straight bourbon made using wheat in its mash bill.'
    ),
    (
        'Coopers Original Pale Ale', 'Coopers', 'Beer', 'AU',
        'Australian pale ale known for its bottle conditioning.'
    ),
    (
        'Tsingtao Lager', 'Tsingtao', 'Beer', 'CN',
        'Chinese lager with a light malt character.'
    ),
    (
        'Jacob''s Creek Classic Shiraz',
        'Jacob''s Creek', 'Wine', 'AU',
        'Australian Shiraz with dark-fruit and spice characteristics.'
    )
) AS v(
    product_name,
    brand_name,
    category_name,
    country_code,
    description
)
JOIN public.countries c
    ON c.iso_code = v.country_code
JOIN public.brands b
    ON b.name = v.brand_name
    AND b.country_id = c.id
JOIN public.categories cat
    ON cat.name = v.category_name
WHERE NOT EXISTS (
    SELECT 1
    FROM public.products p
    WHERE p.name = v.product_name
      AND p.brand_id = b.id
);
