import EscrowTimeline from "./EscrowTimeline";

export type Deal = {
  id: string;
  amount: number;
  status: "pending" | "accepted" | "escrow funded" | "delivered" | "completed" | "disputed";
  buyer: string;
  seller: string;
};

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <article className="card space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Deal #{deal.id}</h3>
        <span className="text-sm font-medium text-slate-700">${deal.amount.toFixed(2)}</span>
      </div>
      <p className="text-sm text-slate-600">
        Buyer: {deal.buyer} · Seller: {deal.seller}
      </p>
      <EscrowTimeline currentStatus={deal.status} />
    </article>
  );
}
