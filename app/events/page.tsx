"use client";

import { Container } from "@/components/ui/container";
import { EventRegistrationForm } from "@/components/forms/event-registration-form";
import { motion } from "framer-motion";

export default function EventsPage() {
    const events = [
        {
            title: "Asthma Awareness Workshop",
            date: "June 12, 2026",
            location: "University of Ibadan",
            status: "Upcoming",
            desc: "Learn how to identify triggers and respond to asthma emergencies.",
        },
        {
            title: "Community Outreach - Ibadan",
            date: "May 28, 2026",
            location: "Ibadan Central",
            status: "Upcoming",
            desc: "Free inhaler distribution and public awareness campaign.",
        },
        {
            title: "Campus Leaders Summit",
            date: "April 10, 2026",
            location: "Lagos",
            status: "Past",
            desc: "Training campus representatives and building leadership capacity.",
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-950 py-16 sm:py-24">
            <Container>
                {/* HEADER */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Events & Workshops
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
                        Join us to learn, connect, and support the cause.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* LEFT: EVENTS LIST */}
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Upcoming Schedule
                        </h2>

                        {events.map((event, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition"
                            >
                                {/* STATUS */}
                                <span
                                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                        event.status === "Upcoming"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-gray-200 text-gray-600"
                                    }`}
                                >
                                    {event.status}
                                </span>

                                <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
                                    {event.title}
                                </h3>

                                <p className="text-xs text-blue-600 mt-1">
                                    {event.date} • {event.location}
                                </p>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    {event.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* RIGHT: FORM */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_50px_rgba(8,8,178,0.1)] border border-gray-100 dark:border-gray-800 p-2">
                            <div className="p-8 sm:p-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                    Register for an Event
                                </h2>

                                <EventRegistrationForm />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}