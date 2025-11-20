export default function Testimonials() {
    const testimonials = [
        {
            quote: "The ritual was exactly what I needed. The mantra has been stuck in my head for days, bringing me so much peace.",
            author: "Sarah J.",
            role: "Leo Sun",
        },
        {
            quote: "I was skeptical about AI spirituality, but the tarot pull was scarily accurate. Highly recommended.",
            author: "Marcus T.",
            role: "Scorpio Moon",
        },
        {
            quote: "Beautifully designed and deeply personal. It felt like a real mystic wrote this for me.",
            author: "Elena R.",
            role: "Pisces Rising",
        },
    ];

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-16">Community Love</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-lg italic text-slate-700 dark:text-slate-300 mb-6">"{t.quote}"</p>
                            <div>
                                <p className="font-medium">{t.author}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
