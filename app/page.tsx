
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";
import { Product } from "@/types";

interface SectionProps {
  id?: string;
  title: string;
  sub?: string;
  items: Product[];
}

function Section({ id, title, sub, items }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-32">
      <h2 className="text-2xl font-bold">{title}</h2>
      {sub && <p className="text-gray-500 text-sm mb-4">{sub}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}

export default async function Home() {
  const products: Product[] = await getProducts();
  const top = (dir: "up" | "down" | "stable"): Product[] =>
    products
      .filter((p) => p.change?.dir === dir)
      .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
      .slice(0, 6);


const productLengthStr = new Intl.NumberFormat('bn-BD').format(products.length);

  return (
    <>
      <section className="bg-linear-to-br from-green-50 to-green-100">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm font-semibold text-green-700 mb-2">আজকের বাজার দর</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-3">আজকের বাজারের দাম এক নজরে</h1>
            <p className="text-gray-600 mb-6">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
            <a href="#সব-পণ্য" className="btn btn-success text-white">সব পণ্য দেখুন</a>
          </div>
          <div className="grid grid-cols-3 gap-3 text-5xl sm:text-6xl bg-white/70 rounded-3xl p-6 text-center">
            {["🍚", "🫘", "🧅", "🥔", "🐟", "🍗", "🥚", "🌶️", "🧄"].map((e) => (
              <span key={e}>{e}</span>
            ))}
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <Section title="আজ দাম বেড়েছে ▲" items={top("up")} />
        <Section title="আজ দাম কমেছে ▼" items={top("down")} />
        <Section id="সব-পণ্য" title="সব পণ্য" sub={`মোট ${productLengthStr} পণ্য দেখানো হচ্ছে`} items={products} />
      </div>
    </>
  );
}