"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Calendar,
  Send,
  Eye,
  Pencil,
  Trash2,
  Save,
  X,
  ArrowLeft,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
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
  const router = useRouter();

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<EventItem | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

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

  const fetchEvents = async (url?: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = getToken();

      if (!API_URL && !url) {
        throw new Error("API URL is not configured");
      }

      if (!token) {
        handleAuthFail();
        return;
      }

      const endpoint =
        url ||
        `${API_URL?.replace(/\/$/, "")}/api/events/`;

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
            "Failed to fetch broadcasted messages"
        );
      }

      setData(json);
    } catch (err: any) {
      setError(
        err?.message || "Something went wrong while loading messages."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelect = (item: EventItem) => {
    setSelectedItem(item);
    setEditedTitle(item.title);
    setEditedContent(item.content);

    setIsEditing(false);
    setActionError("");
    setActionSuccess("");
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
    setIsEditing(false);
    setActionError("");
    setActionSuccess("");
  };

  const handleEdit = async () => {
    if (!selectedItem) return;

    setSaving(true);
    setActionError("");
    setActionSuccess("");

    try {
      const token = getToken();

      if (!token) {
        handleAuthFail();
        return;
      }

      if (!API_URL) {
        throw new Error("API URL is not configured");
      }

      const res = await fetch(
        `${API_URL.replace(/\/$/, "")}/api/events/${selectedItem.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editedTitle.trim(),
            content: editedContent.trim(),
          }),
        }
      );

      const json = await res.json().catch(() => null);

      if (res.status === 401) {
        handleAuthFail();
        return;
      }

      if (!res.ok) {
        throw new Error(
          json?.detail ||
            json?.message ||
            "Failed to update broadcast"
        );
      }

      const updated: EventItem = json;

      setData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          results: prev.results.map((item) =>
            item.id === updated.id ? updated : item
          ),
        };
      });

      setSelectedItem(updated);
      setEditedTitle(updated.title);
      setEditedContent(updated.content);

      setIsEditing(false);
      setActionSuccess("Broadcast updated successfully.");
    } catch (err: any) {
      setActionError(
        err?.message || "Something went wrong while updating."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${selectedItem.title}"?`
    );

    if (!confirmed) return;

    setDeleting(true);
    setActionError("");
    setActionSuccess("");

    try {
      const token = getToken();

      if (!token) {
        handleAuthFail();
        return;
      }

      if (!API_URL) {
        throw new Error("API URL is not configured");
      }

      const res = await fetch(
        `${API_URL.replace(/\/$/, "")}/api/events/${selectedItem.id}/`,
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
        const json = await res.json().catch(() => null);

        throw new Error(
          json?.detail ||
            json?.message ||
            "Failed to delete broadcast"
        );
      }

      setData((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          count: Math.max(0, prev.count - 1),
          results: prev.results.filter(
            (item) => item.id !== selectedItem.id
          ),
        };
      });

      setSelectedItem(null);
      setIsEditing(false);
    } catch (err: any) {
      setActionError(
        err?.message || "Something went wrong while deleting."
      );
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date: string) => {
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

  const formatDateTime = (date: string) => {
    try {
      return new Date(date).toLocaleString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return date;
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
            Loading broadcasts...
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
                Unable to load broadcasts
              </h2>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>

              <Button
                onClick={() => fetchEvents()}
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
                <Send className="h-3.5 w-3.5 text-sky-600" />

                <span className="text-xs font-medium text-sky-700">
                  Communications
                </span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                Broadcasted Messages
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                View, edit and manage previously published broadcasts.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-600" />
              </div>

              <div>
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Published
                </p>

                <p className="text-xs font-semibold text-slate-700">
                  {data?.count ?? 0} messages
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {!messages.length ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
              <Send className="h-6 w-6 text-slate-300" />
            </div>

            <h2 className="mt-4 text-sm font-semibold text-slate-800">
              No broadcast messages
            </h2>

            <p className="mx-auto mt-1 max-w-sm text-sm text-slate-400">
              Published broadcasts will appear here once they have
              been created.
            </p>
          </div>
        ) : (
          /*
            DESKTOP:
            Left = message list
            Right = selected message details

            MOBILE:
            List is shown first.
            Selecting a message switches to details.
          */
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[390px_minmax(0,1fr)]">
            {/* =========================
                MESSAGE LIST
            ========================= */}
            <div
              className={`
                ${selectedItem ? "hidden lg:block" : "block"}
                h-fit
              `}
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* LIST HEADER */}
                <div className="border-b border-slate-100 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-semibold text-slate-900">
                        Published Messages
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

                {/* LIST */}
                <div className="divide-y divide-slate-100">
                  {messages.map((item) => {
                    const active = selectedItem?.id === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item)}
                        className={`
                          group flex w-full gap-3 p-4 text-left
                          transition-all duration-200
                          ${
                            active
                              ? "bg-sky-50"
                              : "bg-white hover:bg-slate-50"
                          }
                        `}
                      >
                        {/* THUMBNAIL */}
                        <div className="h-[72px] w-[82px] shrink-0 overflow-hidden rounded-xl bg-slate-100">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Send className="h-5 w-5 text-slate-300" />
                            </div>
                          )}
                        </div>

                        {/* INFO */}
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-1.5">
                            <Calendar className="h-3 w-3 text-sky-500" />

                            <span className="text-[10px] font-medium text-slate-400">
                              {formatDate(item.created_at)}
                            </span>
                          </div>

                          <h3
                            className={`
                              line-clamp-2 text-sm font-semibold leading-5
                              ${
                                active
                                  ? "text-sky-700"
                                  : "text-slate-800"
                              }
                            `}
                          >
                            {item.title}
                          </h3>

                          <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                            {item.content}
                          </p>
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
                ${selectedItem ? "block" : "hidden lg:block"}
                min-w-0
              `}
            >
              {selectedItem ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  {/* DETAILS HEADER */}
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50">
                        <Eye className="h-5 w-5 text-sky-600" />
                      </div>

                      <div>
                        <h2 className="text-sm font-semibold text-slate-900">
                          Broadcast Details
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-400">
                          View and manage this published message.
                        </p>
                      </div>
                    </div>

                    {/* MOBILE BACK */}
                    <button
                      type="button"
                      onClick={handleCloseDetails}
                      className="flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition hover:bg-slate-50 lg:hidden"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  </div>

                  {/* DETAILS CONTENT */}
                  <div className="p-5 sm:p-6">
                    {/* IMAGE */}
                    {selectedItem.image && (
                      <div className="mb-6 overflow-hidden rounded-2xl bg-slate-100">
                        <img
                          src={selectedItem.image}
                          alt={selectedItem.title}
                          className="max-h-[390px] w-full object-cover"
                        />
                      </div>
                    )}

                    {/* META */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700">
                        <CheckCircle2 className="h-3 w-3" />
                        Published
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {formatDate(selectedItem.created_at)}
                      </span>
                    </div>

                    {/* TITLE */}
                    {isEditing ? (
                      <div className="mb-5">
                        <label
                          htmlFor="edited-title"
                          className="mb-2 block text-xs font-semibold text-slate-700"
                        >
                          Broadcast Title
                        </label>

                        <input
                          id="edited-title"
                          value={editedTitle}
                          onChange={(e) =>
                            setEditedTitle(e.target.value)
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-lg font-semibold text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                        />
                      </div>
                    ) : (
                      <h1 className="max-w-4xl text-2xl font-semibold leading-8 tracking-tight text-slate-900 sm:text-3xl">
                        {selectedItem.title}
                      </h1>
                    )}

                    {/* CONTENT */}
                    <div className="mt-5 border-t border-slate-100 pt-5">
                      <div className="mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-sky-500" />

                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Message
                        </span>
                      </div>

                      {isEditing ? (
                        <textarea
                          value={editedContent}
                          onChange={(e) =>
                            setEditedContent(e.target.value)
                          }
                          rows={10}
                          className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-50"
                        />
                      ) : (
                        <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                          {selectedItem.content}
                        </p>
                      )}
                    </div>

                    {/* DATE INFORMATION */}
                    <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Published
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-700">
                          {formatDateTime(selectedItem.created_at)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Last Updated
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-700">
                          {formatDateTime(selectedItem.updated_at)}
                        </p>
                      </div>
                    </div>

                    {/* ACTION MESSAGES */}
                    {actionError && (
                      <div className="mt-5 flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />

                        <p className="text-xs leading-5 text-red-600">
                          {actionError}
                        </p>
                      </div>
                    )}

                    {actionSuccess && (
                      <div className="mt-5 flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />

                        <p className="text-xs leading-5 text-emerald-600">
                          {actionSuccess}
                        </p>
                      </div>
                    )}

                    {/* ACTIONS */}
                    <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                      {isEditing ? (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            disabled={saving}
                            onClick={() => {
                              setIsEditing(false);
                              setEditedTitle(selectedItem.title);
                              setEditedContent(selectedItem.content);
                              setActionError("");
                            }}
                            className="rounded-xl border-slate-200 text-slate-600"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>

                          <Button
                            type="button"
                            disabled={
                              saving ||
                              !editedTitle.trim() ||
                              !editedContent.trim()
                            }
                            onClick={handleEdit}
                            className="rounded-xl bg-sky-600 text-white hover:bg-sky-700"
                          >
                            {saving ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                              </>
                            )}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setActionError("");
                              setActionSuccess("");
                              setIsEditing(true);
                            }}
                            className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Broadcast
                          </Button>

                          <Button
                            type="button"
                            disabled={deleting}
                            onClick={handleDelete}
                            className="rounded-xl bg-red-600 text-white hover:bg-red-700"
                          >
                            {deleting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                              </>
                            ) : (
                              <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </>
                            )}
                          </Button>
                        </>
                      )}
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
                      Select a broadcast
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Select a message from the list to view the full
                      broadcast, edit its content or delete it.
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
        {data && messages.length > 0 && (
          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              disabled={!data.previous || loading}
              onClick={() => {
                if (data.previous) {
                  setSelectedItem(null);
                  fetchEvents(data.previous);
                }
              }}
              className="rounded-xl border-slate-200 text-slate-600"
            >
              Previous
            </Button>

            <div className="text-center">
              <p className="text-xs font-medium text-slate-700">
                {data.count} total broadcasts
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
                  setSelectedItem(null);
                  fetchEvents(data.next);
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