import Link from "next/link";

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

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { nameBn, unit, image, today, change } = product;

  const changeIcon =
    change.dir === "up" ? "▲" : change.dir === "down" ? "▼" : "—";

  const changeColor =
    change.dir === "up"
      ? "text-green-600 bg-green-50"
      : change.dir === "down"
        ? "text-red-500 bg-red-50"
        : "text-gray-500 bg-gray-50";

  return (
    <Link href={`/products/${product.id}`}>
      <div className="w-full rounded-2xl border border-[#dce5dd] bg-[#fdfefd] p-4 shadow-sm">
        {/* Product information */}
        <div className="flex items-start gap-3">
          {/* Product image */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f1f5f1]">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f1f5f1] text-3xl">
              {image}
            </div>
          </div>

          {/* Name + unit */}
          <div>
            <h3 className="text-lg font-bold leading-tight text-[#172019]">
              {nameBn}
            </h3>

            <p className="mt-1 text-sm text-gray-600">{unit}</p>
          </div>
        </div>

        {/* Price section */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-600">আজকের দাম</p>

            <p className="mt-0.5 text-2xl font-bold text-[#172019]">
              {today} টাকা
            </p>
          </div>

          {/* Price change */}
          <div
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${changeColor}`}
          >
            <span>{changeIcon}</span>
            <span>{change.pct}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
