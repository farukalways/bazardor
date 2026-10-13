"use client";
import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface UpdateFormProps {
  name: string;
}

export default function UpdateForm({ name }: UpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameValue = formData.get("name");
    
    if (!nameValue || typeof nameValue !== "string") {
      return toast.error("নাম দিন");
    }

    const v = nameValue.trim();
    if (!v) return toast.error("নাম দিন");

    setLoading(true);
    const { error } = await authClient.updateUser({ name: v });
    setLoading(false);

    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="card-body gap-3">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <input name="name" defaultValue={name} placeholder="নাম" className="input input-bordered w-full" />
      <button disabled={loading} className="btn btn-success text-white">
        {loading ? <span className="loading loading-spinner loading-sm" /> : "Update Information"}
      </button>
    </form>
  );
}