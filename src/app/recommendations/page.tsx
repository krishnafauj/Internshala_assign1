import { Suspense } from 'react';
import RecommendedProducts from '@/components/RecommendedProducts';

/**
 * This is the main page component, which is a Server Component.
 * It orchestrates the page layout and uses <Suspense>
 * to stream in the dynamic parts of the page (the products).
 */
export default async function RecommendationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="
        text-5xl font-extrabold mb-4 
        text-transparent bg-clip-text 
        bg-linear-to-r from-blue-400 to-teal-400
        drop-shadow-md
      ">
        Our Recommendations
      </h1>
      <p className="text-xl opacity-80 mb-8">
        This page uses React Server Components. The product list is fetched on the server,
        but the "Wishlist" buttons are interactive Client Components.
      </p>

      {/* <Suspense> allows us to show a loading state (the fallback)
        while the <RecommendedProducts /> Server Component is busy
        fetching its data on the server.
      */}
      <Suspense fallback={<ProductsLoadingFallback />}>
        {/* @ts-ignore - This is a common pattern for async Server Components */}
        <RecommendedProducts />
      </Suspense>
    </div>
  );
}

/**
 * This is a simple loading skeleton component.
 * It's rendered inside the <Suspense> boundary immediately,
 * and will be replaced once RecommendedProducts is ready.
 */
function ProductsLoadingFallback() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="
          bg-white/15 backdrop-blur-md 
          border border-white/20 
          rounded-3xl p-6 shadow-lg
          animate-pulse
        ">
          <div className="h-32 bg-white/20 rounded-xl mb-6"></div>
          <div className="h-8 bg-white/20 rounded-lg mb-4 w-3/4"></div>
          <div className="h-6 bg-white/20 rounded-lg w-1/4 mb-4"></div>
          <div className="h-12 bg-white/20 rounded-lg w-full"></div>
        </div>
      ))}
    </div>
  );
}

