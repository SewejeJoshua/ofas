"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const pathname = usePathname();

  // Hide sidebar on login page
  const isLoginPage = pathname === "/admin-login";

  return (
    <div className="min-h-screen flex">
      {/* SIDEBAR (ONLY SHOW IF NOT LOGIN PAGE) */}
      {!isLoginPage && (
        <aside className="w-72 bg-blue-600 text-white">
          Admin Sidebar
        </aside>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}