"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FileText, Video, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export function ResourcesPage() {
  return (
    <section
      id="resources"
      className="scroll-mt-24 relative overflow-hidden pb-24"
    >
      {/* 🌈 LIGHT CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* ✨ GLOW ORBS */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-300/30 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[300px] h-[300px] bg-sky-300/30 blur-[120px] rounded-full" />

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
            Asthma Resources
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Guides, tools, and videos to help you manage asthma confidently.
          </p>
        </motion.div>

        {/* 🎛️ FILTER PILLS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center flex-wrap gap-3"
        >
          {["All", "Triggers", "Management", "Emergency", "For Schools"].map(
            (item, i) => (
              <button
                key={i}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    i === 0
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-white/70 dark:bg-white/5 backdrop-blur-md text-gray-700 dark:text-gray-300 border border-white/40 dark:border-white/10 hover:bg-blue-600 hover:text-white"
                  }`}
              >
                {item}
              </button>
            )
          )}
        </motion.div>

        {/* 📦 RESOURCE CARDS */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <FileText className="h-6 w-6" />,
              title: "Asthma Action Plan Template",
              desc: "Downloadable PDF to outline treatment and emergency steps.",
              action: "Download PDF",
            },
            {
              icon: <Video className="h-6 w-6" />,
              title: "How to Use an Inhaler",
              desc: "Step-by-step video guide for proper inhaler technique.",
              action: "Watch Video",
            },
            {
              icon: <ExternalLink className="h-6 w-6" />,
              title: "Asthma & Allergy Foundation",
              desc: "External guide on managing asthma triggers at home.",
              action: "Visit Site",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-white/60 to-white/0 dark:from-white/10 dark:to-transparent"
            >
              <div className="h-full rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]">

                <div className="h-12 w-12 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.desc}
                </p>

                <button className="mt-6 text-blue-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  {item.action}
                  <span>→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ResourcesPage;