export default function LoginPage() {
  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="page-title text-center text-white">Welcome back</h1>
      <p className="text-center text-sm text-slate-300">Sign in to manage deals, products, and Telegram notifications.</p>
      <form className="card space-y-3">
        <input className="input" placeholder="Email" type="email" />
        <input className="input" placeholder="Password" type="password" />
        <button className="btn-primary w-full" type="submit">
          Sign in
        </button>
      </form>
    </section>
  );
}
