 
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  Image as ImageIcon,
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Broadcast() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  const getToken = () => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem("access");
  };

  const handleAuthFail = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("adminUser");

    router.push("/admin/login");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getToken();

      if (!token) {
        handleAuthFail();
        return;
      }

      if (!API_URL) {
        throw new Error("API URL is not configured");
      }

      const payload = {
        title: title.trim(),
        image: image.trim(),
        content: content.trim(),
      };

      const res = await fetch(
        `${API_URL.replace(/\/$/, "")}/api/events/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => null);

      console.log("API response:", data);

      if (res.status === 401) {
        handleAuthFail();
        return;
      }

      if (!res.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : data?.detail ||
                data?.message ||
                JSON.stringify(data, null, 2)
        );
      }

      setSuccess("Broadcast created successfully.");

      setTitle("");
      setImage("");
      setContent("");
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong while publishing."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-7">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <div className="mb-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5">
                <Send className="h-3.5 w-3.5 text-sky-600" />

                <span className="text-xs font-medium text-sky-700">
                  Communications
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Create Broadcast
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Publish an announcement or update for OFAS users.
              </p>
            </div>

            {/* Small status */}
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm sm:flex">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50">
                <Eye className="h-3.5 w-3.5 text-sky-600" />
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <p className="text-xs font-medium text-slate-700">
                  Draft
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_420px]">

          {/* ===================================================
              FORM
          =================================================== */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                  <FileText className="h-5 w-5 text-sky-600" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Broadcast Information
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Fill in the details below to create your broadcast.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-5 sm:p-6"
            >
              {/* Title */}
              <div>
                <label
                  htmlFor="broadcast-title"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Broadcast Title
                </label>

                <input
                  id="broadcast-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a clear title"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                />
              </div>

              {/* Image */}
              <div>
                <label
                  htmlFor="broadcast-image"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Image URL
                </label>

                <div className="relative">
                  <ImageIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                  <input
                    id="broadcast-image"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                  />
                </div>

                <p className="mt-1.5 text-[11px] text-slate-400">
                  Add a publicly accessible image URL for the broadcast.
                </p>
              </div>

              {/* Content */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="broadcast-content"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Broadcast Content
                  </label>

                  <span className="text-[11px] text-slate-400">
                    {content.length} characters
                  </span>
                </div>

                <textarea
                  id="broadcast-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your announcement or update..."
                  required
                  rows={9}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-red-700">
                      Publishing failed
                    </p>

                    <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-red-600">
                      {error}
                    </p>
                  </div>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />

                  <div>
                    <p className="text-xs font-semibold text-emerald-700">
                      Broadcast published
                    </p>

                    <p className="mt-0.5 text-xs text-emerald-600">
                      {success}
                    </p>
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="border-t border-slate-100 pt-5">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-sky-600 py-6 text-sm font-medium text-white shadow-sm shadow-sky-100 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Publish Broadcast
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* ===================================================
              LIVE PREVIEW
          =================================================== */}
          <div className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
                  <Eye className="h-5 w-5 text-slate-500" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Live Preview
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-400">
                    See how your broadcast will look.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              {/* Preview Card */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  {image ? (
                    <img
                      src={image}
                      alt="Broadcast preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
                        <ImageIcon className="h-5 w-5 text-slate-300" />
                      </div>

                      <p className="mt-3 text-xs text-slate-400">
                        Broadcast image preview
                      </p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-medium text-sky-600">
                      OFAS UPDATE
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold leading-6 text-slate-900">
                    {title || "Your broadcast title"}
                  </h3>

                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-500">
                    {content ||
                      "Your broadcast content will appear here as you type."}
                  </p>
                </div>
              </div>

              {/* Preview note */}
              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="text-xs leading-5 text-slate-500">
                  This is a preview only. Your broadcast will be sent
                  using the information provided in the form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
