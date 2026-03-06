const { supabase } = require("./_client");

module.exports = async function getProducts(req, res) {
  if (req.method !== "GET") return res.status(405).json({ success: false, error: "Method not allowed" });

  try {
    const { data, error } = await supabase
      .from("products")
      .select("id,title,description,category,price,images,created_at,users!products_seller_id_fkey(username,rating)")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ success: false, error: error.message });
    return res.status(200).json({ success: true, products: data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message || "Unexpected server error" });
  }
};
