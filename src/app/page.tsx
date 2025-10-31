import { Product } from '@/types';
import ProductList from '@/components/ProductList';
import { getAllProducts } from "@/lib/products";


export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Enhanced Main Title */}
          <h1 className="
            text-6xl font-black mb-6 
            text-transparent bg-clip-text 
            bg-linear-to-r from-white via-gray-200 to-gray-400
            drop-shadow-2xl
            tracking-tight
          ">
            Product Catalog
          </h1>
          
          {/* Enhanced Subtitle with Glass Effect */}
          <div className="
            inline-block 
            bg-white/5 backdrop-blur-lg 
            border border-white/10 
            rounded-2xl 
            px-8 py-4 
            mb-8
            shadow-2xl
            hover:bg-white/10
            transition-all duration-300
          ">
            <p className="
              text-xl font-semibold
              text-gray-200
              flex items-center justify-center gap-2
            ">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Statically Generated • Client-Side Search
            </p>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="
              bg-white/5 backdrop-blur-sm 
              border border-white/10 
              rounded-xl 
              px-6 py-3
              hover:border-white/20
              transition-all duration-300
            ">
              <span className="text-white font-bold text-lg">{products.length}</span>
              <span className="text-gray-300 ml-2">Premium Products</span>
            </div>
            <div className="
              bg-white/5 backdrop-blur-sm 
              border border-white/10 
              rounded-xl 
              px-6 py-3
              hover:border-white/20
              transition-all duration-300
            ">
              <span className="text-cyan-400 font-bold text-lg">SSG</span>
              <span className="text-gray-300 ml-2">Optimized</span>
            </div>
          </div>
        </div>

        {/* Enhanced Product List Container */}
        <div className="
          bg-white/5 backdrop-blur-xl 
          border border-white/10 
          rounded-3xl 
          p-8
          shadow-2xl
          hover:shadow-2xl hover:shadow-white/5
          transition-all duration-500
          relative
          overflow-hidden
        ">
          {/* Subtle Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-white to-transparent opacity-20"></div>
          
          <ProductList products={products} />
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-12">
          <div className="
            inline-flex items-center gap-2 
            bg-white/5 backdrop-blur-sm
            border border-white/10
            rounded-xl
            px-4 py-2
          ">
            <span className="text-gray-400 text-sm">✨</span>
            <p className="text-gray-400 text-sm">
              Built with Next.js • Tailwind CSS • TypeScript
            </p>
          </div>
        </div>
      </div>

      {/* Subtle Floating Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}