import Link from "next/link";

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Product #{params.id}</h1>
      <div className="card space-y-2">
        <p className="text-slate-600">Detailed product description and seller reputation information.</p>
        <ul className="list-inside list-disc text-sm text-slate-600">
          <li>Price: $20.00</li>
          <li>Seller: demo_seller</li>
          <li>Seller rating: 4.9</li>
        </ul>
        <Link
          className="inline-flex rounded-md bg-primary px-3 py-1.5 text-sm text-white"
          href={`/deal/create?seller=demo_seller&amount=20&productId=${params.id}`}
        >
          Start Deal
        </Link>
      </div>
    </section>
  );
}
