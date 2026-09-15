"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  User,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  /* =========================
     MOUSE MOVEMENT
  ========================= */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [mouseX, mouseY]);

  /* =========================
     LOGIN
  ========================= */
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setErrorMsg("");

    if (!API_URL) {
      setErrorMsg(
        "The admin system is not properly configured. Please contact the administrator."
      );
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);

    const username = String(formData.get("username") || "").trim();
    const password = String(formData.get("password") || "");

    if (!username || !password) {
      setErrorMsg("Please enter your username and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.detail ||
            data?.message ||
            data?.error ||
            "Invalid username or password."
        );
      }

      /* =========================
         ACCESS TOKEN
      ========================= */
      if (!data?.access) {
        throw new Error(
          "Login was unsuccessful because no access token was returned."
        );
      }

      /* =========================
         STORE AUTH DATA
      ========================= */
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh || "");

      if (data?.user) {
        localStorage.setItem("adminUser", JSON.stringify(data.user));
      }

      /* =========================
         REDIRECT
      ========================= */
      router.push("/admin/dashboard/dashboard");
    } catch (error) {
      if (error instanceof TypeError) {
        setErrorMsg(
          "Unable to connect to the server. Please check your internet connection and try again."
        );
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-slate-50">
      {/* =========================
          BACKGROUND
      ========================= */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-sky-50 via-white to-blue-100" />

      {/* =========================
          BACKGROUND GRID
      ========================= */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* =========================
          GLOW ORBS
      ========================= */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-sky-300/30 blur-[120px] -z-10"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-40 h-[550px] w-[550px] rounded-full bg-blue-300/30 blur-[130px] -z-10"
      />

      {/* =========================
          MOUSE GLOW
      ========================= */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none fixed z-0 h-[300px] w-[300px] rounded-full bg-sky-300/10 blur-[90px]"
      />

      <Container>
        <div className="relative z-10 w-full max-w-md mx-auto px-4">
          {/* =========================
              BACK TO HOME
          ========================= */}
          

          {/* =========================
              LOGIN CARD
          ========================= */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            {/* CARD GLOW */}
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-sky-300/20 via-blue-400/20 to-indigo-300/20 blur-xl" />

            <div className="relative overflow-hidden rounded-[30px] border border-white/70 bg-white/85 p-7 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-2xl sm:p-10">
              {/* =========================
                  TOP ICON
              ========================= */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.5,
                    type: "spring",
                  }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 shadow-lg shadow-blue-500/20"
                >
                  <LockKeyhole
                    size={28}
                    strokeWidth={2}
                    className="text-white"
                  />
                </motion.div>
              </div>

              {/* =========================
                  HEADING
              ========================= */}
              <div className="mt-6 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Admin Login
                </h1>

                 
              </div>

              {/* =========================
                  SECURITY BADGE
              ========================= */}
            

              {/* =========================
                  FORM
              ========================= */}
              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                {/* USERNAME */}
                <div>
                  <label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>

                  <div className="relative mt-2">
                    <User
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      disabled={loading}
                      placeholder="Enter your username"
                      className="h-13 w-full rounded-2xl border border-gray-200 bg-gray-50/70 pl-11 pr-4 text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                  </div>

                  <div className="relative mt-2">
                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      disabled={loading}
                      placeholder="Enter your password"
                      className="h-13 w-full rounded-2xl border border-gray-200 bg-gray-50/70 pl-11 pr-12 text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={loading}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700 disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* =========================
                    ERROR MESSAGE
                ========================= */}
                {errorMsg && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    <AlertCircle
                      size={18}
                      className="mt-0.5 shrink-0"
                    />

                    <p>{errorMsg}</p>
                  </motion.div>
                )}

                {/* =========================
                    LOGIN BUTTON
                ========================= */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="group relative h-13 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-700 hover:to-sky-600 hover:shadow-xl hover:shadow-blue-500/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        Sign in to dashboard
                      </>
                    )}
                  </span>
                </Button>
              </form>

              {/* =========================
                  FOOTER
              ========================= */}
               <div className="mt-8 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={14} />
                  
                </div>
              </div>
            </div>
          </motion.div>

          {/* =========================
              BOTTOM TEXT
          ========================= */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-center text-xs text-gray-400"
          >
            © {new Date().getFullYear()} Admin Portal. All rights reserved.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}