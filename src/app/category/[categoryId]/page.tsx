import ProductList from "@/components/ProductList";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";

interface CategoryProductsProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const CategoryProducts = async ({ params }: CategoryProductsProps) => {
  const { categoryId } = await params;
  let products = [];

  try {
    const res = await fetch(
      `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
      // https://api.api-store.workers.dev/api/bazardor/products?category=chal
      {
        next: { revalidate: 60 },
      },
    );

    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    toast.error("Failed to fetch category products");
  }
  if (!products) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductList products={products} categoryTitle={categoryId} />
    </div>
  );
};

export default CategoryProducts;
