import Link from "next/link";

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  sellerName: string;
  sellerRating: number;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold">{product.title}</h3>
        <span className="text-sm font-medium text-sky-700">${product.price.toFixed(2)}</span>
      </div>
      <p className="text-sm text-slate-600">{product.description}</p>
      <p className="text-xs text-slate-500">
        Seller: {product.sellerName} · ★ {product.sellerRating.toFixed(1)}
      </p>
      <Link className="inline-flex rounded-md bg-primary px-3 py-1.5 text-sm text-white" href={`/product/${product.id}`}>
        Start deal
      </Link>
    </article>
  );
}
