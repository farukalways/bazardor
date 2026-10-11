import { bn, unitBn } from "@/lib/format";
import { TickerProduct } from "@/types";

interface TickerProps {
  products: TickerProduct[];
}

export default function Ticker({ products }: TickerProps) {
  if (!products.length) return null;
  const items = [...products, ...products];
  return (
    <div className="bg-green-800 text-white overflow-hidden py-2 text-sm">
      <div className="marquee gap-8 px-4">
        {items.map((p, i) => {
          const { dir, pct } = p.change || {};
          return (
            <span key={i} className="whitespace-nowrap">
              {p.image} {p.nameBn} {bn(p.today)} টাকা/{unitBn(p.unit).replace("প্রতি ", "")}{" "}
              <b className={dir === "up" ? "text-green-300" : dir === "down" ? "text-red-300" : "text-gray-300"}>
                {dir === "up" ? "▲" : dir === "down" ? "▼" : "—"} {bn(pct || 0, 1)}%
              </b>
            </span>
          );
        })}
      </div>
    </div>
  );
}