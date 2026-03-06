export default function AddProductPage() {
  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-semibold">Add Product</h1>
      <form className="card space-y-3">
        <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Title" />
        <textarea className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Description" rows={4} />
        <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Category" />
        <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Price" type="number" min={1} step={0.01} />
        <button className="rounded bg-primary px-4 py-2 text-white" type="submit">Save listing</button>
      </form>
    </section>
  );
}
