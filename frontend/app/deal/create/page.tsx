"use client";

import { useState } from "react";

export default function CreateDealPage({
  searchParams
}: {
  searchParams: { sellerId?: string; amount?: string; productId?: string; buyerId?: string };
}) {
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setMessage(null);
    const payload = {
      buyerId: formData.get("buyerId"),
      sellerId: formData.get("sellerId"),
      productId: formData.get("productId") || null,
      amount: Number(formData.get("amount"))
    };

    const response = await fetch("/api/createDeal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    setMessage(response.ok ? `Deal created: ${result.deal.id}` : result.error || "Unable to create deal");
  }

  return (
    <section className="mx-auto max-w-xl space-y-4">
      <h1 className="page-title text-white">Create Direct Deal</h1>
      <p className="text-sm text-slate-300">Create a real escrow deal entry that is persisted to the deals table.</p>
      <form action={onSubmit} className="card space-y-3">
        <input className="input" defaultValue={searchParams.buyerId} name="buyerId" placeholder="Buyer user ID" required />
        <input className="input" defaultValue={searchParams.sellerId} name="sellerId" placeholder="Seller user ID" required />
        <input className="input" defaultValue={searchParams.amount} name="amount" placeholder="Amount" type="number" min={1} step={0.01} required />
        <input className="input" defaultValue={searchParams.productId} name="productId" placeholder="Product ID (optional)" />
        <button className="btn-primary w-full" type="submit">
          Create escrow deal
        </button>
        {message ? <p className="text-sm text-slate-300">{message}</p> : null}
      </form>
    </section>
  );
}
