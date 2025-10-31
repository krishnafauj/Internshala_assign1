import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return product
    ? NextResponse.json({ product })
    : NextResponse.json({ message: "Not found" }, { status: 404 });
}
