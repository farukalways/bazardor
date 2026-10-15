"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useSyncExternalStore } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { Category } from "@/types";
import ActiveNavLinks from "./ActiveNavLinks";
import NavLinks from "./NavLinks";

interface NavbarProps {
  categories: Category[];
}

const subscribe = () => () => {};

const getClientDate = (): string =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const getServerDate = (): string => "";



export default function Navbar({ categories }: NavbarProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const date = useSyncExternalStore(subscribe, getClientDate, getServerDate);

  const signOut = async (): Promise<void> => {
    await authClient.signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

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
        <Suspense fallback={<NavLinks categories={categories} path={null} />}>
          <ActiveNavLinks categories={categories} />
        </Suspense>
      </nav>
    </header>
  );
}