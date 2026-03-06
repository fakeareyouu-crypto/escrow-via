export default function AdminPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Admin Panel</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card">
          <h2 className="font-semibold">Disputes</h2>
          <p className="text-sm text-slate-600">Review and resolve disputed escrow deals.</p>
        </div>
        <div className="card">
          <h2 className="font-semibold">User moderation</h2>
          <p className="text-sm text-slate-600">Suspend suspicious accounts and monitor transaction history.</p>
        </div>
      </div>
    </section>
  );
}
