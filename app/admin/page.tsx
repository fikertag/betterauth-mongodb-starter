"use client";

import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending: isSessionLoading } =
    authClient.useSession();

  const isAdmin = session?.user?.role === "admin";

  if (isSessionLoading) {
    return (
      <main className="flex items-center justify-center min-h-[calc(100vh-57px)] text-white bg-slate-950">
        <p className="text-slate-300 animate-pulse">Checking admin access...</p>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="flex items-center justify-center min-h-[calc(100vh-57px)] text-white bg-slate-950">
        <p className="text-red-400 text-center">
          🚫 Access Denied. This page is for admins only.
        </p>
      </main>
    );
  }

  return (
    <main
      style={{ minHeight: "calc(100vh - 57px)" }}
      className="flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-indigo-950 px-6 relative overflow-hidden text-white"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-[500px] h-[500px] bg-indigo-800 rounded-full blur-3xl opacity-20 -translate-x-1/2 animate-pulse" />
      </div>

      {/* Admin Content */}
      <div className="text-center space-y-6 z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-300 to-white bg-clip-text text-transparent animate-fade-in">
          Welcome, Admin 🛡️
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto animate-fade-in delay-100">
          You are viewing a protected admin-only page in your Better Auth +
          MongoDB starter.
        </p>
      </div>
    </main>
  );
}
