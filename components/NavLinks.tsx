import { Category } from "@/types";
import Link from "next/link";

const link = (active: boolean): string =>
  `btn btn-sm rounded-full whitespace-nowrap ${active ? "btn-success text-white" : "btn-ghost"}`;

export default function NavLinks({
  categories,
  path,
}: {
  categories: Category[];
  path: string | null;
}) {
  return (
    <>
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
    </>
  );
}