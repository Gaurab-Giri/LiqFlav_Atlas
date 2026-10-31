
import { supabase } from "@/lib/supabase";
import BeverageExplorer from "@/components/BeverageExplorer";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      abv,
      description,
      brands(name),
      categories(name),
      countries(name),
      product_flavors(
        flavors(name)
      )
    `)
    .order("name");

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <h1 className="text-3xl font-bold">Beverage Explorer</h1>
        <p className="mt-4 text-red-400">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-sm uppercase tracking-widest text-amber-400">
          LiqFlav Atlas
        </p>

        <h1 className="text-4xl font-bold">
          Explore the World of Beverages
        </h1>

        <p className="mt-3 text-slate-400">
          Discover drinks, their origins, and their flavor profiles.
        </p>

        <BeverageExplorer products={products ?? []} />

        <p className="mt-12 text-xs text-slate-500">
          Educational content for adults of legal drinking age.
        </p>
      </div>
    </main>
  );
}
