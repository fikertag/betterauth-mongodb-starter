import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import { sendEmail } from "./email-service";
// import { passkey } from "better-auth/plugins/passkey";
import dbConnect from "@/lib/mongoose";
import mongoose from "mongoose";

await dbConnect();

const db = mongoose.connection.db;

if (!db) {
  throw new Error("Database connection is not established.");
}

export const auth = betterAuth({
  database: mongodbAdapter(db),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,S
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
  //   sendVerificationEmail: async ({ user, url }) => {
  //     await sendEmail({
  //       to: user.email,
  //       subject: "Verify your email address",
  //       html: `Click the link to verify your email: ${url}`,
  //     });
  //   },
  // },

  // plugins: [passkey()],
});
