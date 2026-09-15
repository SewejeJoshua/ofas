 
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Loader2,
  Mail,
  MessageSquare,
  RefreshCw,
  University,
  User,
  X,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_OFAS_API_URL ||
  "https://backend-ofascommunity.onrender.com";

interface CampusChapter {
  id: number;
  name: string;
  email: string;
  university: string;
  grad_year: number;
  message: string;
  created_at: string;
}

interface CampusResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CampusChapter[];
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  // IMPORTANT:
  // Your admin login stores the JWT here:
  // localStorage.setItem("access", data.access)

  return localStorage.getItem("access");
}

function getErrorMessage(data: any, fallback: string) {
  if (!data) return fallback;

  if (typeof data === "string") {
    return data;
  }

  if (data.detail) {
    return String(data.detail);
  }

  if (data.message) {
    return String(data.message);
  }

  if (data.error) {
    return String(data.error);
  }

  if (typeof data === "object") {
    const messages: string[] = [];

    Object.entries(data).forEach(([field, value]) => {
      if (Array.isArray(value)) {
        messages.push(`${field}: ${value.join(", ")}`);
      } else if (typeof value === "string") {
        messages.push(`${field}: ${value}`);
      }
    });

    if (messages.length > 0) {
      return messages.join(" | ");
    }
  }

  return fallback;
}

function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat("en-NG", {
      dateStyle: "medium",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

function formatTime(date: string) {
  try {
    return new Intl.DateTimeFormat("en-NG", {
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return "";
  }
}

export default function CampusChaptersPage() {
  const [chapters, setChapters] = useState<CampusChapter[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [selectedChapter, setSelectedChapter] =
    useState<CampusChapter | null>(null);

  const fetchChapters = useCallback(
    async (url?: string, isRefresh = false) => {
      try {
        setError("");

        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        /*
         * YOUR LOGIN STORES:
         *
         * localStorage.setItem("access", data.access);
         *
         * Therefore we MUST retrieve "access".
         */
        const accessToken = getAccessToken();

        if (!accessToken) {
          throw new Error(
            "Your admin login session could not be found. Please log in again."
          );
        }

        const endpoint =
          url || `${API_URL}/api/campus-chapters/`;

        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store",
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error(
              "Your admin session has expired or is invalid. Please log in again."
            );
          }

          throw new Error(
            getErrorMessage(
              data,
              `Unable to load campus chapters. Server returned ${response.status}.`
            )
          );
        }

        setChapters(Array.isArray(data?.results) ? data.results : []);
        setTotalCount(
          typeof data?.count === "number"
            ? data.count
            : Array.isArray(data?.results)
              ? data.results.length
              : 0
        );

        setNextUrl(data?.next || null);
        setPreviousUrl(data?.previous || null);
      } catch (err) {
        console.error("Campus chapters fetch error:", err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unable to load campus chapter applications.");
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  const handleRefresh = () => {
    fetchChapters(undefined, true);
  };

  const handleNext = () => {
    if (nextUrl) {
      fetchChapters(nextUrl);
    }
  };

  const handlePrevious = () => {
    if (previousUrl) {
      fetchChapters(previousUrl);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                <University size={24} />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Campus Chapters
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Manage campus representative applications.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading || refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={17}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Applications
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {loading ? "—" : totalCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <University size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Showing
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {loading ? "—" : chapters.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <User size={21} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Current Page
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {loading ? "—" : "Applications"}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <CalendarDays size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={21}
                className="mt-0.5 shrink-0 text-red-600"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-red-900">
                  Unable to load campus chapters
                </h3>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() => fetchChapters()}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  <RefreshCw size={15} />
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && !error && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="h-5 w-2/3 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-1/2 rounded bg-slate-100" />
                <div className="mt-6 h-4 w-full rounded bg-slate-100" />
                <div className="mt-2 h-4 w-4/5 rounded bg-slate-100" />
                <div className="mt-6 h-10 w-full rounded-xl bg-slate-200" />
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && chapters.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <University size={28} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              No campus applications yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Campus representative applications will appear here when they
              are submitted.
            </p>
          </div>
        )}

        {/* APPLICATIONS */}
        {!loading && !error && chapters.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
                >
                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 font-semibold text-sky-600">
                        {chapter.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate font-semibold text-slate-900">
                          {chapter.name}
                        </h2>

                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          Application #{chapter.id}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                      Application
                    </span>
                  </div>

                  {/* UNIVERSITY */}
                  <div className="mt-6 flex items-start gap-3">
                    <University
                      size={17}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <div className="min-w-0">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        University
                      </p>

                      <p className="mt-1 break-words text-sm font-medium text-slate-700">
                        {chapter.university}
                      </p>
                    </div>
                  </div>

                  {/* GRAD YEAR */}
                  <div className="mt-4 flex items-center gap-3">
                    <CalendarDays
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Graduation Year
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {chapter.grad_year}
                      </p>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="mt-4 flex items-start gap-3">
                    <Mail
                      size={17}
                      className="mt-0.5 shrink-0 text-slate-400"
                    />

                    <a
                      href={`mailto:${chapter.email}`}
                      className="min-w-0 break-all text-sm text-sky-600 transition hover:text-sky-700 hover:underline"
                    >
                      {chapter.email}
                    </a>
                  </div>

                  {/* DATE */}
                  <div className="mt-4 flex items-center gap-3">
                    <Clock
                      size={17}
                      className="shrink-0 text-slate-400"
                    />

                    <p className="text-sm text-slate-500">
                      {formatDate(chapter.created_at)}
                    </p>
                  </div>

                  {/* ACTION */}
                  <button
                    type="button"
                    onClick={() => setSelectedChapter(chapter)}
                    className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <Eye size={17} />
                    View Application
                  </button>
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {(previousUrl || nextUrl) && (
              <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={!previousUrl || loading}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={17} />
                  Previous
                </button>

                <span className="hidden text-sm text-slate-500 sm:block">
                  {chapters.length} application
                  {chapters.length === 1 ? "" : "s"} shown
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!nextUrl || loading}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* APPLICATION MODAL */}
      {selectedChapter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedChapter(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white px-6 py-5 sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                  Campus Chapter Application
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedChapter.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedChapter(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="space-y-6 p-6 sm:p-7">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <User size={15} />
                    Name
                  </div>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedChapter.name}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <University size={15} />
                    University
                  </div>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedChapter.university}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <CalendarDays size={15} />
                    Graduation Year
                  </div>

                  <p className="mt-2 font-semibold text-slate-900">
                    {selectedChapter.grad_year}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <Clock size={15} />
                    Submitted
                  </div>

                  <p className="mt-2 font-semibold text-slate-900">
                    {formatDate(selectedChapter.created_at)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {formatTime(selectedChapter.created_at)}
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-900">
                  Email Address
                </p>

                <a
                  href={`mailto:${selectedChapter.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-sky-600 transition hover:border-sky-200 hover:bg-sky-50"
                >
                  <Mail size={18} />
                  <span className="break-all">
                    {selectedChapter.email}
                  </span>
                </a>
              </div>

              {/* MESSAGE */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <MessageSquare
                    size={17}
                    className="text-slate-400"
                  />

                  <p className="text-sm font-semibold text-slate-900">
                    Message
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                    {selectedChapter.message || "No message provided."}
                  </p>
                </div>
              </div>

              {/* CLOSE */}
              <button
                type="button"
                onClick={() => setSelectedChapter(null)}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
