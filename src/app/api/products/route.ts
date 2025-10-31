import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { Product } from '@/types';
import { randomUUID } from 'crypto'; // Import crypto for unique IDs

// Define the simple API key for security
const API_KEY = 'Bearer MY_SECRET_KEY'; 

/**
 * Handles GET requests to /api/products
 * This fulfills the requirement to fetch all products.
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
 * This fulfills the requirement to add a new product.
 */
export async function POST(request: Request) {
  // --- Security Check ---
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== API_KEY) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }
  // --- End Security Check ---

  const jsonDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(jsonDirectory, 'products.json');

  try {
    // 1. Read the new product data from the request body
    const body = await request.json();

    // Basic validation (you can expand this)
    if (!body.name || !body.slug || !body.price) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Read all existing products
    let products: Product[] = [];
    try {
      const fileContents = await fs.readFile(filePath, 'utf8');
      products = JSON.parse(fileContents);
    } catch (readError) {
      console.log("Could not read products.json, will create a new one.");
      // If file doesn't exist or is empty, we'll just start with an empty array
    }

    // 3. Create the new product object
    const newProduct: Product = {
      id: randomUUID(), // Generate a unique ID
      name: body.name,
      slug: body.slug,
      description: body.description || '',
      price: parseFloat(body.price),
      category: body.category || 'Uncategorized',
      inventory: parseInt(body.inventory, 10) || 0,
      lastUpdated: new Date().toISOString(),
    };

    // 4. Add new product to the array
    products.push(newProduct);

    // 5. Write the updated array back to the file
    await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');

    // 6. Return the newly created product
    return NextResponse.json({ product: newProduct }, { status: 201 });

  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: 'Error creating product' },
      { status: 500 }
    );
  }
}

