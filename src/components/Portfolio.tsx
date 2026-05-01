"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronLeft, ChevronRight, ArrowRight, LayoutGrid } from "lucide-react";
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
    
    const gap = window.innerWidth > 768 ? 40 : 24;
    const cardWidth = window.innerWidth > 768 ? 397 : window.innerWidth * 0.80;
    const scrollAmount = cardWidth + gap;
    
    gridRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    
    // Check scroll after a delay to account for smooth animation
    setTimeout(checkScroll, 500);
  };

  useGSAP(() => {
    gsap.from(".portfolio-card", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });

    gsap.from(".portfolio-header > *", {
      x: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
      }
    });

    checkScroll();
  }, { scope: containerRef });

  useGSAP(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener("scroll", checkScroll);
      return () => grid.removeEventListener("scroll", checkScroll);
    }
  });

  return (
    <section id="portfolio" ref={containerRef} className="py-24 bg-slate-50 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 portfolio-header">
          <div className="max-w-2xl">
            <h2 className="text-[#01357D] font-bold uppercase tracking-widest text-sm mb-4 border-l-4 border-primary pl-4">Our Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold text-[#01357D] uppercase tracking-tighter">
              Proven Security Infrastructure
            </h3>
          </div>
          <p className="text-[#01357D]/80 max-w-md text-sm uppercase tracking-widest font-bold">
            Explore our most recent high-stakes installations across various sectors.
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-6 max-w-[98%] md:max-w-[85%] mx-auto relative group/carousel">
          {projects.length > 0 ? (
            <>
              <button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="hidden md:flex absolute -left-4 z-20 p-4 rounded-full bg-white text-[#01357D] hover:bg-primary hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 shadow-2xl border border-slate-100"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>

              <div
                ref={gridRef}
                className="flex-1 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-12 pt-4"
                style={{ scrollBehavior: "smooth" }}
              >
                <div className="flex items-stretch gap-6 md:gap-10 min-w-max px-6 md:px-12">
                  {projects.map((project, idx) => (
                      <div key={idx} className="portfolio-card h-full min-h-[21rem] md:min-h-[36rem] w-[85vw] md:w-[397px] cursor-pointer snap-center" onClick={() => openDetails(project)}>
                        <Card className="flex h-full flex-col bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden rounded-3xl relative">
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image
                              src={project.image.startsWith('data:') || project.image.startsWith('/') || project.image.startsWith('http') ? project.image : (PlaceHolderImages.find(p => p.id === project.image)?.imageUrl || "")}
                              alt={project.title}
                              fill
                              className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#01357D]/80 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-4 left-4">
                              <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-[#01357D] text-[10px] md:text-[12px] font-bold uppercase tracking-widest shadow-xl rounded-full">
                                {project.location}
                              </span>
                            </div>
                          </div>
                          <CardContent className="flex-1 p-6 md:p-10 flex flex-col justify-between bg-white">
                            <div>
                              <h4 className="text-[#01357D] font-headline font-bold text-xl md:text-3xl mb-3 md:mb-5 uppercase tracking-tighter md:tracking-tight leading-tight group-hover:text-primary transition-colors">
                                {project.title}
                              </h4>
                              <p className="text-slate-500 text-sm md:text-lg leading-relaxed line-clamp-3 md:line-clamp-4">
                                {project.description}
                              </p>
                            </div>
                            <div className="mt-8 flex items-center gap-3 text-primary font-bold text-xs md:text-sm uppercase tracking-[0.2em] group/btn">
                              Explore Case Study 
                              <div className="p-2 rounded-full bg-primary/5 group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                              </div>
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
                className="hidden md:flex absolute -right-4 z-20 p-4 rounded-full bg-white text-[#01357D] hover:bg-primary hover:text-white disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 shadow-2xl border border-slate-100"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </>
          ) : (
            <div className="w-full py-24 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <LayoutGrid size={32} />
                </div>
                <h4 className="text-[#01357D] font-bold uppercase tracking-widest">Portfolio is Empty</h4>
                <p className="text-slate-500 text-sm">Please log in to the Admin Dashboard to add your first high-stakes installation project.</p>
              </div>
            </div>
          )}
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
