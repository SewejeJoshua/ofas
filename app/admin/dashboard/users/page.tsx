"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Mail,
  Eye,
  User,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type User = {
  id: number;
  email: string;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
};

export default function NewsletterUsers() {
  const router = useRouter();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);

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

  const fetchUsers = async (url?: string) => {
    const token = getToken();

    if (!token) {
      handleAuthFail();
      return;
    }

    if (!API_URL && !url) {
      setError("API URL is not configured");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint =
        url ||
        `${API_URL?.replace(/\/$/, "")}/api/join/`;

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
            "Failed to load newsletter subscribers"
        );
      }

      setData(json);
    } catch (err: any) {
      setError(
        err?.message ||
          "Something went wrong while loading subscribers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelect = (user: User) => {
    setSelectedUser(user);
    setCopied(false);
  };

  const handleBack = () => {
    setSelectedUser(null);
    setCopied(false);
  };

  const handleCopyEmail = async () => {
    if (!selectedUser?.email) return;

    try {
      await navigator.clipboard.writeText(selectedUser.email);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50">
            <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-700">
            Loading subscribers...
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
                Unable to load subscribers
              </h2>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>

              <Button
                onClick={() => fetchUsers()}
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

  const subscribers = data?.results ?? [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-7">
        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5">
                <Mail className="h-3.5 w-3.5 text-sky-600" />

                <span className="text-xs font-medium text-sky-700">
                  Newsletter
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Newsletter Subscribers
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View and manage people who have joined the OFAS
                newsletter.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50">
                <Users className="h-3.5 w-3.5 text-sky-600" />
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Subscribers
                </p>

                <p className="text-xs font-semibold text-slate-700">
                  {data?.count ?? 0} total
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            EMPTY STATE
        ========================= */}
        {!subscribers.length ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
              <Mail className="h-6 w-6 text-slate-300" />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-slate-800">
              No newsletter subscribers
            </h2>

            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-400">
              New newsletter subscribers will appear here when
              people join the OFAS mailing list.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[390px_minmax(0,1fr)]">
            {/* =========================
                SUBSCRIBER LIST
            ========================= */}
            <div
              className={`
                ${selectedUser ? "hidden lg:block" : "block"}
                h-fit
              `}
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* LIST HEADER */}
                <div className="border-b border-slate-100 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        Subscribers
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Select a subscriber to view details.
                      </p>
                    </div>

                    <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-slate-50 px-2">
                      <span className="text-xs font-semibold text-slate-500">
                        {subscribers.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* LIST */}
                <div className="divide-y divide-slate-100">
                  {subscribers.map((user) => {
                    const active = selectedUser?.id === user.id;

                    return (
                      <button
                        key={user.id}
                        type="button"
                        onClick={() => handleSelect(user)}
                        className={`
                          group flex w-full items-center gap-3 p-4
                          text-left transition-all duration-200
                          ${
                            active
                              ? "bg-sky-50"
                              : "bg-white hover:bg-slate-50"
                          }
                        `}
                      >
                        {/* AVATAR */}
                        <div
                          className={`
                            flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                            ${
                              active
                                ? "bg-sky-100 text-sky-600"
                                : "bg-slate-100 text-slate-400"
                            }
                          `}
                        >
                          <User className="h-5 w-5" />
                        </div>

                        {/* EMAIL */}
                        <div className="min-w-0 flex-1">
                          <p
                            className={`
                              truncate text-sm font-medium
                              ${
                                active
                                  ? "text-sky-700"
                                  : "text-slate-700"
                              }
                            `}
                          >
                            {user.email}
                          </p>

                          <div className="mt-1 flex items-center gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-emerald-500" />

                            <span className="text-[10px] text-slate-400">
                              Newsletter subscriber
                            </span>
                          </div>
                        </div>

                        {/* ID */}
                        <span className="shrink-0 text-[10px] font-medium text-slate-400">
                          #{user.id}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* =========================
                DETAILS PANEL
            ========================= */}
            <div
              className={`
                ${selectedUser ? "block" : "hidden lg:block"}
                min-w-0
              `}
            >
              {selectedUser ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {/* DETAILS HEADER */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                        <Eye className="h-5 w-5 text-sky-600" />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                          Subscriber Details
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-400">
                          View newsletter subscription information.
                        </p>
                      </div>
                    </div>

                    {/* MOBILE BACK */}
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50 lg:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  </div>

                  {/* DETAILS */}
                  <div className="p-5 sm:p-6">
                    {/* PROFILE */}
                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                        <Mail className="h-7 w-7" />
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />

                          <span className="text-[10px] font-medium text-emerald-700">
                            Active Subscriber
                          </span>
                        </div>

                        <h1 className="break-all text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                          {selectedUser.email}
                        </h1>

                        <p className="mt-1 text-xs text-slate-400">
                          Newsletter subscriber #{selectedUser.id}
                        </p>
                      </div>
                    </div>

                    {/* INFORMATION */}
                    <div className="mt-6">
                      <div className="mb-3 flex items-center gap-2">
                        <User className="h-4 w-4 text-sky-500" />

                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Subscriber Information
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {/* EMAIL */}
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Email Address
                            </span>
                          </div>

                          <p className="mt-2 break-all text-sm font-medium text-slate-700">
                            {selectedUser.email}
                          </p>
                        </div>

                        {/* USER ID */}
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Subscriber ID
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-medium text-slate-700">
                            #{selectedUser.id}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* STATUS */}
                    <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-sky-900">
                            Newsletter Subscription
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-sky-700/70">
                            This email address is registered as a
                            newsletter subscriber and can receive OFAS
                            newsletter communications.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCopyEmail}
                        className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                      >
                        {copied ? (
                          <>
                            <Check className="mr-2 h-4 w-4 text-emerald-500" />
                            Email Copied
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Email
                          </>
                        )}
                      </Button>

                      <a
                        href={`mailto:${selectedUser.email}`}
                        className="inline-flex h-10 items-center justify-center rounded-xl bg-sky-600 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-sky-700"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Email
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* EMPTY SELECTION */
                <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
                  <div className="max-w-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50">
                      <Mail className="h-6 w-6 text-sky-500" />
                    </div>

                    <h2 className="mt-5 text-sm font-semibold text-slate-800">
                      Select a subscriber
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Select an email address from the list to view its
                      newsletter subscription details.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================
            PAGINATION
        ========================= */}
        {data && subscribers.length > 0 && (
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              disabled={!data.previous || loading}
              onClick={() => {
                if (data.previous) {
                  setSelectedUser(null);
                  fetchUsers(data.previous);
                }
              }}
              className="rounded-xl border-slate-200 text-slate-600"
            >
              Previous
            </Button>

            <div className="text-center">
              <p className="text-xs font-medium text-slate-700">
                {data.count} total subscribers
              </p>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Showing {subscribers.length} on this page
              </p>
            </div>

            <Button
              type="button"
              disabled={!data.next || loading}
              onClick={() => {
                if (data.next) {
                  setSelectedUser(null);
                  fetchUsers(data.next);
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