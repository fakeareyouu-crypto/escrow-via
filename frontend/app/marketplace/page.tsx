import ProductCard, { Product } from "@/components/ProductCard";

const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Premium Trading Signals",
    description: "30-day access to private trading signal channel with daily market entries.",
    price: 49,
    sellerName: "alpha_signals",
    sellerRating: 4.8,
    category: "Trading"
  },
  {
    id: "2",
    title: "Figma SaaS UI Kit",
    description: "Modern fintech dashboard kit with 120+ responsive screens and components.",
    price: 29,
    sellerName: "pixelstudio",
    sellerRating: 4.6,
    category: "Design"
  },
  {
    id: "3",
    title: "SEO Content Pack",
    description: "High-converting landing page copy templates for digital products.",
    price: 19,
    sellerName: "contentforge",
    sellerRating: 4.9,
    category: "Marketing"
  }
];

export default function MarketplacePage() {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="page-title text-white">Marketplace Catalogue</h1>
          <p className="mt-1 text-sm text-slate-300">Browse verified digital sellers and start protected deals instantly.</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-xs text-slate-300">
          {sampleProducts.length} listings live
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
