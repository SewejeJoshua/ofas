"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="relative overflow-hidden text-white">

            {/* 🌌 CINEMATIC BACKGROUND */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-black" />

            {/* ✨ SOFT BLUE GLOW ORBS */}
            <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[140px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-sky-400/10 blur-[140px]" />

            <Container className="relative py-20 md:py-28">

                <div className="xl:grid xl:grid-cols-3 xl:gap-12">

                    {/* BRAND */}
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="flex items-center gap-3 group">

                            {/* Logo glow wrapper */}
                            <div className="p-[2px] rounded-full bg-gradient-to-tr from-blue-500/40 to-transparent group-hover:from-blue-400/60 transition">
                                <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden bg-black">
                                    <Image
                                        src="/logo.jpg"
                                        alt="OFAS Logo"
                                        fill
                                        className="object-cover scale-[1.05]"
                                        priority
                                    />
                                </div>
                            </div>

                            <span className="font-bold text-2xl tracking-tight text-white">
                                OFAS
                            </span>
                        </Link>

                        <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                            One Family Asthma Support Group dedicated to improving lives through education,
                            advocacy, and community support.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div className="mt-12 grid grid-cols-2 gap-10 xl:mt-0 xl:col-span-2">

                        {/* QUICK LINKS */}
                        <div>
                            <h3 className="text-xs font-bold text-blue-300 tracking-[0.2em] uppercase mb-6">
                                Quick Links
                            </h3>

                            <ul className="space-y-4">
                                {[
                                    ["About Us", "/#about"],
                                    ["Programs", "/#programs"],
                                    ["Events", "/#events"],
                                    ["Contact", "/#contact"],
                                ].map(([label, href]) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* LEGAL */}
                        <div>
                            <h3 className="text-xs font-bold text-blue-300 tracking-[0.2em] uppercase mb-6">
                                Legal
                            </h3>

                            <ul className="space-y-4">
                                {[
                                    ["Privacy Policy", "/legal/privacy"],
                                    ["Terms of Use", "/legal/terms"],
                                ].map(([label, href]) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* NEWSLETTER */}
                    <div className="mt-12 xl:mt-0">

                        <h3 className="text-xs font-bold text-blue-300 tracking-[0.2em] uppercase mb-6">
                            Stay Updated
                        </h3>

                        <p className="text-gray-400 leading-relaxed">
                            Subscribe for updates, programs, and community news.
                        </p>

                        <form
                            className="mt-6 flex flex-col sm:flex-row gap-3"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500
                                focus:outline-none focus:ring-2 focus:ring-blue-400/60 focus:border-transparent
                                backdrop-blur-md transition"
                            />

                            <Button
                                type="submit"
                                className="rounded-xl px-6 h-12 font-semibold
                                bg-gradient-to-r from-blue-500 to-sky-500
                                hover:scale-[1.03] hover:shadow-lg
                                transition-all duration-300"
                            >
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} OFAS. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm text-gray-500">
                        <span className="hover:text-white transition">Privacy</span>
                        <span className="hover:text-white transition">Terms</span>
                        <span className="hover:text-white transition">Support</span>
                    </div>
                </div>
            </Container>
        </footer>
    );
}