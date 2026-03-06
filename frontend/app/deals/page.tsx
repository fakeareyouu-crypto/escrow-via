import DealCard, { Deal } from "@/components/DealCard";

const sampleDeals: Deal[] = [
  { id: "1002", amount: 29, status: "escrow funded", buyer: "alice", seller: "pixelstudio" },
  { id: "1003", amount: 49, status: "delivered", buyer: "bob", seller: "alpha_signals" }
];

export default function DealsPage() {
  return (
    <section className="space-y-6">
      <h1 className="page-title text-white">Your Escrow Deals</h1>
      <p className="text-sm text-slate-300">Track every deal stage and move fast with clear milestone updates.</p>
      <div className="space-y-4">
        {sampleDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  );
}
