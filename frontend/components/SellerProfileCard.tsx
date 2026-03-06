export default function SellerProfileCard({
  username,
  rating,
  productCount
}: {
  username: string;
  rating: number;
  productCount: number;
}) {
  return (
    <section className="card">
      <div className="h-24 rounded-xl bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-violet-500/20" />
      <div className="-mt-6 flex items-end justify-between">
        <div>
          <p className="text-lg font-semibold text-white">@{username}</p>
          <p className="text-sm text-slate-400">Verified Escrovia Seller</p>
        </div>
        <span className="rounded-lg bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">★ {rating.toFixed(1)}</span>
      </div>
      <p className="mt-3 text-sm text-slate-300">{productCount} active listings in this storefront.</p>
    </section>
  );
}
