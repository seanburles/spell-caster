export default function FAQ() {
    const faqs = [
        {
            q: "Is this really personalized?",
            a: "Yes! We use your birth chart data and specific intention to generate a unique ritual and mantra just for you.",
        },
        {
            q: "Do I need any special tools?",
            a: "Most rituals use common household items (candles, paper, water). We'll list exactly what you need.",
        },
        {
            q: "Can I print the results?",
            a: "Absolutely. You'll receive a beautifully designed PDF perfect for printing or saving to your device.",
        },
    ];

    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-16">Frequently Asked Questions</h2>

                <div className="space-y-8">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-slate-200 dark:border-slate-800 pb-8">
                            <h3 className="text-xl font-medium mb-3">{faq.q}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
