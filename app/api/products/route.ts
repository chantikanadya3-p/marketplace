import { NextResponse } from "next/server";

const API_URL =
  "https://fakestoreapi.com/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Accept: "application/json",
        "User-Agent":
          "Mozilla/5.0 TJERMIN-Marketplace/1.0",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            "Failed to fetch products from Fake Store API",
          status: response.status,
        },
        {
          status: response.status,
        },
      );
    }

    const products = await response.json();

    return NextResponse.json(products, {
      status: 200,
      headers: {
        "Cache-Control":
          "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error(
      "Products API route error:",
      error,
    );

    return NextResponse.json(
      {
        message: "Unable to load products",
      },
      {
        status: 500,
      },
    );
  }
}