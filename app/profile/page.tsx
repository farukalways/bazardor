import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function Profile() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirected=1&next=/profile");
  const u = session.user;
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-100 border border-base-300">
        <div className="card-body items-center text-center gap-2">
          <div className="avatar placeholder">
            <div className="bg-green-100 text-green-700 w-20 rounded-full text-3xl">
              {u.image ? <Image src={u.image} alt={u.name} width={80} height={80} /> : <span>{u.name?.[0]}</span>}
            </div>
          </div>
          <h1 className="text-2xl font-bold">{u.name}</h1>
          <p className="text-gray-500">{u.email}</p>
          <Link href="/profile/update" className="btn btn-success text-white mt-2">আপডেট করুন</Link>
        </div>
      </div>
    </div>
  );
}
