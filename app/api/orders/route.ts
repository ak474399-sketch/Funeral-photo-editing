import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth";
import { getUserOrders, getHighestTier, getRemainingGenerations } from "@/lib/orders";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromRequest(request);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [orders, tier, remaining] = await Promise.all([
    getUserOrders(userId),
    getHighestTier(userId),
    getRemainingGenerations(userId),
  ]);

  return NextResponse.json({
    orders,
    currentTier: tier,
    remainingGenerations: remaining === Infinity ? "unlimited" : remaining,
  });
}
