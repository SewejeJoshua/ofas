"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import EventsModal from "@/components/modals/events-modal";

// 🔥 Custom X (Twitter) Icon
const XIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2H21l-6.52 7.47L22 22h-6.172l-4.823-6.32L5.2 22H2.444l7.02-8.043L2 2h6.328l4.38 5.74L18.244 2zm-1.08 18h1.6L7.04 3.9H5.32L17.164 20z" />
  </svg>
);

// 🔥 TikTok Icon
const TikTokIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16.6 5.82c.63.45 1.36.78 2.14.95v2.9c-1.06-.03-2.08-.33-3-.85v6.03c0 3.4-2.75 6.15-6.15 6.15S3.44 18.25 3.44 14.85s2.75-6.15 6.15-6.15c.25 0 .5.02.74.05v3.05a3.1 3.1 0 0 0-.74-.09 3.1 3.1 0 1 0 3.1 3.1V2h3.9c.05 1.02.47 1.98 1.17 2.82z" />
  </svg>
);

export function Footer() {
  const [openEvents, setOpenEvents] = useState(false);

  // 👇 JOIN FORM STATES
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  useEffect(() => {
    document.body.style.overflow = openEvents ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openEvents]);

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
      <footer className="relative overflow-hidden text-white">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />

        <Container className="relative py-14">
          <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">

            {/* BRAND */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-black">
                  <Image src="/logo.jpg" alt="OFAS Logo" fill className="object-cover" />
                </div>
                <span className="font-bold text-xl">OFAS</span>
              </Link>

              <p className="text-gray-400 text-sm max-w-xs">
                Supporting families living with asthma through education and awareness.
              </p>

              <Button
                onClick={() => setOpenEvents(true)}
                className="rounded-full bg-blue-600 hover:bg-blue-500 text-sm"
              >
                View Events
              </Button>
            </div>

            {/* QUICK LINKS */}
            <div>
              <h3 className="text-xs font-bold text-blue-300 uppercase mb-5">
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
                    <Link href={href} className="text-gray-300 text-sm hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h3 className="text-xs font-bold text-blue-300 uppercase mb-5">
                Legal
              </h3>

              <ul className="space-y-3">
                <li>
                  <Link href="/legal/privacy" className="text-gray-300 text-sm hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="text-gray-300 text-sm hover:text-white">
                    Terms of Use
                  </Link>
                </li>
              </ul>
            </div>

            {/* SOCIAL + JOIN */}
            <div>
              <h3 className="text-xs font-bold text-blue-300 uppercase mb-5">
                Connect
              </h3>

              <div className="flex gap-4 mb-6">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-blue-500/20"
                  >
                    <Icon className="w-4 h-4 text-gray-300" />
                  </Link>
                ))}
              </div>

              <p className="text-gray-400 text-sm mb-3">
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
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500"
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg px-4 text-sm bg-blue-600"
                  >
                    {loading ? "Joining..." : "Join"}
                  </Button>
                </div>

                {message && (
                  <p
                    className={`text-xs ${
                      message.includes("Successfully")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} OFAS. All rights reserved.
          </div>
        </Container>
      </footer>

      <EventsModal open={openEvents} onClose={() => setOpenEvents(false)} />
    </>
  );
}