import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000";

export async function GET(request: NextRequest) {
  const layer = request.nextUrl.searchParams.get("layer");
  const limit = request.nextUrl.searchParams.get("limit");

  const url = new URL(`${BACKEND_BASE}/tiles/timeline`);
  if (layer) {
    url.searchParams.set("layer", layer);
  }
  if (limit) {
    url.searchParams.set("limit", limit);
  }

  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

