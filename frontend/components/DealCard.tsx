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
    <article className="card space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">Deal #{deal.id}</h3>
        <span className="rounded-lg bg-emerald-500/15 px-2 py-1 text-sm font-medium text-emerald-300">
          ${deal.amount.toFixed(2)} in escrow
        </span>
      </div>
      <p className="text-sm text-slate-300">
        Buyer <span className="text-white">@{deal.buyer}</span> ↔ Seller <span className="text-white">@{deal.seller}</span>
      </p>
      <EscrowTimeline currentStatus={deal.status} />
    </article>
  );
}
