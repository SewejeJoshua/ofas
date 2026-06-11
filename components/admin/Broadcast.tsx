"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Broadcast() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getToken();

      if (!token) return handleAuthFail();
      if (!API_URL) throw new Error("API URL is not configured");

      const payload = {
        title: title.trim(),
        image: image.trim(),
        content: content.trim(),
      };

      const res = await fetch(`${API_URL}/api/events/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      console.log("API response:", data);

      if (!res.ok) {
        throw new Error(
          typeof data === "string"
            ? data
            : JSON.stringify(data, null, 2)
        );
      }

      setSuccess("Broadcast created successfully!");

      setTitle("");
      setImage("");
      setContent("");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create Broadcast Event</h2>
        <p className="text-sm text-gray-500">
          Publish updates to all users
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl bg-white border rounded-2xl shadow-sm p-6 space-y-5"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-xl p-3"
          placeholder="Title"
          required
        />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded-xl p-3"
          placeholder="Image URL"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-xl p-3 min-h-[140px]"
          placeholder="Content"
          required
        />

        {error && (
          <pre className="text-sm text-red-600 bg-red-50 p-3 rounded-lg whitespace-pre-wrap">
            {error}
          </pre>
        )}

        {success && (
          <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
            {success}
          </p>
        )}

        <Button className="w-full" disabled={loading}>
          {loading ? "Publishing..." : "Publish Broadcast"}
        </Button>
      </form>
    </div>
  );
}