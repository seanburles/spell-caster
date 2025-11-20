"use client";


import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import QuizModal from "./QuizModal";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            })
                .from(
                    subtitleRef.current,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.5"
                )
                .from(
                    buttonRef.current,
                    {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.5,
                        ease: "back.out(1.7)",
                    },
                    "-=0.3"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <section
                ref={heroRef}
                className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
            >
                {/* Background Gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-mystic-deep via-mystic-dark to-indigo-950 animate-gradient" />

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-amber-500/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

                <h1
                    ref={titleRef}
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-purple-200 drop-shadow-sm"
                >
                    Discover Your <br />
                    <span className="italic font-serif text-amber-400">Sacred Ritual</span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10"
                >
                    Receive a personalized poetic spell, lunar timing, and tarot guidance tailored to your unique cosmic signature.
                </p>

                <button
                    ref={buttonRef}
                    className="px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full text-lg font-medium hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                    onClick={() => setIsModalOpen(true)}
                >
                    Start Your Journey
                </button>
            </section>

            <QuizModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}

