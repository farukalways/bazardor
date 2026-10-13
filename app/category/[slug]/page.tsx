import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import SortSelect from "@/components/SortSelect";
import NotFoundView from "@/components/NotFoundView";
import { getCategory, getProducts } from "@/lib/api";
import { Category, Product } from "@/types";



interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;
  
  const category: Category | null = await getCategory(slug);
  if (!category || !category.slug) notFound();

  let items: Product[] = await getProducts(slug);
  
  if (sort === "asc") {
    items = [...items].sort((a, b) => a.today - b.today);
  } else if (sort === "desc") {
    items = [...items].sort((a, b) => b.today - a.today);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-3xl font-bold">{category.icon} {category.nameBn}</h1>
        <Suspense>
          <SortSelect />
        </Suspense>
      </div>
      {items.length === 0 ? (
        <NotFoundView text="এই ক্যাটেগরিতে কোনো পণ্য পাওয়া যায়নি।" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}