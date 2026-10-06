"use client";

import { Container } from "@/components/ui/container";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";
import { useEffect } from "react";

export function AboutPage() {
  const { scrollY } = useScroll();

  // Parallax effects
  const ySlow = useTransform(scrollY, [0, 500], [0, 80]);
  const yFast = useTransform(scrollY, [0, 500], [0, -60]);

  // Mouse glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mouseX, mouseY]);

  const content = [
    {
      title: "Our Story",
      text: `The One Family Asthma Support Community (OFAS) was founded in 2020 through the COVID-19 lockdown by Daniel Amogu. The community was created to provide a supportive space where people living with asthma would never feel alone. Today, OFAS is a registered nonprofit organization with the Corporate Affairs Commission of Nigeria (CAC) and continues to support asthma patients through awareness programs, education, and community engagement.`,
    },
    {
      title: "Our Mission",
      text: `Our mission is to empower individuals and families living with asthma through community support, accurate education, and practical assistance. We are committed to raising awareness about asthma and helping individuals better understand their condition, triggers, and treatment options. Through educational initiatives, we provide clear and reliable information that enables families to make informed health decisions. We remain committed to supporting those affected by asthma, reducing misinformation and stigma.`,
    },
  ];

  return (
    <section
      className="relative scroll-mt-24 pb-14 sm:pb-18 overflow-hidden"
      id="about"
    >
      {/* =====================================================
          BASE BACKGROUND
      ===================================================== */}
      <div
        className="
          absolute inset-0 -z-20
          bg-gradient-to-b
          from-sky-100
          via-slate-50
          to-blue-100
          dark:from-gray-950
          dark:via-gray-900
          dark:to-gray-950
        "
      />

      {/* =====================================================
          PARALLAX BLOBS
      ===================================================== */}
      <motion.div
        style={{ y: ySlow }}
        className="
          absolute
          top-[-100px]
          left-[-100px]
          w-[400px]
          h-[400px]
          bg-sky-400/15
          rounded-full
          blur-3xl
          -z-10
        "
      />

      <motion.div
        style={{ y: yFast }}
        className="
          absolute
          bottom-[-120px]
          right-[-80px]
          w-[450px]
          h-[450px]
          bg-blue-400/15
          rounded-full
          blur-3xl
          -z-10
        "
      />

      {/* =====================================================
          MOUSE FOLLOW GLOW
      ===================================================== */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="
          pointer-events-none
          fixed
          w-[300px]
          h-[300px]
          bg-sky-300/15
          blur-3xl
          rounded-full
          z-0
        "
      />

      <div className="py-18 sm:py-22 relative z-10">
        <Container>
          {/* =====================================================
              HEADER
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1
              className="
                text-5xl
                sm:text-6xl
                md:text-7xl
                font-bold
                tracking-tight
                text-gray-900
                dark:text-white
                leading-[1.05]
              "
            >
              About <span className="text-sky-500">OFAS</span>
            </h1>

            <p
              className="
                mt-5
                text-lg
                sm:text-xl
                text-gray-700
                dark:text-gray-300
                leading-relaxed
              "
            >
              The One Family Asthma Support Community is a growing community
              focused on awareness, education, and support — helping families
              breathe easier, together.
            </p>
          </motion.div>

          {/* =====================================================
              CARDS
          ===================================================== */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.25 }}
            className="mt-14 grid gap-10 lg:grid-cols-2 items-start"
          >
            {content.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 80,
                    scale: 0.95,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  },
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                }}
                className="
                  group
                  relative
                  flex
                  flex-col
                  rounded-3xl

                  border
                  border-slate-200
                  dark:border-gray-800/60

                  bg-white
                  dark:bg-gray-900/70

                  backdrop-blur-2xl

                  p-8

                  shadow-[0_12px_40px_rgba(15,23,42,0.08)]
                  dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)]

                  transition-all
                  duration-500
                "
              >
                {/* Card hover glow */}
                <div
                  className="
                    absolute
                    inset-0
                    rounded-3xl
                    bg-gradient-to-br
                    from-sky-100/70
                    via-transparent
                    to-blue-100/40
                    dark:from-sky-500/10
                    dark:to-transparent
                    opacity-0
                    group-hover:opacity-100
                    transition
                    duration-500
                    pointer-events-none
                  "
                />

                <div className="relative z-10">
                  {/* Card header */}
                  <h2
                    className="
                      text-center
                      text-2xl
                      font-semibold
                      text-gray-900
                      dark:text-white
                    "
                  >
                    {item.title}
                  </h2>

                  {/* Card body */}
                  <p
                    className="
                      mt-5
                      max-w-prose
                      text-justify
                      text-gray-700
                      dark:text-gray-300
                      leading-[1.8]
                      whitespace-pre-line
                    "
                  >
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* =====================================================
              FUTURE
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="h-0 overflow-hidden"
          />
        </Container>
      </div>
    </section>
  );
}

export default AboutPage;