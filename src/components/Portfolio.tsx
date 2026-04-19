"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "Global Logistics Hub",
    location: "Chicago, IL",
    description: "Full-scale 4K IP surveillance for a 200,000 sq ft warehouse facility.",
    image: "portfolio-warehouse",
  },
  {
    title: "Metro Shopping Plaza",
    location: "Austin, TX",
    description: "Integrated AI loss prevention and perimeter monitoring for 40+ retail units.",
    image: "portfolio-retail",
  },
  {
    title: "The Summit Estates",
    location: "Aspen, CO",
    description: "Private thermal imaging and laser-tripwire security for a premier residential community.",
    image: "portfolio-estate",
  },
];

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".portfolio-card", {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    gsap.from(".portfolio-header > *", {
      x: -50,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
      }
    });
  }, { scope: containerRef });

  return (
    <section id="portfolio" ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 portfolio-header">
          <div className="max-w-2xl">
            <h2 className="text-[#01357D] font-bold uppercase tracking-widest text-sm mb-4">Our Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold text-[#01357D] uppercase tracking-tighter">
              Proven Security Infrastructure
            </h3>
          </div>
          <p className="text-[#01357D]/80 max-w-md text-sm uppercase tracking-widest font-bold">
            Explore our most recent high-stakes installations across industrial, commercial, and luxury residential sectors.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-10">
          {projects.map((project, idx) => {
            const img = PlaceHolderImages.find(p => p.id === project.image);
            return (
              <div key={idx} className="portfolio-card">
                <Card className="bg-white border-border shadow-md md:shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={img?.imageUrl || ""}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={img?.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#01357D]/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-1 left-1 md:bottom-4 md:left-4">
                      <span className="px-1 py-0.5 md:px-3 md:py-1 bg-[#01357D] text-white text-[6px] md:text-[10px] font-bold uppercase tracking-widest shadow-xl">
                        {project.location}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-2 md:p-8">
                    <h4 className="text-[#01357D] font-headline font-bold text-[10px] md:text-xl mb-1 md:mb-3 uppercase tracking-tighter md:tracking-tight leading-tight">
                      {project.title}
                    </h4>
                    <p className="text-[#01357D]/90 text-[8px] md:text-sm leading-relaxed hidden md:block">
                      {project.description}
                    </p>
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