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
} from "framer-motion";
import { useEffect } from "react";

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

  // 🎬 Parallax
  const ySlow = useTransform(scrollY, [0, 500], [0, 80]);
  const yFast = useTransform(scrollY, [0, 500], [0, -60]);

  // 💡 Mouse glow
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

  return (
    <section className="relative overflow-hidden">
      {/* 🌈 BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* 🎬 PARALLAX ORBS */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-300/30 blur-[120px] rounded-full -z-10"
      />
      <motion.div
        style={{ y: yFast }}
        className="absolute top-40 -right-40 w-[400px] h-[400px] bg-sky-300/30 blur-[120px] rounded-full -z-10"
      />

      {/* 💡 MOUSE FOLLOW LIGHT */}
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
          {/* LEFT CONTENT */}
          <div className="flex-1 text-center lg:text-left">
            {/* 🎬 HEADLINE */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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

            {/* 🎬 SUBTEXT */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Supporting asthma awareness, education, and care for every family.
              Join a growing community dedicated to improving lives through
              knowledge, support, and action.
            </motion.p>

            {/* 🎬 CTA + STATS */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.2 } },
              }}
              className="mt-10 flex flex-col items-center lg:items-start gap-6"
            >
              {/* BUTTON ROW */}
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start w-full">
                {/* PRIMARY */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link href="/donate" prefetch={false}>
                    <Button
                      className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-full
                      bg-gradient-to-r from-blue-500 to-sky-500 text-white
                      shadow-md hover:shadow-xl
                      transition-all duration-300
                      hover:-translate-y-1 hover:scale-[1.03]"
                    >
                      Donate Now
                    </Button>
                  </Link>
                </motion.div>

                {/* SECONDARY */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link href="/volunteer" prefetch={false}>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto px-8 py-6 text-lg font-semibold rounded-full
                      border border-blue-200 dark:border-gray-700
                      text-gray-800 dark:text-gray-200
                      bg-white/60 dark:bg-white/5 backdrop-blur-md
                      hover:bg-blue-600 hover:text-white
                      dark:hover:bg-white dark:hover:text-black
                      transition-all duration-300
                      hover:-translate-y-1 hover:scale-[1.03]"
                    >
                      Join a Chapter
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* 📊 IMPACT STATS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm sm:text-base text-gray-600 dark:text-gray-300"
              >
                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    500+
                  </span>
                  <span>Families Helped</span>
                </div>

                <div className="hidden sm:block w-px bg-gray-300 dark:bg-gray-700" />

                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    50+
                  </span>
                  <span>Workshops Held</span>
                </div>

                <div className="hidden sm:block w-px bg-gray-300 dark:bg-gray-700" />

                <div className="flex flex-col items-center lg:items-start">
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    10+
                  </span>
                  <span>Local Chapters</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* 🎬 RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex-1 w-full h-[280px] sm:h-[380px] md:h-[460px] lg:h-[560px] flex items-center justify-center"
          >
            <HeroInhaler3D />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}