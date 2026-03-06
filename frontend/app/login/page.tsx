export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Login</h1>
      <form className="card space-y-3">
        <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Email" type="email" />
        <input className="w-full rounded border border-slate-300 px-3 py-2" placeholder="Password" type="password" />
        <button className="w-full rounded bg-primary py-2 text-white" type="submit">Sign in</button>
      </form>
    </section>
  );
}
