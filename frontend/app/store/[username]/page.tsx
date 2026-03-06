export default function StorePage({ params }: { params: { username: string } }) {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Store: {params.username}</h1>
      <div className="card space-y-2">
        <p className="text-sm text-slate-600">Seller profile, rating and product catalogue.</p>
        <p className="text-sm text-slate-600">Rating: ★ 4.8 · Listed products: 12</p>
      </div>
    </section>
  );
}
