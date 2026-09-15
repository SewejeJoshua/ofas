"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, CheckCircle2, Info } from "lucide-react";

const programs = [
  {
    title: "Asthma Education Workshops",
    description:
      "Interactive sessions for families to learn about triggers, medications, and action plans.",
    details:
      "Our Asthma Education Workshops provide practical and easy-to-understand information about asthma. Participants learn how to recognize common triggers, understand their medications, monitor symptoms, and develop better daily management habits.",
    highlights: [
      "Understanding common asthma triggers",
      "Learning about asthma medications",
      "Recognizing early warning signs",
      "Understanding asthma action plans",
      "Practical tips for everyday asthma management",
    ],
  },
  {
    title: "School Asthma Management",
    description:
      "Training for teachers and school nurses to create asthma-friendly school environments.",
    details:
      "This program helps schools create safer and more supportive environments for students living with asthma. Teachers, school staff, and caregivers receive practical information that can help them respond appropriately when a student experiences asthma symptoms.",
    highlights: [
      "Asthma awareness for teachers and staff",
      "Identifying symptoms in students",
      "Creating asthma-friendly school environments",
      "Emergency response awareness",
      "Supporting students with long-term asthma management",
    ],
  },
  {
    title: "Community Support Groups",
    description:
      "Regular meetings for patients and caregivers to share experiences and advice.",
    details:
      "Our Community Support Groups provide a welcoming environment where individuals living with asthma and their caregivers can connect with others. Members can share experiences, learn from one another, and receive encouragement from the wider community.",
    highlights: [
      "Peer-to-peer support",
      "Caregiver discussions",
      "Community awareness activities",
      "Sharing practical experiences",
      "Building meaningful support networks",
    ],
  },
  {
    title: "Emergency Preparedness Training",
    description:
      "Teaching families how to handle asthma attacks and when to seek emergency care.",
    details:
      "Emergency Preparedness Training focuses on helping families become more prepared when asthma symptoms suddenly become severe. Participants learn the importance of recognizing warning signs and knowing when professional medical attention may be necessary.",
    highlights: [
      "Recognizing serious asthma symptoms",
      "Understanding emergency action plans",
      "Knowing when to seek medical assistance",
      "Preparing for unexpected asthma episodes",
      "Helping families respond calmly and appropriately",
    ],
  },
];

export function ProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<
    (typeof programs)[number] | null
  >(null);

  useEffect(() => {
    if (selectedProgram) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProgram]);

  return (
    <section
      id="programs"
      className="scroll-mt-24 relative overflow-hidden pb-16 sm:pb-20"
    >
      {/* =========================
          BACKGROUND
      ========================= */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* =========================
          GLOW ORBS
      ========================= */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-300/30 blur-[120px] rounded-full" />

      <div className="pointer-events-none absolute bottom-0 right-0 w-[350px] h-[350px] bg-sky-300/30 blur-[120px] rounded-full" />

      <Container>
        {/* =========================
            HEADER
        ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center pt-16 sm:pt-24"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Our Programs
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Empowering communities through education and meaningful support.
          </p>
        </motion.div>

        {/* =========================
            PROGRAM CARDS
        ========================= */}
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
                    onClick={() => setSelectedProgram(program)}
                    className="rounded-full px-6 h-11 border-blue-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* =========================
          PROGRAM DETAILS MODAL
      ========================= */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800"
            >
              {/* =========================
                  CLOSE BUTTON
              ========================= */}
              <button
                onClick={() => setSelectedProgram(null)}
                aria-label="Close"
                className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <X size={20} />
              </button>

              {/* =========================
                  MODAL CONTENT
              ========================= */}
              <div className="p-7 sm:p-10">
                <div className="flex items-start gap-4 pr-10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                    <Info size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
                      {selectedProgram.title}
                    </h2>

                    <p className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Our Community Program
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-7">
                  <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    {selectedProgram.details}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    What You Can Expect
                  </h3>

                  <div className="mt-4 space-y-3">
                    {selectedProgram.highlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={20}
                          className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400"
                        />

                        <p className="text-gray-600 dark:text-gray-300">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra Information */}
                <div className="mt-8 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Why This Matters
                  </h4>

                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                    Access to reliable information and community support can
                    help individuals and families feel more prepared and
                    confident when managing asthma in their everyday lives.
                  </p>
                </div>

                {/* Close */}
                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={() => setSelectedProgram(null)}
                    className="rounded-full px-7 h-11 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default ProgramsPage;