import { z } from "zod";

export const quizSchema = z.object({
    // Step 1: Identity
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    dob: z.date(),

    // Step 2: Birth Details
    birthTime: z.string().optional(), // HH:MM
    birthPlace: z.string().min(2, "City/Place is required"),
    currentLocation: z.string().optional(),

    // Step 3: Intention
    intention: z.string().min(10, "Please describe your intention in at least 10 characters"),
    spellType: z.enum(["Prosperity", "Protection", "Love", "Clarity", "Healing", "Custom"]),
    targetName: z.string().optional(),

    // Step 4: Preferences
    aesthetic: z.enum(["Minimal Sigil", "Botanical", "Cosmic", "Crystal", "No image"]),
    marketingOptIn: z.boolean(),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms",
    }),
});

export type QuizFormData = z.infer<typeof quizSchema>;
