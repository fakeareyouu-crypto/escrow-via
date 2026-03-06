import type { Route } from "next";
import Link from "next/link";
import { pickRelation } from "@/lib/relations";
import { serverSupabase } from "@/lib/server-supabase";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data: product } = await serverSupabase
    .from("products")
    .select("id,title,description,category,price,images,created_at,seller_id,users!products_seller_id_fkey(username,rating)")
    .eq("id", params.id)
    .single();

  if (!product) {
    return (
      <section className="space-y-4">
        <h1 className="page-title text-white">Product not found</h1>
        <p className="text-slate-400">No product exists for this ID.</p>
      </section>
    );
  }

  const seller = pickRelation(product.users);

  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <div className="card">
        {product.images?.[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={product.title} className="h-[320px] w-full rounded-xl object-cover" src={product.images[0]} />
        ) : (
          <div className="flex h-[320px] items-center justify-center rounded-xl bg-slate-900 text-slate-500">No image uploaded</div>
        )}
      </div>

      <div className="card space-y-4">
        <p className="inline-flex w-fit rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
          Escrow Protected Transaction
        </p>
        <h1 className="page-title text-white">{product.title}</h1>
        <p className="text-sm text-slate-300">{product.description}</p>
        <p className="text-2xl font-semibold text-sky-300">${Number(product.price).toFixed(2)}</p>
        <div className="grid gap-2 text-sm text-slate-300">
          <p>Seller: @{seller?.username ?? "unknown"}</p>
          <p>Seller rating: ★ {Number(seller?.rating ?? 5).toFixed(1)}</p>
          <p>Category: {product.category}</p>
          <p>Listed on: {new Date(product.created_at).toLocaleDateString()}</p>
        </div>
        <Link
          className="btn-primary"
          href={`/deal/create?sellerId=${product.seller_id}&amount=${product.price}&productId=${product.id}` as Route}
        >
          Start Escrow Deal
        </Link>
      </div>
    </section>
  );
}
