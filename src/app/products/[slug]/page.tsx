import { Product } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import path from 'path';
import { promises as fs } from 'fs';

export async function generateStaticParams() {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const filePath = path.join(jsonDirectory, 'products.json');
  
  const fileContents = await fs.readFile(filePath, 'utf8');
  const products: Product[] = JSON.parse(fileContents);

  return products.map((product) => ({
    slug: product.slug,
  }));
}

async function getProduct(slug: string): Promise<Product | null> {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const file = await fs.readFile(filePath, "utf8");
  const products: Product[] = JSON.parse(file);
  return products.find((p) => p.slug === slug) || null;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await the params Promise
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/5 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
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
        ">
          <span className="
            group-hover:-translate-x-1
            transition-transform duration-300
          ">
            ←
          </span>
          Back to Products
        </Link>

        {/* Main Product Card */}
        <div className="
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-3xl p-8 md:p-12
          shadow-2xl
          grid md:grid-cols-2 gap-12
          relative overflow-hidden
        ">
          {/* Subtle Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-400/30 to-transparent"></div>
          
          {/* Product Details */}
          <div className="space-y-8">
            {/* Product Title */}
            <div>
              <h1 className="
                text-5xl md:text-6xl font-black mb-6
                text-transparent bg-clip-text
                bg-linear-to-r from-white via-gray-200 to-gray-400
                leading-tight
              ">
                {product.name}
              </h1>
              
              <p className="
                text-xl text-gray-300 leading-relaxed
                bg-white/5 rounded-xl p-4
                border border-white/5
              ">
                {product.description}
              </p>
            </div>

            {/* Product Meta */}
            <div className="space-y-4">
              <div className="
                flex items-center gap-3
                bg-white/5 rounded-xl p-4
                border border-white/5
              ">
                <span className="text-white font-semibold min-w-20">Category:</span>
                <span className="
                  px-3 py-1 
                  bg-blue-500/20 text-blue-300
                  rounded-lg text-sm font-medium
                  border border-blue-500/30
                ">
                  {product.category}
                </span>
              </div>
              
              <div className="
                flex items-center gap-3
                bg-white/5 rounded-xl p-4
                border border-white/5
              ">
                <span className="text-white font-semibold min-w-20">Updated:</span>
                <span className="text-gray-300">
                  {new Date(product.lastUpdated).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Price & Action Card */}
          <div className="
            bg-linear-to-br from-slate-800/50 to-slate-900/50
            border border-white/10
            rounded-2xl p-8
            flex flex-col justify-center
            space-y-8
            relative
          ">
            {/* Price Display */}
            <div className="text-center">
              <p className="text-gray-400 text-lg mb-2">Price</p>
              <p className="text-6xl font-black text-white mb-2">
                ${product.price.toFixed(2)}
              </p>
              <div className="w-16 h-1 bg-linear-to-r from-blue-400 to-emerald-400 mx-auto rounded-full"></div>
            </div>

            {/* Stock Status */}
            <div className="text-center">
              <p className="text-gray-400 text-lg mb-2">Available Stock</p>
              <div className="
                inline-flex items-center gap-3
                bg-green-500/20 border border-green-500/30
                rounded-2xl px-6 py-3
              ">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-2xl font-bold text-green-300">
                  {product.inventory} units
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button className="
              w-full py-4 px-6
              text-xl font-bold text-white
              bg-linear-to-r from-blue-500 via-blue-600 to-emerald-500
              rounded-xl
              shadow-lg
              transition-all duration-300
              hover:from-blue-600 hover:via-blue-700 hover:to-emerald-600
              hover:shadow-xl hover:shadow-blue-500/25
              hover:scale-105
              active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900
              relative overflow-hidden
              group
            ">
              {/* Shine effect on hover */}
              <div className="absolute inset-0 -left-full group-hover:left-full w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-all duration-1000"></div>
              
              <span className="relative">Add to Cart</span>
            </button>

            {/* Additional Info */}
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Free shipping • 30-day returns • Secure checkout
              </p>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(10)].map((_, i) => (
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