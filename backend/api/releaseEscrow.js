const { supabase } = require("./_client");

module.exports = async function releaseEscrow(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { dealId } = req.body;
  if (!dealId) return res.status(400).json({ error: "dealId is required" });

  const { data: deal, error: dealError } = await supabase
    .from("deals")
    .update({ status: "completed", escrow_status: "released" })
    .eq("id", dealId)
    .eq("status", "delivered")
    .select()
    .single();

  if (dealError) return res.status(400).json({ error: dealError.message });

  const { error: transactionError } = await supabase.from("transactions").insert({
    deal_id: dealId,
    amount: deal.amount,
    status: "released"
  });

  if (transactionError) return res.status(400).json({ error: transactionError.message });
  return res.status(200).json({ message: "Escrow released", deal });
};
