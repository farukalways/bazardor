"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";
import toast from "react-hot-toast";
import Social from "./Social";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nameValue = f.get("name");
    const emailValue = f.get("email");
    const passwordValue = f.get("password");
    const confirmPasswordValue = f.get("confirmPassword");

    const fail = (m: string) => { 
      setError(m); 
      toast.error(m); 
    };

    if (!nameValue || !emailValue || !passwordValue || !confirmPasswordValue || 
        typeof nameValue !== "string" || 
        typeof emailValue !== "string" || 
        typeof passwordValue !== "string" ||
        typeof confirmPasswordValue !== "string") {
      return fail("সব ঘর পূরণ করুন");
    }

    const name = nameValue.trim();
    const email = emailValue.trim();
    const password = passwordValue;
    const confirmPassword = confirmPasswordValue;

    if (!name || !email || !password || !confirmPassword) return fail("সব ঘর পূরণ করুন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirmPassword) return fail("পাসওয়ার্ড দুটি মিলছে না");
    
    setLoading(true);
    setError("");

    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);
    
    if (error) return fail(error.message || "সাইন আপ ব্যর্থ হয়েছে");
    
    toast.success("সাইন আপ সফল! এবার সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-100 border border-base-300">
        <form onSubmit={submit} className="card-body gap-3">
          <h1 className="text-2xl font-bold">সাইন আপ</h1>
          {error && <div className="alert alert-error alert-soft text-sm">{error}</div>}
          <input name="name" placeholder="নাম" className="input input-bordered w-full" />
          <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)" className="input input-bordered w-full" />
          <input name="confirmPassword" type="password" placeholder="পাসওয়ার্ড নিশ্চিত করুন" className="input input-bordered w-full" />
          <button disabled={loading} className="btn btn-success text-white">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "রেজিস্টার"}
          </button>
          <div className="divider text-xs my-1">অথবা</div>
          <Social />
          <p className="text-sm text-center mt-2">
            আগে থেকেই অ্যাকাউন্ট আছে? <Link href="/signin" className="link link-success">সাইন ইন করুন</Link>
          </p>
        </form>
      </div>
    </div>
  );
}