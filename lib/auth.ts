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
  // user: {
  //   additionalFields: {
  //     role: {
  //       type: "string",
  //       required: false,
  //       defaultValue: "influencer",
  //     },

  //     location: {
  //       type: "string",
  //       required: false,
  //       defaultValue: "Tecno",
  //     },
  //     socialMedia: {
  //       type: "string", // Store as a JSON string
  //       required: false,
  //       defaultValue: JSON.stringify([]), // Default is an empty array as a string
  //     },
  //     verified: {
  //       type: "boolean",
  //       required: false,
  //       defaultValue: false,
  //     },
  //     rating: {
  //       type: "number",
  //       required: false,
  //       defaultValue: 0,
  //     },
  //     totalEarnings: {
  //       type: "number",
  //       required: false,
  //       defaultValue: 0,
  //     },
  //     bio: {
  //       type: "string",
  //       required: false,
  //       defaultValue: " ",
  //     },
  //     price: {
  //       type: "number",
  //       required: false,
  //       defaultValue: 0,
  //     },
  //     companyName: {
  //       type: "string",
  //       required: false, // Not strictly required since we can't do conditional logic
  //     },
  //     industry: {
  //       type: "string",
  //       required: false,
  //     },
  //     businessPhone: {
  //       type: "string",
  //       required: false,
  //       pattern: "^\\+?[0-9\\s-]{10,}$",
  //     },
  //     businessSize: {
  //       type: "string",
  //       required: false,
  //       enum: ["startup", "small", "medium", "large"],
  //     },
  //     businessVerified: {
  //       type: "boolean",
  //       required: false,
  //       defaultValue: false,
  //     },
  //     onboarded: {
  //       type: "boolean",
  //       required: false,
  //       defaultValue: false,
  //     },
  //   },
  // },

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
