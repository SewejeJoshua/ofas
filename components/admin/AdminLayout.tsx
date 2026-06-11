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

  // If login page → no sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // All admin pages → use full dashboard layout
  return (
    <AdminOfasHome>
      {children}
    </AdminOfasHome>
  );
}