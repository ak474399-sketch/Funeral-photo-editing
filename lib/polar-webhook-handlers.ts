import { supabaseAdmin } from "@/lib/supabase";
import { POLAR_PRODUCT_IDS, type PlanTier } from "@/lib/polar";
import { createOrder } from "@/lib/orders";

export function getProductTier(productId: string | null): PlanTier | null {
  if (!productId) return null;
  for (const [tier, id] of Object.entries(POLAR_PRODUCT_IDS)) {
    if (id === productId) return tier as PlanTier;
  }
  return null;
}

export async function findUserIdByPolarCustomer(customer: {
  externalId: string | null;
  email: string;
}): Promise<string | null> {
  if (customer.externalId) {
    const { data } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("id", customer.externalId)
      .maybeSingle();
    if (data?.id) return data.id;
  }
  if (customer.email) {
    const { data } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", customer.email)
      .maybeSingle();
    if (data?.id) return data.id;
  }
  return null;
}

export async function handleOrderPaid(
  userId: string,
  productId: string | null,
  polarOrderId: string
): Promise<void> {
  const tier = getProductTier(productId);
  if (!tier) return;
  await createOrder(userId, tier, polarOrderId);
}
