import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-grow pt-32 pb-24">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-[#01357D] uppercase tracking-tighter">
                Let's <span className="text-primary">Talk</span> Security.
              </h1>
              <p className="text-[#01357D] text-xl max-w-2xl mx-auto">
                Reach out for a consultation, technical support, or to join our network of protected clients.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Phone, title: "Direct Hotline", lines: ["Sales: 1-800-GUARDIAN-S", "Support: 1-800-EYES-ON-US"] },
                { icon: Mail, title: "Email Us", lines: ["Enquiries: sales@guardiansight.com", "Technical: support@guardiansight.com"] },
                { icon: MapPin, title: "Visit Head Office", lines: ["1200 Industrial Way, Tech District", "Safety City, SC 90210"] },
                { icon: Clock, title: "Business Hours", lines: ["Mon-Fri: 8:00 AM - 6:00 PM", "Emergency Support: 24/7 Available"] }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-card border border-border rounded-2xl flex flex-col items-center space-y-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="h-12 w-12 rounded bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[#01357D] font-bold mb-2 uppercase tracking-wider text-sm">{item.title}</h4>
                    {item.lines.map((line, li) => (
                      <p key={li} className="text-[#01357D] text-sm">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
