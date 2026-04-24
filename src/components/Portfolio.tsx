"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { ItemDetailsModal } from "./ItemDetailsModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Static projects array removed, using dynamic data from AdminContext

export function Portfolio() {
  const { projects } = useAdmin();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetails = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const checkScroll = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (!gridRef.current) return;
    
    const scrollAmount = 400;
    gsap.to(gridRef.current, {
      scrollLeft: direction === "left" 
        ? gridRef.current.scrollLeft - scrollAmount
        : gridRef.current.scrollLeft + scrollAmount,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: checkScroll,
    });
  };

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

    checkScroll();
  }, { scope: containerRef });

  useGSAP(() => {
    gridRef.current?.addEventListener("scroll", checkScroll);
    return () => {
      gridRef.current?.removeEventListener("scroll", checkScroll);
    };
  });

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

        <div className="flex items-center gap-4">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex-shrink-0 p-2 rounded-full bg-[#01357D] text-white hover:bg-[#01357D]/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={gridRef}
            className="flex-1 overflow-x-auto scrollbar-hide"
            style={{ scrollBehavior: "auto" }}
          >
            <div className="flex items-stretch gap-2 md:gap-10 min-w-max">
              {projects.map((project, idx) => (
                  <div key={idx} className="portfolio-card h-full min-h-[24rem] md:min-h-[38rem] w-[120px] md:w-[350px] cursor-pointer" onClick={() => openDetails(project)}>
                    <Card className="flex h-full flex-col bg-white border-border shadow-md md:shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.image.startsWith('data:') || project.image.startsWith('/') ? project.image : (PlaceHolderImages.find(p => p.id === project.image)?.imageUrl || "")}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#01357D]/40 via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-1 left-1 md:bottom-4 md:left-4">
                          <span className="px-1 py-0.5 md:px-3 md:py-1 bg-[#01357D] text-white text-[6px] md:text-[10px] font-bold uppercase tracking-widest shadow-xl">
                            {project.location}
                          </span>
                        </div>
                      </div>
                      <CardContent className="h-[8rem] md:h-[12rem] p-2 md:p-8 overflow-hidden">
                        <div className="h-full flex flex-col">
                          <h4 className="text-[#01357D] font-headline font-bold text-[10px] md:text-xl mb-1 md:mb-3 uppercase tracking-tighter md:tracking-tight leading-tight overflow-hidden text-ellipsis">
                            {project.title}
                          </h4>
                          <p className="text-[#01357D]/90 text-[8px] md:text-sm leading-relaxed flex-1 overflow-hidden text-ellipsis">
                            {project.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex-shrink-0 p-2 rounded-full bg-[#01357D] text-white hover:bg-[#01357D]/80 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {selectedItem && (
        <ItemDetailsModal 
          item={selectedItem} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </section>
  );
}
