import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { Resend } from "resend";
// import { EmailTemplate } from "@daveyplate/better-auth-ui/server";
import { admin } from "better-auth/plugins";
import dbConnect from "@/lib/mongoose";
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
    // requireEmailVerification: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        enum: ["user", "admin", "owner"],
      },
    },
  },

  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url, token }, request) => {
  //     const name = user.name || user.email.split("@")[0];

  //     await resend.emails.send({
  //       from: "better-auth-mongodb-starter",
  //       to: user.email,
  //       subject: "Verify your email address",
  //       react: EmailTemplate({
  //         action: "Verify Email",
  //         content: `heloo ${name} /n click the link to verify your email address`,
  //         heading: "Verify Email",
  //         siteName: "bettrAuth starter",
  //         baseUrl: "https://better-auth-mongodb-starter.vercel.app",
  //         url,
  //       }),
  //     });
  //   },
  //   autoSignInAfterVerification: true,
  //   sendOnSignUp: true,
  // },
  plugins: [admin()],
});
