import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/firestore";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        console.error(`Webhook signature verification failed: ${error.message}`);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;

        // Store order in Firestore
        try {
            await db.collection("orders").doc(session.id).set({
                email: session.customer_email,
                amount: session.amount_total,
                currency: session.currency,
                status: session.payment_status,
                createdAt: new Date(),
                metadata: session.metadata,
            });

            // Trigger fulfillment (e.g., add to a queue or call a function)
            // For MVP, we might just log it or call an internal API
            console.log("Order created:", session.id);

            // TODO: Call fulfillment service
        } catch (error) {
            console.error("Error saving order:", error);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
