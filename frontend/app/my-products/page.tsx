import ProductCard, { Product } from "@/components/ProductCard";
import { serverSupabase } from "@/lib/server-supabase";

export const dynamic = "force-dynamic";

export default async function MyProductsPage({ searchParams }: { searchParams: { sellerId?: string } }) {
  if (!searchParams.sellerId) {
    return <section className="card text-slate-300">Pass <code>?sellerId=&lt;uuid&gt;</code> to view your products.</section>;
  }

  const { data: seller } = await serverSupabase
    .from("users")
    .select("username,rating")
    .eq("id", searchParams.sellerId)
    .single();

  const { data } = await serverSupabase
    .from("products")
    .select("id,title,description,category,price,images")
    .eq("seller_id", searchParams.sellerId)
    .order("created_at", { ascending: false });

  const products: Product[] = (data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    price: Number(item.price),
    imageUrl: item.images?.[0] ?? null,
    sellerName: seller?.username ?? "unknown",
    sellerRating: Number(seller?.rating ?? 5)
  }));

  return (
    <section className="space-y-4">
      <h1 className="page-title text-white">My Products</h1>
      {products.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="card text-slate-400">No products found for this seller.</div>
      )}
    </section>
  );
}
