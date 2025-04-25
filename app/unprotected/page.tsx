import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 57px)" }}
      className="flex items-center justify-center bg-gradient-to-br px-6 relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-[500px] h-[500px] bg-indigo-800 rounded-full blur-3xl opacity-20 -translate-x-1/2 animate-pulse" />
      </div>

      {/* Main content */}
      <div className="text-center space-y-6 z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-300 to-white bg-clip-text text-transparent animate-fade-in">
          Welcome to Your Auth Starter
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto animate-fade-in delay-100">
          A clean Next.js template with Better Auth and MongoDB. This page is
          public — no login required to check it out.
        </p>
      </div>
    </main>
  );
}
