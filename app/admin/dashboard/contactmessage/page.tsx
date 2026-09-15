 
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  MessageSquare,
  User,
  Eye,
  ArrowLeft,
  Trash2,
  Loader2,
  AlertCircle,
  Calendar,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type ContactItem = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ContactItem[];
};

export default function AdminContactMessages() {
  const router = useRouter();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ContactItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_OFAS_API_URL?.replace(/\/$/, "");

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

  const fetchMessages = async (url?: string) => {
    const token = getToken();

    if (!token) {
      handleAuthFail();
      return;
    }

    if (!API_URL && !url) {
      setError("API URL is not configured.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint =
        url || `${API_URL}/api/contact-us/`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json().catch(() => null);

      if (res.status === 401) {
        handleAuthFail();
        return;
      }

      if (!res.ok) {
        throw new Error(
          json?.detail ||
            json?.message ||
            "Failed to fetch contact messages."
        );
      }

      setData(json);

      if (json?.results?.length && !selected) {
        setSelected(json.results[0]);
      }
    } catch (err: any) {
      setError(
        err?.message ||
          "Something went wrong while loading messages."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: ContactItem) => {
    setSelected(item);
  };

  const handleBack = () => {
    setSelected(null);
  };

  const handleDelete = async () => {
    if (!selected || deleting) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this contact message?"
    );

    if (!confirmed) return;

    const token = getToken();

    if (!token) {
      handleAuthFail();
      return;
    }

    setDeleting(true);

    try {
      const res = await fetch(
        `${API_URL}/api/contact-us/${selected.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 401) {
        handleAuthFail();
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to delete message.");
      }

      setData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          count: Math.max(0, prev.count - 1),
          results: prev.results.filter(
            (message) => message.id !== selected.id
          ),
        };
      });

      setSelected(null);
    } catch (err: any) {
      alert(
        err?.message ||
          "Something went wrong while deleting the message."
      );
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50">
            <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-700">
            Loading contact messages...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Please wait a moment.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Unable to load messages
              </h2>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>

              <Button
                onClick={() => fetchMessages()}
                className="mt-4 rounded-xl bg-sky-600 hover:bg-sky-700"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const messages = data?.results ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-7">

        {/* HEADER */}
        <div className="mb-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-sky-600" />

                <span className="text-xs font-medium text-sky-700">
                  Contact
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Contact Messages
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View and manage messages sent through the OFAS website.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50">
                <Mail className="h-3.5 w-3.5 text-sky-600" />
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Messages
                </p>

                <p className="text-xs font-semibold text-slate-700">
                  {data?.count ?? 0} total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {!messages.length ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
              <MessageSquare className="h-6 w-6 text-slate-300" />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-slate-800">
              No contact messages
            </h2>

            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-400">
              Messages submitted through the OFAS contact form will appear
              here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[390px_minmax(0,1fr)]">

            {/* MESSAGE LIST */}
            <div
              className={`${
                selected ? "hidden lg:block" : "block"
              } h-fit`}
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="border-b border-slate-100 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        Messages
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Select a message to view its details.
                      </p>
                    </div>

                    <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-slate-50 px-2">
                      <span className="text-xs font-semibold text-slate-500">
                        {messages.length}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {messages.map((item) => {
                    const active = selected?.id === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item)}
                        className={`
                          group w-full p-4 text-left
                          transition-all duration-200
                          ${
                            active
                              ? "bg-sky-50"
                              : "bg-white hover:bg-slate-50"
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">

                          <div
                            className={`
                              flex h-11 w-11 shrink-0 items-center
                              justify-center rounded-xl
                              ${
                                active
                                  ? "bg-sky-100 text-sky-600"
                                  : "bg-slate-100 text-slate-400"
                              }
                            `}
                          >
                            <MessageSquare className="h-5 w-5" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`
                                  line-clamp-1 text-sm font-semibold
                                  ${
                                    active
                                      ? "text-sky-700"
                                      : "text-slate-700"
                                  }
                                `}
                              >
                                {item.subject || "No subject"}
                              </p>

                              <span className="shrink-0 text-[10px] font-medium text-slate-400">
                                #{item.id}
                              </span>
                            </div>

                            <div className="mt-1 flex items-center gap-1.5">
                              <Mail className="h-3 w-3 text-slate-400" />

                              <p className="truncate text-[11px] text-slate-400">
                                {item.email}
                              </p>
                            </div>

                            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">
                              {item.message}
                            </p>

                            <p className="mt-2 text-[10px] text-slate-400">
                              {formatDate(item.created_at)}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div
              className={`${
                selected ? "block" : "hidden lg:block"
              } min-w-0`}
            >
              {selected ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                  {/* DETAIL HEADER */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                        <Eye className="h-5 w-5 text-sky-600" />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                          Message Details
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-400">
                          View the complete contact message.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50 lg:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  </div>

                  <div className="p-5 sm:p-6">

                    {/* MESSAGE IDENTITY */}
                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start">

                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                        <MessageSquare className="h-7 w-7" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />

                          <span className="text-[10px] font-medium text-emerald-700">
                            Contact Message
                          </span>
                        </div>

                        <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                          {selected.subject || "No subject"}
                        </h1>

                        <p className="mt-2 break-all text-sm text-slate-500">
                          {selected.email}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Message #{selected.id}
                        </p>
                      </div>
                    </div>

                    {/* SENDER INFORMATION */}
                    <div className="mt-6">
                      <div className="mb-3 flex items-center gap-2">
                        <User className="h-4 w-4 text-sky-500" />

                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Sender Information
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Name
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-medium text-slate-700">
                            {selected.name}
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Email Address
                            </span>
                          </div>

                          <p className="mt-2 break-all text-sm font-medium text-slate-700">
                            {selected.email}
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Submitted
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-medium text-slate-700">
                            {formatDate(selected.created_at)}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* SUBJECT */}
                    <div className="mt-6">
                      <div className="mb-3 flex items-center gap-2">
                        <Mail className="h-4 w-4 text-sky-500" />

                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Subject
                        </h3>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-sm font-medium leading-6 text-slate-700">
                          {selected.subject || "No subject provided"}
                        </p>
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="mt-6">
                      <div className="mb-3 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-sky-500" />

                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Message
                        </h3>
                      </div>

                      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                        <p className="whitespace-pre-line text-sm leading-7 text-slate-700">
                          {selected.message}
                        </p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">

                      <a
                        href={`mailto:${selected.email}`}
                        className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Reply by Email
                      </a>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        {deleting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Message
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
                  <div className="max-w-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50">
                      <MessageSquare className="h-6 w-6 text-sky-500" />
                    </div>

                    <h2 className="mt-5 text-sm font-semibold text-slate-800">
                      Select a message
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Select a contact message from the list to view the
                      complete message and sender information.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PAGINATION */}
        {data && messages.length > 0 && (
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

            <Button
              type="button"
              variant="outline"
              disabled={!data.previous || loading}
              onClick={() => {
                if (data.previous) {
                  setSelected(null);
                  fetchMessages(data.previous);
                }
              }}
              className="rounded-xl border-slate-200 text-slate-600"
            >
              Previous
            </Button>

            <div className="text-center">
              <p className="text-xs font-medium text-slate-700">
                {data.count} total messages
              </p>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Showing {messages.length} on this page
              </p>
            </div>

            <Button
              type="button"
              disabled={!data.next || loading}
              onClick={() => {
                if (data.next) {
                  setSelected(null);
                  fetchMessages(data.next);
                }
              }}
              className="rounded-xl bg-sky-600 text-white hover:bg-sky-700"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
 
