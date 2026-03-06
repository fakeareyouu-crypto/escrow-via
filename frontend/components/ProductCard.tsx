import Link from "next/link";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  sellerName: string;
  sellerRating: number;
  category?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="mb-1 text-xs uppercase tracking-wide text-sky-300/90">{product.category ?? "Digital goods"}</p>
          <h3 className="text-lg font-semibold text-white">{product.title}</h3>
        </div>
        <span className="rounded-lg bg-sky-500/15 px-2 py-1 text-sm font-semibold text-sky-300">${product.price.toFixed(2)}</span>
      </div>
      <p className="text-sm leading-6 text-slate-300">{product.description}</p>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>@{product.sellerName}</span>
        <span>★ {product.sellerRating.toFixed(1)}</span>
      </div>
      <Link className="btn-primary w-full" href={`/product/${product.id}`}>
        Start Protected Deal
      </Link>
    </article>
  );
}
