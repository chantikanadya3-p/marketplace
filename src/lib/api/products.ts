import type { Product } from "@/types/product";

const API_URL =
  "https://fakestoreapi.com/products";

export async function getProducts(): Promise<
  Product[]
> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products: ${response.status}`,
    );
  }

  const products: Product[] =
    await response.json();

  return products;
}

export async function getProductById(
  id: number,
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/${id}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch product: ${response.status}`,
    );
  }

  const product: Product =
    await response.json();

  return product;
}

export async function getCategories(): Promise<
  string[]
> {
  const response = await fetch(
    `${API_URL}/categories`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch categories: ${response.status}`,
    );
  }

  const categories: string[] =
    await response.json();

  return categories;
}