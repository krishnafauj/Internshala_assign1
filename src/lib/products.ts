import path from "path";
import { promises as fs } from "fs";
import { Product } from "@/types";

const filePath = path.join(process.cwd(), "data/products.json");

export async function getAllProducts(): Promise<Product[]> {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug) || null;
}
