"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
    fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    interest: z.string().min(1, { message: "Please select an interest area." }),
    message: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms.",
    }),
});

export function VolunteerForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            interest: "",
            message: "",
            consent: false,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(values);
        setIsSuccess(true);
        setIsSubmitting(false);
        form.reset();
    }

    if (isSuccess) {
        return (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">Thank you for applying!</h3>
                <p>We have received your application and will be in touch shortly.</p>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4 bg-white">Submit another application</Button>
            </div>
        )
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-slate-700 p-8 rounded-3xl shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="fullName" className="text-sm font-semibold text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Full Name</label>
                    <input
                        {...form.register("fullName")}
                        className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all text-white border-0"
                        placeholder="Chiemeka Doe"
                    />
                    {form.formState.errors.fullName && <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address</label>
                    <input
                        type="email"
                        {...form.register("email")}
                        className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all text-white border-0"
                        placeholder="chiemeka@example.com"
                    />
                    {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone Number</label>
                <input
                    type="tel"
                    {...form.register("phone")}
                    className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all text-white border-0"
                    placeholder="(555) 123-4567"
                />
                {form.formState.errors.phone && <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="interest" className="text-sm font-semibold text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Interest Area</label>
                <select
                    {...form.register("interest")}
                    className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all text-white border-0 [&>option]:text-white"
                >
                    <option value="" className="text-gray-400">Select an interest...</option>
                    <option value="general">General Support</option>
                    <option value="events">Event Staff</option>
                    <option value="campus">Campus Representative</option>
                    <option value="education">Education / Healthcare Pro</option>
                </select>
                {form.formState.errors.interest && <p className="text-sm text-red-500">{form.formState.errors.interest.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Why do you want to volunteer? (Optional)</label>
                <textarea
                    {...form.register("message")}
                    className="flex min-h-[100px] w-full rounded-xl bg-slate-800 px-4 py-3 text-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all text-white border-0"
                    placeholder="Tell us a bit about yourself..."
                />
            </div>

            <div className="flex items-start space-x-3">
                <input
                    type="checkbox"
                    id="consent"
                    {...form.register("consent")}
                    className="mt-0.5 h-5 w-5 rounded bg-slate-800 border-0 text-blue-500 focus:ring-blue-500 transition-all cursor-pointer"
                />
                <label htmlFor="consent" className="text-sm font-semibold text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer pt-1">
                    I agree to be contacted by OFAS regarding volunteer opportunities.
                </label>
            </div>
            {form.formState.errors.consent && <p className="text-sm text-red-500">{form.formState.errors.consent.message}</p>}

            <Button type="submit" className="w-full h-12 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all font-bold text-lg bg-blue-800 hover:bg-blue-700 text-white border-0" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Sign Up to Volunteer"}
            </Button>
        </form>
    );
}
