import { NextResponse } from "next/server";
import { serverSupabase } from "@/lib/server-supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();
    const category = searchParams.get("category")?.trim();
    const sort = searchParams.get("sort") || "newest";
    const page = Number(searchParams.get("page") || "1");
    const pageSize = Math.min(Number(searchParams.get("pageSize") || "12"), 50);

    const from = (Math.max(page, 1) - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = serverSupabase
      .from("products")
      .select(
        "id,title,description,category,price,images,created_at,seller_id,users!products_seller_id_fkey(username,rating)",
        { count: "exact" }
      )
      .range(from, to);

    if (search) query = query.ilike("title", `%${search}%`);
    if (category && category !== "all") query = query.eq("category", category);

    if (sort === "price-asc") query = query.order("price", { ascending: true });
    else if (sort === "price-desc") query = query.order("price", { ascending: false });
    else query = query.order("created_at", { ascending: false });

    const { data, error, count } = await query;
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      products: data ?? [],
      pagination: { page, pageSize, total: count ?? 0 }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unexpected server error" },
      { status: 500 }
    );
  }
}
