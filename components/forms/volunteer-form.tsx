
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_OFAS_API_URL ||
  "https://backend-ofascommunity.onrender.com";

/**
 * Normalize Nigerian phone numbers.
 *
 * Accepted examples:
 * 08012345678
 * 080 123 45678
 * 080-123-45678
 * +2348012345678
 * 2348012345678
 *
 * Output:
 * +2348012345678
 */
function normalizePhoneNumber(phone: string): string {
  let value = phone.trim();

  // Remove spaces, hyphens, brackets and other formatting.
  value = value.replace(/[\s\-().]/g, "");

  // Already in correct international format.
  if (value.startsWith("+234")) {
    return `+234${value.slice(4).replace(/\D/g, "")}`;
  }

  // Starts with 234 without +.
  if (value.startsWith("234")) {
    return `+234${value.slice(3).replace(/\D/g, "")}`;
  }

  // Nigerian local format: 080..., 081..., 090..., etc.
  if (value.startsWith("0")) {
    return `+234${value.slice(1).replace(/\D/g, "")}`;
  }

  // Fallback: remove non-numeric characters.
  return value.replace(/\D/g, "");
}

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),

  phone_number: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number."),

  interest: z
    .string()
    .trim()
    .min(1, "Please select an interest area."),

  message: z.string().optional(),

  agree: z
    .boolean()
    .refine((value) => value === true, {
      message: "You must agree to continue.",
    }),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  onClose?: () => void;
};

