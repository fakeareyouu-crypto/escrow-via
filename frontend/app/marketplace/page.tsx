import ProductCard, { Product } from "@/components/ProductCard";

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Premium Trading Signals",
    description: "30-day access to private trading signal channel.",
    price: 49,
    sellerName: "alpha_signals",
    sellerRating: 4.8
  },
  {
    id: "2",
    title: "Figma UI Kit",
    description: "Modern dashboard UI kit with 120+ screens.",
    price: 29,
    sellerName: "pixelstudio",
    sellerRating: 4.6
  }
];

export default function MarketplacePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Marketplace Catalogue</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
