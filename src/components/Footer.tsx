import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/resources/svg/logo.svg";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-20 pb-10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src={Logo} 
                alt="Trust-VisionRise Technologies Logo" 
                width={32} 
                height={32}
                className="h-8 w-8"
              />
              <span className="font-headline font-bold text-xl tracking-tight text-[#01357D] uppercase">
                TRUST-VISIONRISE
              </span>
            </Link>
            <p className="text-[#01357D]/80 leading-relaxed text-sm font-medium">
              Providing elite industrial surveillance solutions across the country. Licensed, insured, and committed to your absolute safety.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
                <Link key={idx} href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-[#01357D] hover:bg-[#01357D] hover:text-white shadow-md transition-all">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-[#01357D] uppercase tracking-widest mb-8 text-sm">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold text-[#01357D]/70 uppercase tracking-wider">
              <li><Link href="#services" className="hover:text-[#01357D] transition-colors">Surveillance Services</Link></li>
              <li><Link href="/about" className="hover:text-[#01357D] transition-colors">About Our Team</Link></li>
              <li><Link href="/contact" className="hover:text-[#01357D] transition-colors">Request a Quote</Link></li>
              <li><Link href="#" className="hover:text-[#01357D] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-[#01357D] uppercase tracking-widest mb-8 text-sm">Support</h4>
            <ul className="space-y-4 text-sm font-bold text-[#01357D]/70 uppercase tracking-wider">
              <li><Link href="#" className="hover:text-[#01357D] transition-colors">Customer Support</Link></li>
              <li><Link href="#" className="hover:text-[#01357D] transition-colors">Technical Base</Link></li>
              <li><Link href="#" className="hover:text-[#01357D] transition-colors">Downloads</Link></li>
              <li><Link href="#" className="hover:text-[#01357D] transition-colors">Monitoring Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-[#01357D] uppercase tracking-widest mb-8 text-sm">Contact Info</h4>
            <ul className="space-y-5 text-sm font-medium text-[#01357D]">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#01357D] shrink-0" />
                <span>1200 Industrial Way, Tech District<br />Safety City, SC 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#01357D] shrink-0" />
                <span className="font-bold">1-800-GUARDIAN</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#01357D] shrink-0" />
                <span className="font-bold">contact@guardiansight.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-10 text-center text-[10px] text-[#01357D]/60 uppercase tracking-[0.2em] font-bold">
          &copy; {new Date().getFullYear()} Trust-VisionRise Technologies. All Security Rights Reserved.
        </div>
      </div>
    </footer>
  );
}