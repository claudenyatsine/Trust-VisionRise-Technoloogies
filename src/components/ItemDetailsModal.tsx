"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, X, ChevronLeft, ChevronRight, MapPin, Tag, Info } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRef, useEffect } from "react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface ItemDetailsModalProps {
  item: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ItemDetailsModal({ item, isOpen, onClose }: ItemDetailsModalProps) {
  if (!item) return null;

  const images = item.images && item.images.length > 0 ? item.images : [item.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToImage = (index: number) => {
    const newIndex = (index + images.length) % images.length;
    setActiveImageIndex(newIndex);
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: newIndex * width,
        behavior: "smooth"
      });
    }
  };

  const nextImage = () => scrollToImage(activeImageIndex + 1);
  const prevImage = () => scrollToImage(activeImageIndex - 1);

  // Synchronize on resize
  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        const width = scrollRef.current.offsetWidth;
        scrollRef.current.scrollLeft = activeImageIndex * width;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeImageIndex]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 overflow-hidden bg-white border-0 shadow-2xl rounded-2xl h-[90vh] md:h-[600px]">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="relative w-full md:w-3/5 bg-slate-100 flex flex-col">
            <div className="relative flex-1 min-h-[300px] md:min-h-[500px]">
              <div 
                ref={scrollRef}
                className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
                style={{ scrollBehavior: 'smooth' }}
              >
                {images.map((img: string, idx: number) => {
                  const imageSrc = img && (img.startsWith('http') || img.startsWith('/') || img.startsWith('data:'))
                    ? img 
                    : (PlaceHolderImages.find(p => p.id === img)?.imageUrl || "/logo.png");
                    
                  return (
                    <div key={idx} className="w-full h-full flex-shrink-0 snap-center relative">
                      {imageSrc && (
                        <img 
                          src={imageSrc} 
                          alt={`${item.name || item.title} - Image ${idx + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all shadow-lg border border-white/30"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all shadow-lg border border-white/30"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              <div className="absolute top-4 left-4 flex gap-2">
                {item.tag && (
                  <Badge className="bg-[#25D366] hover:bg-[#25D366] text-white border-0 font-bold uppercase tracking-widest text-[10px] px-3 py-1 shadow-lg">
                    {item.tag}
                  </Badge>
                )}
                {item.category && (
                  <Badge variant="outline" className="bg-white/80 backdrop-blur-md text-[#01357D] border-[#01357D]/20 font-bold uppercase tracking-widest text-[10px] px-3 py-1 shadow-sm">
                    {item.category}
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="p-4 bg-white/50 backdrop-blur-sm flex gap-2 overflow-x-auto no-scrollbar">
                {images.map((img: string, idx: number) => {
                  const imageSrc = img && (img.startsWith('http') || img.startsWith('/') || img.startsWith('data:'))
                    ? img 
                    : (PlaceHolderImages.find(p => p.id === img)?.imageUrl || "/logo.png");

                  return (
                    <button
                      key={idx}
                      onClick={() => scrollToImage(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImageIndex === idx ? 'border-[#01357D] shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <img src={imageSrc} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="w-full md:w-2/5 p-8 flex flex-col bg-white overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar min-h-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] font-bold text-[#25D366] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-[#25D366]"></span>
                    {item.category || "Project Portfolio"}
                  </h3>
                  <DialogTitle className="text-3xl font-headline font-bold text-[#01357D] uppercase tracking-tighter leading-none mb-3">
                    {item.name || item.title}
                  </DialogTitle>
                  {item.modelNumber && (
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full inline-block border">
                      Reference: {item.modelNumber}
                    </p>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-2 text-slate-500 mt-2">
                      <MapPin size={14} className="text-[#25D366]" />
                      <span className="text-sm font-medium">{item.location}</span>
                    </div>
                  )}
                </div>

                <div className="h-[1px] w-full bg-slate-100"></div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-[#01357D] uppercase tracking-widest flex items-center gap-2">
                    <Info size={14} /> Description
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.id && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <h4 className="text-[10px] font-bold text-[#01357D] uppercase tracking-widest flex items-center gap-2">
                      <Check size={14} className="text-[#25D366]" /> Key Features
                    </h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {['Professional Installation', '24/7 Remote Access', 'Warranty Included'].map((feat, i) => (
                        <li key={i} className="text-[11px] text-slate-500 flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#25D366] rounded-full"></span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t space-y-3">
              <a 
                href={`https://wa.me/263713012399?text=${encodeURIComponent(`Hi, I'm interested in learning more about: ${item.name || item.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full h-12 bg-[#01357D] hover:bg-[#002a63] text-white font-bold uppercase tracking-widest shadow-lg shadow-[#01357D]/10">
                  Contact Sales
                </Button>
              </a>
              <Button variant="ghost" className="w-full text-slate-400 hover:text-[#01357D] font-bold uppercase tracking-widest text-[10px]" onClick={onClose}>
                Return to Gallery
              </Button>
            </div>
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  );
}
