import { NextResponse } from "next/server";
import type { Product } from "@/types/product";

const FAKE_STORE_API_URL = "https://fakestoreapi.com";

export async function GET() {
  try {
    const response = await fetch(
      `${FAKE_STORE_API_URL}/products`,
      {
        next: {
          revalidate: 300,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Failed to fetch products from Fake Store API",
        },
        {
          status: response.status,
        },
      );
    }

    const products: Product[] = await response.json();

    return NextResponse.json(products);
  } catch (error) {
    console.error("Products API error:", error);

    return NextResponse.json(
      {
        message: "Unable to connect to Fake Store API",
      },
      {
        status: 500,
      },
    );
  }
}