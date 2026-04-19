import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Zap, Shield, Star, Plus, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

const newArrivals = PRODUCTS.filter(p => ["1", "2", "3", "4"].includes(p.id));

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
  return (
    <section className="py-24 bg-slate-50">
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* New Arrivals Section */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[#01357D] font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary"></span> New Arrivals
              </h2>
              <h3 className="text-4xl md:text-5xl font-headline font-bold text-[#01357D] uppercase tracking-tighter">
                Latest <span className="text-primary italic">Surveillance</span> Tech
              </h3>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white uppercase font-bold tracking-widest px-8 h-10">
                Explore All Products
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product, idx) => (
              <Card key={idx} className="bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden flex flex-col h-full">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white uppercase font-bold tracking-wider px-3 py-1 text-[10px]">
                      {product.tag}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Button size="icon" className="rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors">
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                    <Button size="icon" className="rounded-full bg-white text-primary hover:bg-primary hover:text-white transition-colors">
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-lg font-headline font-bold text-[#01357D] uppercase tracking-tight mb-2">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-slate-500 line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex justify-end items-center border-t border-slate-100 mt-auto px-6 py-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Packages Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-[#01357D] font-bold uppercase tracking-widest text-sm mb-4">Complete Solutions</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold text-[#01357D] mb-6 uppercase tracking-tighter">
              All-In-One <span className="text-primary">Packages</span>
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Tailored solutions for every scale. All packages include expert installation and lifetime configuration assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`relative p-1 rounded-2xl transition-transform duration-300 hover:-translate-y-2 ${pkg.recommended ? 'bg-gradient-to-b from-primary to-[#01357D] shadow-2xl' : 'bg-slate-200'}`}
              >
                {pkg.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="bg-white rounded-xl p-8 h-full flex flex-col">
                  <div className="mb-8">
                    <h4 className="text-[#01357D] font-headline font-bold text-2xl uppercase tracking-tight mb-2">{pkg.name}</h4>
                    <p className="text-slate-500 text-sm">{pkg.description}</p>
                  </div>
                  


                  <ul className="space-y-4 mb-10 flex-grow">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="mt-1 p-[2px] bg-primary/10 rounded-full">
                          <Check className="h-3 w-3 text-primary stroke-[3px]" />
                        </div>
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className={`w-full h-12 uppercase font-bold tracking-widest ${pkg.recommended ? 'bg-primary hover:bg-[#01357D]' : 'bg-slate-800 hover:bg-black'}`}>
                    Select Package
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
