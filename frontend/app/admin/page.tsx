import { serverSupabase } from "@/lib/server-supabase";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: { searchParams: { page?: string; pageSize?: string } }) {
  const page = Math.max(Number(searchParams.page || "1"), 1);
  const pageSize = Math.min(Math.max(Number(searchParams.pageSize || "10"), 1), 50);
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const [{ data: users }, { data: deals }, { data: disputes, count: disputesCount }] = await Promise.all([
    serverSupabase.from("users").select("id,username,email,role,created_at").range(from, to).order("created_at", { ascending: false }),
    serverSupabase.from("deals").select("id,amount,status,created_at").range(from, to).order("created_at", { ascending: false }),
    serverSupabase
      .from("deals")
      .select("id,amount,status,created_at", { count: "exact" })
      .eq("status", "disputed")
      .range(from, to)
      .order("created_at", { ascending: false })
  ]);

  return (
    <section className="space-y-6">
      <h1 className="page-title text-white">Admin Panel</h1>

      <div className="card overflow-x-auto">
        <h2 className="mb-3 text-lg font-semibold text-white">Users</h2>
        <table className="w-full min-w-[640px] text-left text-sm text-slate-300">
          <thead className="text-slate-400"><tr><th>Username</th><th>Email</th><th>Role</th><th>Created</th></tr></thead>
          <tbody>{(users ?? []).map((u: any) => <tr key={u.id} className="border-t border-slate-800"><td>{u.username}</td><td>{u.email}</td><td>{u.role}</td><td>{new Date(u.created_at).toLocaleDateString()}</td></tr>)}</tbody>
        </table>
      </div>

      <div className="card overflow-x-auto">
        <h2 className="mb-3 text-lg font-semibold text-white">Deals</h2>
        <table className="w-full min-w-[640px] text-left text-sm text-slate-300">
          <thead className="text-slate-400"><tr><th>ID</th><th>Amount</th><th>Status</th><th>Created</th></tr></thead>
          <tbody>{(deals ?? []).map((d: any) => <tr key={d.id} className="border-t border-slate-800"><td>{d.id}</td><td>${Number(d.amount).toFixed(2)}</td><td>{d.status}</td><td>{new Date(d.created_at).toLocaleDateString()}</td></tr>)}</tbody>
        </table>
      </div>

      <div className="card overflow-x-auto">
        <h2 className="mb-3 text-lg font-semibold text-white">Disputes ({disputesCount ?? 0})</h2>
        <table className="w-full min-w-[640px] text-left text-sm text-slate-300">
          <thead className="text-slate-400"><tr><th>ID</th><th>Amount</th><th>Status</th><th>Created</th></tr></thead>
          <tbody>{(disputes ?? []).map((d: any) => <tr key={d.id} className="border-t border-slate-800"><td>{d.id}</td><td>${Number(d.amount).toFixed(2)}</td><td>{d.status}</td><td>{new Date(d.created_at).toLocaleDateString()}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}
