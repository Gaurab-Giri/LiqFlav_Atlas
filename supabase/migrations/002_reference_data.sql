
-- LiqFlav Atlas: Initial Reference Data
-- Migration 002

INSERT INTO public.countries (name, iso_code)
VALUES
  ('United States', 'US'),
  ('Australia', 'AU'),
  ('United Kingdom', 'GB'),
  ('Germany', 'DE'),
  ('France', 'FR'),
  ('Italy', 'IT'),
  ('Japan', 'JP'),
  ('China', 'CN'),
  ('Nepal', 'NP'),
  ('Mexico', 'MX'),
  ('Canada', 'CA'),
  ('India', 'IN'),
  ('South Korea', 'KR'),
  ('Spain', 'ES'),
  ('Ireland', 'IE')
ON CONFLICT (iso_code) DO NOTHING;

INSERT INTO public.categories (name, description)
VALUES
  ('Beer', 'Fermented grain-based beverages'),
  ('Wine', 'Fermented grape and other fruit wines'),
  ('Whiskey', 'Distilled grain spirits'),
  ('Vodka', 'Neutral distilled spirits'),
  ('Gin', 'Juniper-forward distilled spirits'),
  ('Rum', 'Sugarcane-based distilled spirits'),
  ('Tequila', 'Blue agave spirits from designated Mexican regions'),
  ('Brandy', 'Distilled wine or fruit spirits'),
  ('Liqueur', 'Sweetened flavored alcoholic beverages'),
  ('Sake', 'Japanese fermented rice beverage'),
  ('Baijiu', 'Chinese distilled grain spirits'),
  ('Soju', 'Korean distilled or diluted spirits'),
  ('Cider', 'Fermented apple beverages'),
  ('Mead', 'Fermented honey beverages')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.flavors (name, description)
VALUES
  ('Citrus', 'Lemon, lime, orange and grapefruit notes'),
  ('Vanilla', 'Sweet vanilla-like aromas'),
  ('Caramel', 'Cooked sugar and caramel notes'),
  ('Oak', 'Woody notes associated with barrel maturation'),
  ('Honey', 'Floral and sweet honey-like notes'),
  ('Floral', 'Flower-like aromas'),
  ('Tropical Fruit', 'Pineapple, mango and passion fruit notes'),
  ('Berry', 'Strawberry, raspberry and blackberry notes'),
  ('Smoke', 'Smoky and toasted aromas'),
  ('Spice', 'Pepper, clove, cinnamon and warming spice notes'),
  ('Herbal', 'Fresh herbs and botanical notes'),
  ('Chocolate', 'Cocoa and dark chocolate notes'),
  ('Coffee', 'Roasted coffee-like aromas'),
  ('Earthy', 'Soil, mushroom and forest-floor notes'),
  ('Mineral', 'Stone, chalk and saline sensory impressions'),
  ('Nutty', 'Almond, hazelnut and roasted nut notes')
ON CONFLICT (name) DO NOTHING;
