"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  X,
  User,
  Mail,
  Phone,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Volunteer = {
  id: number;
  name: string;
  email: string;
  interest: string;
  message: string;
  phone_number: string;
  agree: boolean;
  created_at: string;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Volunteer[];
};

export default function VolunteersAdmin() {
  const router = useRouter();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Volunteer | null>(null);

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

  const fetchVolunteers = async (url?: string) => {
    const token = getToken();

    if (!token) {
      handleAuthFail();
      return;
    }

    if (!API_URL) {
      setError("API URL is not configured.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint =
        url || `${API_URL.replace(/\/$/, "")}/api/volunteers/`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        handleAuthFail();
        return;
      }

      const json = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          json?.detail ||
            json?.message ||
            "Failed to load volunteer applications."
        );
      }

      setData(json);
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong while loading volunteers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const agreedCount =
    data?.results?.filter((volunteer) => volunteer.agree).length || 0;

  const totalCount = data?.count || 0;

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
            <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-600">
            Loading volunteer applications...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Please wait a moment
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] bg-slate-50 p-6">
        <div className="mx-auto max-w-xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <X className="h-5 w-5 text-red-500" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Unable to load volunteers
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">{error}</p>

          <Button
            onClick={() => fetchVolunteers()}
            className="mt-5 rounded-full bg-sky-600 px-6 hover:bg-sky-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5">
                <Users className="h-3.5 w-3.5 text-sky-600" />

                <span className="text-xs font-medium text-sky-700">
                  Volunteer Management
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Volunteer Applications
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Review and manage people who have expressed interest in
                volunteering with OFAS.
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            STATISTICS
        ========================= */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Applications
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  {totalCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50">
                <Users className="h-5 w-5 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Agreement Status
                </p>

                <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                  {agreedCount}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Applications with agreement
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            APPLICATIONS
        ========================= */}
        {data?.results?.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {data.results.map((volunteer) => (
              <button
                key={volunteer.id}
                type="button"
                onClick={() => setSelected(volunteer)}
                className="group w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/40"
              >
                {/* Card top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-100">
                      <User className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-base font-semibold text-slate-900">
                        {volunteer.name}
                      </h2>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {volunteer.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      volunteer.agree
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {volunteer.agree ? "Agreed" : "Not Agreed"}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400" />

                    <span className="truncate">
                      {volunteer.phone_number}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <BriefcaseBusiness className="h-4 w-4 text-slate-400" />

                    <span className="truncate">
                      {volunteer.interest || "No interest specified"}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5" />

                    <span>{formatDate(volunteer.created_at)}</span>
                  </div>

                  <span className="text-xs font-medium text-sky-600 opacity-0 transition-opacity group-hover:opacity-100">
                    View details →
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
              <Users className="h-6 w-6 text-slate-400" />
            </div>

            <h2 className="mt-4 text-base font-semibold text-slate-900">
              No volunteer applications
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Volunteer applications will appear here when people apply.
            </p>
          </div>
        )}

        {/* =========================
            PAGINATION
        ========================= */}
        {(data?.previous || data?.next) && (
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
            <Button
              variant="outline"
              disabled={!data?.previous}
              onClick={() =>
                fetchVolunteers(data?.previous || undefined)
              }
              className="gap-2 rounded-full border-slate-200 bg-white px-4 text-slate-600 hover:bg-slate-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <p className="text-xs text-slate-400">
              Showing volunteer applications
            </p>

            <Button
              variant="outline"
              disabled={!data?.next}
              onClick={() => fetchVolunteers(data?.next || undefined)}
              className="gap-2 rounded-full border-slate-200 bg-white px-4 text-slate-600 hover:bg-slate-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* =========================
          DETAILS MODAL
      ========================= */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="border-b border-slate-100 px-6 py-6 sm:px-8">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="pr-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                    <User className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                      {selected.name}
                    </h2>

                    <p className="mt-0.5 text-sm text-slate-500">
                      Volunteer Application
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {selected.email}
                  </div>

                  <span className="hidden text-slate-300 sm:block">•</span>

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(selected.created_at)}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6 sm:px-8">
              {/* Information */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <Phone className="h-3.5 w-3.5" />
                    Phone
                  </div>

                  <p className="mt-2 text-sm font-medium text-slate-800">
                    {selected.phone_number}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <BriefcaseBusiness className="h-3.5 w-3.5" />
                    Interest
                  </div>

                  <p className="mt-2 text-sm font-medium text-slate-800">
                    {selected.interest || "Not specified"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Agreement
                  </div>

                  <p
                    className={`mt-2 text-sm font-medium ${
                      selected.agree
                        ? "text-emerald-600"
                        : "text-slate-500"
                    }`}
                  >
                    {selected.agree
                      ? "Applicant agreed to the volunteer terms."
                      : "Applicant did not agree to the volunteer terms."}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-900">
                  Applicant's Message
                </h3>

                <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                    {selected.message || "No message provided."}
                  </p>
                </div>
              </div>

              {/* Close */}
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setSelected(null)}
                  className="rounded-full border-slate-200 px-6"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}