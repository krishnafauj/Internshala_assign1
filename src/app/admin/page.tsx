'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/adminApi';
import type { Product, ProductInput } from '@/types/product';
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await adminApi.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await adminApi.deleteProduct(product.slug);
      await fetchProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const handleSubmit = async (data: ProductInput) => {
    try {
      if (selectedProduct) {
        await adminApi.updateProduct(selectedProduct.slug, data);
      } else {
        await adminApi.createProduct(data);
      }
      await fetchProducts();
      setIsFormOpen(false);
    } catch (err) {
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your product catalog
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Product
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-8 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {isFormOpen ? (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            {selectedProduct ? 'Edit Product' : 'Create New Product'}
          </h2>
          <ProductForm
            initialData={selectedProduct || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}