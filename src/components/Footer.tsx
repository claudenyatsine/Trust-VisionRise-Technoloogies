import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const XIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#01357D] text-white pt-20 pb-24 md:pb-10 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Trust-VisionRise Technologies Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain brightness-0 invert"
              />
              <span className="font-headline font-bold text-xl tracking-tight text-white uppercase">
                TRUST-VISIONRISE
              </span>
            </Link>
            <p className="text-white/70 leading-relaxed text-sm font-medium">
              Providing elite industrial surveillance solutions across the country. Licensed, insured, and committed to your absolute safety.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: XIcon, href: "#" },
                { Icon: Linkedin, href: "#" }
              ].map((social, idx) => (
                <Link key={idx} href={social.href} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#01357D] shadow-md transition-all border border-white/20">
                  <social.Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white uppercase tracking-widest mb-8 text-sm border-l-2 border-white/30 pl-4">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold text-white/60 uppercase tracking-wider">
              {/*<li><Link href="/#services" className="hover:text-white transition-colors">Surveillance Services</Link></li>*/}
              {/*<li><Link href="/gallery" className="hover:text-white transition-colors">Installation Gallery</Link></li>*/}
              {/*<li><Link href="/contact" className="hover:text-white transition-colors">Request a Quote</Link></li>*/}
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white uppercase tracking-widest mb-8 text-sm border-l-2 border-white/30 pl-4">Support</h4>
            <ul className="space-y-4 text-sm font-bold text-white/60 uppercase tracking-wider">
              <li><Link href="#" className="hover:text-white transition-colors">Customer Support</Link></li>
              {/*<li><Link href="#" className="hover:text-white transition-colors">Technical Base</Link></li>*/}
              <li><Link href="/downloads" className="hover:text-white transition-colors">Downloads</Link></li>
              {/*<li><Link href="#" className="hover:text-white transition-colors">Monitoring Login</Link></li>*/}
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-white uppercase tracking-widest mb-8 text-sm border-l-2 border-white/30 pl-4">Contact Info</h4>
            <ul className="space-y-5 text-sm font-medium text-white/90">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-white/60 shrink-0" />
                <span>Shop 33, Cameroon Mall<br />Harare CBD, Harare</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/60 shrink-0" />
                <span className="font-bold">+263 713 012 399/ 711 499 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/60 shrink-0" />
                <span className="font-bold">trustivisionrisetechnology@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 text-center text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
          &copy; {new Date().getFullYear()} Trust-VisionRise Technologies. All Security Rights Reserved.
        </div>
      </div>
    </footer>
  );
}