/**
 * Polar product IDs for funeral photo editing plans.
 * Replace these with actual product IDs from Polar.sh dashboard.
 */
export const POLAR_PRODUCT_IDS = {
  basic: "PLACEHOLDER_BASIC_PRODUCT_ID",
  standard: "PLACEHOLDER_STANDARD_PRODUCT_ID",
  premium: "PLACEHOLDER_PREMIUM_PRODUCT_ID",
} as const;

export type PlanTier = keyof typeof POLAR_PRODUCT_IDS;

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
