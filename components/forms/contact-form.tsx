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
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    setIsSuccess(false);
    setErrorMsg("");

    try {
      console.log("=================================");
      console.log("API URL:", API_URL);
      console.log("Submitting data:", values);
      console.log(
        "Endpoint:",
        `${API_URL}/api/contact-us/`
      );
      console.log("=================================");

      if (!API_URL) {
        throw new Error(
          "NEXT_PUBLIC_OFAS_API_URL is not defined."
        );
      }

      const res = await fetch(`${API_URL}/api/contact-us/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response Status:", res.status);

      const responseText = await res.text();

      console.log("Response Body:", responseText);

      let responseData = null;

      try {
        responseData = JSON.parse(responseText);
      } catch {
        console.log("Response is not JSON");
      }

      if (!res.ok) {
        throw new Error(
          responseData?.message ||
            responseData?.detail ||
            responseText ||
            "Failed to send message"
        );
      }

      console.log("Success Response:", responseData);

      setIsSuccess(true);
      form.reset();
    } catch (error: any) {
      console.error("Contact Form Error:", error);
      setErrorMsg(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center">
        <h3 className="text-xl font-bold mb-2">
          Message Sent!
        </h3>

        <p>
          Thank you for reaching out. We will get back to
          you shortly.
        </p>

        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-4 bg-white"
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 bg-slate-700 p-8 rounded-3xl shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">
            Name
          </label>

          <input
            {...form.register("name")}
            className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm text-white border-0 focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
          />

          {form.formState.errors.name && (
            <p className="text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-white">
            Email
          </label>

          <input
            type="email"
            {...form.register("email")}
            className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm text-white border-0 focus:ring-2 focus:ring-blue-500"
            placeholder="email@example.com"
          />

          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-white">
          Subject
        </label>

        <input
          {...form.register("subject")}
          className="flex h-12 w-full rounded-xl bg-slate-800 px-4 py-2 text-sm text-white border-0 focus:ring-2 focus:ring-blue-500"
          placeholder="Inquiry about..."
        />

        {form.formState.errors.subject && (
          <p className="text-sm text-red-500">
            {form.formState.errors.subject.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-white">
          Message
        </label>

        <textarea
          {...form.register("message")}
          className="flex min-h-[140px] w-full rounded-xl bg-slate-800 px-4 py-3 text-sm text-white border-0 resize-y focus:ring-2 focus:ring-blue-500"
          placeholder="How can we help?"
        />

        {form.formState.errors.message && (
          <p className="text-sm text-red-500">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      {errorMsg && (
        <p className="text-sm text-red-400 font-medium">
          {errorMsg}
        </p>
      )}

      <Button
        type="submit"
        className="w-full h-12 rounded-xl font-bold text-lg bg-blue-800 hover:bg-blue-700 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}