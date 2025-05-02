"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function HomePage() {
  const handleEmailVerification = async () => {
    if (session?.user.emailVerified) {
      alert("already verifyed");
      return;
    }
    try {
      await authClient.sendVerificationEmail({
        email: "fikeryilkaltages@gmail.com",
        callbackURL: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { data: session } = authClient.useSession();

  return (
    <main
      style={{ minHeight: "calc(100vh - 57px)" }}
      className="flex items-center justify-center px-4"
    >
      <div className="text-center space-y-10 max-w-4xl mx-auto">
        <div className="animate-fade-in space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome Back
          </h1>
          <p className="text-lg mt-6 max-w-2xl mx-auto">
            You&apos;re now logged in and can access all protected routes.
          </p>
        </div>

        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5 justify-center">
          <Link
            href="/chat"
            className="inline-block border border-current font-medium px-8 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-500 transition text-center"
          >
            Go to Chat
          </Link>
          <Link
            href="/admin"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 text-center"
          >
            View admins page
          </Link>
        </div>

        <div className="pt-10 text-sm space-y-2">
          {!session?.user.emailVerified && (
            <>
              {" "}
              <button
                className=" underline hover:cursor-pointer underline-offset-4 "
                onClick={handleEmailVerification}
              >
                Verify email
              </button>
              <p>
                to force email verifcation 👉 requireEmailVerification: true,
              </p>
            </>
          )}
          <div>
            Quick access:{" "}
            <Link
              href="/auth/settings"
              className="underline underline-offset-4 mr-1"
            >
              /settings
            </Link>{" "}
            <Link href="/chat" className="underline underline-offset-4 mr-1">
              /chat
            </Link>{" "}
            <Link href="/admin" className="underline underline-offset-4 mr-1">
              /admin
            </Link>
          </div>
          <p>You&apos;re currently viewing the protected home page</p>
          <p>
            try accessing{" "}
            <Link href="/" className="underline underline-offset-4">
              &quot; / &quot;
            </Link>{" "}
            you will be redirected to &quot;/home&quot;
          </p>
        </div>
      </div>
    </main>
  );
}
