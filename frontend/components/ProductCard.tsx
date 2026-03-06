import type { Route } from "next";
import Link from "next/link";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  sellerName: string;
  sellerRating: number;
  category?: string | null;
  imageUrl?: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group card space-y-4 transition-transform duration-200 hover:-translate-y-1">
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt={product.title} className="h-40 w-full object-cover transition duration-300 group-hover:scale-105" src={product.imageUrl} />
        ) : (
          <div className="flex h-40 items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-sm text-slate-500">
            No product image
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-sky-300/90">{product.category ?? "General"}</p>
          <h3 className="text-lg font-semibold text-white">{product.title}</h3>
        </div>
        <span className="rounded-lg bg-sky-500/15 px-2 py-1 text-sm font-semibold text-sky-300">${Number(product.price).toFixed(2)}</span>
      </div>

      <p className="text-sm leading-6 text-slate-300">{product.description}</p>

      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>@{product.sellerName}</span>
        <span>★ {Number(product.sellerRating ?? 5).toFixed(1)}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
          Escrow available
        </span>
        <Link className="btn-primary" href={`/product/${product.id}` as Route}>
          Buy now
        </Link>
      </div>
    </article>
  );
}
