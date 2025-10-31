'use client';

import { useState, useEffect, FormEvent } from 'react';
import { Product } from '@/types';

// ... (generateSlug function is the same) ...

export default function AdminPage() {
  // ... (all your useState hooks are the same) ...

  // Auto-update slug when name changes
  useEffect(() => {
    setSlug(generateSlug(name));
  }, [name]);

  // Fetch all products on component mount (Client-Side Fetching)
  const fetchProducts = async () => {
    try {
      //
      // --- THIS IS THE FIX ---
      // Add `cache: 'no-store'` to ensure we always get fresh data
      //
      const res = await fetch('/api/products', { cache: 'no-store' });
      //
      // --- END OF FIX ---
      //

      if (!res.ok) throw new Error('Failed to fetch');
      const data: { products: Product[] } = await res.json();
      setProducts(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Could not load products.' });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ... (handleSubmit function is the same) ...

  // ... (inputClass and the rest of the JSX is the same) ...
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (rest of your JSX) ... */}
      
        {/* --- Current Products List --- */}
        <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Current Products</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            
            {/* --- Make sure your list re-renders from state --- */}
            {products.length > 0 ? products.map((product) => (
              <div key={product.id} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-sm opacity-70">Stock: {product.inventory}</p>
                </div>
                <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
              </div>
            )) : (
              <p className="opacity-70">Loading products...</p>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}

