'use client'; // This directive is essential!

import { useState } from 'react';

// This is an interactive Client Component
export default function WishlistButton({ productId, productName }: { productId: string, productName: string }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    setIsAdded(true);
    console.log(`Added "${productName}" (ID: ${productId}) to wishlist.`);
    // In a real app, you would call an API route here
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAdded}
      className="
        w-full py-3 px-6 text-lg font-bold
        rounded-lg shadow-md
        transition-all duration-300
        disabled:opacity-70
        bg-gradient-to-r 
        from-teal-400 to-blue-500 
        text-white
        hover:from-teal-500 hover:to-blue-600
        disabled:from-gray-500 disabled:to-gray-600
        disabled:cursor-not-allowed
      "
    >
      {isAdded ? 'Added to Wishlist' : 'Add to Wishlist'}
    </button>
  );
}
