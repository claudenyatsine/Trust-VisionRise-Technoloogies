"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIExplainer } from "@/components/AIExplainer";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X, Maximize2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".gallery-item", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('portfolio-') || img.id.startsWith('service-'));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-[#01357D] uppercase tracking-tighter mb-6">
              Installation <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              A visual showcase of our professional security infrastructure projects across diverse sectors.
            </p>
          </div>

          <div ref={containerRef} className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx} 
                className="gallery-item relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg break-inside-avoid transition-all duration-500 hover:shadow-2xl"
                onClick={() => setSelectedImage(img.imageUrl)}
              >
                <div className="relative w-full aspect-auto min-h-[200px]">
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#01357D]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Badge className="w-fit mb-2 bg-primary text-white uppercase text-[10px] tracking-widest font-bold">
                      {img.id.split('-')[1]}
                    </Badge>
                    <p className="text-white font-bold text-sm uppercase tracking-tight">
                      {img.description}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <div className="relative max-w-5xl w-full max-h-[85vh] aspect-video">
            <Image
              src={selectedImage}
              alt="Gallery Preview"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      <Footer />
      <AIExplainer />
    </div>
  );
}
