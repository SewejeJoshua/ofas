"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, X, Mail, MessageSquare } from "lucide-react";

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
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ContactItem | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL?.replace(/\/$/, "");

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access");
  };

  const fetchMessages = async (url?: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      const endpoint =
        url || `${API_URL}/api/contact-us/`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.detail || "Failed to fetch messages");
      }

      setData(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;

    try {
      const token = getToken();

      const res = await fetch(
        `${API_URL}/api/contact-us/${selected.id}/`,
        {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete message");

      setData((prev) =>
        prev
          ? {
              ...prev,
              results: prev.results.filter(
                (m) => m.id !== selected.id
              ),
            }
          : prev
      );

      setSelected(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (loading) {
    return (
      <div className="flex flex-col items-center py-20 text-white">
        <Loader2 className="animate-spin text-blue-400 mb-3" />
        <p className="text-gray-300">Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-400 bg-slate-800 border border-slate-700 rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">
        Contact Messages
      </h1>

      {/* GRID */}
      {data?.results?.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.results.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item)}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-5 cursor-pointer hover:bg-slate-750 transition shadow-md"
            >
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Mail size={14} />
                <span className="text-xs break-all">
                  {item.email}
                </span>
              </div>

              <h3 className="text-lg font-bold line-clamp-1">
                {item.subject}
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                From: {item.name}
              </p>

              <p className="text-xs text-gray-500 mt-3">
                {formatDate(item.created_at)}
              </p>

              <div className="mt-3 text-sm text-gray-300 line-clamp-3">
                {item.message}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No messages found.</p>
      )}

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X />
            </button>

            {/* HEADER */}
            <div className="flex items-center gap-2 text-blue-400 mb-2">
              <MessageSquare size={18} />
              <span className="text-sm break-all">
                {selected.email}
              </span>
            </div>

            <h2 className="text-2xl font-bold">
              {selected.subject}
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              From: {selected.name}
            </p>

            <p className="text-xs text-gray-500 mt-2">
              {formatDate(selected.created_at)}
            </p>

            {/* MESSAGE */}
            <div className="mt-5 bg-slate-800 border border-slate-700 p-4 rounded-lg">
              <p className="whitespace-pre-line text-gray-200">
                {selected.message}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setSelected(null)}
              >
                Close
              </Button>

              <Button
                className="bg-red-600 text-white"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* PAGINATION */}
      <div className="mt-8 flex justify-between items-center text-white">
        <Button
          variant="outline"
          disabled={!data?.previous}
          onClick={() =>
            fetchMessages(data?.previous || undefined)
          }
        >
          Previous
        </Button>

        <span className="text-sm text-gray-400">
          Total: {data?.count ?? 0}
        </span>

        <Button
          disabled={!data?.next}
          onClick={() =>
            fetchMessages(data?.next || undefined)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}