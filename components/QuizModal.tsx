"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quizSchema, type QuizFormData } from "@/lib/schema";
import CustomDatePicker from "./DatePicker";
import CustomTimePicker from "./TimePicker";
import LocationPicker from "./LocationPicker";
import LoadingScreen from "./LoadingScreen";

interface QuizModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const STEPS = [
    { id: "identity", title: "Who are you?" },
    { id: "birth", title: "Cosmic Origins" },
    { id: "intention", title: "Your Desire" },
    { id: "preferences", title: "Final Touches" },
];

interface TarotCard {
    name: string;
    position: string;
    meaning: string;
    role: string;
    imageUrl?: string;
}

function TarotFlipCard({ card1, card2 }: { card1: TarotCard; card2: TarotCard }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleShareToInstagram = async (card: TarotCard, cardNumber: 1 | 2) => {
        if (!card.imageUrl) return;

        try {
            // Copy share text to clipboard
            const shareText = `🔮 ${card.name} (${card.position})\n\n${card.meaning}\n\n#tarot #spirituality #mystical`;
            await navigator.clipboard.writeText(shareText);

            // Open image in new tab (user can right-click to save)
            window.open(card.imageUrl, '_blank');

            alert('✨ Caption copied to clipboard! The image opened in a new tab - right-click to save it, then share to Instagram.');
        } catch (error) {
            console.error('Error sharing:', error);
            // Fallback: just open the image
            window.open(card.imageUrl, '_blank');
            alert('Image opened in new tab. Right-click to save, then copy this caption:\n\n🔮 ' + card.name + ' (' + card.position + ')\n\n' + card.meaning + '\n\n#tarot #spirituality #mystical');
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className="relative w-full max-w-lg h-[600px] cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div
                    className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''
                        }`}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Card 1 - Front */}
                    <div
                        className="absolute w-full h-full backface-hidden"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <div className="w-full h-full bg-white/5 rounded-2xl border-2 border-[#d4a574]/30 p-6 flex flex-col">
                            <div className="text-center mb-4">
                                <p className="text-xs text-[#d4a574] uppercase tracking-wider mb-1">{card1.role}</p>
                                <h4 className="text-2xl font-serif text-[#d4a574] mb-1">{card1.name}</h4>
                                <p className="text-sm text-slate-400">({card1.position})</p>
                            </div>
                            {card1.imageUrl && (
                                <div className="flex-1 flex items-center justify-center mb-4">
                                    <img
                                        src={card1.imageUrl}
                                        alt={card1.name}
                                        className="max-h-80 rounded-xl shadow-2xl border border-[#d4a574]/30"
                                    />
                                </div>
                            )}
                            <p className="text-sm text-slate-300 leading-relaxed text-center">{card1.meaning}</p>
                        </div>
                    </div>

                    {/* Card 2 - Back */}
                    <div
                        className="absolute w-full h-full backface-hidden rotate-y-180"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                        }}
                    >
                        <div className="w-full h-full bg-white/5 rounded-2xl border-2 border-[#5ba3b0]/30 p-6 flex flex-col">
                            <div className="text-center mb-4">
                                <p className="text-xs text-[#5ba3b0] uppercase tracking-wider mb-1">{card2.role}</p>
                                <h4 className="text-2xl font-serif text-[#5ba3b0] mb-1">{card2.name}</h4>
                                <p className="text-sm text-slate-400">({card2.position})</p>
                            </div>
                            {card2.imageUrl && (
                                <div className="flex-1 flex items-center justify-center mb-4">
                                    <img
                                        src={card2.imageUrl}
                                        alt={card2.name}
                                        className="max-h-80 rounded-xl shadow-2xl border border-[#5ba3b0]/30"
                                    />
                                </div>
                            )}
                            <p className="text-sm text-slate-300 leading-relaxed text-center">{card2.meaning}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Instagram Share Buttons */}
            <div className="flex gap-3 w-full max-w-md">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleShareToInstagram(card1, 1);
                    }}
                    className="flex-1 px-4 py-2 bg-[#5ba3b0] hover:bg-[#5ba3b0]/80 text-white rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Share Card 1
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleShareToInstagram(card2, 2);
                    }}
                    className="flex-1 px-4 py-2 bg-[#5ba3b0] hover:bg-[#5ba3b0]/80 text-white rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Share Card 2
                </button>
            </div>
        </div>
    );
}

export default function QuizModal({ isOpen, onClose }: QuizModalProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [ritualResult, setRitualResult] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        trigger,
        control,
        formState: { errors },
    } = useForm<QuizFormData>({
        resolver: zodResolver(quizSchema),
        defaultValues: {
            marketingOptIn: false,
            termsAccepted: false,
            aesthetic: "Minimal Sigil",
            spellType: "Prosperity",
            dob: undefined,
        },
    });

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const nextStep = async () => {
        let fieldsToValidate: (keyof QuizFormData)[] = [];

        if (currentStep === 0) fieldsToValidate = ["name", "email", "dob"];
        if (currentStep === 1) fieldsToValidate = ["birthPlace"];
        if (currentStep === 2) fieldsToValidate = ["intention", "spellType"];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const onSubmit = async (data: QuizFormData) => {
        setIsSubmitting(true);
        try {
            // DEBUG MODE: Skip payment, go straight to OpenAI
            const response = await fetch("/api/debug-submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.ritual) {
                setRitualResult(result);
            } else {
                console.error("Submission error:", result);
                const errorMsg = result.error || "Something went wrong";
                const details = result.details ? `\n\nDetails: ${result.details}` : "";
                alert(errorMsg + details);
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading screen while submitting
    if (isSubmitting) {
        return <LoadingScreen />;
    }

    if (ritualResult) {
        return (
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-mystic-deep/95 backdrop-blur-md z-50 flex items-start justify-center p-4 overflow-y-auto"
                >
                    <div className="bg-mystic-glass border border-mystic w-full max-w-3xl rounded-2xl shadow-2xl p-8 text-mystic-bright relative my-12">
                        <button
                            onClick={() => {
                                setRitualResult(null);
                                onClose();
                            }}
                            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-mystic-muted hover:text-white z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>


                        {/* Hero Section with Sigil */}
                        <div className="text-center mb-8">
                            {ritualResult.sigil?.imageUrl && (
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={ritualResult.sigil.imageUrl}
                                        alt="Your Personal Sigil"
                                        className="w-32 h-32 rounded-full border-2 border-[#d4a574]/50 shadow-2xl"
                                    />
                                </div>
                            )}
                            <h2 className="text-4xl font-serif font-medium text-[#d4a574] mb-2">{ritualResult.ritual?.title}</h2>
                            <p className="text-mystic-muted italic text-lg">
                                {ritualResult.ritual?.timing?.lunarPhase} • {ritualResult.ritual?.timing?.exactDate}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Name Meaning */}
                            {ritualResult.nameMeaning?.overallVibe && (
                                <div className="bg-[#5ba3b0]/10 p-6 rounded-xl border border-[#5ba3b0]/30 text-center">
                                    <p className="text-sm text-[#5ba3b0] uppercase tracking-wider mb-2">Your Name's Essence</p>
                                    <p className="text-2xl font-serif text-[#d4a574] italic">
                                        &ldquo;{ritualResult.nameMeaning.overallVibe}&rdquo;
                                    </p>
                                </div>
                            )}
                            {/* Lunar Timing - Premium Feature */}
                            {ritualResult.ritual?.timing && (
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                    <h3 className="text-2xl font-serif text-[#d4a574] mb-4 flex items-center gap-2">
                                        🌙 Optimal Timing
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4 text-slate-200">
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">Lunar Phase</p>
                                            <p className="font-medium">{ritualResult.ritual.timing.lunarPhase}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">Date Window</p>
                                            <p className="font-medium">{ritualResult.ritual.timing.exactDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">Best Time</p>
                                            <p className="font-medium">{ritualResult.ritual.timing.timeOfDay}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">Avoid</p>
                                            <p className="font-medium text-[#5ba3b0]">{ritualResult.ritual.timing.whatNotToDo}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* The Ritual Instructions */}
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                <h3 className="text-2xl font-serif text-[#5ba3b0] mb-4">✨ The Ritual</h3>
                                <p className="text-lg leading-relaxed text-slate-200 mb-4">{ritualResult.ritual?.paragraph}</p>
                                {ritualResult.ritual?.physicalAction && (
                                    <div className="mt-4 p-4 bg-[#d4a574]/10 rounded-lg border-l-4 border-[#d4a574]">
                                        <p className="text-sm text-[#d4a574] font-medium mb-1">Physical Action:</p>
                                        <p className="text-slate-200">{ritualResult.ritual.physicalAction}</p>
                                    </div>
                                )}
                            </div>

                            {/* Mantra - Instagram Worthy */}
                            <div className="bg-[#d4a574]/10 p-8 rounded-xl border border-[#d4a574]/30">
                                <h3 className="text-xl font-serif text-[#d4a574] mb-4 text-center">Your Mantra</h3>
                                <p className="text-3xl font-medium text-center italic text-[#d4a574] leading-relaxed">
                                    &ldquo;{ritualResult.ritual?.mantra}&rdquo;
                                </p>
                            </div>

                            {/* Correspondence Table - Crowd Favorite */}
                            {ritualResult.ritual?.correspondences && (
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                    <h3 className="text-2xl font-serif text-[#5ba3b0] mb-4">💎 Sacred Correspondences</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {Object.entries(ritualResult.ritual.correspondences).map(([key, value]) => (
                                            <div key={key} className="text-center p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{key}</p>
                                                <p className="text-sm font-medium text-slate-200">{value as string}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Dual Tarot Cards with Flip Effect */}
                            {ritualResult.tarot?.card1 && ritualResult.tarot?.card2 && (
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                    <h3 className="text-2xl font-serif text-[#5ba3b0] mb-4 text-center">🔮 Your Tarot Guidance</h3>
                                    <p className="text-center text-sm text-slate-400 mb-6">Click the card to flip between perspectives</p>

                                    <TarotFlipCard
                                        card1={ritualResult.tarot.card1}
                                        card2={ritualResult.tarot.card2}
                                    />
                                </div>
                            )}

                            {/* Astrology & Elemental Reading */}
                            {ritualResult.astrology && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                        <h3 className="text-xl font-serif text-[#d4a574] mb-3">🪐 Transit Influence</h3>
                                        <p className="text-base text-slate-300 leading-relaxed">{ritualResult.astrology.transitInfluence}</p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                        <h3 className="text-xl font-serif text-[#5ba3b0] mb-3">🌬️ Elemental Energy</h3>
                                        <p className="text-base text-slate-300 leading-relaxed">{ritualResult.astrology.elementalReading}</p>
                                    </div>
                                </div>
                            )}

                            {/* Shadow Work */}
                            {ritualResult.shadowWork && (
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                    <h3 className="text-2xl font-serif text-[#5ba3b0] mb-4">🧿 Shadow & Light</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">Potential Obstacle:</p>
                                            <p className="text-slate-200">{ritualResult.shadowWork.obstacle}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">How to Navigate:</p>
                                            <p className="text-slate-200">{ritualResult.shadowWork.guidance}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Horoscope */}
                            {ritualResult.horoscope && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                        <h3 className="text-xl font-serif text-[#d4a574] mb-3">☀️ Daily Guidance</h3>
                                        <p className="text-base text-slate-300 leading-relaxed">{ritualResult.horoscope.daily}</p>
                                    </div>
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                        <h3 className="text-xl font-serif text-[#5ba3b0] mb-3">🌙 Monthly Outlook</h3>
                                        <p className="text-base text-slate-300 leading-relaxed">{ritualResult.horoscope.monthly}</p>
                                    </div>
                                </div>
                            )}

                            {/* Soul City - Astrocartography */}
                            {ritualResult.soulCity && (
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                    <h3 className="text-2xl font-serif text-[#5ba3b0] mb-4 text-center">🌍 Your Soul City</h3>

                                    <div className="text-center mb-6">
                                        <h4 className="text-3xl font-serif text-[#d4a574] mb-2">
                                            {ritualResult.soulCity.city}, {ritualResult.soulCity.country}
                                        </h4>
                                        <div className="flex items-center justify-center gap-3 mb-3">
                                            <span className="px-3 py-1 rounded-full bg-[#d4a574]/20 border border-[#d4a574]/50 text-xs text-[#d4a574] uppercase tracking-wider">
                                                {ritualResult.soulCity.energyType}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-[#5ba3b0]/20 border border-[#5ba3b0]/50 text-xs text-[#5ba3b0] uppercase tracking-wider">
                                                {ritualResult.soulCity.powerDirection}ward Energy
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-400 italic">{ritualResult.soulCity.regionDescription}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-slate-900/50 p-4 rounded-lg">
                                            <p className="text-base text-slate-200 leading-relaxed">{ritualResult.soulCity.whyItFits}</p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-slate-900/30 p-4 rounded-lg">
                                                <p className="text-xs text-[#d4a574] uppercase tracking-wider mb-2">Also Aligned Cities</p>
                                                <p className="text-sm text-slate-300">{ritualResult.soulCity.altCities.join(", ")}</p>
                                            </div>
                                            <div className="bg-slate-900/30 p-4 rounded-lg">
                                                <p className="text-xs text-[#5ba3b0] uppercase tracking-wider mb-2">Regions to Be Mindful Of</p>
                                                <p className="text-sm text-slate-300">{ritualResult.soulCity.avoidRegions.join(", ")}</p>
                                            </div>
                                        </div>

                                        <div className="text-center pt-4 border-t border-white/10">
                                            <p className="text-base text-slate-200 italic">{ritualResult.soulCity.travelTheme}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Reflection & Cosmic Direction */}
                            {ritualResult.reflection && (
                                <div className="bg-[#5ba3b0]/10 p-6 rounded-xl border border-[#5ba3b0]/30">
                                    <h3 className="text-2xl font-serif text-[#5ba3b0] mb-4">🪞 Reflection</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-[#5ba3b0] mb-2 font-medium">Journal Prompt:</p>
                                            <p className="text-lg text-slate-200 italic">{ritualResult.reflection.journalPrompt}</p>
                                        </div>
                                        <div className="pt-4 border-t border-[#5ba3b0]/30">
                                            <p className="text-xl text-center font-medium text-[#d4a574] italic">
                                                {ritualResult.reflection.cosmicDirection}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-mystic-deep/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-mystic-glass border border-mystic w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] text-mystic-bright">
                            {/* Header */}
                            <div className="flex items-center justify-between p-8 border-b border-white/10">
                                <div>
                                    <h2 className="text-3xl font-serif font-medium text-[#d4a574]">{STEPS[currentStep].title}</h2>
                                    <p className="text-sm text-mystic-muted mt-1">Step {currentStep + 1} of {STEPS.length}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-mystic-muted hover:text-white"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-white/5">
                                <motion.div
                                    className="h-full bg-[#d4a574]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            {/* Body (Scrollable Form) */}
                            <div className="p-8 overflow-y-auto flex-1">
                                <form id="quiz-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                                    {/* Step 1: Identity */}
                                    {currentStep === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-slate-300">Name</label>
                                                <input
                                                    {...register("name")}
                                                    className="w-full p-4 rounded-xl border border-slate-600 bg-white/5 focus:ring-2 focus:ring-[#d4a574]/50 outline-none text-lg placeholder:text-slate-500 transition-all hover:bg-white/10"
                                                    placeholder="Your full name"
                                                />
                                                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-slate-300">Email</label>
                                                <input
                                                    {...register("email")}
                                                    type="email"
                                                    className="w-full p-4 rounded-xl border border-slate-600 bg-white/5 focus:ring-2 focus:ring-[#d4a574]/50 outline-none text-lg placeholder:text-slate-500 transition-all hover:bg-white/10"
                                                    placeholder="you@example.com"
                                                />
                                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-1 text-slate-300">Date of Birth</label>
                                                <Controller
                                                    control={control}
                                                    name="dob"
                                                    render={({ field }) => (
                                                        <CustomDatePicker
                                                            selected={field.value ? new Date(field.value) : null}
                                                            onChange={(date) => field.onChange(date)}
                                                            error={errors.dob?.message}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Birth Details */}
                                    {currentStep === 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium mb-1 text-slate-300">Time of Birth (Optional)</label>
                                                <Controller
                                                    control={control}
                                                    name="birthTime"
                                                    render={({ field }) => (
                                                        <CustomTimePicker
                                                            selected={field.value ? new Date(`2000-01-01T${field.value}`) : null}
                                                            onChange={(date) => {
                                                                if (date) {
                                                                    const timeString = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
                                                                    field.onChange(timeString);
                                                                } else {
                                                                    field.onChange("");
                                                                }
                                                            }}
                                                            error={errors.birthTime?.message}
                                                        />
                                                    )}
                                                />
                                                <p className="text-xs text-slate-500 mt-1">Helps calculate your rising sign.</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-slate-300">Place of Birth</label>
                                                <Controller
                                                    control={control}
                                                    name="birthPlace"
                                                    render={({ field }) => (
                                                        <LocationPicker
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            error={errors.birthPlace?.message}
                                                            placeholder="Search city..."
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-slate-300">Current Location (Optional)</label>
                                                <Controller
                                                    control={control}
                                                    name="currentLocation"
                                                    render={({ field }) => (
                                                        <LocationPicker
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            placeholder="Search city..."
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Intention */}
                                    {currentStep === 2 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-slate-300">Spell Type</label>
                                                <select
                                                    {...register("spellType")}
                                                    className="w-full p-4 rounded-xl border border-slate-600 bg-white/5 focus:ring-2 focus:ring-[#d4a574]/50 outline-none text-lg text-slate-200 transition-all hover:bg-white/10"
                                                >
                                                    {["Prosperity", "Protection", "Love", "Clarity", "Healing", "Custom"].map((type) => (
                                                        <option key={type} value={type} className="bg-slate-900 text-slate-200">{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-slate-300">Your Intention</label>
                                                <textarea
                                                    {...register("intention")}
                                                    rows={4}
                                                    className="w-full p-4 rounded-xl border border-slate-600 bg-white/5 focus:ring-2 focus:ring-[#d4a574]/50 outline-none text-lg placeholder:text-slate-500 transition-all hover:bg-white/10"
                                                    placeholder="e.g., I want to attract a new career opportunity that aligns with my values..."
                                                />
                                                {errors.intention && <p className="text-red-400 text-sm mt-1">{errors.intention.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2 text-slate-300">Target Person (Optional)</label>
                                                <input
                                                    {...register("targetName")}
                                                    className="w-full p-4 rounded-xl border border-slate-600 bg-white/5 focus:ring-2 focus:ring-[#d4a574]/50 outline-none text-lg placeholder:text-slate-500 transition-all hover:bg-white/10"
                                                    placeholder="Name of person (only if consented)"
                                                />
                                                <p className="text-xs text-slate-500 mt-2">Only include if they have consented.</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 4: Preferences */}
                                    {currentStep === 3 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium mb-1">Aesthetic Style</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {["Minimal Sigil", "Botanical", "Cosmic", "Crystal", "No image"].map((style) => (
                                                        <label key={style} className="flex items-center space-x-3 p-4 border border-slate-700 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                                                            <input
                                                                type="radio"
                                                                value={style}
                                                                {...register("aesthetic")}
                                                                className="text-[#d4a574] focus:ring-[#d4a574] bg-slate-800 border-slate-600"
                                                            />
                                                            <span className="text-base text-slate-200">{style}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-4 space-y-3">
                                                <label className="flex items-start space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        {...register("marketingOptIn")}
                                                        className="mt-1 rounded text-[#5ba3b0] focus:ring-[#5ba3b0]"
                                                    />
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                                        Keep me updated on new rituals and cosmic events.
                                                    </span>
                                                </label>

                                                <label className="flex items-start space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        {...register("termsAccepted")}
                                                        className="mt-1 rounded text-[#5ba3b0] focus:ring-[#5ba3b0]"
                                                    />
                                                    <span className="text-sm text-slate-600 dark:text-slate-400">
                                                        I understand this is for entertainment purposes and accept the Terms of Service.
                                                    </span>
                                                </label>
                                                {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}
                                            </div>
                                        </motion.div>
                                    )}
                                </form>
                            </div>

                            {/* Footer */}
                            <div className="p-8 border-t border-white/10 bg-white/5 flex justify-between">
                                <button
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentStep === 0 ? "opacity-0 pointer-events-none" : "hover:bg-slate-200 dark:hover:bg-slate-800"
                                        }`}
                                >
                                    <ChevronLeft className="w-4 h-4 mr-1" /> Back
                                </button>

                                {currentStep < STEPS.length - 1 ? (
                                    <button
                                        onClick={nextStep}
                                        className="flex items-center px-6 py-2 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium hover:opacity-90 transition-opacity"
                                    >
                                        Next <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSubmit(onSubmit)}
                                        disabled={isSubmitting}
                                        className="flex items-center px-6 py-2 rounded-full bg-[#5ba3b0] text-white font-medium hover:bg-[#5ba3b0]/80 transition-colors disabled:opacity-50"
                                    >
                                        Generate Ritual
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
