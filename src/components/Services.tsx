import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Building2, Home, Settings2, Video, Smartphone } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#01357D] font-bold uppercase tracking-widest text-sm mb-4">What We Do</h2>
          <h3 className="text-4xl md:text-5xl font-headline font-bold text-[#01357D] mb-6 uppercase tracking-tighter">
            Professional Security Solutions
          </h3>
          <p className="text-[#01357D] max-w-2xl mx-auto text-lg">
            We provide specialized surveillance installation for various environments, ensuring high-definition coverage and reliability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => {
            const img = PlaceHolderImages.find(p => p.id === service.image);
            return (
              <Card key={idx} className="bg-white border-border shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={img?.imageUrl || ""}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    data-ai-hint={img?.imageHint}
                  />
                  <div className="absolute inset-0 bg-[#01357D]/10" />
                  <div className="absolute bottom-4 left-4 bg-[#01357D] p-3 rounded shadow-2xl">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardHeader className="pt-8">
                  <CardTitle className="font-headline text-xl text-[#01357D] uppercase tracking-tight font-bold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-[#01357D] text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}