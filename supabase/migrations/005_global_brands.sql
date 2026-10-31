
-- LiqFlav Atlas: Global Beverage Brands
-- Migration 005

INSERT INTO public.brands (name, country_id, website)
SELECT v.name, c.id, v.website
FROM (
  VALUES
    ('Coors', 'US', 'https://www.coors.com'),
    ('Maker''s Mark', 'US', 'https://www.makersmark.com'),
    ('Asahi', 'JP', 'https://www.asahibeer.co.jp'),
    ('Sapporo', 'JP', 'https://www.sapporobeer.jp'),
    ('Kirin', 'JP', 'https://www.kirin.co.jp'),
    ('Tsingtao', 'CN', 'https://www.tsingtao.com.cn'),
    ('Paulaner', 'DE', 'https://www.paulaner.com'),
    ('Guinness', 'IE', 'https://www.guinness.com'),
    ('Corona', 'MX', 'https://www.corona.com'),
    ('Coopers', 'AU', 'https://www.coopers.com.au'),
    ('Jacob''s Creek', 'AU', 'https://www.jacobscreek.com'),
    ('Johnnie Walker', 'GB', 'https://www.johnniewalker.com')
) AS v(name, country_code, website)
JOIN public.countries c
  ON c.iso_code = v.country_code
ON CONFLICT (name, country_id) DO NOTHING;
