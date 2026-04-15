"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email." }),
    event: z.string().min(1, { message: "Please select an event." }),
    tickets: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Must be a valid number > 0",
    }),
});

const events = [
    { id: "gala-2026", name: "Annual Fundraising Gala (Feb 12)" },
    { id: "workshop-mar", name: "Spring Asthma Workshop (Mar 15)" },
    { id: "walk-apr", name: "Breath of Life Walk (Apr 22)" },
];

export function EventRegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            event: "",
            tickets: "1",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(values);
        setIsSuccess(true);
        setIsSubmitting(false);
        form.reset();
    }

    if (isSuccess) {
        return (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">Registration Confirmed!</h3>
                <p>We look forward to seeing you there.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4 bg-white">Register for another event</Button>
            </div>
        )
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-slate-700 p-8 rounded-3xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Full Name</label>
                    <input {...form.register("fullName")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0" placeholder="Chiemeka Doe" />
                    {form.formState.errors.fullName && <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Email</label>
                    <input type="email" {...form.register("email")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0" placeholder="chiemeka@example.com" />
                    {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-white">Select Event</label>
                <select {...form.register("event")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0 [&>option]:text-white">
                    <option value="" className="text-gray-400">-- Choose an Event --</option>
                    {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
                {form.formState.errors.event && <p className="text-sm text-red-500">{form.formState.errors.event.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-white">Number of Tickets</label>
                <input type="number" min="1" {...form.register("tickets")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0" />
                {form.formState.errors.tickets && <p className="text-sm text-red-500">{form.formState.errors.tickets.message}</p>}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-bold text-lg bg-blue-800 hover:bg-blue-700 text-white border-0" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register Now"}
            </Button>
        </form>
    );
}
