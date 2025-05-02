import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { Resend } from "resend";
// import { EmailTemplate } from "@daveyplate/better-auth-ui/server";
import { admin } from "better-auth/plugins";
import dbConnect from "@/lib/mongoose";
import { sendEmail } from "@/lib/email-service";
import mongoose from "mongoose";

// const resend = new Resend(process.env.RESEND_API_KEY);

await dbConnect();

const db = mongoose.connection.db;

if (!db) {
  throw new Error("Database connection is not established.");
}

export const auth = betterAuth({
  trustedOrigins: ["http://localhost:3000"],
  database: mongodbAdapter(db),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset Password",
        html: `Click the link to reset your password: ${url}`,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        enum: ["user", "admin"],
      },
    },
  },

  emailVerification: {
    enabled: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: `Click the link to verify your email: ${url}`,
      });
    },
  },
  plugins: [admin()],
});
