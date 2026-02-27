/**
 * Polar product IDs for funeral photo editing plans.
 * Replace these with actual product IDs from Polar.sh dashboard.
 */
export const POLAR_PRODUCT_IDS = {
  basic: "PLACEHOLDER_BASIC_RESTORATION_ID",
  bundle: "PLACEHOLDER_MEMORIAL_BUNDLE_ID",
  legacy: "PLACEHOLDER_LEGACY_COLLECTION_ID",
} as const;

export type PlanTier = keyof typeof POLAR_PRODUCT_IDS;

export const TIER_ORDER: PlanTier[] = ["basic", "bundle", "legacy"];

export const PLAN_PRICES: Record<PlanTier, number> = {
  basic: 19.99,
  bundle: 49.99,
  legacy: 99.99,
};

export function getCheckoutUrl(productId: string, params?: { customerEmail?: string; customerExternalId?: string }): string {
  const base = "/api/checkout";
  const search = new URLSearchParams({ products: productId });
  if (params?.customerEmail) search.set("customerEmail", params.customerEmail);
  if (params?.customerExternalId) search.set("customerExternalId", params.customerExternalId);
  return `${base}?${search.toString()}`;
}

export function getTierFromProductId(productId: string | null): PlanTier | null {
  if (!productId) return null;
  for (const [tier, id] of Object.entries(POLAR_PRODUCT_IDS)) {
    if (id === productId) return tier as PlanTier;
  }
  return null;
}