export function VolunteerForm({ onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      interest: "",
      message: "",
      agree: false,
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setErrorMsg("");
    setIsSuccess(false);

    try {
      /*
       * Normalize the phone number before sending it.
       */
      const normalizedPhone = normalizePhoneNumber(
        values.phone_number
      );

      /*
       * Validate the normalized Nigerian number.
       *
       * Nigerian mobile numbers should become:
       * +234 + 10 digits
       *
       * Example:
       * 08012345678
       * -> +2348012345678
       */
      if (!/^\+234\d{10}$/.test(normalizedPhone)) {
        throw new Error(
          "Please enter a valid Nigerian phone number, e.g. 08012345678 or +2348012345678."
        );
      }

      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        interest: values.interest.trim(),
        message: values.message?.trim() || "",
        phone_number: normalizedPhone,
        agree: values.agree,
      };

      console.log("Volunteer payload:", payload);

      const response = await fetch(
        `${API_URL}/api/volunteers/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        console.error("Volunteer API error:", {
          status: response.status,
          response: data,
        });

        let backendMessage = "";

        if (typeof data === "string") {
          backendMessage = data;
        } else if (data) {
          if (data.detail) {
            backendMessage = String(data.detail);
          } else if (data.message) {
            backendMessage = String(data.message);
          } else if (data.error) {
            backendMessage = String(data.error);
          } else {
            const errors: string[] = [];

            Object.entries(data).forEach(
              ([field, value]) => {
                if (Array.isArray(value)) {
                  errors.push(
                    `${field}: ${value.join(", ")}`
                  );
                } else if (
                  typeof value === "string"
                ) {
                  errors.push(
                    `${field}: ${value}`
                  );
                } else if (value) {
                  errors.push(
                    `${field}: ${JSON.stringify(value)}`
                  );
                }
              }
            );

            backendMessage = errors.join(" | ");
          }
        }

        throw new Error(
          backendMessage ||
            `Submission failed. Server returned ${response.status}.`
        );
      }

      console.log(
        "Volunteer application successful:",
        data
      );

      setIsSuccess(true);
      setErrorMsg("");
      form.reset();
    } catch (error) {
      console.error(
        "Volunteer application error:",
        error
      );

      setErrorMsg(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const CloseButton = () =>
    onClose ? (
      <button
        type="button"
        onClick={onClose}
        className="
          fixed top-5 right-5 z-[99999]
          w-11 h-11
          flex items-center justify-center
          rounded-full
          bg-white/95 dark:bg-gray-900/95
          backdrop-blur-xl
          border border-gray-200 dark:border-gray-700
          shadow-2xl
          text-gray-700 dark:text-gray-200
          hover:scale-110
          transition
        "
        aria-label="Close volunteer form"
      >
        <X size={20} />
      </button>
    ) : null;

  const error = (msg?: string) =>
    msg ? (
      <p className="mt-1 text-xs text-red-500">
        {msg}
      </p>
    ) : null;

  if (isSuccess) {
    return (
      <div className="relative w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-8 text-center shadow-xl border">
        <CloseButton />

        <div className="mb-3 text-4xl">
          🎉
        </div>

        <h3 className="text-xl font-semibold text-gray-900">
          Application received!
        </h3>

        <p className="mt-2 text-gray-600">
          Thank you for your interest in volunteering
          with OFAS. We&apos;ll review your details and
          get back to you soon.
        </p>

        <Button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setErrorMsg("");
          }}
          variant="outline"
          className="mt-6 rounded-full text-black"
        >
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-h-[90vh] overflow-y-auto">
      <CloseButton />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="
          w-full
          bg-slate-900
          text-white
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
            Fill In Your Details To Become Our Volunteer.
          </p>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* NAME */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              disabled={isSubmitting}
              {...form.register("name")}
              className="
                w-full h-12 px-4 rounded-xl
                bg-slate-800
                outline-none
                focus:ring-2 focus:ring-blue-500
                disabled:opacity-60
              "
            />

            {error(
              form.formState.errors.name?.message
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              disabled={isSubmitting}
              {...form.register("email")}
              className="
                w-full h-12 px-4 rounded-xl
                bg-slate-800
                outline-none
                focus:ring-2 focus:ring-blue-500
                disabled:opacity-60
              "
            />

            {error(
              form.formState.errors.email?.message
            )}
          </div>

          {/* PHONE */}
          <div className="sm:col-span-2">
            <input
              type="tel"
              inputMode="tel"
              placeholder="Phone Number e.g. 08012345678"
              autoComplete="tel"
              disabled={isSubmitting}
              {...form.register("phone_number")}
              className="
                w-full h-12 px-4 rounded-xl
                bg-slate-800
                outline-none
                focus:ring-2 focus:ring-blue-500
                disabled:opacity-60
              "
            />

            <p className="mt-1 text-xs text-gray-500">
              You can enter 080..., 234..., or +234...
            </p>

            {error(
              form.formState.errors.phone_number?.message
            )}
          </div>

          {/* INTEREST */}
          <div className="sm:col-span-2">
            <select
              disabled={isSubmitting}
              {...form.register("interest")}
              className="
                w-full h-12 px-4 rounded-xl
                bg-slate-800
                outline-none
                focus:ring-2 focus:ring-blue-500
                disabled:opacity-60
              "
            >
              <option value="">
                Select interest area
              </option>

              <option value="general">
                General Support
              </option>

              <option value="events">
                Event Staff
              </option>

              <option value="campus">
                Campus Representative
              </option>

              <option value="education">
                Education / Healthcare
              </option>
            </select>

            {error(
              form.formState.errors.interest?.message
            )}
          </div>

          {/* MESSAGE */}
          <div className="sm:col-span-2">
            <textarea
              placeholder="Why do you want to volunteer? (optional)"
              rows={4}
              disabled={isSubmitting}
              {...form.register("message")}
              className="
                w-full p-4 rounded-xl
                bg-slate-800
                outline-none
                focus:ring-2 focus:ring-blue-500
                disabled:opacity-60
                resize-none
              "
            />
          </div>
        </div>

        {/* CONSENT */}
        <div>
          <label className="flex items-start gap-3 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              disabled={isSubmitting}
              {...form.register("agree")}
              className="mt-1 h-4 w-4 accent-blue-600"
            />

            <span>
              I agree to be contacted about volunteer
              opportunities.
            </span>
          </label>

          {error(
            form.formState.errors.agree?.message
          )}
        </div>

        {/* BACKEND ERROR */}
        {errorMsg && (
          <div className="
            rounded-xl
            border
            border-red-500/20
            bg-red-500/10
            px-4 py-3
          ">
            <p className="text-sm text-red-400 font-medium">
              {errorMsg}
            </p>
          </div>
        )}

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="
            w-full h-12
            rounded-xl
            bg-blue-600
            hover:bg-blue-500
            transition
            font-semibold
            disabled:opacity-60
            disabled:cursor-not-allowed
          "
        >
          {isSubmitting
            ? "Submitting..."
            : "Apply Now"}
        </Button>
      </form>
    </div>
  );
}
 
