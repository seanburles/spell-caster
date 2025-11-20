import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia" as any, // Bypass strict typing if needed, or use specific version
    typescript: true,
});
