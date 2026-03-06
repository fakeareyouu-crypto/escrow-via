export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form className="card space-y-3">
        <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Username" />
        <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Email" type="email" />
        <select className="w-full rounded border border-slate-300 px-3 py-2" defaultValue="buyer">
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button className="w-full rounded bg-primary py-2 text-white" type="submit">Register</button>
      </form>
    </section>
  );
}
