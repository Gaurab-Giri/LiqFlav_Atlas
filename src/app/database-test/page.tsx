
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function DatabaseTestPage() {
  const [countriesResult, categoriesResult, flavorsResult] =
    await Promise.all([
      supabase.from("countries").select("id, name, iso_code").order("name"),
      supabase.from("categories").select("id, name").order("name"),
      supabase.from("flavors").select("id, name").order("name"),
    ]);

  const error =
    countriesResult.error ||
    categoriesResult.error ||
    flavorsResult.error;

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <h1 className="text-3xl font-bold">Database Connection Error</h1>
        <p className="mt-4 text-red-400">{error.message}</p>
      </main>
    );
  }

  const countries = countriesResult.data ?? [];
  const categories = categoriesResult.data ?? [];
  const flavors = flavorsResult.data ?? [];

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-3 text-4xl font-bold">
          LiqFlav Atlas — Database Test
        </h1>

        <p className="mb-8 text-slate-400">
          Live reference data retrieved from Supabase PostgreSQL.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Countries", items: countries },
            { title: "Categories", items: categories },
            { title: "Flavors", items: flavors },
          ].map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5"
            >
              <h2 className="mb-4 text-xl font-semibold">
                {section.title} ({section.items.length})
              </h2>

              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.id} className="text-slate-300">
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
