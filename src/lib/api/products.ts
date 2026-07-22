import type { Product } from "@/types/product";

const FAKE_STORE_API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("/api/products");

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Failed to fetch products" }));

    throw new Error(error.message ?? "Failed to fetch products");
  }

  return response.json();
}

export async function getProductById(
  id: number,
): Promise<Product> {
  const response = await fetch(
    `${FAKE_STORE_API_URL}/products/${id}`,
    {
      next: {
        revalidate: 300,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  const product: Product | null = await response.json();

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}

export async function getCategories(): Promise<string[]> {
  const response = await fetch(
    `${FAKE_STORE_API_URL}/products/categories`,
    {
      next: {
        revalidate: 300,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}