import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/products";
import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const API_KEY = "Bearer MY_SECRET_KEY";
const filePath = path.join(process.cwd(), "data/products.json");

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ products });
  } catch (e) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== API_KEY) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const newProduct = {
    id: randomUUID(),
    name: body.name,
    slug: body.slug,
    description: body.description || "",
    price: parseFloat(body.price),
    category: body.category || "Uncategorized",
    inventory: parseInt(body.inventory, 10) || 0,
    lastUpdated: new Date().toISOString(),
  };

  const products = await getAllProducts();
  products.push(newProduct);

  await fs.writeFile(filePath, JSON.stringify(products, null, 2), "utf8");

  return NextResponse.json({ product: newProduct }, { status: 201 });
}
