import ProductCard, { Product } from "@/components/ProductCard";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

type ProductsResponse = {
  success: boolean;
  products: Array<{
    id: string;
    title: string;
    description: string;
    category: string | null;
    price: number;
    images: string[] | null;
    users: { username: string; rating: number } | null;
  }>;
};

export default async function MarketplacePage({
  searchParams
}: {
  searchParams: { search?: string; category?: string; sort?: string };
}) {
  const hdrs = headers();
  const host = hdrs.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const query = new URLSearchParams({
    search: searchParams.search || "",
    category: searchParams.category || "all",
    sort: searchParams.sort || "newest"
  });

  let products: Product[] = [];

  if (host) {
    const response = await fetch(`${protocol}://${host}/api/getProducts?${query.toString()}`, {
      cache: "no-store"
    });
    if (response.ok) {
      const payload: ProductsResponse = await response.json();
      products = (payload.products ?? []).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        price: Number(item.price),
        imageUrl: item.images?.[0] ?? null,
        sellerName: item.users?.username ?? "unknown",
        sellerRating: Number(item.users?.rating ?? 5)
      }));
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="page-title text-white">Marketplace Catalogue</h1>
          <p className="mt-1 text-sm text-slate-300">Browse verified digital sellers and start protected deals instantly.</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-300">{products.length} listings</div>
      </div>

      <form className="grid gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-3 md:grid-cols-4">
        <input className="input md:col-span-2" defaultValue={searchParams.search} name="search" placeholder="Search products" />
        <input className="input" defaultValue={searchParams.category} name="category" placeholder="Category" />
        <select className="input" defaultValue={searchParams.sort || "newest"} name="sort">
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <button className="btn-primary md:col-span-4" type="submit">
          Apply filters
        </button>
      </form>

      {products.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="card text-sm text-slate-400">No products found for this filter.</div>
      )}
    </section>
  );
}
