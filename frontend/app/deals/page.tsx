import DealCard, { Deal } from "@/components/DealCard";

const sampleDeals: Deal[] = [
  { id: "1002", amount: 29, status: "escrow funded", buyer: "alice", seller: "pixelstudio" },
  { id: "1003", amount: 49, status: "delivered", buyer: "bob", seller: "alpha_signals" }
];

export default function DealsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Deals</h1>
      <div className="space-y-4">
        {sampleDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  );
}
