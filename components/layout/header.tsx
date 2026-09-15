 "use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import DonatePage from "@/app/donate/page";
import AsthmaScorecardForm from "@/components/forms/asthma-scorecard-form";

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
  { name: "About", href: "/#about" },
  { name: "Programs", href: "/#programs" },
  { name: "Resources", href: "/#resources" },
  { name: "Campus Bases", href: "/#campus-bases" },
  { name: "Gallery", href: "/gallery" },
  { name: "Test", action: "test" }, 
  { name: "Contact", href: "/#contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<null | "donate" | "test">(
    null
  );

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    document.body.style.overflow = activeModal ? "hidden" : "auto";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [activeModal]);

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const handleAction = (action: "donate" | "test") => {
    setMobileMenuOpen(false);
    setActiveModal(action);
  };

  return (
    <>
      {/* =========================================================
          HEADER / NAVBAR
      ========================================================= */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/70 bg-white/85 backdrop-blur-xl transition-all duration-300 dark:border-gray-800/70 dark:bg-gray-950/85">
        <Container>
          <div className="flex h-[76px] items-center justify-between">

            {/* =====================================================
                LOGO
            ===================================================== */}
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
            >
              <div className="relative h-11 w-11 overflow-hidden rounded-full bg-black shadow-sm ring-1 ring-gray-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md dark:ring-gray-700">
                <Image
                  src="/logo.jpg"
                  alt="OFAS Logo"
                  fill
                  priority
                  sizes="44px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <span className="hidden text-2xl font-extrabold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-sky-500 md:block dark:text-white dark:group-hover:text-sky-400">
                OFAS
              </span>
            </Link>

            {/* =====================================================
                RIGHT SIDE
            ===================================================== */}
            <div className="flex items-center gap-3 lg:gap-6">

              {/* ===================================================
                  DESKTOP NAVIGATION
              =================================================== */}
              <nav
                aria-label="Main navigation"
                className="hidden items-center xl:flex"
              >
                <div className="flex items-center gap-1 rounded-full border border-gray-200/80 bg-white/70 p-1 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                  {desktopNavigation.map((item) => {
                    if (item.href) {
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="group relative rounded-full px-3.5 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-sky-50 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-gray-300 dark:hover:bg-sky-950/50 dark:hover:text-sky-400"
                        >
                          <span>{item.name}</span>

                          {/* Animated underline */}
                          <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-sky-500 transition-all duration-300 group-hover:w-1/2" />
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setActiveModal(item.action!)}
                        className="group relative rounded-full px-3.5 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-sky-50 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-gray-300 dark:hover:bg-sky-950/50 dark:hover:text-sky-400"
                      >
                        <span>{item.name}</span>

                        {/* Animated underline */}
                        <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-sky-500 transition-all duration-300 group-hover:w-1/2" />
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* ===================================================
                  DONATE BUTTON
              =================================================== */}
              <Button
                type="button"
                onClick={() => setActiveModal("donate")}
                className="hidden md:block rounded-full bg-sky-500 text-white"
              >
                Donate
              </Button>

              {/* ===================================================
                  MOBILE MENU BUTTON
              =================================================== */}
              <button
                type="button"
                aria-label={
                  mobileMenuOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
                }
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm transition-all duration-300 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600 active:scale-95 xl:hidden dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-sky-700 dark:hover:bg-sky-950/50 dark:hover:text-sky-400"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </Container>

        {/* =========================================================
            MOBILE MENU
        ========================================================= */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-gray-200 bg-white xl:hidden dark:border-gray-800 dark:bg-gray-950"
            >
              <Container>
                <motion.nav
                  aria-label="Mobile navigation"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="py-4"
                >
                  <div className="space-y-1">
                    {mobileNavigation.map((item, index) => {
                      if (item.href) {
                        return (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: index * 0.04,
                              duration: 0.2,
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={handleMobileLinkClick}
                              className="group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-sky-50 hover:pl-5 hover:text-sky-600 dark:text-gray-300 dark:hover:bg-sky-950/40 dark:hover:text-sky-400"
                            >
                              <span>{item.name}</span>

                              <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                                →
                              </span>
                            </Link>
                          </motion.div>
                        );
                      }

                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: index * 0.04,
                            duration: 0.2,
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => handleAction(item.action!)}
                            className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-sky-50 hover:pl-5 hover:text-sky-600 dark:text-gray-300 dark:hover:bg-sky-950/40 dark:hover:text-sky-400"
                          >
                            <span>{item.name}</span>

                            <span className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                              →
                            </span>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Mobile Donate */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: mobileNavigation.length * 0.04,
                      duration: 0.25,
                    }}
                    className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800"
                  >
                    <Button
                      type="button"
                      onClick={() => handleAction("donate")}
                      className="h-12 w-full rounded-xl bg-sky-500 font-semibold text-white shadow-sm transition-all duration-300 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/20 active:scale-[0.99]"
                    >
                      Donate
                    </Button>
                  </motion.div>
                </motion.nav>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===========================================================
          MODALS
      =========================================================== */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            onClick={closeModal}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl"
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              {/* DONATE */}
              {activeModal === "donate" && (
                <DonatePage onClose={closeModal} />
              )}

              {/* TEST */}
              {activeModal === "test" && <AsthmaScorecardForm />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
 
