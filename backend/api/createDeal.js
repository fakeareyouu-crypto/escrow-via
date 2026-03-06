const { supabase } = require("./_client");

module.exports = async function createDeal(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const { buyerId, sellerId, productId = null, amount } = req.body;
    if (!buyerId || !sellerId || !amount) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("deals")
      .insert({
        buyer_id: buyerId,
        seller_id: sellerId,
        product_id: productId,
        amount,
        status: "pending",
        escrow_status: "unfunded"
      })
      .select()
      .single();

    if (error) return res.status(400).json({ success: false, error: error.message });

    await supabase.from("notifications_queue").insert({
      user_id: sellerId,
      type: "deal_created",
      payload: { dealId: data.id, amount }
    });

    return res.status(201).json({ success: true, deal: data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || "Unexpected server error" });
  }
};
