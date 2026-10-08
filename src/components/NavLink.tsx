import Link from "next/link";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
  scrapable?: boolean;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
  );
  const data = await res.json();
  const categories: Category[] = data;

  return (
    <nav className="w-full bg-white  py-3">
      <div className="max-w-7xl mx-auto px-4 flex gap-6 items-center justify-center overflow-x-auto">
        {categories.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="flex items-center gap-1.5 font-medium text-gray-700 hover:text-emerald-700 transition-colors whitespace-nowrap"
          >
            <span>{item.icon}</span>
            <span>{item.nameBn}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavLinks;
