'use client';

import { useState, useEffect, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Product } from '../db/queries';

export const Table: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // Fetch from the API route
        if (!response.ok) {
          const errorData = await response.json(); // Get error details from the server
          throw new Error(errorData.error || 'Failed to fetch products'); // Throw an error
        }
        const fetchedProducts = await response.json();
        setProducts(fetchedProducts);
      } catch (error) {
        // Type the error as any since it could be anything
        console.error('Error fetching products:', error);
        setError(String(error)); // Set the error message to display
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: products.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40, // Adjust based on your row height
  });

  const rowItems = rowVirtualizer.getVirtualItems();

  if (error) {
    // Display the error message
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="text-center text-gray-500">No products found.</div>;
  }

  return (
    <div
      ref={tableContainerRef} // Assign the ref to the div
      className="w-full overflow-auto border border-gray-300 relative"
      style={{ height: 'calc(100vh - 400px)' }}
    >
      <div
        style={{
          height: rowVirtualizer.getTotalSize(),
          width: '100%',
        }}
      >
        {rowItems.map((row) => (
          <div
            key={row.key}
            style={{
              top: row.start + 'px',
            }}
            className={`flex items-center w-full absolute p-4 border-b bg-white left-0`}
          >
            <span className="w-1/12">{products[row.index].id}</span>
            <span className="w-4/12">{products[row.index].name}</span>
            {/* Adjust widths as needed */}
            <span className="w-2/12">{products[row.index].department}</span>
            <span className="w-4/12">{products[row.index].isbn}</span>
            <span className="w-1/12">{products[row.index].price}</span>
            {/* Add other columns as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};
