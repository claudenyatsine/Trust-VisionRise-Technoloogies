"use client";

import { ShieldCheck, Eye, Zap } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
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
    if (textRef.current) {
      tl.from(textRef.current.querySelectorAll("div, h1, p, .grid > div"), {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
      });
    }

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
    <section ref={containerRef} className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background decoration */}
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-x-[-1]"
        >
          <source src="/videos/a-cctv-security-camera-mounted-on-an-exterior-wall.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent opacity-40 pointer-events-none" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={textRef} className="max-w-4xl text-left space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            Trusted Surveillance Experts
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl font-headline font-bold leading-tight text-white uppercase tracking-tighter">
            Uncompromising <span>Security</span> <br /> For Your Business.
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Industrial-grade surveillance systems designed, installed, and maintained by elite technicians. We protect what matters most to you.
          </p>
        </div>
      </div>
    </section>
  );
}
