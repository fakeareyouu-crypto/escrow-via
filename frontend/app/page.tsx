import Link from "next/link";
import ProductCard, { Product } from "@/components/ProductCard";
import { serverSupabase } from "@/lib/server-supabase";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [{ count: productsCount }, { count: dealsCount }, { count: disputesCount }, { data: latestProducts }] =
    await Promise.all([
      serverSupabase.from("products").select("id", { count: "exact", head: true }),
      serverSupabase.from("deals").select("id", { count: "exact", head: true }),
      serverSupabase.from("deals").select("id", { count: "exact", head: true }).eq("status", "disputed"),
      serverSupabase
        .from("products")
        .select("id,title,description,category,price,images,users!products_seller_id_fkey(username,rating)")
        .order("created_at", { ascending: false })
        .limit(3)
    ]);

  const products: Product[] = (latestProducts ?? []).map((item: any) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    price: Number(item.price),
    imageUrl: item.images?.[0] ?? null,
    sellerName: item.users?.username ?? "unknown",
    sellerRating: Number(item.users?.rating ?? 5)
  }));

  return (
    <section className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card space-y-6 p-7 sm:p-10">
          <p className="inline-flex w-fit rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sky-300">
            Telegram-first escrow infrastructure
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Trade Safely with Escrovia Escrow</h1>
          <p className="max-w-2xl text-slate-300">Secure marketplace for digital deals powered by escrow protection.</p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-primary" href="/marketplace">
              Browse Marketplace
            </Link>
            <Link className="btn-secondary" href="/deal/create">
              Start a Deal
            </Link>
          </div>
        </div>

        <div className="card space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Escrow workflow</h2>
          <ol className="space-y-2 text-sm text-slate-300">
            <li>1. Start Deal</li>
            <li>2. Fund Escrow</li>
            <li>3. Release Payment</li>
          </ol>
          <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-xs text-slate-400">
            Every state transition is recorded in Supabase and can trigger Telegram notifications.
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="card">
          <p className="text-sm text-slate-400">Live products</p>
          <p className="mt-2 text-2xl font-semibold text-white">{productsCount ?? 0}</p>
        </article>
        <article className="card">
          <p className="text-sm text-slate-400">Deals created</p>
          <p className="mt-2 text-2xl font-semibold text-white">{dealsCount ?? 0}</p>
        </article>
        <article className="card">
          <p className="text-sm text-slate-400">Open disputes</p>
          <p className="mt-2 text-2xl font-semibold text-white">{disputesCount ?? 0}</p>
        </article>
      </div>

      <section className="space-y-4">
        <h2 className="page-title text-white">Marketplace Preview</h2>
        {products.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="card text-sm text-slate-400">No products listed yet.</div>
        )}
      </section>
    </section>
  );
}
