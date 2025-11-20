import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePDF(content: any) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText(content.ritual.title, {
        x: 50,
        y: height - 50,
        size: 24,
        font,
        color: rgb(0, 0, 0),
    });

    page.drawText(content.ritual.paragraph, {
        x: 50,
        y: height - 100,
        size: 12,
        font,
        maxWidth: width - 100,
    });

    // Add more content...

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
