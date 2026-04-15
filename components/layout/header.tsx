"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "About", href: "/#about" },
  { name: "Programs", href: "/#programs" },
  { name: "Resources", href: "/#resources" },
  { name: "Campus Bases", href: "/#campus-bases" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] backdrop-blur-2xl bg-white/60 dark:bg-gray-900/60 border-b border-white/20 dark:border-gray-800/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      
      {/* 🌊 Subtle light-blue glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-100/40 via-transparent to-blue-100/40 dark:from-sky-900/10 dark:to-blue-900/10" />

      <Container>
        <div className="flex items-center h-20">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-sky-400/40 via-blue-300/20 to-transparent group-hover:from-sky-400/70 transition">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden bg-black">
                <Image
                  src="/logo.jpg"
                  alt="OFAS Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <span className="hidden md:block text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              OFAS
            </span>
          </Link>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-8">
            
            {/* DESKTOP NAV */}
            <nav className="hidden xl:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-sm font-semibold text-gray-600 dark:text-gray-300 transition-colors duration-200 hover:text-sky-600 dark:hover:text-sky-400"
                >
                  {item.name}

                  {/* ✨ animated underline */}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* CTA BUTTON */}
            <Link href="/donate" className="hidden md:block">
              <Button className="rounded-full px-7 h-11 font-semibold shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-sky-500 to-blue-400 text-white hover:from-sky-400 hover:to-blue-300 hover:-translate-y-0.5">
                Donate
              </Button>
            </Link>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* 📱 MOBILE MENU */}
      <div
        className={`xl:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-[500px] opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
        }`}
      >
        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-t border-gray-200/40 dark:border-gray-800 px-4 py-5 space-y-3 shadow-2xl">
          
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-gray-800 hover:text-sky-600 transition"
            >
              {item.name}
            </Link>
          ))}

          <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full mt-3 rounded-full h-11 font-semibold bg-gradient-to-r from-sky-500 to-blue-400 text-white shadow-md hover:shadow-lg transition">
              Donate
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}