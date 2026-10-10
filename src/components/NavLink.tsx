"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
  category: string;
  scrapable?: boolean;
}

const NavLinks = () => {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories",
        );

        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        } else {
          toast.warn(`Categories API returned status ${res.status}`);
        }
      } catch (error) {
        toast.error("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <nav className="w-full bg-white py-3 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 items-center justify-center overflow-x-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-6 w-24 bg-gray-100 animate-pulse rounded-full shrink-0"
            />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-white py-3 border-b border-gray-100 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 flex gap-3 sm:gap-6 items-center justify-start sm:justify-center overflow-x-auto no-scrollbar">
        {categories.map((item) => {
          const href = `/category/${item.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              id="সব-পণ্য"
              key={item.id}
              href={href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-sm transition-all whitespace-nowrap ${
                isActive
                  ? "bg-green-700 text-white font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.nameBn}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavLinks;
