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
        <section className="py-24 bg-mystic-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-mystic-text">How It Works</h2>
                    <p className="text-mystic-muted max-w-2xl mx-auto">
                        Three simple steps to unlock your personalized spiritual guidance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center group">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#5ba3b0]/20 dark:bg-[#5ba3b0]/20 flex items-center justify-center text-xl font-serif font-bold text-[#5ba3b0] dark:text-[#5ba3b0] group-hover:scale-110 transition-transform">
                                {step.number}
                            </div>
                            <h3 className="text-xl font-medium mb-3 text-mystic-text">{step.title}</h3>
                            <p className="text-mystic-muted">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
