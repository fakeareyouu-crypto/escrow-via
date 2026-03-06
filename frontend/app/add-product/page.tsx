"use client";

import { useState } from "react";

export default function AddProductPage() {
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setMessage(null);
    const payload = {
      sellerId: formData.get("sellerId"),
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      imageUrl: formData.get("imageUrl")
    };

    const response = await fetch("/api/createProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    setMessage(response.ok ? `Product created: ${result.product.id}` : result.error || "Unable to create product");
  }

  return (
    <section className="mx-auto max-w-2xl space-y-4">
      <h1 className="page-title text-white">Add Product</h1>
      <form action={onSubmit} className="card space-y-3">
        <input className="input" name="sellerId" placeholder="Seller user ID" required />
        <input className="input" name="title" placeholder="Title" required />
        <textarea className="input min-h-24" name="description" placeholder="Description" required />
        <input className="input" name="category" placeholder="Category" required />
        <input className="input" name="price" placeholder="Price" type="number" min={1} step={0.01} required />
        <input className="input" name="imageUrl" placeholder="Image URL" type="url" />
        <button className="btn-primary" type="submit">Save listing</button>
        {message ? <p className="text-sm text-slate-300">{message}</p> : null}
      </form>
    </section>
  );
}
