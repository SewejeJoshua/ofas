"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Send,
  Mail,
  Activity,
} from "lucide-react";

export default function AdminOfasDash() {
  const [name, setName] = useState("Admin");

  useEffect(() => {
    const stored = localStorage.getItem("adminUser");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (parsed?.username || parsed?.name) {
          setName(parsed.username || parsed.name);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Welcome back, <span className="font-semibold">{name}</span> 👋
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Volunteers
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-600">
                —
              </h2>
            </div>

            <div className="bg-blue-50 p-3 rounded-xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Broadcasts
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-600">
                —
              </h2>
            </div>

            <div className="bg-green-50 p-3 rounded-xl">
              <Send className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Newsletter Users
              </p>

              <h2 className="mt-2 text-3xl font-bold text-purple-600">
                —
              </h2>
            </div>

            <div className="bg-purple-50 p-3 rounded-xl">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* SYSTEM STATUS */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-50 p-2 rounded-lg">
            <Activity className="h-5 w-5 text-green-600" />
          </div>

          <h2 className="text-lg font-semibold text-gray-900">
            System Status
          </h2>
        </div>

        <div className="rounded-xl bg-green-50 border border-green-200 p-4">
          <p className="text-green-800 font-medium">
            All systems operational
          </p>

          <p className="mt-1 text-sm text-green-700">
            You can manage volunteers, broadcasts, asthma test
            submissions, campus chapter applications, and newsletter
            subscribers from the sidebar.
          </p>
        </div>
      </div>

      {/* QUICK INFO */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Quick Overview
        </h2>

        <p className="text-gray-600 leading-relaxed">
          Use the navigation menu to review volunteer applications,
          publish broadcast events, view newsletter subscribers,
          manage asthma assessment submissions, and review campus
          chapter applications.
        </p>
      </div>
    </div>
  );
}