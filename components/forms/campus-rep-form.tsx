"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react"; // 👈 added

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email."),
  university: z.string().min(2, "University is required."),
  year: z.string().min(1, "Graduation year required."),
  motivation: z.string().min(10, "Tell us more (min 10 chars)."),
});

export function CampusRepForm({ onClose }: { onClose?: () => void }) {
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
    await new Promise((r) => setTimeout(r, 1000));
    console.log(values);
    setIsSubmitting(false);
    setIsSuccess(true);
    form.reset();
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center shadow-xl relative">
        {/* ❌ CLOSE BUTTON */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-xl font-semibold">
          Application Received!
        </h3>
        <p className="text-gray-600 mt-2">
          We'll get back to you shortly.
        </p>

        <Button
          onClick={() => setIsSuccess(false)}
          className="mt-6"
          variant="outline"
        >
          Submit another
        </Button>
      </div>
    );
  }

  const error = (msg?: string) =>
    msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-2xl relative"
    >
      {/* ❌ CLOSE BUTTON */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <h2 className="text-2xl font-semibold">
        Start a Campus Chapter
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <input
            placeholder="Full Name"
            {...form.register("fullName")}
            className="w-full h-12 px-4 rounded-xl bg-slate-800"
          />
          {error(form.formState.errors.fullName?.message)}
        </div>

        <div>
          <input
            placeholder="Email"
            {...form.register("email")}
            className="w-full h-12 px-4 rounded-xl bg-slate-800"
          />
          {error(form.formState.errors.email?.message)}
        </div>

        <div>
          <input
            placeholder="University"
            {...form.register("university")}
            className="w-full h-12 px-4 rounded-xl bg-slate-800"
          />
          {error(form.formState.errors.university?.message)}
        </div>

        <div>
          <input
            placeholder="Graduation Year"
            {...form.register("year")}
            className="w-full h-12 px-4 rounded-xl bg-slate-800"
          />
          {error(form.formState.errors.year?.message)}
        </div>
      </div>

      <textarea
        placeholder="Why do you want to start a chapter?"
        rows={5}
        {...form.register("motivation")}
        className="w-full p-4 rounded-xl bg-slate-800"
      />
      {error(form.formState.errors.motivation?.message)}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-blue-600 hover:bg-blue-500"
      >
        {isSubmitting ? "Submitting..." : "Apply Now"}
      </Button>
    </form>
  );
}