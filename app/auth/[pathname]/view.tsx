"use client";

import { AuthCard } from "@daveyplate/better-auth-ui";

export function AuthView({ pathname }: { pathname: string }) {
  return (
    <main className="flex grow flex-col items-center justify-center gap-4 p-4">
      <AuthCard pathname={pathname} />
    </main>
  );
}
