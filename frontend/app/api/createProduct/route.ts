import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/server-supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sellerId, title, description, category, price, imageUrl } = body;

    if (!sellerId || !title || !description || !category || !price) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await serverSupabase
      .from("products")
      .insert({
        seller_id: sellerId,
        title,
        description,
        category,
        price: Number(price),
        images: imageUrl ? [imageUrl] : []
      })
      .select()
      .single();

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    return NextResponse.json({ success: true, product: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unexpected server error" },
      { status: 500 }
    );
  }
}
