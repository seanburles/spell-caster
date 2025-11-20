import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </main>
  );
}
