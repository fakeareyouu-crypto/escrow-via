export default function DashboardPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">User Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="card"><p className="text-sm text-slate-600">Active deals</p><p className="text-2xl font-semibold">3</p></div>
        <div className="card"><p className="text-sm text-slate-600">Completed deals</p><p className="text-2xl font-semibold">14</p></div>
        <div className="card"><p className="text-sm text-slate-600">Open disputes</p><p className="text-2xl font-semibold">1</p></div>
      </div>
    </section>
  );
}
