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
        <section className="py-24 bg-mystic-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-16 text-mystic-text">Community Love</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all">
                            <p className="text-lg italic text-mystic-text mb-6">"{t.quote}"</p>
                            <div>
                                <p className="font-medium text-mystic-text">{t.author}</p>
                                <p className="text-sm text-mystic-muted">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
