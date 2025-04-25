import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{ minHeight: "calc(100vh - 57px)" }}
      className="flex items-center justify-center  bg-slate-950 text-white px-4"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Welcome to Your Auth Starter
        </h1>
        <p className="text-lg text-slate-300 max-w-md mx-auto">
          A simple Next.js starter with Better Auth and MongoDB. Fast, secure,
          and ready to build.
        </p>
        <Link
          href="/auth/sign-up"
          className="inline-block bg-white text-black font-medium px-6 py-2 rounded-xl shadow hover:bg-slate-100 transition"
        >
          Get Started
        </Link>
      </div>
    </main>
  );
}
