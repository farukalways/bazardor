"use client";
import { ChangeEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SortSelect() {
  const router = useRouter();
  const path = usePathname();
  const sp = useSearchParams();
  const change = (e:ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    router.push(v === "default" ? path : `${path}?sort=${v}`);
  };
  return (
    <label className="flex items-center gap-2 text-sm">
      সাজান:
      <select className="select select-sm select-bordered" value={sp.get("sort") || "default"} onChange={change}>
        <option value="default">ডিফল্ট</option>
        <option value="asc">দাম: কম থেকে বেশি</option>
        <option value="desc">দাম: বেশি থেকে কম</option>
      </select>
    </label>
  );
}
