import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { Product } from '@/types';

/**
 * Handles GET requests to /api/products
 * This fulfills the requirement to fetch all products [cite: 47].
 */
export async function GET(request: Request) {
  // Find the full path to our JSON file
  const jsonDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(jsonDirectory, 'products.json');

  try {
    // Read the file from the server's file system
    const fileContents = await fs.readFile(filePath, 'utf8');
    
    // Parse the JSON data
    const products: Product[] = JSON.parse(fileContents);
    
    // Send the products as a JSON response
    return NextResponse.json({ products });
  } catch (error) {
    // If an error occurs (e.g., file not found), return a 500 status
    console.error("Error reading product data:", error);
    return NextResponse.json(
      { message: 'Error reading product data.' },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to /api/products
 * This is a placeholder for the Admin Panel [cite: 49].
 */
export async function POST(request: Request) {
  // Logic for adding a new product will go here
  // For now, we just return a success message
  return NextResponse.json(
    { message: 'Product created successfully (placeholder)' },
    { status: 201 }
  );
}
