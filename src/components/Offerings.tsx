"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, Shield, Star, Plus, Check, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ItemDetailsModal } from "./ItemDetailsModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// No static filtering here anymore, we'll do it in the component

const packages = [
  {
    name: "Starter Guard",
    description: "Perfect for small homes/apartments",
    features: ["2x 4K HD Cameras", "1TB NVR Storage", "Mobile App Access", "Professional Installation", "1 Year Warranty"],
    recommended: false,
  },
  {
    name: "Business Elite",
    description: "Complete security for retail & offices",
    features: ["8x AI-Enabled Cameras", "4TB Pro NVR Storage", "24/7 Cloud Backup", "Smart Incident Alerts", "2 Year Priority Support"],
    recommended: true,
  },
  {
    name: "Industrial Fort",
    description: "Uncompromised enterprise security",
    features: ["16x Thermal/AI Cameras", "32TB Enterprise Server", "Perimeter Detection", "PTZ Control Integration", "Lifetime Maintenance"],
    recommended: false,
  },
];

export function Offerings() {
  const { products, newArrivals: adminNewArrivals } = useAdmin();
  const containerRef = useRef<HTMLDivElement>(null);
  const arrivalsRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDetails = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const displayNewArrivals = adminNewArrivals.length > 0 ? adminNewArrivals.slice(0, 4) : products.slice(0, 4);

  useGSAP(() => {
    // Reveal arrivals
    gsap.from(".arrival-card", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: arrivalsRef.current,
        start: "top 85%",
      }
    });

    // Reveal packages
    gsap.from(".package-card", {
      scale: 0.9,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: packagesRef.current,
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section id="products" ref={containerRef} className="py-24 bg-slate-50 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">

        {/* New Arrivals Section */}
        <div ref={arrivalsRef} className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[#01357D] font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary"></span> New Arrivals
              </h2>
              <h3 className="text-3xl md:text-5xl font-headline font-bold text-[#01357D] uppercase tracking-tighter">
                Latest <span>Surveillance</span> Tech
              </h3>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white uppercase font-bold tracking-widest px-8 h-10">
                Explore All Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {displayNewArrivals.map((product, idx) => (
              <div key={idx} className="arrival-card h-full cursor-pointer" onClick={() => openDetails(product)}>
                <Card className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden flex flex-col h-full">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-1 left-1 md:top-4 md:left-4">
                      <Badge className="bg-primary text-white uppercase font-bold tracking-wider px-1.5 py-0.5 md:px-3 md:py-1 text-[8px] md:text-[10px]">
                        {product.tag}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1 md:gap-3">
                      <Button size="icon" className="h-6 w-6 md:h-10 md:w-10 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors">
                        <Eye className="h-3 w-3 md:h-5 md:w-5" />
                      </Button>
                      <Button size="icon" className="h-6 w-6 md:h-10 md:w-10 rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors">
                        <ShoppingCart className="h-3 w-3 md:h-5 md:w-5" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="p-2 md:p-6 flex-grow">
                    <CardTitle className="text-[10px] md:text-lg font-headline font-bold text-[#01357D] uppercase tracking-tighter md:tracking-tight mb-1 md:mb-2 leading-tight">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-[8px] md:text-sm text-slate-500 line-clamp-2 hidden md:block">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="hidden md:flex pt-0 justify-end items-center border-t border-slate-100 mt-auto px-6 py-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Packages Section */}
        <div ref={packagesRef}>
          <div className="text-center mb-16 px-4">
            <h2 className="text-[#01357D] font-bold uppercase tracking-widest text-[10px] md:text-sm mb-4">Complete Solutions</h2>
            <h3 className="text-3xl md:text-5xl font-headline font-bold text-[#01357D] mb-6 uppercase tracking-tighter">
              All-In-One <span className="text-primary">Packages</span>
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-lg">
              Tailored solutions for every scale. All packages include expert installation and configuration assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 max-w-sm mx-auto md:max-w-none">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`package-card relative p-0.5 md:p-1 rounded-lg md:rounded-2xl transition-transform duration-300 hover:-translate-y-2 cursor-pointer ${pkg.recommended ? 'bg-gradient-to-b from-primary to-[#01357D] shadow-xl' : 'bg-slate-200'}`}
                onClick={() => openDetails({
                  ...pkg,
                  title: pkg.name,
                  image: "/images/premium_surveillance_set_1776596695342.png", // Fallback image for packages
                  category: "Security Package"
                })}
              >
                {pkg.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[6px] md:text-xs font-bold uppercase tracking-widest py-0.5 px-2 md:py-1 md:px-4 rounded-full shadow-lg z-10 whitespace-nowrap">
                    Best Value
                  </div>
                )}
                <div className="bg-white rounded-md md:rounded-xl p-2 md:p-8 h-full flex flex-col">
                  <div className="mb-6 md:mb-8 text-center md:text-left">
                    <h4 className="text-[#01357D] font-headline font-bold text-xl md:text-2xl uppercase tracking-tighter md:tracking-tight mb-2 md:mb-1 leading-tight">{pkg.name}</h4>
                    <p className="text-slate-500 text-sm md:text-sm">{pkg.description}</p>
                  </div>


                  <ul className="space-y-4 md:space-y-4 mb-8 md:mb-10 flex-grow">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 md:gap-3">
                        <div className="mt-1 p-[2px] md:p-[2px] bg-primary/10 rounded-full">
                          <Check className="h-3 w-3 md:h-3 md:w-3 text-primary stroke-[3px]" />
                        </div>
                        <span className="text-slate-600 text-sm md:text-sm leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className={`w-full h-12 md:h-12 text-sm md:text-sm uppercase font-bold tracking-widest p-4 md:p-4 rounded-full transition-transform active:scale-95 ${pkg.recommended ? 'bg-primary hover:bg-[#01357D]' : 'bg-slate-800 hover:bg-black'}`}>
                    Select {pkg.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
