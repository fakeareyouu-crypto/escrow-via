export default function CreateDealPage({
  searchParams
}: {
  searchParams: { seller?: string; amount?: string; productId?: string };
}) {
  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="page-title text-white">Create Direct Deal</h1>
      <p className="text-sm text-slate-300">Perfect for Telegram-first transactions outside the public marketplace.</p>
      <form className="card space-y-3">
        <input className="input" defaultValue={searchParams.seller} placeholder="Seller username" />
        <input className="input" defaultValue={searchParams.amount} placeholder="Amount" type="number" min={1} step={0.01} />
        <input className="input" defaultValue={searchParams.productId} placeholder="Product ID (optional)" />
        <button className="btn-primary w-full" type="submit">
          Create escrow deal
        </button>
      </form>
    </section>
  );
}
