import { NextResponse } from "next/server";
import { getProducts } from "../../../db/queries";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products); // Send a JSON response
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 }); // Send an error response
  }
}