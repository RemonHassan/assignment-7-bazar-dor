"use client";

import { useState, ChangeEvent } from "react";
import ProductCard from "@/components/ProductCard";

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

interface ProductListProps {
  products: Product[];
  categoryTitle?: string;
}

type SortOption = "default" | "lowToHigh" | "highToLow";

const parsePrice = (price: number | string): number => {
  if (typeof price === "number") return price;
  if (!price) return 0;

  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const enString = price
    .toString()
    .replace(/[০-৯]/g, (digit) => bnDigits.indexOf(digit).toString());

  return parseFloat(enString) || 0;
};

export default function ProductList({
  products,
  categoryTitle,
}: ProductListProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  const normalizedProducts: Product[] = products.map((product) => ({
    ...product,
    today: parsePrice(product.today),
  }));

  const sortedProducts: Product[] = [...normalizedProducts].sort((a, b) => {
    const priceA = parsePrice(a.today);
    const priceB = parsePrice(b.today);

    if (sortOption === "lowToHigh") {
      return priceA - priceB;
    }
    if (sortOption === "highToLow") {
      return priceB - priceA;
    }
    return 0;
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-3 border-b border-gray-100 pb-5">
        <div>
          {categoryTitle && (
            <h1 className="text-2xl font-bold text-gray-900 capitalize mb-1">
              {categoryTitle}
            </h1>
          )}
          <p className="text-sm font-medium text-gray-500">
            মোট{" "}
            <span className="font-semibold text-gray-900">
              {products.length}
            </span>{" "}
            টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="relative inline-block w-full sm:w-64 mt-1">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold text-gray-700 shadow-sm transition-all focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
          >
            <option value="default">সাজান: ডিফল্ট</option>
            <option value="lowToHigh">দাম: কম থেকে বেশি</option>
            <option value="highToLow">দাম: বেশি থেকে কম</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            ∨
          </div>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 font-medium">
          কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </div>
  );
}
