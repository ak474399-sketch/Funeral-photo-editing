import { supabaseAdmin } from "@/lib/supabase";
import type { PlanTier } from "@/lib/polar";

export type FuneralOrder = {
  id: string;
  user_id: string;
  tier: PlanTier;
  polar_order_id: string;
  paid_at: string;
  created_at: string;
};

const TIER_PERMISSIONS: Record<PlanTier, string[]> = {
  basic: ["portrait", "attire", "background"],
  bundle: ["portrait", "attire", "background", "poster", "print", "cloud"],
  legacy: ["portrait", "colorize", "attire", "background", "composite", "poster", "batch", "print", "cloud", "audit"],
};

const TIER_LIMITS: Record<PlanTier, number> = {
  basic: 1,
  bundle: 3,
  legacy: 9,
};

export async function getUserOrders(userId: string): Promise<FuneralOrder[]> {
  const { data } = await supabaseAdmin
    .from("funeral_orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data as FuneralOrder[]) ?? [];
}

export async function getHighestTier(userId: string): Promise<PlanTier | null> {
  const orders = await getUserOrders(userId);
  if (orders.length === 0) return null;
  const tierRank: Record<string, number> = { basic: 1, bundle: 2, legacy: 3 };
  let best: PlanTier | null = null;
  let bestRank = 0;
  for (const o of orders) {
    const rank = tierRank[o.tier] ?? 0;
    if (rank > bestRank) { bestRank = rank; best = o.tier; }
  }
  return best;
}

export async function canUseFeature(userId: string, feature: string): Promise<boolean> {
  const tier = await getHighestTier(userId);
  if (!tier) return false;
  return TIER_PERMISSIONS[tier].includes(feature);
}

export async function getRemainingGenerations(userId: string): Promise<number> {
  const tier = await getHighestTier(userId);
  if (!tier) return 0;
  const limit = TIER_LIMITS[tier];

  const { count } = await supabaseAdmin
    .from("funeral_generations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);

  return Math.max(0, limit - (count ?? 0));
}

export async function createOrder(userId: string, tier: PlanTier, polarOrderId: string): Promise<void> {
  await supabaseAdmin.from("funeral_orders").insert({
    user_id: userId,
    tier,
    polar_order_id: polarOrderId,
    paid_at: new Date().toISOString(),
  });
}
