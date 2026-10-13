import Link from "next/link";
import { bn, unitBn } from "@/lib/format";
import { PriceChange, Product } from "@/types";



interface ChangeBadgeProps {
  change?: PriceChange;
}

interface ProductCardProps {
  p: Product;
}

export function ChangeBadge({ change }: ChangeBadgeProps) {
  const dir = change?.dir;
  const cls =
    dir === "up"
      ? "badge-success"
      : dir === "down"
      ? "badge-error"
      : "badge-ghost";
  const sym = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";

  return (
    <span className={`badge ${cls} badge-soft font-semibold`}>
      {sym} {bn(change?.pct || 0, 1)}%
    </span>
  );
}

export default function ProductCard({ p }: ProductCardProps) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="card bg-base-100 border border-base-300 hover:shadow-lg hover:-translate-y-0.5 transition"
    >
      <div className="card-body p-4 gap-1">
        <div className="text-4xl">{p.image}</div>
        <h3 className="font-bold text-lg">{p.nameBn}</h3>
        <p className="text-sm text-gray-500">{unitBn(p.unit)}</p>
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="font-bold text-red-600">{bn(p.today)} টাকা</p>
          </div>
          <ChangeBadge change={p.change} />
        </div>
      </div>
    </Link>
  );
}