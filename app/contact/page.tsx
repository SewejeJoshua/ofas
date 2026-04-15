"use client";

import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { motion } from "framer-motion";

export function ContactPage() {
  return (
    <section id="contact" className="scroll-mt-24 relative overflow-hidden">

      {/* 🌈 CINEMATIC BACKGROUND */}
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
          className="text-center pt-16 sm:pt-24 mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Contact Us
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Have questions or need support? We’re here to help.
          </p>
        </motion.div>

        {/* 📩 FORM CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/60 to-white/0 dark:from-white/10 dark:to-transparent">

            {/* GLASS WRAPPER */}
            <div className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

              {/* OPTIONAL TOP LABEL */}
              <div className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
                  ✉️
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Send us a message
                </p>
              </div>

              {/* FORM */}
              <ContactForm />

            </div>
          </div>
        </motion.div>

        {/* ✨ FOOT NOTE (SUBTLE TRUST ELEMENT) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          We typically respond within 24–48 hours.
        </motion.p>
      </Container>
    </section>
  );
}

export default ContactPage;