"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  Phone, 
  Home, 
  Package, 
  Shield, 
  SquareLibrary, 
  MessageSquare,
  Image as ImageIcon,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AdminLoginModal } from "./admin/AdminLoginModal";

export function Navigation() {
  const [clickCount, setClickCount] = React.useState(0);
  const [showAdminLogin, setShowAdminLogin] = React.useState(false);
  const router = useRouter();
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (newCount === 3) {
      setShowAdminLogin(true);
      setClickCount(0);
    } else {
      timerRef.current = setTimeout(() => {
        if (newCount === 1) {
          router.push("/");
        }
        setClickCount(0);
      }, 300);
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/shop#products", icon: Package },
    { name: "Services", href: "/#services", icon: Shield },
    { name: "Resources", href: "/downloads", icon: Download },
    { name: "Contact", href: "/contact", icon: MessageSquare },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Trust-VisionRise Technologies Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="font-headline font-bold text-xl tracking-tight text-[#01357D] leading-tight uppercase text-left">
                  TRUST-VISIONRISE<br/><span className="text-[#01357D]/80 text-sm">TECHNOLOGIES</span>
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold uppercase tracking-wider text-[#01357D] hover:opacity-70 transition-opacity"
                >
                  {link.name}
                </Link>
              ))}
              <Link href="https://wa.me/263713012399" target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="gap-2 font-bold uppercase tracking-wider bg-[#01357D] text-white shadow-lg hover:shadow-xl transition-shadow">
                  <Phone className="h-4 w-4" />
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Header (Logo only) */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl py-4 px-6 flex justify-between items-center shadow-sm">
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
          <span className="font-headline font-bold text-base tracking-tight text-[#01357D] uppercase">
            Trust-VisionRise
          </span>
        </Link>
        <Link href="https://wa.me/263713012399" target="_blank" rel="noopener noreferrer">
          <Button size="sm" className="bg-[#01357D] rounded-full h-9 w-9 p-0 flex items-center justify-center">
            <Phone className="h-4 w-4 text-white" />
          </Button>
        </Link>
      </div>

      {/* Mobile Bottom Floating Nav */}
      <div className="md:hidden fixed bottom-6 left-0 w-full z-50 px-4">
        <div className="max-w-md mx-auto bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl px-4 py-3 flex justify-around items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex flex-col items-center gap-1 text-white/60 hover:text-primary transition-all active:scale-90"
            >
              <link.icon className="h-5 w-5" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>



      <AdminLoginModal isOpen={showAdminLogin} onOpenChange={setShowAdminLogin} />
    </>
  );
}
