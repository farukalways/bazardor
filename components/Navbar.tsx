"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Category } from "@/types";


interface NavbarProps {
  categories: Category[];
}

export default function Navbar({ categories }: NavbarProps) {
  const path = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
 const [date] = useState(() =>
    new Date().toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  );

  const signOut = async (): Promise<void> => {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  const link = (active: boolean): string =>
    `btn btn-sm rounded-full whitespace-nowrap ${active ? "btn-success text-white" : "btn-ghost"}`;

  return (
     <header className="bg-base-100 border-b border-base-300 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="leading-tight">
          <span className="text-xl font-bold text-green-700">🛒 বাজার দর</span>
          <span className="block text-xs text-gray-500 min-h-4">{date}</span>
        </Link>
        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-28" />
          ) : session ? (
            <>
              <Link href="/profile" className="btn btn-sm btn-ghost">
                👤 {session.user.name}
              </Link>
              <button onClick={signOut} className="btn btn-sm btn-outline btn-error">
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-outline btn-success">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-sm btn-success text-white">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>
      <nav className="max-w-6xl mx-auto px-4 pb-3 flex gap-2 overflow-x-auto">
        <Link href="/" className={link(path === "/")}>
          🏠 সব
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/category/${c.slug}`}
            className={link(path === `/category/${c.slug}`)}
          >
            {c.icon} {c.nameBn}
          </Link>
        ))}
      </nav>
    </header>
  );
}