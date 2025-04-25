import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth"; // Import your server-side auth configuration

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(), // Infer additional fields from the server-side auth configuration
  ],
});

export const signIn = async () => {
  await authClient.signIn.social({
    provider: "google",
  });
};
