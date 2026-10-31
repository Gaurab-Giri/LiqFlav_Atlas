
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function BeverageDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  // Validate the ID before querying the database
  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  // Fetch the beverage and its related data
  const { data: beverage, error } = await supabase
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
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load beverage: ${error.message}`);
  }

  if (!beverage) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Back navigation */}
        <Link
          href="/explore"
          className="text-sm text-amber-400 hover:text-amber-300"
        >
          ← Back to Explorer
        </Link>

        {/* Beverage heading */}
        <div className="mt-10">
          <p className="text-sm uppercase tracking-widest text-amber-400">
            {beverage.categories?.name ?? "Beverage"}
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            {beverage.name}
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            {beverage.brands?.name ?? "Independent beverage"}
          </p>
        </div>

        {/* Basic information */}
        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Origin</p>
            <p className="mt-2 text-lg font-semibold">
              {beverage.countries?.name ?? "Unknown"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Category</p>
            <p className="mt-2 text-lg font-semibold">
              {beverage.categories?.name ?? "Unknown"}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Alcohol by Volume</p>
            <p className="mt-2 text-lg font-semibold">
              {beverage.abv !== null
                ? `${beverage.abv}%`
                : "Not yet recorded"}
            </p>
          </div>
        </section>

        {/* Description */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            About This Beverage
          </h2>

          <p className="mt-4 leading-8 text-slate-300">
            {beverage.description ??
              "We're currently researching this beverage. More information will be added soon."}
          </p>
        </section>

        {/* Flavor profile */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            Flavor Profile
          </h2>

          <p className="mt-3 text-slate-400">
            Explore the tasting notes associated with this beverage.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {beverage.product_flavors.length > 0 ? (
              beverage.product_flavors.map((item, index) =>
                item.flavors ? (
                  <span
                    key={index}
                    className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-300"
                  >
                    {item.flavors.name}
                  </span>
                ) : null
              )
            ) : (
              <p className="text-slate-500">
                Flavor notes have not been added yet.
              </p>
            )}
          </div>
        </section>

        {/* Future research sections */}
        <section className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-7">
          <h2 className="text-2xl font-semibold">
            More to Discover
          </h2>

          <p className="mt-3 text-slate-400">
            We're expanding our encyclopedia with verified history,
            production methods, flavor science, serving traditions,
            and food pairings.
          </p>
        </section>

        <p className="mt-12 text-xs text-slate-500">
          Educational information for adults of legal drinking age.
        </p>
      </div>
    </main>
  );
}
