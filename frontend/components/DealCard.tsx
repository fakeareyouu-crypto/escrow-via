import EscrowTimeline from "./EscrowTimeline";

export type Deal = {
  id: string;
  amount: number;
  status: "pending" | "accepted" | "escrow funded" | "delivered" | "completed" | "disputed";
  buyer: string;
  seller: string;
};

const statusColors: Record<Deal["status"], string> = {
  pending: "text-amber-300 bg-amber-500/10 border-amber-500/30",
  accepted: "text-sky-300 bg-sky-500/10 border-sky-500/30",
  "escrow funded": "text-blue-300 bg-blue-500/10 border-blue-500/30",
  delivered: "text-violet-300 bg-violet-500/10 border-violet-500/30",
  completed: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
  disputed: "text-rose-300 bg-rose-500/10 border-rose-500/30"
};

export default function DealCard({ deal }: { deal: Deal }) {
  return (
    <article className="card space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">Deal #{deal.id}</h3>
        <div className="flex items-center gap-2">
          <span className={`rounded-lg border px-2 py-1 text-xs capitalize ${statusColors[deal.status]}`}>{deal.status}</span>
          <span className="rounded-lg bg-emerald-500/15 px-2 py-1 text-sm font-medium text-emerald-300">
            ${deal.amount.toFixed(2)}
          </span>
        </div>
      </div>
      <p className="text-sm text-slate-300">
        Buyer <span className="text-white">@{deal.buyer}</span> ↔ Seller <span className="text-white">@{deal.seller}</span>
      </p>
      <EscrowTimeline currentStatus={deal.status} />
    </article>
  );
}
