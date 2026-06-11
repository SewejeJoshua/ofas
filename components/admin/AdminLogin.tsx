"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_OFAS_API_URL;

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!API_URL) {
      setErrorMsg("API URL is not configured");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);

    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch(`${API_URL}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
          "Invalid username or password"
        );
      }

      // ✅ backend returns: { access, refresh }
      if (!data?.access) {
        throw new Error("Login failed: access token missing");
      }

      // ✅ STORE TOKENS CONSISTENTLY
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh || "");

      // optional user info
      if (data?.user) {
        localStorage.setItem("adminUser", JSON.stringify(data.user));
      }

      // redirect
      router.push("/admin/dashboard");

    } catch (error: any) {
      setErrorMsg(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-sky-50 via-white to-blue-50" />

      {/* BLOBS */}
      <motion.div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-sky-300/20 blur-3xl rounded-full -z-10" />
      <motion.div className="absolute bottom-[-120px] right-[-120px] w-[450px] h-[450px] bg-blue-300/20 blur-3xl rounded-full -z-10" />

      {/* MOUSE GLOW */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none fixed w-[280px] h-[280px] bg-sky-300/20 blur-3xl rounded-full"
      />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="max-w-md mx-auto w-full"
        >
          <div className="rounded-3xl border bg-white/70 backdrop-blur-2xl shadow-lg p-10">

            <h1 className="text-3xl font-bold text-center text-gray-900">
              Admin Login
            </h1>

            <p className="text-center text-sm text-gray-500 mt-2">
              Access dashboard control panel
            </p>

            <form onSubmit={handleLogin} className="mt-8 space-y-5">

              <div>
                <label className="text-sm text-gray-600">Username</label>
                <input
                  name="username"
                  type="text"
                  required
                  className="mt-2 w-full rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Password</label>
                <input
                  name="password"
                  type="password"
                  required
                  className="mt-2 w-full rounded-xl px-4 py-3 border outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {errorMsg && (
                <p className="text-sm text-red-500 text-center">
                  {errorMsg}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full py-6 text-lg bg-blue-500 text-white"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

            </form>

            <p className="text-center text-xs text-gray-400 mt-6">
              Secure admin access only
            </p>

          </div>
        </motion.div>
      </Container>
    </section>
  );
}