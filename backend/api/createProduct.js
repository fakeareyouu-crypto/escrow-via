const { supabase } = require("./_client");

module.exports = async function createProduct(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const { sellerId, title, description, category, price, images = [] } = req.body;
    if (!sellerId || !title || !description || !category || !price) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("products")
      .insert({ seller_id: sellerId, title, description, category, price, images })
      .select()
      .single();

    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.status(201).json({ success: true, product: data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || "Unexpected server error" });
  }
};
