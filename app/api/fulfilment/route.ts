import { NextResponse } from "next/server";
import { db } from "@/lib/firestore";
import { generateRitual } from "@/lib/openai";
import { generatePDF } from "@/lib/pdf";

export async function POST(req: Request) {
    // Verify internal secret or similar
    const { orderId } = await req.json();

    if (!orderId) {
        return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    try {
        // 1. Fetch order
        const orderDoc = await db.collection("orders").doc(orderId).get();
        if (!orderDoc.exists) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        const orderData = orderDoc.data();

        // 2. Generate Content
        const content = await generateRitual(orderData);

        // 3. Generate PDF
        const pdfBytes = await generatePDF(content);

        // 4. Upload PDF (Simulated)
        // const pdfUrl = await uploadToStorage(pdfBytes, `rituals/${orderId}.pdf`);
        const pdfUrl = "https://example.com/ritual.pdf"; // Placeholder

        // 5. Save Results
        await db.collection("results").add({
            orderId,
            content,
            pdfUrl,
            createdAt: new Date(),
        });

        // 6. Send Email (Simulated)
        console.log(`Sending email to ${orderData?.email} with PDF: ${pdfUrl}`);

        return NextResponse.json({ success: true, pdfUrl });
    } catch (error) {
        console.error("Fulfillment error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
