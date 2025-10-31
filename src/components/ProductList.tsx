'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Product } from '@/types';

// Props interface for our component
interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        className="
          w-full max-w-xl p-4 mb-8
          text-lg text-white placeholder-gray-200
          bg-white/15 backdrop-blur-md 
          border border-white/20 
          rounded-2xl 
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="
              bg-white/15 backdrop-blur-md 
              border border-white/20 
              rounded-3xl p-6
              shadow-lg
              transition-all duration-300 hover:bg-white/20
            "
          >
            <h2 className="text-2xl font-semibold mb-2">
              <Link
                href={`/products/${product.slug}`}
                className="text-white no-underline hover:underline"
              >
                {product.name}
              </Link>
            </h2>
            <p className="text-xl font-medium opacity-90">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-4 opacity-70">
              In Stock: {product.inventory}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}