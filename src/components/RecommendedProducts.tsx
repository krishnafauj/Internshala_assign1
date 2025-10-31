import { Product } from '@/types';
import WishlistButton from './WishlistButton'; // Import our Client Component
import { promises as fs } from "fs";
import path from "path";
/**
 * This is also a SERVER COMPONENT.
 * It is asynchronous, which allows it to fetch data.
 * It's designed to be used within a <Suspense> boundary.
 */
async function getRecommendedProducts() {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const file = await fs.readFile(filePath, "utf8");
  const products: Product[] = JSON.parse(file);

  await new Promise((r) => setTimeout(r, 1000)); // delay effect
  return products.slice(0, 3);
}


export default async function RecommendedProducts() {
    
  const products = await getRecommendedProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="
            bg-white/15 backdrop-blur-md 
            border border-white/20 
            rounded-3xl p-6
            shadow-lg
            flex flex-col justify-between
          "
        >
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {product.name}
            </h2>
            <p className="text-xl font-medium opacity-90 mb-4">
              ${product.price.toFixed(2)}
            </p>
            <p className="opacity-70 mb-6">
              {product.description}
            </p>
          </div>
          
          {/* THIS IS THE KEY:
            We are rendering an interactive Client Component (WishlistButton)
            inside of a Server Component (RecommendedProducts).
            We pass the server-side data (product) as props.
          */}
          <WishlistButton productId={product.id} productName={product.name} />
        </div>
      ))}
    </div>
  );
}
