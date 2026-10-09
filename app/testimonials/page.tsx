"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { UserRound, Users, Quote, X } from "lucide-react";

type Testimonial = {
  name: string;
  location: string;
  gender: "male" | "female";
  role?: string;
  testimony: string[];
};

const testimonials: Testimonial[] = [
  {
    name: "Engr. Barthex Amanna",
    location: "Port Harcourt, Nigeria",
    gender: "male",
    testimony: [
      "For years, I lived in constant fear of when and where the next episode would occur. I relied heavily on over-the-counter medications, yet my condition kept relapsing, and my productive energy continued to dwindle.",
      "However, a breath of fresh air, renewed hope, and restored energy came when I joined the OFAS community. The support, sensitization, and daily medical tips shared within this community have proven genuinely therapeutic and life-affirming. My health has improved tremendously. The panic has disappeared, and I can barely use the inhaler.",
      "It is essential for everyone facing similar health challenges to discover the OFAS community and benefit from the knowledge it offers. Assuredly, your health will improve significantly.",
    ],
  },
  {
    name: "Iniabasi Obiofia",
    location: "Akwa Ibom State, Nigeria",
    gender: "female",
    role: "Asthmatic and Volunteer",
    testimony: [
      "My name is Iniabasi Obiofia, a pharmacy student at the University of Uyo. Having lived with asthma all my life, I often felt secluded, different, and misunderstood. People saw me as weak and treated asthma like a death sentence.",
      "I also felt helpless whenever I saw other people with asthma struggling, not knowing how to help them. I didn't fully understand the condition myself.",
      "OFAS changed that. I learned more about asthma than I could have imagined, including what to do when someone experiences an asthma attack. I also found a community of people who understood my experiences and how society viewed us.",
      "Finally, I felt at home.",
    ],
  },
  {
    name: "Adeniyi Precious Ikeoluwa",
    location: "Ondo State, Nigeria",
    gender: "female",
    role: "Team Lead and Volunteer, UNIMED November Outreach",
    testimony: [
      "Living with asthma has not always been easy. There have been moments when I felt scared, vulnerable, and overwhelmed by the challenges that come with the condition. Experiencing an asthma crisis made me realise how important it is to have people who understand what you are going through and are willing to offer support.",
      "Being part of the One Family Asthma Support Community (OFAS) has reminded me that I am not alone in this journey. My experiences have inspired me to look beyond my personal struggles and think about others living with asthma who may be facing similar challenges.",
      "What I appreciate most about OFAS is its commitment to asthma awareness, education, and support. Being part of this community has encouraged me to turn my experiences into an opportunity to make a difference in the lives of others.",
      "As a Team Lead and Volunteer for the UNIMED November Outreach, I am grateful for the opportunity to contribute to asthma awareness and help reach people who may not fully understand the condition. I hope to help create an environment where people living with asthma feel understood, supported, and encouraged to keep pursuing their dreams.",
      "My journey has taught me that even in the middle of personal challenges, we can still inspire others and make a meaningful difference. I am proud to be part of a community that reminds us that we are not alone.",
      "Winning Everyday Despite Asthma! 💙",
    ],
  },
];

export default function TestimonialsPage() {
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<Testimonial | null>(null);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gray-50 py-16 dark:border-gray-800 dark:bg-gray-900/50 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-400">
              <Users className="h-4 w-4" />
              Voices of Our Community
            </span>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              Stories of Hope,
              <span className="mt-2 block text-blue-600 dark:text-blue-400">
                Strength & Support
              </span>
            </h1>
          </motion.div>
        </Container>

        {/* TESTIMONIAL CARDS */}
        <Container className="mt-12 sm:mt-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-900 sm:p-7"
              >
                {/* QUOTE ICON */}
                <div className="mb-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Quote className="h-5 w-5" />
                </div>

                {/* SHORT PREVIEW */}
                <div className="flex-1">
                  <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                    {testimonial.testimony[0].length > 180
                      ? `${testimonial.testimony[0].slice(0, 180).trim()}...`
                      : testimonial.testimony[0]}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedTestimonial(testimonial)}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Read more
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                {/* AUTHOR */}
                <div className="mt-6 border-t border-gray-100 pt-5 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                        testimonial.gender === "male"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          : "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300"
                      }`}
                      aria-label={`${
                        testimonial.gender === "male" ? "Male" : "Female"
                      } profile icon`}
                    >
                      <UserRound className="h-6 w-6" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="break-words text-sm font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {testimonial.location}
                      </p>

                      {testimonial.role && (
                        <p className="mt-1 text-xs leading-5 text-blue-600 dark:text-blue-400">
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      {/* FULL TESTIMONIAL POPUP */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTestimonial(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-6"
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="testimonial-dialog-title"
              className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
            >
              {/* POPUP HEADER */}
              <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 sm:p-6 dark:border-gray-800">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <Quote className="h-5 w-5" />
                  </div>

                  <div>
                    <h2
                      id="testimonial-dialog-title"
                      className="text-lg font-semibold text-gray-900 dark:text-white"
                    >
                      {selectedTestimonial.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {selectedTestimonial.location}
                    </p>
                    {selectedTestimonial.role && (
                      <p className="mt-1 text-xs leading-5 text-blue-600 dark:text-blue-400">
                        {selectedTestimonial.role}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTestimonial(null)}
                  aria-label="Close testimonial"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* FULL STORY */}
              <div className="overflow-y-auto p-5 sm:p-6">
                <div className="space-y-4">
                  {selectedTestimonial.testimony.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-sm leading-7 text-gray-600 dark:text-gray-300"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* POPUP FOOTER */}
              <div className="border-t border-gray-100 p-4 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setSelectedTestimonial(null)}
                  className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}