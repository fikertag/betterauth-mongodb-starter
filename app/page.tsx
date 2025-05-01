"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 57px)" }}
      className="flex items-center justify-center px-4"
    >
      <div className="text-center space-y-8 max-w-5xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to Your App Starter
          </h1>
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            This is the public landing page. After authentication, users will
            access protected routes.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/sign-in"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Sign In
          </Link>
          <Link
            href="/auth/sign-up"
            className="inline-block border border-current font-medium px-8 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-500 transition"
          >
            Create Account
          </Link>
        </div>

        <div className="text-sm pt-5">
          Try accessing{" "}
          <Link href="/home" className="underline underline-offset-4">
            /home
          </Link>{" "}
          <Link href="/chat" className="underline underline-offset-4">
            /chat
          </Link>{" "}
          <Link href="/admin" className="underline underline-offset-4">
            /admin
          </Link>{" "}
          (protected routes)
          <p className="mt-1">
            You'll be redirected to login if not authenticated
          </p>
        </div>
      </div>
    </main>
  );
}
