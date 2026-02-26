import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { generateFuneralPhoto, type GenType } from "@/lib/gemini";
import { canUseFeature, getRemainingGenerations } from "@/lib/orders";
import { supabaseAdmin } from "@/lib/supabase";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { imageBase64: string; mimeType?: string; genType: string; extraPrompt?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { imageBase64, mimeType, genType, extraPrompt } = body;
  if (!imageBase64 || !genType) {
    return NextResponse.json({ error: "Missing imageBase64 or genType" }, { status: 400 });
  }

  const validTypes = ["portrait", "colorize", "attire", "background", "composite", "poster"];
  if (!validTypes.includes(genType)) {
    return NextResponse.json({ error: `Invalid genType: ${genType}` }, { status: 400 });
  }

  const byteSize = Math.ceil((imageBase64.length * 3) / 4);
  if (byteSize > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
  }

  const hasPermission = await canUseFeature(userId, genType);
  if (!hasPermission) {
    return NextResponse.json({ error: "Your plan does not include this feature" }, { status: 403 });
  }

  const remaining = await getRemainingGenerations(userId);
  if (remaining <= 0) {
    return NextResponse.json({ error: "Generation limit reached" }, { status: 403 });
  }

  const result = await generateFuneralPhoto({
    imageBase64,
    mimeType,
    genType: genType as GenType,
    extraPrompt,
  });

  if (!result.success) {
    return NextResponse.json({ error: result.error ?? "Generation failed" }, { status: 500 });
  }

  let resultUrl: string | null = null;
  const bucket = process.env.SUPABASE_FUNERAL_BUCKET ?? "funeral-photos";
  if (result.imageBase64) {
    try {
      const buffer = Buffer.from(result.imageBase64, "base64");
      const ext = result.imageMimeType?.includes("png") ? "png" : "jpg";
      const path = `${userId}/${Date.now()}_${genType}.${ext}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(path, buffer, { contentType: result.imageMimeType ?? "image/png", upsert: false });
      if (!uploadError) {
        const { data: publicUrlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(path);
        resultUrl = publicUrlData?.publicUrl ?? null;
      }
    } catch {
      /* non-blocking */
    }
  }

  try {
    await supabaseAdmin.from("funeral_generations").insert({
      user_id: userId,
      gen_type: genType,
      original_url: null,
      result_url: resultUrl,
      settings: { extraPrompt: extraPrompt ?? null },
    });
  } catch {
    /* non-blocking */
  }

  return NextResponse.json({
    success: true,
    imageBase64: result.imageBase64,
    imageMimeType: result.imageMimeType,
    resultUrl,
  });
}
