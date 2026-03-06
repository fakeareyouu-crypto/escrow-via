import Link from "next/link";

export default function SellerDashboardPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Seller Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card space-y-2">
          <h2 className="font-semibold">Products</h2>
          <p className="text-sm text-slate-600">Manage current listings and inventory details.</p>
          <div className="flex gap-2">
            <Link className="rounded bg-primary px-3 py-1.5 text-sm text-white" href="/add-product">Add product</Link>
            <Link className="rounded border border-slate-300 px-3 py-1.5 text-sm" href="/my-products">My products</Link>
          </div>
        </div>
        <div className="card">
          <h2 className="font-semibold">Deals Overview</h2>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li>Active deals: 7</li>
            <li>Completed deals: 58</li>
            <li>Disputed deals: 2</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
