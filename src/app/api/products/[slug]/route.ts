import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { Product } from '@/types';

// Updated function signature for Next.js 15+
export async function GET(
  request: Request, 
  { params }: { params: Promise<{ slug: string }> }
) {
  // Await the params Promise
  const { slug } = await params;

  // Get the path to our data file
  const jsonDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(jsonDirectory, 'products.json');

  try {
    // Read all products
    const fileContents = await fs.readFile(filePath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);

    // Find the one product that matches the slug
    const product = products.find((p) => p.slug === slug);

    if (product) {
      // Return the found product
      return NextResponse.json({ product });
    } else {
      // If no product is found, return a 404
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    // Handle file read errors
    return NextResponse.json(
      { message: 'Error reading product data' },
      { status: 500 }
    );
  }
}