"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-mystic-deep z-[100] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5ba3b0]/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#d4a574]/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#5ba3b0]/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Animated Sparkles Icon */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        rotate: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        scale: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                    className="mb-8"
                >
                    <Sparkles className="w-16 h-16 text-[#d4a574]" />
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-serif font-medium text-[#d4a574] mb-4"
                >
                    Crafting Your Ritual
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-mystic-muted mb-8 max-w-md text-center"
                >
                    The cosmos are aligning... Your personalized spell is being woven with intention.
                </motion.p>

                {/* Loading Dots */}
                <div className="flex gap-2">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="w-3 h-3 rounded-full bg-[#d4a574]"
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: index * 0.2,
                            }}
                        />
                    ))}
                </div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                    }}
                    className="mt-12 h-1 bg-[#d4a574]/20 rounded-full overflow-hidden max-w-xs w-full"
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#d4a574] to-[#5ba3b0] rounded-full"
                        animate={{
                            backgroundPosition: ["0%", "100%"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        style={{
                            backgroundSize: "200% 100%",
                        }}
                    />
                </motion.div>
            </div>

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#d4a574]/30"
                    style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 3) * 20}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                    }}
                />
            ))}
        </motion.div>
    );
}

