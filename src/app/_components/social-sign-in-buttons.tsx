"use client";

import { authClient } from "~/server/better-auth/client";

export function SocialSignInButtons() {
  const signInWithProvider = async (provider: "github" | "google") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  return (
    <>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={() => void signInWithProvider("github")}
        type="button"
      >
        Sign in with Github
      </button>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        onClick={() => void signInWithProvider("google")}
        type="button"
      >
        Sign in with Google
      </button>
    </>
  );
}
