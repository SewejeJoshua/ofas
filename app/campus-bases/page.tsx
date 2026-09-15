"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CampusRepForm } from "@/components/forms/campus-rep-form";
import { X, Building2 } from "lucide-react";

export function CampusBasesPage() {
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 🔒 Lock scroll (modal)
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // 📱 Detect mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CAMPUSES = [
    "University of Port Harcourt (UNIPORT)",
    "University of Medical Sciences, Ondo (UNIMED)",
    "University of Benin (UNIBEN)",
    "Rivers State University (UST/RSU)",
    "Madonna University",
    "University of Uyo (UNIUYO)",
    "Akwa Ibom State College of Nursing Sciences, Ituk Mbang Uruan",
    "Mountain Top University Abuja (MOU Abuja)",
    "University of Jos (UNIJOS)",
    "Nasarawa State University, Keffi (NSUK)",
    "Akwa Ibom State College of Health Technology, Etinan",
    "Olabisi Onabanjo University, college of Agricultural Sciences",
    "University of Ibadan",
    "Federal University Oye Ekiti",
  ];

  // 👉 show first 6, then toggle rest
  const visibleCampuses = showAll ? CAMPUSES : CAMPUSES.slice(0, 6);

  return (
    <section
      id="campus-bases"
      className="scroll-mt-24 relative overflow-hidden pb-20"
    >
      {/* 🌈 BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* ✨ GLOW */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-300/30 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[350px] h-[350px] bg-sky-300/30 blur-[120px] rounded-full" />

      <Container>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center pt-16 sm:pt-24"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white">
            Campus Bases
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Student-led chapters building awareness and support across campuses.
          </p>
        </motion.div>

        {/* 🎓 CAMPUS GRID */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="rounded-3xl bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-gray-800/60 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
              Popular Campuses
            </h2>

            <div className="flex flex-wrap gap-4">
              <AnimatePresence mode="popLayout">
                {visibleCampuses.map((school, i) => (
                  <motion.div
                    key={school}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="group bg-white dark:bg-gray-900/60 rounded-xl py-3 px-5 border border-gray-200 dark:border-gray-800 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 flex items-center justify-center">
                      <Building2 size={14} />
                    </div>

                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {school}
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.floor(Math.random() * 300 + 100)} members
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* 🔘 SEE MORE BUTTON */}
            {CAMPUSES.length > 6 && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                  className="rounded-full px-6"
                >
                  {showAll ? "Show Less" : "See More Campuses"}
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Don’t see your campus?
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Start a chapter and lead change in your community.
          </p>

          <Button
            onClick={() => setOpen(true)}
            className="mt-8 rounded-full px-8 h-12 bg-blue-500 text-white hover:scale-105"
          >
            Apply to Start a Chapter
          </Button>
        </motion.div>
      </Container>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* ❌ CLOSE */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-50 bg-white text-black rounded-full p-2 shadow-md hover:scale-110 transition"
              >
                <X size={18} />
              </button>

              <CampusRepForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CampusBasesPage;