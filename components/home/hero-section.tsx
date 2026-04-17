"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import { VolunteerForm } from "@/components/forms/volunteer-form";
import DonatePage from "@/app/donate/page";

// 🚀 Lazy load 3D
const HeroInhaler3D = dynamic(
  () => import("./hero-inhaler-3d").then((mod) => mod.HeroInhaler3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-blue-100/60 animate-pulse blur-sm" />
      </div>
    ),
  }
);

export function HeroSection() {
  const { scrollY } = useScroll();

  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  const closeAll = () => {
    setVolunteerOpen(false);
    setDonateOpen(false);
  };

  const openVolunteer = () => {
    setDonateOpen(false);
    setVolunteerOpen(true);
  };

  const openDonate = () => {
    setVolunteerOpen(false);
    setDonateOpen(true);
  };

  // Parallax
  const ySlow = useTransform(scrollY, [0, 500], [0, 80]);
  const yFast = useTransform(scrollY, [0, 500], [0, -60]);

  // Mouse glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Lock scroll + ESC close
  useEffect(() => {
    if (volunteerOpen || donateOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [volunteerOpen, donateOpen]);

  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* ORBS */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-300/30 blur-[120px] rounded-full -z-10"
      />
      <motion.div
        style={{ y: yFast }}
        className="absolute top-40 -right-40 w-[400px] h-[400px] bg-sky-300/30 blur-[120px] rounded-full -z-10"
      />

      {/* MOUSE LIGHT */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none fixed w-[280px] h-[280px] bg-sky-300/20 blur-3xl rounded-full z-0"
      />

      <Container>
        <div className="flex flex-col-reverse lg:flex-row items-center gap-14 lg:gap-24 min-h-[85vh] py-16 lg:py-24 relative z-10">

          {/* LEFT */}
          <div className="flex-1 text-center lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.05] text-gray-900 dark:text-white"
            >
              <span className="block">Breathing Easier,</span>

              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="block bg-gradient-to-r from-blue-400 to-sky-500 bg-clip-text text-transparent"
              >
                Together.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Supporting asthma awareness, education, and care for every family.
            </motion.p>

            <div className="mt-10 flex flex-col items-center lg:items-start gap-6">

              <div className="flex flex-col sm:flex-row gap-4 w-full">

                <Button
                  onClick={openDonate}
                  className="w-full sm:w-auto px-8 py-6 text-lg rounded-full bg-blue-500 text-white hover:scale-105 transition"
                >
                  Donate Now
                </Button>

                <Button
                  onClick={openVolunteer}
                  variant="outline"
                  className="w-full sm:w-auto px-8 py-6 text-lg rounded-full hover:scale-105 transition"
                >
                  Join a Chapter
                </Button>

              </div>

              <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <strong className="text-gray-900 dark:text-white">500+</strong>
                  <p>Families Helped</p>
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white">50+</strong>
                  <p>Workshops</p>
                </div>
                <div>
                  <strong className="text-gray-900 dark:text-white">10+</strong>
                  <p>Chapters</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 w-full h-[300px] md:h-[500px]">
            <HeroInhaler3D />
          </div>

        </div>
      </Container>

      {/* MODAL */}
      <AnimatePresence>
        {(volunteerOpen || donateOpen) && (
          <motion.div
            onClick={closeAll}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              {volunteerOpen && (
                <VolunteerForm onClose={closeAll} />
              )}

              {donateOpen && (
                <DonatePage onClose={closeAll} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}