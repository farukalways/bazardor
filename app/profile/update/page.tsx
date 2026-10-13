import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateForm from "@/components/UpdateForm";

export default async function UpdatePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?redirected=1&next=/profile/update");
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-100 border border-base-300">
        <UpdateForm name={session.user.name} />
      </div>
    </div>
  );
}
