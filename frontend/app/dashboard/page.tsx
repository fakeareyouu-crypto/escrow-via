import StatCard from "@/components/StatCard";
import { serverSupabase } from "@/lib/server-supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [{ count: active }, { count: completed }, { count: disputes }] = await Promise.all([
    serverSupabase.from("deals").select("id", { count: "exact", head: true }).neq("status", "completed"),
    serverSupabase.from("deals").select("id", { count: "exact", head: true }).eq("status", "completed"),
    serverSupabase.from("deals").select("id", { count: "exact", head: true }).eq("status", "disputed")
  ]);

  return (
    <section className="space-y-6">
      <h1 className="page-title text-white">User Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard hint="status != completed" label="Active Deals" value={active ?? 0} />
        <StatCard hint="status = completed" label="Completed Deals" value={completed ?? 0} />
        <StatCard hint="status = disputed" label="Open Disputes" value={disputes ?? 0} />
      </div>
    </section>
  );
}
