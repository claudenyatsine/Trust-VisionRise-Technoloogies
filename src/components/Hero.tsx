"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ShieldCheck, Eye, Zap } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-cctv');
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Reveal text elements
    const tl = gsap.timeline();
    tl.from(textRef.current?.querySelectorAll("div, h1, p, .grid > div"), {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out"
    });

    // Subtitle float effect
    gsap.to(".hero-feature", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background decoration */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || ""}
          alt="CCTV Surveillance"
          fill
          className="object-cover opacity-20 scale-110"
          data-ai-hint="security camera"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={textRef} className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider translate-y-0 opacity-100">
            <ShieldCheck className="w-4 h-4" />
            Trusted Surveillance Experts
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-headline font-bold leading-tight text-white uppercase tracking-tighter">
            Uncompromising <span className="text-primary italic">Security</span> <br /> For Your Business.
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Industrial-grade surveillance systems designed, installed, and maintained by elite technicians. We protect what matters most to you.
          </p>

          <div className="grid sm:grid-cols-3 gap-8 pt-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3 hero-feature">
              <div className="p-3 bg-primary/10 rounded-full">
                <Eye className="text-primary h-8 w-8" />
              </div>
              <h4 className="text-white font-bold">4K HD Detail</h4>
              <p className="text-xs text-slate-400">Crystal clear identification night or day.</p>
            </div>
            <div className="flex flex-col items-center gap-3 hero-feature">
              <div className="p-3 bg-primary/10 rounded-full">
                <Zap className="text-primary h-8 w-8" />
              </div>
              <h4 className="text-white font-bold">Rapid Response</h4>
              <p className="text-xs text-slate-400">Instant mobile alerts for all incidents.</p>
            </div>
            <div className="flex flex-col items-center gap-3 hero-feature">
              <div className="p-3 bg-primary/10 rounded-full">
                <ShieldCheck className="text-primary h-8 w-8" />
              </div>
              <h4 className="text-white font-bold">24/7 Support</h4>
              <p className="text-xs text-slate-400">Remote monitoring and expert help.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}