import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <p className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
        Escrow security for Telegram commerce
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">Escrovia</h1>
      <p className="max-w-2xl text-slate-600">
        A marketplace + direct deal escrow platform where buyers and sellers safely trade digital
        products. Discover listings, start protected deals, and receive Telegram updates in real
        time.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white" href="/marketplace">
          Browse marketplace
        </Link>
        <Link className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium" href="/deal/create?seller=demo&amount=10">
          Create direct deal
        </Link>
      </div>
    </section>
  );
}
