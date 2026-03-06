const { supabase } = require("./_client");

module.exports = async function getProducts(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { data, error } = await supabase
    .from("products")
    .select("id,title,description,category,price,created_at,users!products_seller_id_fkey(username,rating)")
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  return res.status(200).json({ products: data });
};
