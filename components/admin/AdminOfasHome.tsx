 "use client";

import { useEffect, useState } from "react";
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
  ChevronRight,
} from "lucide-react";

type AdminUser = {
  username?: string;
  name?: string;
  email?: string;
};

export default function AdminOfasHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("adminUser");

      if (storedUser) {
        setAdminUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to read admin user:", error);
    }
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Volunteers",
      href: "/admin/dashboard/volunteer",
      icon: Users,
    },
    {
      label: "Broadcast",
      href: "/admin/dashboard/broadcast",
      icon: Send,
    },
    {
      label: "Broadcasted",
      href: "/admin/dashboard/broadcasted",
      icon: CheckCircle,
    },
    {
      label: "Campus Chapters",
      href: "/admin/dashboard/chapters",
      icon: CheckCircle,
    },
    {
      label: "Tests",
      href: "/admin/dashboard/test",
      icon: FlaskConical,
    },
    {
      label: "Users",
      href: "/admin/dashboard/users",
      icon: Users,
    },
    {
      label: "Contact Messages",
      href: "/admin/dashboard/contactmessage",
      icon: Settings,
    },
  ];

  const handleLogout = async () => {
    const token = localStorage.getItem("access");

    try {
      if (token && API_URL) {
        await fetch(`${API_URL.replace(/\/$/, "")}/account/logout/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("adminUser");

      router.push("/admin/login");
    }
  };

  const displayName =
    adminUser?.name ||
    adminUser?.username ||
    adminUser?.email ||
    "Administrator";

  const initials = displayName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
     
     
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col
          border-r border-slate-200 bg-white
          shadow-xl shadow-slate-200/30
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:shadow-none
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* =================================================
            SIDEBAR HEADER
        ================================================= */}
       <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
  <Link
    href="/admin/dashboard"
    className="flex items-center gap-3"
  >
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-sky-600 shadow-sm shadow-sky-200">
      <img
        src="/favicon.ico"
        alt="OFAS logo"
        className="h-full w-full object-contain"
      />
    </div>

    <div>
      <p className="text-sm font-semibold tracking-tight text-slate-900">
        OFAS Admin
      </p>

      <p className="text-[11px] text-slate-400">
        Control Panel
      </p>
    </div>
  </Link>

  <button
    type="button"
    onClick={() => setOpen(false)}
    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
    aria-label="Close navigation"
  >
    <X className="h-4 w-4" />
  </button>
</div>
         

        {/* =================================================
            NAVIGATION
        ================================================= */}
        <div className="px-5 pb-2 pt-7">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Management
          </p>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center gap-3 rounded-xl px-3.5 py-3
                  text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? "bg-sky-50 text-sky-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }
                `}
              >
                <span
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-lg
                    transition-colors
                    ${
                      active
                        ? "bg-sky-100 text-sky-600"
                        : "bg-transparent text-slate-400 group-hover:text-slate-600"
                    }
                  `}
                >
                  <Icon className="h-[17px] w-[17px]" />
                </span>

                <span className="flex-1">{item.label}</span>

                {active && (
                  <ChevronRight className="h-3.5 w-3.5 text-sky-500" />
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-5 border-t border-slate-100" />

          {/* Website */}
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-slate-50 hover:text-slate-800"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition group-hover:text-slate-600">
              <Home className="h-[17px] w-[17px]" />
            </span>

            <span>Visit Website</span>
          </Link>
        </nav>

        {/* =================================================
            LOGOUT
        ================================================= */}
        <div className="border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition group-hover:text-red-500">
              <LogOut className="h-[17px] w-[17px]" />
            </span>

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="min-h-screen pt-16 lg:ml-[270px] lg:pt-0">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
 
