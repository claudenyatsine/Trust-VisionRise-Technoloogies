import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ShieldCheck, Eye, Zap } from "lucide-react";

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-cctv');

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || ""}
          alt="CCTV Surveillance"
          fill
          className="object-cover opacity-10"
          data-ai-hint="security camera"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Trusted Surveillance Experts
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-headline font-bold leading-tight text-foreground uppercase tracking-tighter">
            Uncompromising <span className="text-primary">Security</span> <br /> For Your Business.
          </h1>
          
          <p className="text-xl text-foreground max-w-2xl mx-auto leading-relaxed">
            Industrial-grade surveillance systems designed, installed, and maintained by elite technicians. We protect what matters most to you.
          </p>

          <div className="grid sm:grid-cols-3 gap-8 pt-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Eye className="text-primary h-8 w-8" />
              </div>
              <h4 className="text-foreground font-bold">4K HD Detail</h4>
              <p className="text-xs text-foreground">Crystal clear identification night or day.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <Zap className="text-primary h-8 w-8" />
              </div>
              <h4 className="text-foreground font-bold">Rapid Response</h4>
              <p className="text-xs text-foreground">Instant mobile alerts for all incidents.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShieldCheck className="text-primary h-8 w-8" />
              </div>
              <h4 className="text-foreground font-bold">24/7 Support</h4>
              <p className="text-xs text-foreground">Remote monitoring and expert help.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}