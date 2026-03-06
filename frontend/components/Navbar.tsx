"use client";

import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";

const links: Array<{ href: Route; label: string }> = [
  { href: "/marketplace", label: "Marketplace" },
  { href: "/deals", label: "Deals" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/seller", label: "Sell" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl">
      <nav className="container-shell py-3">
        <div className="flex items-center justify-between">
          <Link className="flex items-center gap-2 text-lg font-semibold" href="/">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/20 text-sky-300">E</span>
            Escrovia
          </Link>

          <div className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
            {links.map((item) => (
              <Link key={item.href} className="transition hover:text-white" href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Link className="btn-secondary" href="/register">
              Register
            </Link>
            <Link className="btn-primary" href="/login">
              Login
            </Link>
          </div>

          <button
            aria-label="Toggle navigation menu"
            className="rounded-lg border border-slate-700 p-2 text-slate-300 md:hidden"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            ☰
          </button>
        </div>

        {open ? (
          <div className="mt-3 space-y-2 rounded-xl border border-slate-800 bg-slate-900/90 p-3 md:hidden">
            {links.map((item) => (
              <Link key={item.href} className="block rounded-lg px-2 py-2 text-sm text-slate-200 hover:bg-slate-800" href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link className="btn-secondary" href="/register" onClick={() => setOpen(false)}>
                Register
              </Link>
              <Link className="btn-primary" href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
