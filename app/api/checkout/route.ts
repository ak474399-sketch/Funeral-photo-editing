import { NextRequest, NextResponse } from "next/server";
import { Checkout } from "@polar-sh/nextjs";

const accessToken = process.env.POLAR_ACCESS_TOKEN;

function normalizeSuccessUrl(raw: string | undefined): string | null {
  const s = raw?.trim();
  if (!s) return null;
  const url = s.startsWith("=") ? s.slice(1).trim() : s;
  return url || null;
}

const successUrl = normalizeSuccessUrl(process.env.POLAR_SUCCESS_URL);

export async function GET(req: NextRequest) {
  if (!accessToken?.trim()) {
    return NextResponse.json({ error: "Checkout not configured" }, { status: 503 });
  }
  if (!successUrl) {
    return NextResponse.json({ error: "POLAR_SUCCESS_URL not set" }, { status: 503 });
  }
  const handler = Checkout({ accessToken, successUrl });
  return handler(req);
}
