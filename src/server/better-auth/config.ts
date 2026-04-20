import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { env } from "~/env";
import { db } from "~/server/db";

const isProd = env.NODE_ENV === "production";

const authOptions: BetterAuthOptions = {
  database: prismaAdapter(db, {
    provider: "postgresql", // or "sqlite" or "mysql"
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL as string,
  trustedOrigins: [
    env.BETTER_AUTH_URL,
    process.env.WEB_ORIGIN ?? "http://localhost:3000",
    "http://127.0.0.1:3000",
  ],
  account: {
    // Local OAuth redirects can lose state cookies on non-HTTPS origins.
    // Keep strict state validation enabled in production.
    skipStateCookieCheck: !isProd,
  },
  advanced: {
    useSecureCookies: isProd,
    defaultCookieAttributes: isProd
      ? { sameSite: "none", secure: true }
      : { sameSite: "lax", secure: false },
  },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: `${env.BETTER_AUTH_URL}/api/auth/callback/github`,
    },
    google: {
      clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
      redirectURI: `${env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
};

export const auth = betterAuth(authOptions);

export type Session = typeof auth.$Infer.Session;
