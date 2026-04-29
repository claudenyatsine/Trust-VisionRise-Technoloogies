import { Navigation } from "@/components/Navigation";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Offerings } from "@/components/Offerings";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { AIExplainer } from "@/components/AIExplainer";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <Offerings />
        <Services />
        <Portfolio />
        
        {/* Call to Action Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="container max-w-7xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white uppercase mb-8 tracking-tighter">
              Ready to <span className="">secure</span> your future?
            </h2>
            <p className="text-white max-w-xl mx-auto mb-10 text-lg">
              Our experts are waiting to build a custom surveillance solution tailored to your specific infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://wa.me/263713012399" target="_blank" rel="noopener noreferrer">
                <button className="h-14 w-full sm:w-auto px-8 bg-white text-primary font-bold uppercase tracking-widest rounded transition-transform hover:scale-105">
                  Free Consultation
                </button>
              </Link>
              <Link href="/gallery">
                <button className="h-14 w-full sm:w-auto px-8 border-2 border-white text-white font-bold uppercase tracking-widest rounded hover:bg-white hover:text-primary transition-colors">
                  View Gallery
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIExplainer />
      <Toaster />
    </div>
  );
}