import { NextResponse } from "next/server";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const response = await fetch(`${BACKEND_BASE}/translate/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    if (!response.ok) {
      const note = isJson ? await response.json() : await response.text();
      return NextResponse.json(
        {
          provider: "deepl",
          status: "error",
          note,
        },
        { status: response.status },
      );
    }

    if (!isJson) {
      return NextResponse.json(
        {
          provider: "deepl",
          status: "error",
          note: "Unexpected non-JSON response from translation backend",
        },
        { status: 502 },
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        provider: "deepl",
        status: "error",
        note: `Translation proxy error: ${message}`,
      },
      { status: 502 },
    );
  }
}

