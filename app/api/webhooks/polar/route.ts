import { Webhooks } from "@polar-sh/nextjs";
import { findUserIdByPolarCustomer, handleOrderPaid } from "@/lib/polar-webhook-handlers";

const webhookSecret = process.env.POLAR_WEBHOOK_SECRET!;

export const POST = Webhooks({
  webhookSecret,
  onOrderPaid: async (payload) => {
    if (payload.type !== "order.paid" || !payload.data) return;
    const order = payload.data as {
      id: string;
      customer: { externalId: string | null; email: string };
      productId: string | null;
    };
    const userId = await findUserIdByPolarCustomer(order.customer);
    if (!userId) return;
    await handleOrderPaid(userId, order.productId, order.id);
  },
});
