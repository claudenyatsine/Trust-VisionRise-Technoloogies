"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Trust-VisionRise Technologies Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <span className="font-headline font-bold text-xl tracking-tight text-[#01357D] leading-tight uppercase">
                TRUST-VISIONRISE<br/><span className="text-[#01357D]/80 text-sm">TECHNOLOGIES</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-bold uppercase tracking-wider text-[#01357D] hover:opacity-70 transition-opacity"
              >
                {link.name}
              </Link>
            ))}
            <Button variant="default" className="gap-2 font-bold uppercase tracking-wider bg-[#01357D] text-white shadow-lg hover:shadow-xl transition-shadow">
              <Phone className="h-4 w-4" />
              Get Quote
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#01357D]"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden absolute w-full bg-background border-b border-border transition-all duration-300 ease-in-out shadow-xl",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-4 text-base font-bold uppercase tracking-wider text-[#01357D] hover:bg-muted rounded-md"
            >
              {link.name}
            </Link>
          ))}
          <Button className="w-full mt-4 h-12 bg-[#01357D] text-white uppercase tracking-widest font-bold">Free Consultation</Button>
        </div>
      </div>
    </nav>
  );
}