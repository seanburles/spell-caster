import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { quizSchema } from "@/lib/schema";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate input
        const result = quizSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        const { email, spellType, marketingOptIn } = result.data;

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Custom ${spellType} Ritual`,
                            description: "Personalized ritual, mantra, and tarot reading.",
                            images: ["https://placehold.co/400x400/png"], // Placeholder
                        },
                        unit_amount: 999, // $9.99
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/success/{CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}`,
            customer_email: email,
            metadata: {
                marketingOptIn: marketingOptIn ? "true" : "false",
                // Store other fields in metadata or separate DB record (better)
                // For MVP, we'll rely on webhook to store full data, but we need to pass it somehow.
                // Stripe metadata has size limits. Better to store in DB first and pass ID.
                // For now, let's assume we store in Firestore in the webhook using the session ID or client_reference_id.
                // Or we can pass a temporary ID.
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
