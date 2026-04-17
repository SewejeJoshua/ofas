"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  interest: z.string().min(1, "Please select an interest area."),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to continue.",
  }),
});

type Props = {
  onClose?: () => void;
};

export function VolunteerForm({ onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
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

    await new Promise((r) => setTimeout(r, 1200));

    console.log(values);

    setIsSubmitting(false);
    setIsSuccess(true);
    form.reset();
  }

  const CloseButton = () =>
    onClose ? (
      <button
        type="button"
        onClick={onClose}
        className="
          fixed top-6 right-6 z-[9999]
          p-3 rounded-full
          bg-white/90 dark:bg-gray-900/90
          backdrop-blur-md
          border border-gray-200 dark:border-gray-700
          shadow-lg
          hover:scale-105 transition
        "
      >
        <X size={20} className="text-gray-700 dark:text-gray-200" />
      </button>
    ) : null;

  if (isSuccess) {
    return (
      <div className="relative w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-8 text-center shadow-xl border">
        <CloseButton />

        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-xl font-semibold text-gray-900">
          Application received!
        </h3>
        <p className="text-gray-600 mt-2">
          We’ll review your details and get back to you soon.
        </p>

        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-6 rounded-full"
        >
          Submit another
        </Button>
      </div>
    );
  }

  const error = (msg?: string) =>
    msg ? <p className="text-xs text-red-500 mt-1">{msg}</p> : null;

  return (
    <div className="relative w-full max-h-[90vh] overflow-y-auto">
      <CloseButton />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="
          w-full
          bg-slate-900 text-white
          p-6 sm:p-8
          rounded-3xl
          shadow-2xl
          space-y-6
        "
      >
        {/* HEADER */}
        <div className="space-y-1 pr-8">
          <h2 className="text-2xl font-semibold">
            Volunteer Application
          </h2>
          <p className="text-sm text-gray-400">
            Fill in your details to become a campus rep.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <input
              placeholder="Full Name"
              {...form.register("fullName")}
              className="w-full h-12 px-4 rounded-xl bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error(form.formState.errors.fullName?.message)}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email Address"
              {...form.register("email")}
              className="w-full h-12 px-4 rounded-xl bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error(form.formState.errors.email?.message)}
          </div>

          <div className="sm:col-span-2">
            <input
              type="tel"
              placeholder="Phone Number"
              {...form.register("phone")}
              className="w-full h-12 px-4 rounded-xl bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error(form.formState.errors.phone?.message)}
          </div>

          <div className="sm:col-span-2">
            <select
              {...form.register("interest")}
              className="w-full h-12 px-4 rounded-xl bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select interest area</option>
              <option value="general">General Support</option>
              <option value="events">Event Staff</option>
              <option value="campus">Campus Representative</option>
              <option value="education">Education / Healthcare</option>
            </select>
            {error(form.formState.errors.interest?.message)}
          </div>

          <div className="sm:col-span-2">
            <textarea
              placeholder="Why do you want to volunteer? (optional)"
              rows={4}
              {...form.register("message")}
              className="w-full p-4 rounded-xl bg-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* CONSENT */}
        <label className="flex items-start gap-3 text-sm text-gray-300">
          <input
            type="checkbox"
            {...form.register("consent")}
            className="mt-1"
          />
          <span>
            I agree to be contacted about volunteer opportunities.
          </span>
        </label>

        {error(form.formState.errors.consent?.message)}

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold"
        >
          {isSubmitting ? "Submitting..." : "Apply Now"}
        </Button>
      </form>
    </div>
  );
}