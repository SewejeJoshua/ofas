"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
      "Training for teachers and school nurses to create asthma-friendly environments.",
  },
  {
    title: "Community Support Groups",
    description:
      "Regular meetings for patients and caregivers to share experiences.",
  },
  {
    title: "Emergency Preparedness Training",
    description:
      "Teaching families how to handle asthma attacks.",
  },
];

export function ProgramsPage() {
  const [open, setOpen] = useState(false);

  return (
    <section id="programs" className="scroll-mt-24 relative overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      <Container>
        {/* HEADER */}
        <div className="text-center pt-16 sm:pt-24">
          <h1 className="text-4xl sm:text-5xl font-semibold">
            Our Programs & Impact
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Empowering communities through education.
          </p>
        </div>

        {/* PROGRAMS */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl bg-white p-8 shadow"
            >
              <h3 className="text-xl font-semibold">{program.title}</h3>
              <p className="mt-3 text-gray-600">{program.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-3xl bg-gradient-to-r from-blue-500 to-sky-500 text-white overflow-hidden">
          <div className="lg:grid lg:grid-cols-2 items-center">
            
            {/* TEXT */}
            <div className="p-10">
              <h2 className="text-3xl font-semibold">
                Bring a program to your community
              </h2>
              <p className="mt-4 text-blue-100">
                Start a support group or host a workshop.
              </p>

              <Button
                onClick={() => setOpen(true)}
                className="mt-8 bg-white text-blue-600 hover:scale-105 transition"
              >
                Become a Rep
              </Button>
            </div>

            {/* IMAGE */}
            <div className="relative h-[300px]">
              <Image
                src="/campus_rep_student_transparent.png"
                alt="Volunteer"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* 🔥 MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* MODAL CONTENT */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-2xl"
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setOpen(false)}
                className="absolute -top-3 -right-3 bg-white rounded-full w-10 h-10 shadow flex items-center justify-center text-black font-bold"
              >
                ✕
              </button>

              {/* FORM */}
              <VolunteerForm />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProgramsPage;