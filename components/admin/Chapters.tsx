"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, X, Mail, GraduationCap } from "lucide-react";

type ChapterApplication = {
  id: number;
  name: string;
  email: string;
  university: string;
  grad_year: number;
  message: string;
  created_at: string;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ChapterApplication[];
};

export default function ChaptersAdmin() {
  const router = useRouter();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selected, setSelected] = useState<ChapterApplication | null>(null);

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

  const fetchChapters = async (url?: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      if (!token) {
        handleAuthFail();
        return;
      }

      if (!API_URL && !url) {
        throw new Error("API URL is not configured");
      }

      const endpoint =
        url || `${API_URL?.replace(/\/$/, "")}/api/campus-chapters/`;

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

      const json = await res.json();

      if (!res.ok) {
        throw new Error(
          json?.detail || "Failed to load chapter applications"
        );
      }

      setData(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (loading) {
    return (
      <div className="flex flex-col items-center py-20">
        <Loader2 className="animate-spin text-blue-600 mb-4" />
        <p className="text-gray-500">Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 bg-white border rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">
        Campus Chapter Applications
      </h2>

      {/* GRID */}
      {data?.results?.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.results.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg cursor-pointer transition p-5"
            >
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Mail size={14} />
                <span className="text-xs">{item.email}</span>
              </div>

              <h3 className="text-lg font-bold">{item.name}</h3>

              <div className="mt-2 text-sm text-gray-600">
                <p className="flex items-center gap-1">
                  <GraduationCap size={14} />
                  {item.university}
                </p>

                <p className="mt-1">
                  Graduation Year: {item.grad_year}
                </p>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                {formatDate(item.created_at)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No applications found.</p>
      )}

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            {/* HEADER */}
            <h2 className="text-2xl font-bold mb-1">
              {selected.name}
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              {selected.email}
            </p>

            {/* DETAILS */}
            <div className="space-y-2 text-sm text-gray-700 border-t pt-4">
              <p>
                <span className="font-medium">University:</span>{" "}
                {selected.university}
              </p>

              <p>
                <span className="font-medium">Graduation Year:</span>{" "}
                {selected.grad_year}
              </p>

              <p>
                <span className="font-medium">Submitted:</span>{" "}
                {formatDate(selected.created_at)}
              </p>
            </div>

            {/* MESSAGE */}
            <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-lg">
              {selected.message}
            </div>

            {/* ACTIONS (optional future expand) */}
            <div className="mt-6 flex justify-end">
              <Button
                onClick={() => setSelected(null)}
                variant="outline"
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
          onClick={() => fetchChapters(data?.previous || undefined)}
        >
          Previous
        </Button>

        <span className="text-sm text-gray-500">
          Total: {data?.count ?? 0}
        </span>

        <Button
          disabled={!data?.next}
          onClick={() => fetchChapters(data?.next || undefined)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}