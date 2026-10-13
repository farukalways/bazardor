"use client";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "github";

export default function Social() {
  const go = (provider: SocialProvider) => {
    authClient.signIn.social({ provider, callbackURL: "/" });
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <button 
        type="button" 
        onClick={() => go("google")} 
        className="btn btn-outline btn-sm"
      >
        Google
      </button>
      <button 
        type="button" 
        onClick={() => go("github")} 
        className="btn btn-outline btn-sm"
      >
        GitHub
      </button>
    </div>
  );
}