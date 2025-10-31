'use client'; // This is a Client Component

import { useState, useEffect, FormEvent } from 'react';
import { Product } from '@/types';

// Helper function to auto-generate a slug
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
    .replace(/[\s_]+/g, '-')   // Replace spaces with dashes
    .replace(/^-+|-+$/g, '');  // Trim leading/trailing dashes
};

export default function AdminPage() {
  // State for the list of products (fetched on client)
  const [products, setProducts] = useState<Product[]>([]);
  
  // State for the form inputs
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inventory, setInventory] = useState('');
  const [category, setCategory] = useState('');
  
  // State for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Auto-update slug when name changes
  useEffect(() => {
    setSlug(generateSlug(name));
  }, [name]);

  // Fetch all products on component mount (Client-Side Fetching)
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setProducts(data.products); // Access the products array from the response
    } catch (error) {
      setMessage({ type: 'error', text: 'Could not load products.' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const newProductData = {
      name,
      slug,
      description,
      price: parseFloat(price),
      inventory: parseInt(inventory),
      category,
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Send the secret key for authorization
          'Authorization': 'Bearer MY_SECRET_KEY'
        },
        body: JSON.stringify(newProductData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      // Success
      setMessage({ type: 'success', text: 'Product created successfully!' });
      // Reset form
      setName('');
      setSlug('');
      setDescription('');
      setPrice('');
      setInventory('');
      setCategory('');
      // Refresh the product list
      fetchProducts();

    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper for styling form inputs
  const inputClass = "w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="
          text-5xl font-extrabold mb-4
          text-transparent bg-clip-text 
          bg-gradient-to-r from-purple-400 to-pink-600
          drop-shadow-md
        ">
          Admin Panel
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          This page uses Client-Side Rendering (CSR) to create and view products.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* --- Product Creation Form --- */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white">Create New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200" htmlFor="name">Product Name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="e.g., Smart Watch"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200" htmlFor="slug">Product Slug (Auto-generated)</label>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={`${inputClass} bg-white/5 opacity-70`}
                  placeholder="e.g., smart-watch"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={inputClass}
                  rows={4}
                  placeholder="Product details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200" htmlFor="price">Price</label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className={inputClass}
                    placeholder="e.g., 199.99"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-200" htmlFor="inventory">Inventory</label>
                  <input
                    id="inventory"
                    type="number"
                    value={inventory}
                    onChange={(e) => setInventory(e.target.value)}
                    className={inputClass}
                    placeholder="e.g., 100"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-200" htmlFor="category">Category</label>
                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                  placeholder="e.g., Electronics"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full py-3 px-6 text-lg font-bold text-white
                  bg-gradient-to-r from-purple-500 to-pink-600
                  rounded-lg shadow-lg
                  transition-all duration-300
                  hover:from-purple-600 hover:to-pink-700
                  hover:shadow-xl hover:scale-105
                  active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {isLoading ? 'Creating Product...' : 'Create Product'}
              </button>

              {message && (
                <div className={`mt-4 text-center p-3 rounded-lg ${
                  message.type === 'success' ? 'bg-green-500/30 text-green-200' : 'bg-red-500/30 text-red-200'
                }`}>
                  {message.text}
                </div>
              )}
            </form>
          </div>

          {/* --- Current Products List --- */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white">Current Products</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {products.length > 0 ? products.map((product) => (
                <div key={product.id} className="bg-white/10 border border-white/10 p-4 rounded-lg flex justify-between items-center hover:bg-white/15 transition-colors">
                  <div>
                    <p className="text-lg font-semibold text-white">{product.name}</p>
                    <p className="text-sm text-gray-400">Stock: {product.inventory}</p>
                  </div>
                  <p className="text-xl font-bold text-purple-300">${product.price.toFixed(2)}</p>
                </div>
              )) : (
                <p className="text-gray-400 text-center">Loading products...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}