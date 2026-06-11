"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
    title: z.string().min(3, { message: "Title is required." }),
    image: z.string().url({ message: "Please enter a valid image URL." }),
    content: z.string().min(10, { message: "Content must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export function EventRegistrationForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            image: "",
            content: "",
        },
    });

    async function onSubmit(values: FormData) {
        setIsSubmitting(true);
        setIsSuccess(false);
        setErrorMsg("");

        try {
            const payload = {
                title: values.title,
                image: values.image,
                content: values.content,
            };

            const res = await fetch(`${API_URL}/api/events/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || "Event creation failed");
            }

            setIsSuccess(true);
            form.reset();
        } catch (error: any) {
            setErrorMsg(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">
                    Event Created Successfully!
                </h3>
                <p>Your event has been published.</p>

                <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    className="mt-4 bg-white"
                >
                    Create Another Event
                </Button>
            </div>
        );
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-slate-700 p-8 rounded-3xl shadow-xl"
        >
            {/* TITLE */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-white">
                    Event Title
                </label>

                <input
                    {...form.register("title")}
                    placeholder="Enter event title"
                    className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm text-white border-0 focus:ring-2 focus:ring-blue-500"
                />

                {form.formState.errors.title && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.title.message}
                    </p>
                )}
            </div>

            {/* IMAGE */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-white">
                    Event Image URL
                </label>

                <input
                    {...form.register("image")}
                    placeholder="https://example.com/image.jpg"
                    className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm text-white border-0 focus:ring-2 focus:ring-blue-500"
                />

                {form.formState.errors.image && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.image.message}
                    </p>
                )}
            </div>

            {/* CONTENT */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-white">
                    Event Content
                </label>

                <textarea
                    rows={6}
                    {...form.register("content")}
                    placeholder="Write event details..."
                    className="w-full rounded-xl bg-slate-800 px-4 py-3 text-sm text-white border-0 focus:ring-2 focus:ring-blue-500"
                />

                {form.formState.errors.content && (
                    <p className="text-sm text-red-500">
                        {form.formState.errors.content.message}
                    </p>
                )}
            </div>

            {/* ERROR */}
            {errorMsg && (
                <p className="text-sm text-red-400 font-medium">
                    {errorMsg}
                </p>
            )}

            {/* SUBMIT */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl font-bold text-lg bg-blue-800 hover:bg-blue-700 text-white"
            >
                {isSubmitting ? "Creating Event..." : "Create Event"}
            </Button>
        </form>
    );
}