import Link from "next/link";
import StatCard from "@/components/StatCard";
import { serverSupabase } from "@/lib/server-supabase";

export const dynamic = "force-dynamic";

export default async function SellerDashboardPage({ searchParams }: { searchParams: { sellerId?: string } }) {
  if (!searchParams.sellerId) {
    return (
      <section className="space-y-4">
        <h1 className="page-title text-white">Seller Dashboard</h1>
        <div className="card text-sm text-slate-300">Pass <code>?sellerId=&lt;uuid&gt;</code> to load your live seller analytics.</div>
      </section>
    );
  }

  const sellerId = searchParams.sellerId;
  const [{ count: products }, { count: active }, { count: completed }, { count: disputes }] = await Promise.all([
    serverSupabase.from("products").select("id", { count: "exact", head: true }).eq("seller_id", sellerId),
    serverSupabase
      .from("deals")
      .select("id", { count: "exact", head: true })
      .eq("seller_id", sellerId)
      .in("status", ["pending", "accepted", "escrow funded", "delivered"]),
    serverSupabase.from("deals").select("id", { count: "exact", head: true }).eq("seller_id", sellerId).eq("status", "completed"),
    serverSupabase.from("deals").select("id", { count: "exact", head: true }).eq("seller_id", sellerId).eq("status", "disputed")
  ]);

  return (
    <section className="space-y-6">
      <h1 className="page-title text-white">Seller Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Products" value={products ?? 0} />
        <StatCard label="Active Deals" value={active ?? 0} />
        <StatCard label="Completed" value={completed ?? 0} />
        <StatCard label="Disputes" value={disputes ?? 0} />
      </div>
      <div className="flex gap-2">
        <Link className="btn-primary" href="/add-product">
          Add product
        </Link>
        <Link className="btn-secondary" href="/my-products">
          Manage products
        </Link>
      </div>
    </section>
  );
}
