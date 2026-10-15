"use client";
import { useRouter } from "next/navigation";
import { useState, SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

interface UpdateFormProps {
  name: string;
  email?: string;
}

const MAX_FILE_SIZE = 1024 * 1024; // 1MB

const readAsDataURL = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export default function UpdateForm({ name, email }: UpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const submit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameValue = formData.get("name");
    const file = formData.get("file");

    if (!nameValue || typeof nameValue !== "string") {
      return toast.error("নাম দিন");
    }

    const v = nameValue.trim();
    if (!v) return toast.error("নাম দিন");

    const data: { name: string; image?: string } = { name: v };

    if (file instanceof File && file.size > 0) {
      if (!file.type.startsWith("image/")) {
        return toast.error("শুধু ছবি দিন");
      }
      if (file.size > MAX_FILE_SIZE) {
        return toast.error("ছবি ১MB এর বেশি হতে পারবে না");
      }
      data.image = await readAsDataURL(file);
    }

    setLoading(true);
    const { error } = await authClient.updateUser(data);
    setLoading(false);

    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="card-body gap-4">
      {/* Top bar: profile | name and email ---- sign out */}
      <div className="flex items-center justify-between gap-3 border-b border-base-300 pb-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-semibold">Profile</span>
          <span className="text-base-300">|</span>
          <div className="min-w-0 leading-tight">
            <p className="font-medium truncate">{name}</p>
            {email && (
              <p className="text-xs opacity-60 truncate">{email}</p>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="btn btn-error btn-outline btn-sm shrink-0"
        >
          Sign out
        </button>
      </div>

      {/* Information form */}
      <form onSubmit={submit} className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">Information</h1>
        <input
          name="name"
          defaultValue={name}
          placeholder="নাম"
          className="input input-bordered w-full"
        />
        <input
          name="file"
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />
        <button disabled={loading} className="btn btn-success text-white">
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}