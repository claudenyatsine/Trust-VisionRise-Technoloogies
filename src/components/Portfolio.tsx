import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";

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
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
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

        <div className="grid md:grid-cols-3 gap-10">
          {projects.map((project, idx) => {
            const img = PlaceHolderImages.find(p => p.id === project.image);
            return (
              <Card key={idx} className="bg-white border-border shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={img?.imageUrl || ""}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={img?.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#01357D]/40 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-[#01357D] text-white text-[10px] font-bold uppercase tracking-widest shadow-xl">
                      {project.location}
                    </span>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h4 className="text-[#01357D] font-headline font-bold text-xl mb-3 uppercase tracking-tight">
                    {project.title}
                  </h4>
                  <p className="text-[#01357D]/90 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}