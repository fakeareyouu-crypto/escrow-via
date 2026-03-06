export default function CreateDealPage({
  searchParams
}: {
  searchParams: { seller?: string; amount?: string; productId?: string };
}) {
  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Create Direct Deal</h1>
      <form className="card space-y-3">
        <input className="w-full rounded border border-slate-300 px-3 py-2" defaultValue={searchParams.seller} placeholder="Seller username" />
        <input className="w-full rounded border border-slate-300 px-3 py-2" defaultValue={searchParams.amount} placeholder="Amount" type="number" min={1} step={0.01} />
        <input className="w-full rounded border border-slate-300 px-3 py-2" defaultValue={searchParams.productId} placeholder="Product ID (optional)" />
        <button className="rounded bg-primary px-4 py-2 text-white" type="submit">Create escrow deal</button>
      </form>
    </section>
  );
}
