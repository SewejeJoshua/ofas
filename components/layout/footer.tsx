"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import EventsModal from "@/components/modals/events-modal";

import DonatePage from "@/app/donate/page";

// X (Twitter) Icon
const XIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2H21l-6.52 7.47L22 22h-6.172l-4.823-6.32L5.2 22H2.444l7.02-8.043L2 2h6.328l4.38 5.74L18.244 2zm-1.08 18h1.6L7.04 3.9H5.32L17.164 20z" />
  </svg>
);

// TikTok Icon
const TikTokIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.6 5.82c.63.45 1.36.78 2.14.95v2.9c-1.06-.03-2.08-.33-3-.85v6.03c0 3.4-2.75 6.15-6.15 6.15S3.44 18.25 3.44 14.85s2.75-6.15 6.15-6.15c.25 0 .5.02.74.05v3.05a3.1 3.1 0 0 0-.74-.09 3.1 3.1 0 1 0 3.1 3.1V2h3.9c.05 1.02.47 1.98 1.17 2.82z" />
  </svg>
);

export function Footer() {
  const [openEvents, setOpenEvents] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);

  // Join form states
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  useEffect(() => {
    document.body.style.overflow =
      openEvents || openDonate ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openEvents, openDonate]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/join/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Subscription failed");
      }

      setMessage("Successfully joined community updates 🎉");
      setEmail("");
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/share/g/1QpKRE2m1f/?mibextid=wwXIfr",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/the_ofas_community?igsh=MWV1cGozcHM0ODFyNQ==",
      label: "Instagram",
    },
    {
      icon: XIcon,
      href: "https://x.com/onefamilyasthma?s=21",
      label: "X",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/one-family-asthma-support-ofas/",
      label: "LinkedIn",
    },
    {
      icon: TikTokIcon,
      href: "https://www.tiktok.com/@onefamilyasthmasupport?_r=1&_t=ZS-96DUafvoCvs",
      label: "TikTok",
    },
  ];

  return (
    <>
      <footer
        className="
          relative
          overflow-hidden
          text-gray-900
          dark:text-white
          border-t
          border-slate-200
          dark:border-white/5
        "
      >
        {/* Background */}
        <div
          className="
            absolute
            inset-0
            -z-10
            bg-gradient-to-b
            from-slate-50
            via-sky-50
            to-blue-100
            dark:from-slate-950
            dark:via-slate-900
            dark:to-black
          "
        />

        {/* Soft light-mode decorative glow */}
        <div
          className="
            absolute
            -top-32
            right-[-100px]
            w-[400px]
            h-[400px]
            rounded-full
            bg-sky-300/20
            blur-3xl
            pointer-events-none
            dark:bg-blue-500/5
          "
        />

        <Container className="relative py-14">
          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
            {/* =====================================================
                BRAND
            ===================================================== */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <div
                  className="
                    relative
                    h-12
                    w-12
                    rounded-full
                    overflow-hidden
                    bg-white
                    dark:bg-black
                    border
                    border-slate-200
                    dark:border-white/10
                    shadow-sm
                  "
                >
                  <Image
                    src="/logo.jpg"
                    alt="OFAS Logo"
                    fill
                    className="object-cover"
                  />
                </div>

                <span className="font-bold text-xl text-gray-900 dark:text-white">
                  OFAS
                </span>
              </Link>

              <p
                className="
                  text-slate-600
                  dark:text-gray-400
                  text-sm
                  max-w-xs
                  leading-relaxed
                "
              >
                Supporting families living with asthma through education and
                awareness.
              </p>

              {/* =================================================
                  EVENTS + DONATE
              ================================================= */}
              <div className="flex flex-col items-start gap-3">
                <Button
                  type="button"
                  onClick={() => setOpenEvents(true)}
                  className="
                    rounded-full
                    bg-blue-600
                    hover:bg-blue-500
                    text-white
                    text-sm
                    shadow-sm
                  "
                >
                  View Events
                </Button>

                <Button
                  type="button"
                  onClick={() => setOpenDonate(true)}
                  className="
                    rounded-full
                    bg-blue-600
                    hover:bg-blue-500
                    text-white
                    text-sm
                    shadow-sm
                    transition-all
                  "
                >
                  Donate
                </Button>
              </div>
            </div>

            {/* =====================================================
                QUICK LINKS
            ===================================================== */}
            <div>
              <h3
                className="
                  text-xs
                  font-bold
                  text-blue-600
                  dark:text-blue-300
                  uppercase
                  mb-5
                  tracking-wide
                "
              >
                Quick Links
              </h3>

              <ul className="space-y-3">
                {[
                  ["About Us", "/#about"],
                  ["Programs", "/#programs"],
                  ["Resources", "/#resources"],
                  ["Campus Bases", "/#campus-bases"],
                  ["Gallery", "/gallery"],
                  ["Books", "/books"],
                  ["Contact", "/#contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="
                        text-slate-600
                        dark:text-gray-300
                        text-sm
                        hover:text-blue-600
                        dark:hover:text-white
                        transition-colors
                      "
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* =====================================================
                LEGAL
            ===================================================== */}
            <div>
              <h3
                className="
                  text-xs
                  font-bold
                  text-blue-600
                  dark:text-blue-300
                  uppercase
                  mb-5
                  tracking-wide
                "
              >
                Legal
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link
                    href="/legal/privacy"
                    className="
                      text-slate-600
                      dark:text-gray-300
                      text-sm
                      hover:text-blue-600
                      dark:hover:text-white
                      transition-colors
                    "
                  >
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link
                    href="/legal/terms"
                    className="
                      text-slate-600
                      dark:text-gray-300
                      text-sm
                      hover:text-blue-600
                      dark:hover:text-white
                      transition-colors
                    "
                  >
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>

            {/* =====================================================
                SOCIAL + JOIN
            ===================================================== */}
            <div>
              <h3
                className="
                  text-xs
                  font-bold
                  text-blue-600
                  dark:text-blue-300
                  uppercase
                  mb-5
                  tracking-wide
                "
              >
                Connect
              </h3>

              {/* Social icons */}
              <div className="flex gap-3 mb-6">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      dark:bg-white/5
                      border
                      border-slate-200
                      dark:border-white/10
                      shadow-sm
                      hover:bg-blue-50
                      dark:hover:bg-blue-500/20
                      hover:border-blue-200
                      dark:hover:border-blue-400/20
                      transition-all
                    "
                  >
                    <Icon
                      className="
                        w-4
                        h-4
                        text-slate-600
                        dark:text-gray-300
                      "
                    />
                  </Link>
                ))}
              </div>

              <p
                className="
                  text-slate-600
                  dark:text-gray-400
                  text-sm
                  mb-3
                "
              >
                Get community updates.
              </p>

              {/* JOIN FORM */}
              <form onSubmit={handleJoin} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="
                      flex-1
                      bg-white
                      dark:bg-white/5
                      border
                      border-slate-200
                      dark:border-white/10
                      rounded-lg
                      px-3
                      py-2
                      text-sm
                      text-gray-900
                      dark:text-white
                      placeholder-slate-400
                      dark:placeholder-gray-500
                      outline-none
                      focus:border-blue-400
                      dark:focus:border-blue-500
                      focus:ring-2
                      focus:ring-blue-500/10
                      transition
                    "
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="
                      rounded-lg
                      px-4
                      text-sm
                      bg-blue-600
                      hover:bg-blue-500
                      text-white
                    "
                  >
                    {loading ? "Joining..." : "Join"}
                  </Button>
                </div>

                {message && (
                  <p
                    className={`text-xs ${
                      message.includes("Successfully")
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* =====================================================
              COPYRIGHT
          ===================================================== */}
          <div
            className="
              mt-10
              border-t
              border-slate-200
              dark:border-white/10
              pt-6
              text-xs
              text-slate-500
              dark:text-gray-500
            "
          >
            © {new Date().getFullYear()} OFAS. All rights reserved.
          </div>
        </Container>
      </footer>

      {/* =========================================================
          EVENTS MODAL
      ========================================================= */}
      <EventsModal
        open={openEvents}
        onClose={() => setOpenEvents(false)}
      />

      {/* =========================================================
          DONATE MODAL
      ========================================================= */}
      {openDonate && (
        <div
          onClick={() => setOpenDonate(false)}
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black/60
            p-4
            backdrop-blur-sm
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              max-h-[90vh]
              w-full
              max-w-3xl
              overflow-y-auto
              rounded-2xl
            "
          >
            <DonatePage onClose={() => setOpenDonate(false)} />
          </div>
        </div>
      )}
    </>
  );
}