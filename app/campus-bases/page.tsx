"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { CampusRepForm } from "@/components/forms/campus-rep-form";
import { X } from "lucide-react";

export function CampusBasesPage() {
  const [open, setOpen] = useState(false);

  // 🔒 Lock scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <section id="campus-bases" className="scroll-mt-24 relative overflow-hidden pb-24">

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

        {/* CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border p-12 text-center shadow-xl">
            <div className="mb-6 text-4xl">🎓</div>

            <p className="text-lg text-gray-600 dark:text-gray-300 italic">
              Campus chapter directory coming soon.  
              We are currently organizing our first wave.
            </p>
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