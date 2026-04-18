import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle2, ShieldCheck, Trophy, Users } from "lucide-react";

export default function AboutPage() {
  const teamImg = PlaceHolderImages.find(img => img.id === 'about-team');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-headline font-bold text-[#01357D] uppercase tracking-tighter">
                Our Mission: <span className="text-primary">Absolute</span> Visibility.
              </h1>
              <p className="text-[#01357D] text-lg leading-relaxed">
                Founded in 2012, GuardianSight Solutions was built on a single premise: that security shouldn't be a luxury, but a fundamental pillar of any successful home or enterprise.
              </p>
              <div className="grid sm:grid-cols-2 gap-8 pt-6">
                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[#01357D] font-bold mb-1">Elite Engineering</h4>
                    <p className="text-sm text-[#01357D]">Our technicians are certified industrial security specialists.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg shadow-sm">
                  <div className="p-2 bg-primary/10 rounded">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[#01357D] font-bold mb-1">Human-Centric</h4>
                    <p className="text-sm text-[#01357D]">We design systems around how you actually use your space.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={teamImg?.imageUrl || ""}
                alt="Our professional team"
                fill
                className="object-cover"
                data-ai-hint="professional team"
              />
              <div className="absolute inset-0 border-[20px] border-primary/20 pointer-events-none" />
            </div>
          </div>

          <div className="bg-muted border border-border p-12 rounded-3xl mb-24 shadow-xl">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center space-y-4">
                <div className="text-primary text-5xl font-headline font-bold">12+</div>
                <h4 className="text-[#01357D] font-bold uppercase tracking-widest text-sm">Years of Experience</h4>
                <p className="text-[#01357D] text-sm">Protecting properties since 2012 with cutting-edge tech.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="text-primary text-5xl font-headline font-bold">2.5k</div>
                <h4 className="text-[#01357D] font-bold uppercase tracking-widest text-sm">Installations</h4>
                <p className="text-[#01357D] text-sm">A proven track record across commercial and residential sites.</p>
              </div>
              <div className="text-center space-y-4">
                <div className="text-primary text-5xl font-headline font-bold">100%</div>
                <h4 className="text-[#01357D] font-bold uppercase tracking-widest text-sm">Uptime Target</h4>
                <p className="text-[#01357D] text-sm">Proactive maintenance ensures your eyes never close.</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-4xl font-headline font-bold text-center text-[#01357D] uppercase">Our Values</h2>
            <div className="space-y-6">
              {[
                "Integrity: We never upsell equipment you don't need.",
                "Precision: Every cable and sensor is installed to industrial standards.",
                "Innovation: We stay ahead of the curve with AI-driven surveillance.",
                "Reliability: Our support team is available 24/7/365."
              ].map((val, idx) => (
                <div key={idx} className="flex items-center gap-4 p-6 bg-muted rounded-xl border border-border shadow-md">
                  <CheckCircle2 className="text-primary h-6 w-6 shrink-0" />
                  <span className="text-[#01357D] font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
