"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  UserCircle,
  Home,
  Users,
  Settings,
  CheckCircle,
  Send,
  FlaskConical,
} from "lucide-react";

type Props = {
  children: ReactNode;
};

export default function AdminOfasHome({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  const navItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm font-medium";

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  const handleLogout = async () => {
    const token = localStorage.getItem("access");

    try {
      if (token && API_URL) {
        await fetch(`${API_URL}/account/logout/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (err) {
      console.log("Logout error:", err);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("adminUser");

      router.push("/admin");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b z-40 flex items-center justify-between px-4">
        <h2 className="font-bold text-blue-600">OFAS Admin</h2>

        <button onClick={() => setOpen(true)}>
          <Menu size={26} className="text-blue-600" />
        </button>
      </div>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-50
          bg-gradient-to-b from-blue-600 to-sky-500
          text-white flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <span className="text-lg font-bold">OFAS Admin</span>

          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3 p-5 border-b border-white/20">
          <UserCircle size={42} />
          <div>
            <p className="font-semibold">Admin</p>
            <p className="text-xs opacity-80">Dashboard</p>
          </div>
        </div>

        {/* NAV */}
        <nav className="flex-1 flex flex-col gap-2 p-4 overflow-y-auto">

          <Link
            href="/admin/dashboard"
            onClick={() => setOpen(false)}
            className={`${navItem} ${
              isActive("/admin/dashboard")
                ? "bg-white text-blue-600"
                : "text-white/90 hover:bg-white/10"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/admin/volunteers"
            onClick={() => setOpen(false)}
            className={`${navItem} ${
              isActive("/admin/volunteers")
                ? "bg-white text-blue-600"
                : "text-white/90 hover:bg-white/10"
            }`}
          >
            <Users size={18} />
            Volunteers
          </Link>

          <Link
            href="/admin/broadcast"
            onClick={() => setOpen(false)}
            className={`${navItem} ${
              isActive("/admin/broadcast")
                ? "bg-white text-blue-600"
                : "text-white/90 hover:bg-white/10"
            }`}
          >
            <Send size={18} />
            Broadcast
          </Link>

          <Link
            href="/admin/broadcasted"
            onClick={() => setOpen(false)}
            className={`${navItem} ${
              isActive("/admin/broadcasted")
                ? "bg-white text-blue-600"
                : "text-white/90 hover:bg-white/10"
            }`}
          >
            <CheckCircle size={18} />
            Broadcasted
          </Link>

          <Link
            href="/admin/test"
            onClick={() => setOpen(false)}
            className={`${navItem} ${
              isActive("/admin/test")
                ? "bg-white text-blue-600"
                : "text-white/90 hover:bg-white/10"
            }`}
          >
            <FlaskConical size={18} />
            Tests
          </Link>

          <Link
            href="/admin/users"
            onClick={() => setOpen(false)}
            className={`${navItem} ${
              isActive("/admin/users")
                ? "bg-white text-blue-600"
                : "text-white/90 hover:bg-white/10"
            }`}
          >
            <Users size={18} />
            Users
          </Link>

          <Link
            href="/admin/contact"
            onClick={() => setOpen(false)}
            className={`${navItem} ${
              isActive("/admin/contact")
                ? "bg-white text-blue-600"
                : "text-white/90 hover:bg-white/10"
            }`}
          >
            <Settings size={18} />
            Contact Messages
          </Link>

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`${navItem} text-white/80 hover:bg-white/10`}
          >
            <Home size={18} />
            Home
          </Link>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-white/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-72 pt-14 lg:pt-0">
        <div className="p-6 lg:p-10 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}