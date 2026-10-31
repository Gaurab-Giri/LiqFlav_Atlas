
"use client";

import { useMemo, useState } from "react";

// Define the structure of a beverage from Supabase
type Beverage = {
  id: number;
  name: string;
  abv: number | null;
  description: string | null;
  brands: { name: string } | null;
  categories: { name: string } | null;
  countries: { name: string } | null;
  product_flavors: {
    flavors: { name: string } | null;
  }[];
};

export default function BeverageExplorer({
  products,
}: {
  products: Beverage[];
}) {
  // State for search and filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [country, setCountry] = useState("All");

  // Generate category options from database products
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.categories?.name)
        .filter((name): name is string => Boolean(name))
    ),
  ];

  // Generate country options from database products
  const countries = [
    "All",
    ...new Set(
      products
        .map((product) => product.countries?.name)
        .filter((name): name is string => Boolean(name))
    ),
  ];

  // Filter beverages based on search, category, and country
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        (product.brands?.name ?? "")
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        category === "All" ||
        product.categories?.name === category;

      const matchesCountry =
        country === "All" ||
        product.countries?.name === country;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesCountry
      );
    });
  }, [products, search, category, country]);

  // Reset all filters to their default values
  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setCountry("All");
  };

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "All" ||
    country !== "All";

  return (
    <div>
      {/* Search and filter controls */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {/* Search bar */}
        <input
          type="search"
          placeholder="Search beverages or brands..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400"
        />

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400"
          aria-label="Filter by category"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Categories" : item}
            </option>
          ))}
        </select>

        {/* Country dropdown */}
        <select
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400"
          aria-label="Filter by country"
        >
          {countries.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Countries" : item}
            </option>
          ))}
        </select>
      </div>

      {/* Results count and reset button */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-400">
          Showing {filteredProducts.length} of {products.length} beverages
        </p>

        <button
          type="button"
          onClick={resetFilters}
          disabled={!hasActiveFilters}
          className="rounded-lg border border-amber-500/40 px-4 py-2 text-sm text-amber-400 transition hover:bg-amber-500/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Reset Filters
        </button>
      </div>

      {/* Empty search results */}
      {filteredProducts.length === 0 && (
        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h2 className="text-xl font-semibold">
            No beverages found
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Try changing your search or selecting different filters.
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Beverage cards */}
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-500/50"
          >
            {/* Beverage name */}
            <h2 className="text-xl font-semibold">
              {product.name}
            </h2>

            {/* Brand */}
            <p className="mt-3 text-sm text-slate-400">
              Brand: {product.brands?.name ?? "Unknown"}
            </p>

            {/* Category */}
            <p className="mt-1 text-sm text-slate-400">
              Category: {product.categories?.name ?? "Unknown"}
            </p>

            {/* Country of origin */}
            <p className="mt-1 text-sm text-slate-400">
              Origin: {product.countries?.name ?? "Unknown"}
            </p>

            {/* Alcohol by volume, if available */}
            {product.abv !== null && (
              <p className="mt-1 text-sm text-slate-400">
                ABV: {product.abv}%
              </p>
            )}

            {/* Flavor tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {product.product_flavors.map((item, index) =>
                item.flavors ? (
                  <span
                    key={`${product.id}-${index}`}
                    className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-300"
                  >
                    {item.flavors.name}
                  </span>
                ) : null
              )}
            </div>

            {/* Beverage description */}
            {product.description && (
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {product.description}
              </p>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
