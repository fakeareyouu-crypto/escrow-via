import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/server-supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dealId } = body;

    if (!dealId) {
      return NextResponse.json({ success: false, error: "dealId is required" }, { status: 400 });
    }

    const { data: deal, error: dealError } = await serverSupabase
      .from("deals")
      .update({ status: "completed", escrow_status: "released" })
      .eq("id", dealId)
      .eq("status", "delivered")
      .select()
      .single();

    if (dealError) return NextResponse.json({ success: false, error: dealError.message }, { status: 400 });

    const { error: transactionError } = await serverSupabase.from("transactions").insert({
      deal_id: deal.id,
      amount: deal.amount,
      status: "released"
    });

    if (transactionError) {
      return NextResponse.json({ success: false, error: transactionError.message }, { status: 500 });
    }

    await serverSupabase.from("notifications_queue").insert({
      user_id: deal.seller_id,
      type: "escrow_released",
      payload: { dealId: deal.id, amount: deal.amount }
    });

    return NextResponse.json({ success: true, deal }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unexpected server error" },
      { status: 500 }
    );
  }
}
