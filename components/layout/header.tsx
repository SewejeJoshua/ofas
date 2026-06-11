"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import DonatePage from "@/app/donate/page";
import TestForm from "@/components/forms/test-form";

type NavItem = {
  name: string;
  href?: string;
  action?: "donate" | "test";
};

const desktopNavigation: NavItem[] = [
  { name: "About", href: "/#about" },
  { name: "Programs", href: "/#programs" },
  { name: "Resources", href: "/#resources" },
  { name: "Campus Bases", href: "/#campus-bases" },
  { name: "Gallery", href: "/gallery" },
  { name: "Test", action: "test" },
  { name: "Contact", href: "/#contact" },
];

const mobileNavigation: NavItem[] = [
  { name: "Programs", href: "/#programs" },
  { name: "Gallery", href: "/gallery" },
  { name: "Test", action: "test" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<null | "donate" | "test">(null);

  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [activeModal]);

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/60 dark:bg-gray-900/60 border-b border-white/20 dark:border-gray-800/50">
        <Container>
          <div className="flex items-center h-20">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-full overflow-hidden bg-black">
                <Image src="/logo.jpg" alt="OFAS Logo" fill className="object-cover" />
              </div>
              <span className="hidden md:block text-2xl font-bold">OFAS</span>
            </Link>

            {/* NAV */}
            <div className="ml-auto flex items-center gap-6">

              <nav className="hidden xl:flex gap-6">
                {desktopNavigation.map((item) =>
                  item.href ? (
                    <Link key={item.name} href={item.href} className="text-sm font-semibold">
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => setActiveModal(item.action!)}
                      className="text-sm font-semibold"
                    >
                      {item.name}
                    </button>
                  )
                )}
              </nav>

              <Button
                onClick={() => setActiveModal("donate")}
                className="hidden md:block rounded-full bg-sky-500 text-white"
              >
                Donate
              </Button>

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </Container>

        {/* MOBILE */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden overflow-hidden border-t bg-white"
            >
              <div className="p-4 space-y-3">
                {mobileNavigation.map((item) =>
                  item.href ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setActiveModal(item.action!);
                      }}
                    >
                      {item.name}
                    </button>
                  )
                )}

                <Button onClick={() => setActiveModal("donate")} className="w-full">
                  Donate
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MODALS */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            onClick={closeModal}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              {activeModal === "donate" && <DonatePage onClose={closeModal} />}
              {activeModal === "test" && <TestForm onClose={closeModal} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}