import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 57px)" }}
      className="flex items-center justify-center text-white px-4"
    >
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to Your App Starter
        </h1>
        <p className="text-lg text-slate-300">
          This is the public landing page. After authentication, users will
          access protected routes.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/sign-in"
            className="inline-block bg-white text-black font-medium px-6 py-3 rounded-xl shadow hover:bg-slate-100 transition"
          >
            Sign In
          </Link>
          <Link
            href="/auth/sign-up"
            className="inline-block border border-white text-white font-medium px-6 py-3 rounded-xl shadow hover:bg-slate-800 transition"
          >
            Create Account
          </Link>
        </div>

        <div className="text-sm text-slate-500 pt-4">
          Try accessing{" "}
          <Link href="/home" className="text-slate-400 hover:underline">
            /home
          </Link>{" "}
          <Link href="/chat" className="text-slate-400 hover:underline">
            /chat
          </Link>{" "}
          <Link href="/admin" className="text-slate-400 hover:underline">
            /admin
          </Link>{" "}
          (protected route)
          <p>You'll be redirected to login if not authenticated </p>
        </div>
      </div>
    </main>
  );
}
