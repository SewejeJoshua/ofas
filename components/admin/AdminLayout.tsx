"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminOfasHome from "@/components/admin/AdminOfasHome";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin-login";

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR WRAPPER */}
      {!isLoginPage && <AdminOfasHome />}

      {/* MAIN CONTENT */}
      <main className="flex-1">{children}</main>
    </div>
  );
}