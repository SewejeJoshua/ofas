"use client";

import { useEffect, useState } from "react";
import { Loader2, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

type EventItem = {
  id: number;
  title: string;
  image: string;
  content: string;
  created_at: string;
  updated_at: string;
};

type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: EventItem[];
};

export default function AdminBroadcastedMessages() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<EventItem | null>(null);

  // edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  const getToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access");
  };

  const fetchEvents = async (url?: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      if (!API_URL && !url) {
        throw new Error("API URL is not configured");
      }

      const endpoint =
        url || `${API_URL?.replace(/\/$/, "")}/api/events/`;

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

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = async () => {
    if (!selectedItem) return;

    try {
      const token = getToken();

      const res = await fetch(
        `${API_URL?.replace(/\/$/, "")}/api/events/${selectedItem.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            title: editedTitle,
            content: editedContent,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update event");
      }

      const updated = await res.json();

      setData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          results: prev.results.map((item) =>
            item.id === selectedItem.id ? updated : item
          ),
        };
      });

      setSelectedItem(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      const token = getToken();

      const res = await fetch(
        `${API_URL?.replace(/\/$/, "")}/api/events/${selectedItem.id}/`,
        {
          method: "DELETE",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete event");
      }

      setData((prev) =>
        prev
          ? {
              ...prev,
              results: prev.results.filter(
                (item) => item.id !== selectedItem.id
              ),
            }
          : prev
      );

      setSelectedItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center py-20">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500">Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600 bg-white border rounded-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Broadcasted Messages
      </h1>

      {/* GRID */}
      {data?.results?.length ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.results.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                setEditedTitle(item.title);
                setEditedContent(item.content);
                setIsEditing(false);
              }}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-lg cursor-pointer overflow-hidden transition"
            >
              {item.image && (
                <img
                  src={item.image}
                  className="h-44 w-full object-cover"
                />
              )}

              <div className="p-4">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Calendar size={14} />
                  <span className="text-xs">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h2 className="font-bold text-lg line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-3 mt-2">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No messages found.</p>
      )}

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">

            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4"
            >
              <X />
            </button>

            {/* IMAGE */}
            {selectedItem.image && (
              <img
                src={selectedItem.image}
                className="w-full h-60 object-cover rounded-xl mb-5"
              />
            )}

            {/* TITLE */}
            {isEditing ? (
              <input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              />
            ) : (
              <h2 className="text-2xl font-bold text-center mb-3">
                {selectedItem.title}
              </h2>
            )}

            {/* CONTENT */}
            {isEditing ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full border p-3 rounded min-h-[140px]"
              />
            ) : (
              <p className="text-gray-700 whitespace-pre-line">
                {selectedItem.content}
              </p>
            )}

            {/* ACTIONS */}
            <div className="mt-6 flex justify-end gap-3">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>

                  <Button onClick={handleEdit}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>

                  <Button
                    className="bg-red-600 text-white"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </>
              )}
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
            data?.previous && fetchEvents(data.previous)
          }
        >
          Previous
        </Button>

        <span className="text-sm text-gray-600">
          Total: {data?.count ?? 0}
        </span>

        <Button
          disabled={!data?.next}
          onClick={() =>
            data?.next && fetchEvents(data.next)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}