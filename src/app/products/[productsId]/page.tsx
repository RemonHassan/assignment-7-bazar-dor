import React from "react";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Change {
  dir: "up" | "down" | "flat" | "same";
  pct: number;
}

interface ProductDetail {
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
  markets: Market[];
}

interface DetailPageProps {
  params: Promise<{
    productsId: string;
  }>;
}

// Convert numbers to Bengali numerals
const toBn = (num: number | string): string => {
  if (num === undefined || num === null) return "";
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bnDigits[parseInt(digit, 10)]);
};

const DetailPage = async ({ params }: DetailPageProps) => {
  const { productsId } = await params;

  let product: ProductDetail | null = null;

  try {
    const res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products/${productsId}`,
      { next: { revalidate: 60 } },
    );

    if (res.ok) {
      product = await res.json();
    } else {
      // Fallback: Fetch all products and filter by ID or slug
      const allRes = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
        { next: { revalidate: 60 } },
      );
      if (allRes.ok) {
        const allProducts: ProductDetail[] = await allRes.json();
        product =
          allProducts.find(
            (p) => p.id.toString() === productsId || p.slug === productsId,
          ) || null;
      }
    }
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-gray-500 font-medium">
        পণ্যটি পাওয়া যায়নি বা কোনো ত্রুটি ঘটেছে। (ID: {productsId})
      </div>
    );
  }

  // Summary Calculations
  const allMins = product.markets?.map((m) => m.min) || [];
  const allMaxs = product.markets?.map((m) => m.max) || [];

  const lowestPrice = allMins.length > 0 ? Math.min(...allMins) : product.today;
  const highestPrice =
    allMaxs.length > 0 ? Math.max(...allMaxs) : product.today;
  const avgPrice = product.today;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";

  const changeIcon = isUp ? "▲" : isDown ? "▼" : "—";
  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-emerald-600"
      : "text-gray-500";

  const diffAmount = Math.abs(product.today - product.yesterday);
  const diffText =
    product.today !== product.yesterday
      ? `গতকালকের তুলনায় আজ দাম ${isUp ? "বেড়েছে" : "কমেছে"} · ${toBn(diffAmount)} টাকা`
      : "গতকালকের তুলনায় দাম অপরিবর্তিত রয়েছে";

  const isImageEmoji = !product.image?.startsWith("http");

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl space-y-8">
      {/* 1. Top Header Card */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-[#e2eae3] bg-[#f8faf8] p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl border border-gray-100">
            {isImageEmoji ? (
              <span>{product.image}</span>
            ) : (
              <img
                src={product.image}
                alt={product.nameBn}
                className="h-full w-full object-cover rounded-2xl"
              />
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-0.5">
              প্রতি {product.unit} · {product.categoryNameBn}
            </p>
            <p className="text-xs text-gray-600 mt-2 font-medium">{diffText}</p>
          </div>
        </div>

        {/* Price Indicator Widget */}
        <div className="w-full sm:w-auto text-left sm:text-right rounded-xl bg-white/80 p-4 border border-gray-200 min-w-[140px]">
          <p className="text-xs font-semibold text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-extrabold text-gray-900 mt-1">
            {toBn(product.today)}
          </p>
          <p className="text-xs font-medium text-gray-500 mt-0.5">
            টাকা / {product.unit}
          </p>
          <div
            className={`flex items-center sm:justify-end gap-1 text-xs font-bold mt-1 ${changeColor}`}
          >
            <span>{changeIcon}</span>
            <span>{toBn(product.change?.pct || 0)}%</span>
          </div>
        </div>
      </div>

      {/* 2. Summary Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-3">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[#e2eae3] bg-[#f8faf8] p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">
              {toBn(lowestPrice)} টাকা
            </p>
            <p className="text-xs text-gray-500 mt-1">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-2xl border border-[#e2eae3] bg-[#f8faf8] p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-500">সর্বাধিক দাম</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {toBn(highestPrice)} টাকা
            </p>
            <p className="text-xs text-gray-500 mt-1">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="rounded-2xl border border-[#e2eae3] bg-[#f8faf8] p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-500">গড় দাম</p>
            <p className="text-2xl font-bold text-emerald-950 mt-1">
              {toBn(avgPrice)} টাকা
            </p>
            <p className="text-xs text-gray-500 mt-1">
              প্রতি {product.unit}-এর হিসাবে
            </p>
          </div>
        </div>
      </div>

      {/* 3. Market Pricing Table */}
      {product.markets && product.markets.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            বাজারভিত্তিক আজকের দাম
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-[#e2eae3] bg-[#f8faf8] shadow-sm">
            <table className="w-full text-left text-sm text-gray-800">
              <thead className="bg-[#f1f5f2] border-b border-[#e2eae3] text-xs font-bold text-gray-600">
                <tr>
                  <th className="px-6 py-4">বাজার</th>
                  <th className="px-6 py-4">বিভাগ</th>
                  <th className="px-6 py-4">সর্বনিম্ন</th>
                  <th className="px-6 py-4">সর্বাধিক</th>
                  <th className="px-6 py-4 text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/60">
                {product.markets.map((m, idx) => {
                  const marketAvg = ((m.min + m.max) / 2).toFixed(2);
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-white/60 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {m.market}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{m.division}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {toBn(m.min)} টাকা
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {toBn(m.max)} টাকা
                      </td>
                      <td className="px-6 py-4 text-right font-extrabold text-gray-900">
                        {toBn(marketAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
