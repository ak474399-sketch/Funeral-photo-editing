import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

function maskEmail(email: string): string {
  const at = email.indexOf("@");
  if (at <= 0) return "User";
  const local = email.slice(0, at);
  return `${local.slice(0, 1).toUpperCase()}***`;
}

function gravatarUrl(email: string): string {
  const hash = createHash("md5").update(email.trim().toLowerCase()).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=96&d=mp`;
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("user_reviews")
    .select("id, email, content, country, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("[/api/reviews GET]", error);
    return NextResponse.json({ error: "Failed to load reviews" }, { status: 500 });
  }

  const MIN_CONTENT_LENGTH = 10;
  const list = (data ?? [])
    .filter((row) => typeof row.content === "string" && row.content.trim().length >= MIN_CONTENT_LENGTH)
    .map((row) => ({
      id: row.id,
      displayName: maskEmail(row.email),
      content: row.content,
      country: row.country ?? undefined,
      createdAt: row.created_at,
      avatarUrl: gravatarUrl(row.email),
    }));

  return NextResponse.json(list);
}

export async function POST(request: NextRequest) {
  let body: { email?: string; content?: string; country?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const country = typeof body.country === "string" ? body.country.trim().slice(0, 100) : null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }
  if (!content || content.length > 2000) {
    return NextResponse.json({ error: "Content required (max 2000 chars)" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from("user_reviews").insert({ email, content, country });
  if (error) {
    console.error("[/api/reviews POST]", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
