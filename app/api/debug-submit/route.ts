import { NextResponse } from "next/server";
import { generateRitual } from "@/lib/openai";
import { saveResult } from "@/lib/firestore";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        console.log("Debug submit received data:", JSON.stringify(body, null, 2));

        // Check if OpenAI key is configured
        if (!process.env.OPENAI_API_KEY) {
            console.error("OPENAI_API_KEY is not configured!");
            return NextResponse.json({
                error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file."
            }, { status: 500 });
        }

        // Call OpenAI directly
        console.log("Calling OpenAI...");
        const ritual = await generateRitual(body);
        console.log("OpenAI response received:", ritual);

        // Save to Firestore
        try {
            const resultId = await saveResult({
                email: body.email,
                name: body.name,
                userData: body,
                results: ritual,
                createdAt: new Date().toISOString(),
            });
            console.log("Saved to Firestore with ID:", resultId);

            // Add resultId to response
            return NextResponse.json({ ...ritual, resultId });
        } catch (firestoreError) {
            console.error("Firestore save error (non-fatal):", firestoreError);
            // Return ritual even if Firestore fails
            return NextResponse.json(ritual);
        }
    } catch (error) {
        console.error("Debug submit error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({
            error: "Internal Server Error",
            details: errorMessage
        }, { status: 500 });
    }
}
