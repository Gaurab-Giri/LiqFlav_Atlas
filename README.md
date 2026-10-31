# Flavor Atlas — MVP 0.1

An education-first beverage atlas built with Next.js, React, TypeScript, and Tailwind CSS.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's included
- Responsive dark editorial homepage
- Searchable beverage encyclopedia
- Flavor-tag filtering
- Interactive drink selection
- History, flavor science, serving traditions, food pairings
- Seven curated demo categories/entries

## Next milestones
1. Move `src/data/drinks.ts` into PostgreSQL/Supabase with sources and citations.
2. Build dedicated `/drinks/[slug]` routes and structured history timelines.
3. Create interactive flavor graph based on verified sensory attributes.
4. Add user-friendly alcohol-free alternatives.
5. Add photo-verified shelf locations and a separate inventory admin workflow.
6. Add age gating and review applicable laws before any alcohol commerce features.

**Important:** Prototype educational data is not a live inventory or a personalized alcohol recommendation system. No purchase, checkout, or alcohol ordering functions are implemented.
