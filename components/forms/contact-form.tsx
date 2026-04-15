"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    subject: z.string().min(5, { message: "Subject is required." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
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
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. We will get back to you shortly.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4 bg-white">Send another message</Button>
            </div>
        )
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-slate-700 p-8 rounded-3xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Name</label>
                    <input {...form.register("name")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0" placeholder="Your Name" />
                    {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Email</label>
                    <input type="email" {...form.register("email")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0" placeholder="email@example.com" />
                    {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-white">Subject</label>
                <input {...form.register("subject")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0" placeholder="Inquiry about..." />
                {form.formState.errors.subject && <p className="text-sm text-red-500">{form.formState.errors.subject.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-white">Message</label>
                <textarea {...form.register("message")} className="flex min-h-[140px] w-full rounded-xl bg-slate-800 px-4 py-3 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0 resize-y" placeholder="How can we help?" />
                {form.formState.errors.message && <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-bold text-lg bg-blue-800 hover:bg-blue-700 text-white border-0" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
        </form>
    );
}
