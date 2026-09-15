"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_OFAS_API_URL ||
  "https://backend-ofascommunity.onrender.com";

interface EventItem {
  id: number;
  title: string;
  image: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface EventsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: EventItem[];
}

export default function EventsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  const fetchEvents = async (url?: string) => {
    setLoading(true);
    setError("");

    try {
      const endpoint = url || `${API_URL}/api/events/`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      const data: EventsResponse = await response.json().catch(() => ({
        count: 0,
        next: null,
        previous: null,
        results: [],
      }));

      if (!response.ok) {
        throw new Error(
          (data as any)?.message ||
            (data as any)?.detail ||
            `Failed to load events. Server returned ${response.status}.`
        );
      }

      setEvents(Array.isArray(data.results) ? data.results : []);
      setCount(typeof data.count === "number" ? data.count : 0);
      setNextUrl(data.next || null);
      setPreviousUrl(data.previous || null);
    } catch (err) {
      console.error("Events fetch error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load events. Please try again."
      );

      setEvents([]);
      setCount(0);
      setNextUrl(null);
      setPreviousUrl(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchEvents();
    }
  }, [open]);

  const formatDate = (date: string) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate.toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getImageUrl = (image: string) => {
    if (!image) return "";

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    if (image.startsWith("/")) {
      return `${API_URL}${image}`;
    }

    return `${API_URL}/${image}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-900"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 dark:border-gray-800">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <CalendarDays size={18} />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Updates & Events
                  </h2>
                </div>

                {count > 0 && (
                  <p className="mt-1 ml-11 text-xs text-gray-500 dark:text-gray-400">
                    {count} {count === 1 ? "update" : "updates"} available
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                aria-label="Close events"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* LOADING */}
              {loading && (
                <div className="space-y-5">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800"
                    >
                      <div className="h-40 bg-gray-200 dark:bg-gray-800" />

                      <div className="space-y-3 p-5">
                        <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />

                        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />

                        <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-800" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ERROR */}
              {!loading && error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center dark:border-red-900/30 dark:bg-red-950/20">
                  <p className="text-sm font-medium text-red-600 dark:text-red-400">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={() => fetchEvents()}
                    className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* EMPTY */}
              {!loading && !error && events.length === 0 && (
                <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
                    <CalendarDays
                      size={28}
                      className="text-blue-500"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
                    No Updates Yet
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    There are currently no events or updates available.
                    Please check back soon for new activities.
                  </p>
                </div>
              )}

              {/* EVENTS */}
              {!loading && !error && events.length > 0 && (
                <div className="space-y-5">
                  {events.map((event) => {
                    const imageUrl = getImageUrl(event.image);

                    return (
                      <article
                        key={event.id}
                        className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                      >
                        {/* IMAGE */}
                        {imageUrl && (
                          <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                              src={imageUrl}
                              alt={event.title}
                              className="h-full w-full object-cover transition duration-500 hover:scale-105"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        )}

                        {/* DETAILS */}
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400">
                            <CalendarDays size={14} />

                            <span>
                              {formatDate(event.created_at)}
                            </span>
                          </div>

                          <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                            {event.title}
                          </h3>

                          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                            {event.content}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {!loading && !error && events.length > 0 && (
              <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 dark:border-gray-800">
                <button
                  type="button"
                  disabled={!previousUrl || loading}
                  onClick={() => {
                    if (previousUrl) {
                      fetchEvents(previousUrl);
                    }
                  }}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <span className="text-xs text-gray-400">
                  {count} total
                </span>

                <button
                  type="button"
                  disabled={!nextUrl || loading}
                  onClick={() => {
                    if (nextUrl) {
                      fetchEvents(nextUrl);
                    }
                  }}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}