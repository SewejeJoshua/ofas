"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Calendar,
  ClipboardCheck,
  Eye,
  User,
  MapPin,
  Phone,
  Cake,
  Activity,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Assessment = {
  id: number;
  recommendation: string | null;
  full_name: string | null;
  volunteer_id: string | null;
  state_lga: string | null;
  phone_number: string | null;
  date_of_birth: string | null;
  q1_answer: string | null;
  q2_answer: string | null;
  q3_answer: string | null;
  q4_answer: string | null;
  q5_answer: string | null;
  total_score: number | null;
  status: string | null;
  created_at: string | null;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Assessment[];
};

export default function AsthmaTestsAdmin() {
  const router = useRouter();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Assessment | null>(null);

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

  const safeText = (value: unknown) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return String(value);
  };

  const fetchTests = async (url?: string) => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        handleAuthFail();
        return;
      }

      if (!API_URL && !url) {
        throw new Error("API URL is not configured");
      }

      const endpoint =
        url ||
        `${API_URL?.replace(/\/$/, "")}/api/asthma-assessments/`;

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
            "Failed to load test results"
        );
      }

      setData(json);
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong while loading results."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const formatDate = (date?: string | null) => {
    if (!date) return "N/A";

    try {
      return new Date(date).toLocaleString("en-NG", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return date;
    }
  };

  const formatShortDate = (date?: string | null) => {
    if (!date) return "N/A";

    try {
      return new Date(date).toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return date;
    }
  };

  const getStatusColor = (status?: string | null) => {
    switch (status) {
      case "well_controlled":
        return "border-emerald-100 bg-emerald-50 text-emerald-700";

      case "poorly_controlled":
        return "border-amber-100 bg-amber-50 text-amber-700";

      case "not_controlled":
        return "border-red-100 bg-red-50 text-red-700";

      default:
        return "border-slate-200 bg-slate-50 text-slate-600";
    }
  };

  const getStatusLabel = (status?: string | null) => {
    return safeText(status)
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const getScoreColor = (score?: number | null) => {
    if (score === null || score === undefined) {
      return "text-slate-500";
    }

    if (score >= 20) {
      return "text-emerald-600";
    }

    if (score >= 16) {
      return "text-amber-600";
    }

    return "text-red-600";
  };

  const handleSelect = (assessment: Assessment) => {
    setSelected(assessment);
  };

  const handleBack = () => {
    setSelected(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50">
            <Loader2 className="h-6 w-6 animate-spin text-sky-600" />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-700">
            Loading asthma test results...
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
                Unable to load test results
              </h2>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>

              <Button
                onClick={() => fetchTests()}
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

  const assessments = data?.results ?? [];

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
                <ClipboardCheck className="h-3.5 w-3.5 text-sky-600" />

                <span className="text-xs font-medium text-sky-700">
                  Health Assessments
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Asthma Control Test Results
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Review asthma assessment results submitted by users.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50">
                <ClipboardCheck className="h-3.5 w-3.5 text-sky-600" />
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Assessments
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
        {!assessments.length ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
              <ClipboardCheck className="h-6 w-6 text-slate-300" />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-slate-800">
              No assessment results
            </h2>

            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-400">
              Asthma Control Test submissions will appear here once
              users complete an assessment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[390px_minmax(0,1fr)]">
            {/* =========================
                ASSESSMENT LIST
            ========================= */}
            <div
              className={`
                ${selected ? "hidden lg:block" : "block"}
                h-fit
              `}
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* LIST HEADER */}
                <div className="border-b border-slate-100 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        Assessment Submissions
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Select a result to view the full assessment.
                      </p>
                    </div>

                    <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-slate-50 px-2">
                      <span className="text-xs font-semibold text-slate-500">
                        {assessments.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* LIST */}
                <div className="divide-y divide-slate-100">
                  {assessments.map((assessment) => {
                    const active = selected?.id === assessment.id;

                    return (
                      <button
                        key={assessment.id}
                        type="button"
                        onClick={() => handleSelect(assessment)}
                        className={`
                          group w-full p-4 text-left transition-all duration-200
                          ${
                            active
                              ? "bg-sky-50"
                              : "bg-white hover:bg-slate-50"
                          }
                        `}
                      >
                        <div className="flex gap-3">
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

                          {/* INFO */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3
                                className={`
                                  truncate text-sm font-semibold
                                  ${
                                    active
                                      ? "text-sky-700"
                                      : "text-slate-800"
                                  }
                                `}
                              >
                                {safeText(assessment.full_name)}
                              </h3>

                              <span
                                className={`
                                  shrink-0 text-sm font-bold
                                  ${getScoreColor(
                                    assessment.total_score
                                  )}
                                `}
                              >
                                {safeText(assessment.total_score)}
                                <span className="font-normal text-slate-400">
                                  /25
                                </span>
                              </span>
                            </div>

                            <p className="mt-0.5 truncate text-xs text-slate-400">
                              {safeText(assessment.phone_number)}
                            </p>

                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span
                                className={`
                                  rounded-full border px-2 py-1 text-[9px] font-medium
                                  ${getStatusColor(assessment.status)}
                                `}
                              >
                                {getStatusLabel(assessment.status)}
                              </span>

                              <span className="text-[10px] text-slate-400">
                                {formatShortDate(
                                  assessment.created_at
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
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
                ${selected ? "block" : "hidden lg:block"}
                min-w-0
              `}
            >
              {selected ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {/* DETAILS HEADER */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                        <Eye className="h-5 w-5 text-sky-600" />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                          Assessment Details
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-400">
                          Full asthma control assessment information.
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
                    {/* PERSON HEADER */}
                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                          <User className="h-6 w-6" />
                        </div>

                        <div>
                          <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                            {safeText(selected.full_name)}
                          </h1>

                          <p className="mt-1 text-sm text-slate-500">
                            {safeText(selected.phone_number)}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Submitted {formatDate(selected.created_at)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <span
                          className={`
                            inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium
                            ${getStatusColor(selected.status)}
                          `}
                        >
                          {getStatusLabel(selected.status)}
                        </span>

                        <div className="flex items-baseline gap-1">
                          <span
                            className={`text-2xl font-bold ${getScoreColor(
                              selected.total_score
                            )}`}
                          >
                            {safeText(selected.total_score)}
                          </span>

                          <span className="text-xs text-slate-400">
                            / 25
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* PERSONAL INFORMATION */}
                    <div className="mt-6">
                      <div className="mb-3 flex items-center gap-2">
                        <User className="h-4 w-4 text-sky-500" />

                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Personal Information
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {/* PHONE */}
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Phone Number
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-medium text-slate-700">
                            {safeText(selected.phone_number)}
                          </p>
                        </div>

                        {/* DOB */}
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2">
                            <Cake className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Date of Birth
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-medium text-slate-700">
                            {safeText(selected.date_of_birth)}
                          </p>
                        </div>

                        {/* LOCATION */}
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Location
                            </span>
                          </div>

                          <p className="mt-2 text-sm font-medium text-slate-700">
                            {safeText(selected.state_lga)}
                          </p>
                        </div>

                        {/* VOLUNTEER ID */}
                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <div className="flex items-center gap-2">
                            <ClipboardCheck className="h-3.5 w-3.5 text-slate-400" />

                            <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                              Volunteer ID
                            </span>
                          </div>

                          <p className="mt-2 break-all text-sm font-medium text-slate-700">
                            {safeText(selected.volunteer_id)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* SCORE SUMMARY */}
                    <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-sky-600" />

                            <h3 className="text-sm font-semibold text-sky-900">
                              Asthma Control Score
                            </h3>
                          </div>

                          <p className="mt-1 text-xs leading-5 text-sky-700/70">
                            Overall score recorded from the five
                            assessment questions.
                          </p>
                        </div>

                        <div className="flex items-baseline">
                          <span
                            className={`text-4xl font-bold ${getScoreColor(
                              selected.total_score
                            )}`}
                          >
                            {safeText(selected.total_score)}
                          </span>

                          <span className="ml-1 text-sm text-slate-400">
                            /25
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* QUESTIONS */}
                    <div className="mt-6">
                      <div className="mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-sky-500" />

                        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Assessment Responses
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {[
                          {
                            number: 1,
                            answer: selected.q1_answer,
                          },
                          {
                            number: 2,
                            answer: selected.q2_answer,
                          },
                          {
                            number: 3,
                            answer: selected.q3_answer,
                          },
                          {
                            number: 4,
                            answer: selected.q4_answer,
                          },
                          {
                            number: 5,
                            answer: selected.q5_answer,
                          },
                        ].map((question) => (
                          <div
                            key={question.number}
                            className="rounded-xl border border-slate-100 bg-white p-4"
                          >
                            <div className="flex gap-3">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-[11px] font-semibold text-slate-500">
                                Q{question.number}
                              </div>

                              <div className="min-w-0">
                                <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                                  {safeText(question.answer)}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RECOMMENDATION */}
                    <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50 p-5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-sky-600" />

                        <h3 className="text-sm font-semibold text-sky-900">
                          Recommendation
                        </h3>
                      </div>

                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {safeText(selected.recommendation)}
                      </p>
                    </div>

                    {/* SUBMISSION INFORMATION */}
                    <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />

                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            Submitted
                          </p>
                        </div>

                        <p className="mt-2 text-xs font-medium text-slate-700">
                          {formatDate(selected.created_at)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Assessment ID
                        </p>

                        <p className="mt-2 text-xs font-medium text-slate-700">
                          #{selected.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* EMPTY SELECTION */
                <div className="flex min-h-[520px] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center shadow-sm">
                  <div className="max-w-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50">
                      <Eye className="h-6 w-6 text-sky-500" />
                    </div>

                    <h2 className="mt-5 text-sm font-semibold text-slate-800">
                      Select an assessment
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Select a test result from the list to view the
                      participant information, score, responses and
                      recommendation.
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
        {data && assessments.length > 0 && (
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              disabled={!data.previous || loading}
              onClick={() => {
                if (data.previous) {
                  setSelected(null);
                  fetchTests(data.previous);
                }
              }}
              className="rounded-xl border-slate-200 text-slate-600"
            >
              Previous
            </Button>

            <div className="text-center">
              <p className="text-xs font-medium text-slate-700">
                {data.count} total assessments
              </p>

              <p className="mt-0.5 text-[11px] text-slate-400">
                Showing {assessments.length} on this page
              </p>
            </div>

            <Button
              type="button"
              disabled={!data.next || loading}
              onClick={() => {
                if (data.next) {
                  setSelected(null);
                  fetchTests(data.next);
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