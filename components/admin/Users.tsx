"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  const getToken = () => localStorage.getItem("access");

  const handleAuthFail = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("adminUser");
    router.push("/admin");
  };

  const fetchUsers = async (url?: string) => {
    const token = getToken();

    if (!token) {
      handleAuthFail();
      return;
    }

    if (!API_URL && !url) {
      setError("API URL not configured");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const endpoint = url || `${API_URL}/api/join/`;

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
        throw new Error(json?.detail || "Failed to load users");
      }

      setData(json);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="w-full p-8 text-gray-600">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full text-gray-900 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Newsletter Subscribers
          </h2>
          <p className="text-sm text-gray-500">
            Total: {data?.count ?? 0}
          </p>
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-gray-900">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-4 text-left font-semibold">ID</th>
              <th className="p-4 text-left font-semibold">Email</th>
            </tr>
          </thead>

          <tbody>
            {data?.results?.map((u) => (
              <tr
                key={u.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="p-4 text-gray-900">{u.id}</td>
                <td className="p-4 text-gray-700">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between pt-4 border-t">
        <Button
          variant="outline"
          disabled={!data?.previous}
          onClick={() =>
            data?.previous && fetchUsers(data.previous)
          }
        >
          Previous
        </Button>

        <Button
          disabled={!data?.next}
          onClick={() =>
            data?.next && fetchUsers(data.next)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}