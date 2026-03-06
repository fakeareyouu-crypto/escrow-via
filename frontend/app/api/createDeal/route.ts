import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/server-supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { buyerId, sellerId, productId, amount } = body;

    if (!buyerId || !sellerId || !amount) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await serverSupabase
      .from("deals")
      .insert({
        buyer_id: buyerId,
        seller_id: sellerId,
        product_id: productId || null,
        amount: Number(amount),
        status: "pending",
        escrow_status: "unfunded"
      })
      .select()
      .single();

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 });

    await serverSupabase.from("notifications_queue").insert({
      user_id: sellerId,
      type: "deal_created",
      payload: { dealId: data.id, amount: data.amount }
    });

    return NextResponse.json({ success: true, deal: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unexpected server error" },
      { status: 500 }
    );
  }
}
