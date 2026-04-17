"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { VolunteerForm } from "@/components/forms/volunteer-form";

const programs = [
  {
    title: "Asthma Education Workshops",
    description:
      "Interactive sessions for families to learn about triggers, medications, and action plans.",
  },
  {
    title: "School Asthma Management",
    description:
      "Training for teachers and school nurses to create asthma-friendly school environments.",
  },
  {
    title: "Community Support Groups",
    description:
      "Regular meetings for patients and caregivers to share experiences and advice.",
  },
  {
    title: "Emergency Preparedness Training",
    description:
      "Teaching families how to handle asthma attacks and when to seek emergency care.",
  },
];

export function ProgramsPage() {
  const [open, setOpen] = useState(false);

  // 🔥 lock scroll when modal opens
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <section id="programs" className="scroll-mt-24 relative overflow-hidden">
      
      {/* 🌈 LIGHT BLUE CINEMATIC BACKGROUND */}
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
            Our Programs & Impact
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Empowering communities through education and meaningful support.
          </p>
        </motion.div>

        {/* PROGRAM CARDS */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-white/60 to-white/0 dark:from-white/10 dark:to-transparent"
            >
              <div className="h-full rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]">

                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {program.title}
                </h3>

                <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {program.description}
                </p>

                <div className="mt-8">
                  <Button
                    variant="outline"
                    className="rounded-full px-6 h-11 border-blue-200 dark:border-gray-700
                    text-gray-800 dark:text-gray-200
                    hover:bg-blue-600 hover:text-white
                    transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 🚀 CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-24 relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-sky-500" />
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,white,transparent_40%)]" />

          <div className="relative lg:grid lg:grid-cols-2 items-center">
            
            {/* TEXT */}
            <div className="px-6 py-14 sm:px-12 lg:px-16">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                Bring a program to your community
              </h2>

              <p className="mt-4 text-lg text-blue-100 max-w-lg leading-relaxed">
                Start a support group or host a workshop and help families breathe easier.
              </p>

              {/* 🔥 BUTTON NOW OPENS MODAL */}
              <Button
                onClick={() => setOpen(true)}
                className="mt-8 rounded-full px-8 h-12 font-semibold
                bg-white text-blue-600
                shadow-lg hover:shadow-2xl
                hover:-translate-y-1 transition-all duration-300"
              >
                Become a Rep
              </Button>
            </div>

            {/* IMAGE */}
            <div className="relative h-[320px] sm:h-[400px] lg:h-full">
              <Image
                src="/campus_rep_student_transparent.png"
                alt="Volunteer student"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
              />
            </div>
          </div>
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
              <VolunteerForm onClose={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProgramsPage;