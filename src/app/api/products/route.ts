import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { Product } from '@/types'; // Using '@/types' alias is common

export async function GET(request: Request) {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(jsonDirectory, 'products.json');

  try {
    // Read the file from the server's file system
    const fileContents = await fs.readFile(filePath, 'utf8');
    // Parse the JSON data
    const products: Product[] = JSON.parse(fileContents);
    
    return NextResponse.json({ products });
  } catch (error) {
    // If an error occurs, return a 500 status
    return NextResponse.json(
      { message: 'Error reading product data.' },
      { status: 500 }
    );
  }
}

// This function handles POST requests to /api/products
// This is a placeholder for the Admin Panel [cite: 49]
export async function POST(request: Request) {
  // Logic for adding a new product will go here
  return NextResponse.json(
    { message: 'Product created successfully (placeholder)' },
    { status: 201 }
  );
}