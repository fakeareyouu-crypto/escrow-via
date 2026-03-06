import Link from "next/link";

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <section className="space-y-4">
      <h1 className="page-title text-white">Premium Product #{params.id}</h1>
      <div className="card space-y-4">
        <p className="text-slate-300">
          Detailed product information, delivery terms, and seller trust signals are shown here
          before a deal is initiated.
        </p>
        <ul className="grid gap-2 text-sm text-slate-300 sm:grid-cols-3">
          <li className="rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2">Price: $20.00</li>
          <li className="rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2">Seller: @demo_seller</li>
          <li className="rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2">Seller rating: ★ 4.9</li>
        </ul>
        <Link
          className="btn-primary"
          href={`/deal/create?seller=demo_seller&amount=20&productId=${params.id}`}
        >
          Start Protected Deal
        </Link>
      </div>
    </section>
  );
}
