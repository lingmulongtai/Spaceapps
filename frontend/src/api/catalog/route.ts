import { NextResponse } from "next/server";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  const body = await request.json();
  const response = await fetch(`${BACKEND_BASE}/catalog/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

export async function GET() {
  const response = await fetch(`${BACKEND_BASE}/catalog/pipelines`);
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

