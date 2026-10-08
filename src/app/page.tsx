import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
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

export default async function Home() {
  let products: Product[] = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 60 },
      },
    );

    if (res.ok) {
      products = await res.json();
    } else {
      console.warn(`Products API returned status: ${res.status}`);
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  // Filters matching your UI screenshot
  const priceHikeProducts = products.filter((p) => p.change.dir === "up");
  const priceDropProducts = products.filter((p) => p.change.dir === "down");

  return (
    <div>
      <Marquee />
      <div className="container mx-auto px-4 py-6 space-y-10">
        <Banner />

        {/* Price Increased Section */}
        {priceHikeProducts.length > 0 && (
          <section>
            <h2 className="font-bold text-2xl text-emerald-950 flex items-center gap-2 mb-4">
              <span className="text-red-600">▲</span> আজ দাম বেড়েছে
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {priceHikeProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Price Decreased Section */}
        {priceDropProducts.length > 0 && (
          <section>
            <h2 className="font-bold text-2xl text-emerald-950 flex items-center gap-2 mb-4">
              <span className="text-emerald-600">▼</span> আজ দাম কমেছে
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {priceDropProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* All Products Section */}
        <section>
          <h2 className="font-bold text-3xl my-3">সব পণ্য</h2>
          <p className="font-light mb-5 text-gray-600">{`মোট ${products.length}টি পণ্য দেখানো হচ্ছে`}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
