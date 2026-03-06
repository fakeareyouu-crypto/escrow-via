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
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="container-shell flex items-center justify-between py-3">
        <Link className="text-lg font-semibold" href="/">
          Escrovia
        </Link>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          {links.map((item) => (
            <Link key={item.href} className="hover:text-slate-900" href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="rounded-md bg-primary px-3 py-1.5 text-white" href="/login">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
