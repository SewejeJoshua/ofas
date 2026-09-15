"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  // 🚨 detect admin routes
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER (only public) */}
      {!isAdminRoute && <Header />}

      {/* MAIN CONTENT */}
      <main className="flex-grow">{children}</main>

      {/* FOOTER (only public) */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}