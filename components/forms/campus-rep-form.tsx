"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    university: z.string().min(2, { message: "University name is required." }),
    year: z.string().min(1, { message: "Graduation year is required." }),
    motivation: z.string().min(10, { message: "Please tell us why you want to start a chapter." }),
});

export function CampusRepForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            university: "",
            year: "",
            motivation: "",
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
                <h3 className="text-xl font-bold mb-2">Application Received!</h3>
                <p>We'll review your application and get back to you soon.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4 bg-white">Submit another application</Button>
            </div>
        )
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-slate-700 p-8 rounded-3xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Full Name</label>
                    <input {...form.register("fullName")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0" placeholder="Willam Chiemeka" />
                    {form.formState.errors.fullName && <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Email Address</label>
                    <input type="email" {...form.register("email")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0" placeholder="chiemeka@edu.com" />
                    {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">University / College</label>
                    <input {...form.register("university")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0" placeholder="Rivers State University" />
                    {form.formState.errors.university && <p className="text-sm text-red-500">{form.formState.errors.university.message}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-white">Graduation Year</label>
                    <input {...form.register("year")} className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0" placeholder="2027" />
                    {form.formState.errors.year && <p className="text-sm text-red-500">{form.formState.errors.year.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-white">Why do you want to start a chapter?</label>
                <textarea {...form.register("motivation")} className="flex min-h-[140px] w-full rounded-xl bg-slate-800 px-4 py-3 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all text-white border-0 resize-y" placeholder="Tell us your motivation..." />
                {form.formState.errors.motivation && <p className="text-sm text-red-500">{form.formState.errors.motivation.message}</p>}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-bold text-lg bg-blue-800 hover:bg-blue-700 text-white border-0" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Apply to Start a Chapter"}
            </Button>
        </form>
    );
}
