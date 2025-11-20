export default function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Share Your Intent",
            description: "Answer a few questions about your birth chart and what you wish to manifest.",
        },
        {
            number: "02",
            title: "Receive Your Ritual",
            description: "Our mystic AI crafts a personalized spell, mantra, and tarot reading just for you.",
        },
        {
            number: "03",
            title: "Perform & Manifest",
            description: "Follow the guide to perform your ritual at the perfect lunar moment.",
        },
    ];

    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">How It Works</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Three simple steps to unlock your personalized spiritual guidance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-xl font-serif font-bold text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
