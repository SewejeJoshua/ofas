"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";

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
    router.push("/admin");
  };

  const safeText = (value: unknown) => {
    if (value === null || value === undefined || value === "")
      return "N/A";
    if (typeof value === "object") return JSON.stringify(value);
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

      const endpoint =
        url ||
        `${API_URL?.replace(/\/$/, "")}/api/asthma-assessments/`;

      const res = await fetch(endpoint, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        handleAuthFail();
        return;
      }

      const json = await res.json();

      if (!res.ok) {
        throw new Error(
          json?.detail || "Failed to load test results"
        );
      }

      setData(json);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const formatDate = (date?: string | null) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const getStatusColor = (status?: string | null) => {
    switch (status) {
      case "well_controlled":
        return "bg-green-100 text-green-700 border-green-200";
      case "poorly_controlled":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "not_controlled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center py-20">
        <Loader2 className="animate-spin text-blue-600 mb-4" />
        <p className="text-gray-500">
          Loading asthma test results...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 bg-white border rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Asthma Control Test Results
      </h1>

      {/* GRID */}
      {data?.results?.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.results.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelected(t)}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg cursor-pointer transition p-5"
            >
              <h2 className="font-bold text-lg">
                {safeText(t.full_name)}
              </h2>

              <p className="text-sm text-gray-600">
                {safeText(t.phone_number)}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {safeText(t.state_lga)}
              </p>

              <div className="mt-3 flex justify-between items-center">
                <span
                  className={`px-2 py-1 text-xs border rounded-full ${getStatusColor(
                    t.status
                  )}`}
                >
                  {safeText(t.status).replaceAll("_", " ")}
                </span>

                <span className="text-xs text-gray-400">
                  Score: {safeText(t.total_score)}/25
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                {formatDate(t.created_at)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No results found.</p>
      )}

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            {/* HEADER */}
            <h2 className="text-2xl font-bold">
              {safeText(selected.full_name)}
            </h2>

            <p className="text-sm text-gray-600">
              {safeText(selected.phone_number)}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {formatDate(selected.created_at)}
            </p>

            {/* STATUS */}
            <div
              className={`inline-block mt-3 px-3 py-1 text-xs rounded-full border ${getStatusColor(
                selected.status
              )}`}
            >
              {safeText(selected.status).replaceAll("_", " ")}
            </div>

            {/* INFO */}
            <div className="grid md:grid-cols-2 gap-2 mt-5 text-sm text-gray-700">
              <p>
                <b>Volunteer ID:</b>{" "}
                {safeText(selected.volunteer_id)}
              </p>
              <p>
                <b>DOB:</b> {safeText(selected.date_of_birth)}
              </p>
              <p>
                <b>Location:</b>{" "}
                {safeText(selected.state_lga)}
              </p>
              <p>
                <b>Score:</b>{" "}
                {safeText(selected.total_score)}/25
              </p>
            </div>

            {/* QUESTIONS */}
            <div className="mt-5 bg-gray-50 border rounded-xl p-4 text-sm space-y-1">
              <p>Q1: {safeText(selected.q1_answer)}</p>
              <p>Q2: {safeText(selected.q2_answer)}</p>
              <p>Q3: {safeText(selected.q3_answer)}</p>
              <p>Q4: {safeText(selected.q4_answer)}</p>
              <p>Q5: {safeText(selected.q5_answer)}</p>
            </div>

            {/* RECOMMENDATION */}
            <div className="mt-5 bg-blue-50 border border-blue-100 p-4 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-1">
                Recommendation
              </h3>
              <p className="text-sm text-gray-700">
                {safeText(selected.recommendation)}
              </p>
            </div>

            {/* CLOSE */}
            <div className="mt-6 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setSelected(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PAGINATION */}
      <div className="mt-8 flex justify-between items-center">
        <Button
          variant="outline"
          disabled={!data?.previous}
          onClick={() => fetchTests(data?.previous || undefined)}
        >
          Previous
        </Button>

        <Button
          disabled={!data?.next}
          onClick={() => fetchTests(data?.next || undefined)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}