const stats = [
  { label: "Active deals", value: "3" },
  { label: "Completed deals", value: "14" },
  { label: "Open disputes", value: "1" }
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <h1 className="page-title text-white">User Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="card">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
