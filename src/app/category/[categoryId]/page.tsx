import ProductCard from "@/components/ProductCard";
import React from "react";

// Define the exact interfaces matching your API response
interface Change {
  dir: "up" | "down" | "same";
  pct: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
}

interface CategoryProductsProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryProducts = async ({ params }: CategoryProductsProps) => {
  const { categoryId } = await params;
  let products: Product[] = [];

  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`,
      {
        cache: "no-store",
      },
    );

    if (res.ok) {
      products = await res.json();
    } else {
      console.warn(`Category API returned status: ${res.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch category products:", error);
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold mb-4">{categoryId}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
