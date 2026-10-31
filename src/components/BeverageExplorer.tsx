
"use client";

import { useMemo, useState } from "react";

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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [country, setCountry] = useState("All");

  const categories = [
    "All",
    ...new Set(
      products.map((p) => p.categories?.name).filter(Boolean)
    ),
  ];

  const countries = [
    "All",
    ...new Set(
      products.map((p) => p.countries?.name).filter(Boolean)
    ),
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        (product.brands?.name ?? "").toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || product.categories?.name === category;

      const matchesCountry =
        country === "All" || product.countries?.name === country;

      return matchesSearch && matchesCategory && matchesCountry;
    });
  }, [products, search, category, country]);

  return (
    <div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <input
          type="search"
          placeholder="Search beverages or brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
        >
          {countries.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <p className="mt-8 text-sm text-slate-400">
        Showing {filteredProducts.length} of {products.length} beverages
      </p>

      {filteredProducts.length === 0 && (
        <p className="mt-10 text-slate-400">
          No beverages found. Try another search or filter.
        </p>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-amber-500/50"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>

            <p className="mt-3 text-sm text-slate-400">
              Brand: {product.brands?.name ?? "Unknown"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Category: {product.categories?.name ?? "Unknown"}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Origin: {product.countries?.name ?? "Unknown"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.product_flavors.map((item, index) =>
                item.flavors ? (
                  <span
                    key={index}
                    className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-300"
                  >
                    {item.flavors.name}
                  </span>
                ) : null
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
