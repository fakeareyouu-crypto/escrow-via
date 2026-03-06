const { supabase } = require("./_client");

module.exports = async function releaseEscrow(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const { dealId } = req.body;
    if (!dealId) return res.status(400).json({ success: false, error: "dealId is required" });

    const { data: deal, error: dealError } = await supabase
      .from("deals")
      .update({ status: "completed", escrow_status: "released" })
      .eq("id", dealId)
      .eq("status", "delivered")
      .select()
      .single();

    if (dealError) return res.status(400).json({ success: false, error: dealError.message });

    const { error: transactionError } = await supabase.from("transactions").insert({
      deal_id: dealId,
      amount: deal.amount,
      status: "released"
    });

    if (transactionError) return res.status(500).json({ success: false, error: transactionError.message });

    await supabase.from("notifications_queue").insert({
      user_id: deal.seller_id,
      type: "escrow_released",
      payload: { dealId: deal.id, amount: deal.amount }
    });

    return res.status(200).json({ success: true, message: "Escrow released", deal });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || "Unexpected server error" });
  }
};
