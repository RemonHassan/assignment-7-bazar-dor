import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
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

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
  );
  const data: Product[] = await res.json();

  return (
    <div>
      <MarqueeText className="py-2" direction="right" duration={15}>
        {data.map((h) => (
          <span key={h.id}>
            <span className="ml-5 ">
              {h.categoryIcon}
              {h.nameBn}
            </span>
            <span className="mx-1">{`${h.today}টাকা/${h.unit}`}</span>
            <span>
              {h.change.dir === "up" ? (
                <span className="text-red-600">▲{h.change.pct}</span>
              ) : (
                <span className="text-green-500">▼{h.change.pct}</span>
              )}
            </span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
