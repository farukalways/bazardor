"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Social from "./Social";

export default function SignInForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sp.get("redirected")) toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "redir" });
  }, [sp]);

  const submit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const emailValue = f.get("email");
    const passwordValue = f.get("password");

    if (!emailValue || !passwordValue || typeof emailValue !== "string" || typeof passwordValue !== "string") {
      setError("ইমেইল ও পাসওয়ার্ড দিন");
      return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    }

    const email = emailValue.trim();
    const password = passwordValue;

    if (!email || !password) {
      setError("ইমেইল ও পাসওয়ার্ড দিন");
      return toast.error("ইমেইল ও পাসওয়ার্ড দিন");
    }

    setLoading(true);
    setError("");
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message || "সাইন ইন ব্যর্থ হয়েছে");
      return toast.error(error.message || "সাইন ইন ব্যর্থ হয়েছে");
    }

    toast.success("সাইন ইন সফল হয়েছে");
    const nextUrl = sp.get("next");
    router.push(nextUrl || "/");
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-100 border border-base-300">
        <form onSubmit={submit} className="card-body gap-3">
          <h1 className="text-2xl font-bold">সাইন ইন</h1>
          {error && <div className="alert alert-error alert-soft text-sm">{error}</div>}
          <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
          <button disabled={loading} className="btn btn-success text-white">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
          </button>
          <div className="divider text-xs my-1">অথবা</div>
          <Social />
          <p className="text-sm text-center mt-2">
            অ্যাকাউন্ট নেই? <Link href="/signup" className="link link-success">সাইন আপ করুন</Link>
          </p>
        </form>

        
      </div>
        <p className="text-sm text-center mt-2">
            <Link href="/" className="link link-ghost">হোমে ফিরে যান</Link>
          </p>
    </div>
  );
}