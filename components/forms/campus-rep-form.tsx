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

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters."),

  email: z
    .string()
    .trim()
    .email("Enter a valid email."),

  university: z
    .string()
    .trim()
    .min(2, "University is required."),

  grad_year: z
    .string()
    .trim()
    .min(1, "Graduation year is required.")
    .regex(
      /^\d{4}$/,
      "Enter a valid 4-digit graduation year."
    ),

  message: z
    .string()
    .trim()
    .min(10, "Tell us more (min 10 chars)."),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  onClose?: () => void;
};

export function CampusRepForm({ onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      university: "",
      grad_year: "",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setErrorMsg("");
    setIsSuccess(false);

    try {
      /*
       * IMPORTANT:
       * The backend expects:
       *
       * {
       *   "name": "string",
       *   "email": "user@example.com",
       *   "university": "string",
       *   "grad_year": 2147483647,
       *   "message": "string"
       * }
       *
       * Therefore grad_year MUST be converted
       * from the form string into a number.
       */

      const graduationYear = Number(values.grad_year);

      if (
        !Number.isInteger(graduationYear) ||
        graduationYear < 1900 ||
        graduationYear > 2100
      ) {
        throw new Error(
          "Please enter a valid graduation year."
        );
      }

      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        university: values.university.trim(),
        grad_year: graduationYear,
        message: values.message.trim(),
      };

      console.log("Campus chapter payload:", payload);

      const response = await fetch(
        `${API_URL}/api/campus-chapters/`,
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
        console.error("Campus chapter API error:", {
          status: response.status,
          response: data,
        });

        let backendMessage = "";

        if (typeof data === "string") {
          backendMessage = data;
        } else if (data) {
          /*
           * Handle common Django REST Framework
           * validation responses.
           */

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
        "Campus chapter application successful:",
        data
      );

      setIsSuccess(true);
      setErrorMsg("");
      form.reset();
    } catch (error) {
      console.error(
        "Campus chapter submission error:",
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

  const error = (msg?: string) =>
    msg ? (
      <p className="mt-1 text-xs text-red-500 dark:text-red-400">
        {msg}
      </p>
    ) : null;

  if (isSuccess) {
    return (
      <div
        className="
          relative
          bg-white
          dark:bg-slate-900
          rounded-2xl
          p-8
          text-center
          shadow-xl
          dark:shadow-2xl
          border
          border-slate-200
          dark:border-slate-700
          text-slate-900
          dark:text-white
        "
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="
              absolute top-4 right-4
              p-2
              rounded-full
              text-slate-500
              dark:text-gray-400
              hover:bg-slate-100
              dark:hover:bg-slate-800
              hover:text-slate-900
              dark:hover:text-white
              transition
            "
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="text-4xl mb-3">
          🎉
        </div>

        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
          Application Received!
        </h3>

        <p className="text-slate-600 dark:text-gray-400 mt-2">
          Thank you for your interest in starting an
          OFAS campus chapter. We&apos;ll get back to
          you shortly.
        </p>

        <Button
          type="button"
          onClick={() => {
            setIsSuccess(false);
            setErrorMsg("");
          }}
          className="
            mt-6
            border-slate-300
            dark:border-slate-600
            bg-white
            dark:bg-slate-800
            text-slate-900
            dark:text-white
            hover:bg-slate-100
            dark:hover:bg-slate-700
          "
          variant="outline"
        >
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="
        bg-gradient-to-br
        from-white
        via-slate-50
        to-sky-50
        dark:from-slate-900
        dark:via-slate-900
        dark:to-slate-950
        text-slate-900
        dark:text-white
        p-6
        sm:p-8
        rounded-3xl
        space-y-6
        shadow-2xl
        border
        border-slate-200/80
        dark:border-slate-800
        relative
      "
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="
            absolute top-4 right-4
            p-2
            rounded-full
            text-slate-500
            dark:text-gray-400
            hover:bg-slate-100
            dark:hover:bg-white/10
            hover:text-slate-900
            dark:hover:text-white
            transition
          "
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* HEADER */}
      <div className="space-y-1 pr-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Start a Campus Chapter
        </h2>

        <p className="text-sm text-slate-500 dark:text-gray-400">
          Apply to represent OFAS on your campus.
        </p>
      </div>

      {/* FORM FIELDS */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* NAME */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            disabled={isSubmitting}
            {...form.register("name")}
            className="
              w-full
              h-12
              px-4
              rounded-xl
              bg-white
              dark:bg-slate-800
              text-slate-900
              dark:text-white
              placeholder:text-slate-400
              dark:placeholder:text-gray-500
              border
              border-slate-200
              dark:border-slate-700
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              disabled:opacity-60
              transition
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
            placeholder="Email"
            autoComplete="email"
            disabled={isSubmitting}
            {...form.register("email")}
            className="
              w-full
              h-12
              px-4
              rounded-xl
              bg-white
              dark:bg-slate-800
              text-slate-900
              dark:text-white
              placeholder:text-slate-400
              dark:placeholder:text-gray-500
              border
              border-slate-200
              dark:border-slate-700
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              disabled:opacity-60
              transition
            "
          />

          {error(
            form.formState.errors.email?.message
          )}
        </div>

        {/* UNIVERSITY */}
        <div>
          <input
            type="text"
            placeholder="University"
            disabled={isSubmitting}
            {...form.register("university")}
            className="
              w-full
              h-12
              px-4
              rounded-xl
              bg-white
              dark:bg-slate-800
              text-slate-900
              dark:text-white
              placeholder:text-slate-400
              dark:placeholder:text-gray-500
              border
              border-slate-200
              dark:border-slate-700
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              disabled:opacity-60
              transition
            "
          />

          {error(
            form.formState.errors.university?.message
          )}
        </div>

        {/* GRADUATION YEAR */}
        <div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="Graduation Year"
            disabled={isSubmitting}
            {...form.register("grad_year")}
            className="
              w-full
              h-12
              px-4
              rounded-xl
              bg-white
              dark:bg-slate-800
              text-slate-900
              dark:text-white
              placeholder:text-slate-400
              dark:placeholder:text-gray-500
              border
              border-slate-200
              dark:border-slate-700
              outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              disabled:opacity-60
              transition
            "
          />

          {error(
            form.formState.errors.grad_year?.message
          )}
        </div>
      </div>

      {/* MESSAGE */}
      <div>
        <textarea
          placeholder="Why do you want to start a chapter?"
          rows={5}
          disabled={isSubmitting}
          {...form.register("message")}
          className="
            w-full
            p-4
            rounded-xl
            bg-white
            dark:bg-slate-800
            text-slate-900
            dark:text-white
            placeholder:text-slate-400
            dark:placeholder:text-gray-500
            border
            border-slate-200
            dark:border-slate-700
            outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-blue-500
            disabled:opacity-60
            resize-none
            transition
          "
        />

        {error(
          form.formState.errors.message?.message
        )}
      </div>

      {/* BACKEND ERROR */}
      {errorMsg && (
        <div
          className="
            rounded-xl
            border
            border-red-200
            dark:border-red-500/20
            bg-red-50
            dark:bg-red-500/10
            px-4
            py-3
          "
        >
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            {errorMsg}
          </p>
        </div>
      )}

      {/* SUBMIT */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          h-12
          bg-blue-600
          hover:bg-blue-500
          text-white
          transition
          disabled:opacity-60
          disabled:cursor-not-allowed
        "
      >
        {isSubmitting
          ? "Submitting..."
          : "Apply Now"}
      </Button>
    </form>
  );
}