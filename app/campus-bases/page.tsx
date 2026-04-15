"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function CampusBasesPage() {
  return (
    <section id="campus-bases" className="scroll-mt-24 relative overflow-hidden">

      {/* 🌈 LIGHT CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* ✨ GLOW ORBS */}
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
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Campus Bases
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Student-led chapters building awareness and support across campuses.
          </p>
        </motion.div>

        {/* 🚧 PLACEHOLDER (BUT CINEMATIC) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/60 to-white/0 dark:from-white/10 dark:to-transparent">
            
            {/* GLASS CARD */}
            <div className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 p-12 text-center shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

              {/* ICON / VISUAL */}
              <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
                🎓
              </div>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 italic leading-relaxed">
                Campus chapter directory coming soon.  
                We are currently organizing our first wave of student branches.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 🚀 CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            Don’t see your campus?
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Start a chapter and lead change in your community.
          </p>

          <Link href="/campus-bases/apply">
            <Button
              size="lg"
              className="mt-8 rounded-full px-8 h-12 font-semibold
              bg-gradient-to-r from-blue-500 to-sky-500 text-white
              shadow-md hover:shadow-2xl
              hover:-translate-y-1 hover:scale-[1.02]
              transition-all duration-300"
            >
              Apply to Start a Chapter
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

export default CampusBasesPage;