import ProductCard, { Product } from "@/components/ProductCard";
import SellerProfileCard from "@/components/SellerProfileCard";
import { serverSupabase } from "@/lib/server-supabase";

export const dynamic = "force-dynamic";

export default async function StorePage({ params }: { params: { username: string } }) {
  const { data: seller } = await serverSupabase
    .from("users")
    .select("id,username,rating")
    .eq("username", params.username)
    .single();

  if (!seller) {
    return <section className="card text-slate-300">Seller not found.</section>;
  }

  const { data: productsData } = await serverSupabase
    .from("products")
    .select("id,title,description,category,price,images")
    .eq("seller_id", seller.id)
    .order("created_at", { ascending: false });

  const products: Product[] = (productsData ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    price: Number(item.price),
    imageUrl: item.images?.[0] ?? null,
    sellerName: seller.username,
    sellerRating: Number(seller.rating ?? 5)
  }));

  return (
    <section className="space-y-6">
      <SellerProfileCard productCount={products.length} rating={Number(seller.rating ?? 5)} username={seller.username} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
