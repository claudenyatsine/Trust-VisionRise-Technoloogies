"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Building2, Home, Settings2, Video, Smartphone } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const services = [
  {
    title: "Commercial Surveillance",
    description: "Enterprise-level multi-camera systems with centralized management for large facilities.",
    icon: Building2,
    image: "service-commercial",
  },
  {
    title: "Residential Protection",
    description: "Smart home security integration with sleek 4K cameras and mobile access for families.",
    icon: Home,
    image: "service-residential",
  },
  {
    title: "System Maintenance",
    description: "Scheduled health checks, cleaning, and firmware updates to ensure 100% uptime.",
    icon: Settings2,
    image: "service-maintenance",
  },
  {
    title: "IP Video Solutions",
    description: "Modern network-based cameras offering superior scalability and remote storage.",
    icon: Video,
    image: "hero-cctv",
  },
  {
    title: "Mobile Integration",
    description: "Real-time viewing and AI-triggered alerts directly on your smartphone anywhere.",
    icon: Smartphone,
    image: "service-residential",
  },
  {
    title: "Perimeter Security",
    description: "Thermal imaging and laser detection for sensitive outdoor area protection.",
    icon: Shield,
    image: "service-commercial",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Scroll reveal
    gsap.from(cardsRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {
        gsap.set(cardsRef.current, { clearProps: "y,opacity" });
      }
    });
  }, { scope: containerRef });

  const handleMouseEnter = (index: number) => {
    gsap.to(cardsRef.current[index], {
      scale: 1.05,
      zIndex: 10,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
      filter: "blur(0px)",
      opacity: 1,
    });

    cardsRef.current.forEach((card, i) => {
      if (i !== index && card) {
        gsap.to(card, {
          opacity: 0.6,
          filter: "blur(2px)",
          scale: 0.98,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardsRef.current, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#01357D] font-bold uppercase tracking-widest text-sm mb-4">What We Do</h2>
          <h3 className="text-3xl md:text-5xl font-headline font-bold text-[#01357D] mb-6 uppercase tracking-tighter">
            Professional Security Solutions
          </h3>
          <p className="text-[#01357D] max-w-2xl mx-auto text-lg">
            We provide specialized surveillance installation for various environments, ensuring high-definition coverage and reliability.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-sm mx-auto md:max-w-none">
          {services.map((service, idx) => {
            const img = PlaceHolderImages.find(p => p.id === service.image);
            return (
              <div
                key={idx}
                ref={(el) => { cardsRef.current[idx] = el; }}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
                className="transition-all duration-300"
              >
                <Card className="bg-white border-border shadow-md md:shadow-xl h-full group overflow-hidden pointer-events-auto">
                  <div className="relative h-56 md:h-56 w-full overflow-hidden">
                    <Image
                      src={img?.imageUrl || ""}
                      alt={service.title}
                      fill
                      unoptimized
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      data-ai-hint={img?.imageHint}
                    />
                    <div className="absolute inset-0 bg-[#01357D]/10" />
                    <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 bg-[#01357D] p-1.5 md:p-3 rounded shadow-2xl">
                      <service.icon className="h-3 w-3 md:h-6 md:w-6 text-white" />
                    </div>
                  </div>
                  <CardHeader className="pt-3 md:pt-8 px-3 md:px-6">
                    <CardTitle className="font-headline text-xl md:text-xl text-[#01357D] uppercase tracking-tighter md:tracking-tight font-bold leading-tight">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 md:px-6 pb-6 md:pb-4">
                    <CardDescription className="text-[#01357D] text-sm md:text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}