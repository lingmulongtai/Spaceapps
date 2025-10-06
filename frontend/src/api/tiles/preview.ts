import { NextRequest, NextResponse } from "next/server";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(`${BACKEND_BASE}/tiles/preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

