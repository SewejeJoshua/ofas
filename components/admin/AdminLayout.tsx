"use client";

import { ReactNode } from "react";
import AdminOfasHome from "@/components/admin/AdminOfasHome";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminOfasHome />
      <main className="flex-1 lg:ml-72 p-6">{children}</main>
    </div>
  );
}