import Link from "next/link";

const metrics = [
  { label: "Protected volume", value: "$1.2M+" },
  { label: "Avg dispute rate", value: "0.8%" },
  { label: "Telegram users", value: "12k+" }
];

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card space-y-6 p-7 sm:p-10">
          <p className="inline-flex w-fit rounded-full border border-sky-500/40 bg-sky-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sky-300">
            Telegram-first escrow infrastructure
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Trade digital products with trust, not risk.
          </h1>
          <p className="max-w-2xl text-slate-300">
            Escrovia secures marketplace and direct Telegram deals with milestone-based escrow,
            real-time status tracking, and bot-powered alerts for every key event.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-primary" href="/marketplace">
              Explore marketplace
            </Link>
            <Link className="btn-secondary" href="/deal/create?seller=demo&amount=10">
              Create direct deal
            </Link>
          </div>
        </div>

        <div className="card space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Escrow workflow</h2>
          <ol className="space-y-2 text-sm text-slate-300">
            <li>1. Buyer starts deal</li>
            <li>2. Seller accepts terms</li>
            <li>3. Buyer funds escrow</li>
            <li>4. Seller delivers product</li>
            <li>5. Buyer confirms and funds release</li>
          </ol>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {metrics.map((item) => (
          <article key={item.label} className="card">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
