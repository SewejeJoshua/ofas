"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, X, User } from "lucide-react";

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
    router.push("/admin");
  };

  const fetchVolunteers = async (url?: string) => {
    const token = getToken();

    if (!token) {
      handleAuthFail();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint =
        url || `${API_URL?.replace(/\/$/, "")}/api/volunteers/`;

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
        throw new Error("Failed to load volunteers");
      }

      setData(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
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
        <p className="text-gray-500">Loading volunteers...</p>
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
      <h2 className="text-2xl font-bold mb-6">
        Volunteers Applications
      </h2>

      {/* GRID */}
      {data?.results?.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.results.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelected(v)}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg cursor-pointer transition p-5"
            >
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <User size={14} />
                <span className="text-xs">{v.email}</span>
              </div>

              <h3 className="text-lg font-bold">{v.name}</h3>

              <p className="text-sm text-gray-600 mt-1">
                {v.phone_number}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Interest: {v.interest}
              </p>

              <div className="mt-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    v.agree
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {v.agree ? "Agreed" : "Not Agreed"}
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                {formatDate(v.created_at)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No volunteer applications found.</p>
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
            <h2 className="text-2xl font-bold">
              {selected.name}
            </h2>

            <p className="text-sm text-gray-600">
              {selected.email}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {formatDate(selected.created_at)}
            </p>

            {/* INFO */}
            <div className="grid md:grid-cols-2 gap-2 mt-5 text-sm text-gray-700">
              <p>
                <b>Phone:</b> {selected.phone_number}
              </p>
              <p>
                <b>Interest:</b> {selected.interest}
              </p>
              <p>
                <b>Status:</b>{" "}
                {selected.agree ? "Agreed" : "Not Agreed"}
              </p>
            </div>

            {/* MESSAGE */}
            <div className="mt-5 bg-gray-50 border rounded-xl p-4 text-sm whitespace-pre-line">
              {selected.message}
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
          onClick={() =>
            fetchVolunteers(data?.previous || undefined)
          }
        >
          Previous
        </Button>

        <Button
          disabled={!data?.next}
          onClick={() =>
            fetchVolunteers(data?.next || undefined)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}