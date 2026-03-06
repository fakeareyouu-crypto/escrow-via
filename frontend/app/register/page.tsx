export default function RegisterPage() {
  return (
    <section className="mx-auto max-w-md space-y-4">
      <h1 className="page-title text-center text-white">Create your Escrovia account</h1>
      <form className="card space-y-3">
        <input className="input" placeholder="Username" />
        <input className="input" placeholder="Email" type="email" />
        <select className="input" defaultValue="buyer">
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button className="btn-primary w-full" type="submit">
          Register
        </button>
      </form>
    </section>
  );
}
