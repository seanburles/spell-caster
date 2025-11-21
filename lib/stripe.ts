import Stripe from "stripe";

// Lazy initialization to avoid build-time errors when env vars aren't available
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe | null {
    if (!stripeInstance) {
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            // Return null if Stripe isn't configured (for build/dev without Stripe)
            return null;
        }
        stripeInstance = new Stripe(secretKey, {
            apiVersion: "2025-01-27.acacia" as any,
            typescript: true,
        });
    }
    return stripeInstance;
}

// For backward compatibility - use getStripe() instead for null safety
export const stripe: Stripe | null = getStripe();
