import DealCard, { Deal } from "@/components/DealCard";
import { serverSupabase } from "@/lib/server-supabase";

export const dynamic = "force-dynamic";

export default async function DealsPage({ searchParams }: { searchParams: { userId?: string } }) {
  if (!searchParams.userId) {
    return (
      <section className="space-y-4">
        <h1 className="page-title text-white">Your Escrow Deals</h1>
        <div className="card text-sm text-slate-300">Pass <code>?userId=&lt;uuid&gt;</code> to load your live deals.</div>
      </section>
    );
  }

  const { data } = await serverSupabase
    .from("deals")
    .select("id,amount,status,buyer:buyer_id(username),seller:seller_id(username)")
    .or(`buyer_id.eq.${searchParams.userId},seller_id.eq.${searchParams.userId}`)
    .order("created_at", { ascending: false })
    .limit(20);

  const deals: Deal[] = (data ?? []).map((item: any) => ({
    id: item.id,
    amount: Number(item.amount),
    status: item.status,
    buyer: item.buyer?.username ?? "unknown",
    seller: item.seller?.username ?? "unknown"
  }));

  return (
    <section className="space-y-6">
      <h1 className="page-title text-white">Your Escrow Deals</h1>
      {deals.length ? (
        <div className="space-y-4">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <div className="card text-sm text-slate-400">No deals found for this user.</div>
      )}
    </section>
  );
}
