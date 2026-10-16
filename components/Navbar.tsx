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

const closeDropdown = (): void => {
  (document.activeElement as HTMLElement | null)?.blur();
};

export default function Navbar({ categories }: NavbarProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const date = useSyncExternalStore(subscribe, getClientDate, getServerDate);

  const signOut = async (): Promise<void> => {
    closeDropdown();
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
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className=" flex items-center gap-2 border-0.5 cursor-pointer px-2 py-1 rounded-xl btn-sm btn-ghost">
  {session.user.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img 
      src={session.user.image}
      alt={session.user.name}
      className="w-6 h-6 rounded-full object-cover"
    />
  ) : (
    <span>👤</span>
  )}
  {session.user.name}
</div>
              <div
                tabIndex={0}
                className="dropdown-content bg-base-100 border border-base-300 rounded-box z-50 mt-2 w-64 p-4 shadow-lg"
              >
                 <Link
                  href="/profile"
                  onClick={closeDropdown}
                  className=" btn-sm btn-ghost w-full justify-start mb-2"
                >
                  Profile
                </Link>
                <p className="font-semibold truncate">{session.user.name}</p>
                <p className="text-sm text-gray-500 break-all mb-3">
                  {session.user.email}
                </p>
               
                <button
                  onClick={signOut}
                  className="btn btn-sm btn-outline btn-error w-full"
                >
                  সাইন আউট
                </button>
              </div>
            </div>
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