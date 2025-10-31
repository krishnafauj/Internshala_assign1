import { Product } from '@/types';
import Link from 'next/link';

async function getInventoryData() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseURL}/api/products`, {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product data');
  }
  
  const data: { products: Product[] } = await res.json();
  return data.products;
}

// Enhanced Stat Card Component
function StatCard({ title, value, description, gradient }: { 
  title: string, 
  value: string | number, 
  description: string,
  gradient: string 
}) {
  return (
    <div className="
      bg-white/10 backdrop-blur-xl
      border border-white/10
      rounded-2xl p-8
      shadow-2xl
      hover:bg-white/15
      transition-all duration-300
      group
      relative overflow-hidden
    ">
      {/* Gradient Accent */}
      <div className={`absolute top-0 left-0 w-2 h-full ${gradient}`}></div>
      
      <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-2">{title}</p>
      <p className="text-5xl font-black my-4 text-white group-hover:scale-105 transition-transform duration-300">
        {value}
      </p>
      <p className="text-gray-300 text-lg">{description}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const products = await getInventoryData();

  // Calculate real-time statistics
  const totalProducts = products.length;
  const totalInventory = products.reduce((sum, product) => sum + product.inventory, 0);
  const lowStockItems = products.filter(product => product.inventory < 50).length;
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.inventory), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8">
        
        {/* Back Navigation */}
        <Link href="/" className="
          inline-flex items-center gap-2 mb-8 
          text-lg font-medium
          text-gray-300 hover:text-white 
          transition-all duration-300
          group
          bg-white/5 backdrop-blur-sm
          border border-white/10
          rounded-xl px-4 py-2
          hover:border-white/20
        ">
          <span className="
            group-hover:-translate-x-1
            transition-transform duration-300
          ">
            ←
          </span>
          Back to Products
        </Link>

        {/* Header Section */}
        <div className="mb-12">
          <h1 className="
            text-6xl font-black mb-6
            text-transparent bg-clip-text
            bg-gradient-to-r from-white via-gray-200 to-gray-400
            leading-tight
          ">
            Inventory Dashboard
          </h1>
          
          {/* Live Status Badge */}
          <div className="
            inline-flex items-center gap-3
            bg-green-500/20 backdrop-blur-sm
            border border-green-500/30
            rounded-2xl px-6 py-3
            mb-6
          ">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-lg font-semibold text-gray-200">
              Live Data • Server-Side Rendered • Real-time Updates
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            title="Total Products"
            value={totalProducts}
            description="Active items in catalog"
            gradient="bg-gradient-to-b from-blue-500 to-cyan-500"
          />
          <StatCard 
            title="Total Inventory"
            value={totalInventory.toLocaleString()}
            description="Units in stock"
            gradient="bg-gradient-to-b from-emerald-500 to-green-500"
          />
          <StatCard 
            title="Low Stock"
            value={lowStockItems}
            description="Items needing restock"
            gradient="bg-gradient-to-b from-amber-500 to-orange-500"
          />
          <StatCard 
            title="Total Value"
            value={`$${totalValue.toLocaleString()}`}
            description="Inventory worth"
            gradient="bg-gradient-to-b from-purple-500 to-pink-500"
          />
        </div>

        {/* Live Inventory List */}
        <div className="
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-2xl p-8
          shadow-2xl
          relative overflow-hidden
        ">
          {/* Header Shine */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Live Stock Levels</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-sm">Live</span>
            </div>
          </div>

          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="
                  flex justify-between items-center 
                  bg-white/5 backdrop-blur-sm
                  border border-white/5
                  rounded-xl p-6
                  hover:bg-white/10
                  transition-all duration-300
                  group
                "
              >
                <div className="flex-1">
                  <p className="text-xl font-semibold text-white group-hover:text-gray-100 transition-colors">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="
                      px-3 py-1
                      bg-blue-500/20 text-blue-300
                      rounded-lg text-sm font-medium
                      border border-blue-500/30
                    ">
                      {product.category}
                    </span>
                    <span className="text-gray-400 text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`
                    px-4 py-2 rounded-lg
                    text-lg font-bold
                    border
                    ${product.inventory < 50 
                      ? 'bg-red-500/20 text-red-300 border-red-500/30' 
                      : product.inventory < 100
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-green-500/20 text-green-300 border-green-500/30'
                    }
                  `}>
                    {product.inventory} <span className="text-sm font-normal text-gray-400">units</span>
                  </div>
                  
                  {product.inventory < 50 && (
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleString()} • Auto-refresh every request
          </p>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}