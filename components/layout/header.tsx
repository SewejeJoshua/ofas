"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import DonatePage from "@/app/donate/page";

const navigation = [
  { name: "About", href: "/#about" },
  { name: "Programs", href: "/#programs" },
  { name: "Resources", href: "/#resources" },
  { name: "Campus Bases", href: "/#campus-bases" },
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  const closeDonate = () => setDonateOpen(false);

  // 🔒 Lock scroll + ESC close
  useEffect(() => {
    if (donateOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDonate();
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [donateOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/60 dark:bg-gray-900/60 border-b border-white/20 dark:border-gray-800/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        
        {/* Glow */}
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

            {/* RIGHT */}
            <div className="ml-auto flex items-center gap-8">
              
              {/* DESKTOP NAV */}
              <nav className="hidden xl:flex items-center gap-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group relative text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition"
                  >
                    {item.name}
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-sky-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              {/* ✅ DONATE BUTTON */}
              <Button
                onClick={() => setDonateOpen(true)}
                className="hidden md:block rounded-full px-7 h-11 font-semibold shadow-md hover:shadow-xl transition bg-gradient-to-r from-sky-500 to-blue-400 text-white hover:-translate-y-0.5"
              >
                Donate
              </Button>

              {/* MOBILE MENU TOGGLE */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                )}
              </button>
            </div>
          </div>
        </Container>

        {/* MOBILE MENU */}
        <div
          className={`xl:hidden transition-all duration-300 ${
            mobileMenuOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-t px-4 py-5 space-y-3 shadow-2xl">
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

            {/* MOBILE DONATE */}
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                setDonateOpen(true);
              }}
              className="w-full mt-3 rounded-full h-11 font-semibold bg-gradient-to-r from-sky-500 to-blue-400 text-white"
            >
              Donate
            </Button>
          </div>
        </div>
      </header>

      {/* 🔥 DONATE MODAL (MATCHES HERO) */}
      <AnimatePresence>
        {donateOpen && (
          <motion.div
            onClick={closeDonate}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <DonatePage onClose={closeDonate} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}