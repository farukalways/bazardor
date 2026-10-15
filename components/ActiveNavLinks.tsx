import { usePathname } from "next/navigation";
import NavLinks from "./NavLinks";
import { Category } from "@/types";

export default function ActiveNavLinks({ categories }: { categories: Category[] }) {
  const path = usePathname();
  return <NavLinks categories={categories} path={path} />;
}