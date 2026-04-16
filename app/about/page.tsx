"use client";

import { Container } from "@/components/ui/container";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function AboutPage() {
  const { scrollY } = useScroll();

  // 🎬 Parallax effects
  const ySlow = useTransform(scrollY, [0, 500], [0, 80]);
  const yFast = useTransform(scrollY, [0, 500], [0, -60]);

  // 🧠 Mouse glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="relative scroll-mt-24 overflow-hidden" id="about">
      
      {/* 🌊 Base gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-sky-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* 🎬 PARALLAX BLOBS */}
      <motion.div
        style={{ y: ySlow }}
        className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-sky-300/20 rounded-full blur-3xl -z-10"
      />
      <motion.div
        style={{ y: yFast }}
        className="absolute bottom-[-120px] right-[-80px] w-[450px] h-[450px] bg-blue-300/20 rounded-full blur-3xl -z-10"
      />

      {/* 💡 Mouse-follow glow */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none fixed w-[300px] h-[300px] bg-sky-300/20 blur-3xl rounded-full z-0"
      />

      <div className="py-24 sm:py-32 relative z-10">
        <Container>
          
          {/* 🎬 HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.05]">
              About <span className="text-sky-500">OFAS</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              One Family Asthma Support Group is a growing community focused on
              awareness, education, and support — helping families breathe easier,
              together.
            </p>
          </motion.div>

          {/* 🎬 CARDS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.25 }}
            className="mt-24 grid gap-10 lg:grid-cols-2"
          >
            {[
              { title: "Our Mission" },
              { title: "Our History" }, 
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 80, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 3,
                  rotateY: -3,
                }}
                className="group relative rounded-3xl border border-white/20 dark:border-gray-800/60 bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
              >
                {/* glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-200/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h2>

                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed italic">
                  [Content to be added...]
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* 🎬 TEAM PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mt-20"
          >
             
          </motion.div>

        </Container>
      </div>
    </section>
  );
}

export default AboutPage;