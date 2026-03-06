import Link from "next/link";

const links = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/deals", label: "Deals" },
  { href: "/seller", label: "Seller" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin", label: "Admin" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl">
      <nav className="container-shell flex items-center justify-between py-3">
        <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-300">E</span>
          Escrovia
        </Link>
        <div className="hidden items-center gap-4 text-sm text-slate-300 md:flex">
          {links.map((item) => (
            <Link key={item.href} className="transition hover:text-white" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link className="btn-secondary" href="/register">
            Register
          </Link>
          <Link className="btn-primary" href="/login">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
