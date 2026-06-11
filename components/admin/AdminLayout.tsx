"use client";

import { ReactNode } from "react";
import AdminOfasHome from "@/components/admin/AdminOfasHome";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminOfasHome />
      <main className="flex-1 lg:ml-72 pt-14 lg:pt-0 p-6">
        {children}
      </main>
    </div>
  );
}