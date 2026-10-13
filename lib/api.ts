import { Category, Product } from "@/types";

const BASE = process.env.API_BASE_URL;

async function get<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${BASE}/api/bazardor${path}`, {
      next: { revalidate: 600 }, 
    });
    return response.ok ? (await response.json() as T) : null;
  } catch {
    return null;
  }
}

export const getCategories = async (): Promise<Category[]> =>
  (await get("/categories")) || [];

export const getCategory = (slug: string): Promise<Category | null> =>
  get(`/categories/${encodeURIComponent(slug)}`);

export const getProducts = async (cat?: string): Promise<Product[]> =>
  (await get(
    "/products" + (cat ? `?category=${encodeURIComponent(cat)}` : "")
  )) || [];

export const getProduct = async (slug: string): Promise<Product | null> =>
  (await getProducts()).find((p: Product) => p.slug === slug) || null;