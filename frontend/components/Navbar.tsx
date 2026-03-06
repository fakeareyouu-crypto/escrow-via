import Link from "next/link";

const links: { label: string; href: string }[] = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Deals", href: "/deals" },
  { label: "Dashboard", href: "/dashboard" },
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
            <Link key={item.href} className="hover:text-slate-900" href={item.href as any}>
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
