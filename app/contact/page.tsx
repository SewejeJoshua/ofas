"use client";

import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { useState, FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact-us/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.detail ||
            "Failed to send message. Please try again."
        );
      }

      setSubmitted(true);

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error("Contact form error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-white/40 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  return (
    <section
      id="contact"
      className="scroll-mt-24 relative overflow-hidden pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-300/30 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[350px] h-[350px] bg-sky-300/30 blur-[120px] rounded-full" />

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center pt-16 sm:pt-24 mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white">
            Contact Us
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Have questions or need support? We&apos;re here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto relative">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                ✉️
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get in touch
              </p>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Let&apos;s Start a Conversation
            </h2>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Have questions about our programs, partnerships, or support
              services? Reach out and we&apos;ll respond within 24–48 hours.
            </p>

            <div className="space-y-3">
              {[
                "Free support guidance",
                "Community & campus programs",
                "Partnership opportunities",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-visible"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 p-10 text-center shadow-xl"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={28} className="text-blue-600" />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Message Sent Successfully
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Thank you for contacting us. We will get back to you within
                    24–48 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="rounded-3xl bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 sm:p-10 space-y-5 shadow-xl"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      className={inputClasses}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      className={inputClasses}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <input
                    required
                    type="text"
                    placeholder="Subject"
                    className={inputClasses}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />

                  <textarea
                    required
                    rows={5}
                    placeholder="Your message..."
                    className={`${inputClasses} resize-none`}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  {error && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <p className="mt-16 pb-10 text-center text-sm text-gray-500 dark:text-gray-400">
          We typically respond within 24–48 hours.
        </p>
      </Container>
    </section>
  );
}