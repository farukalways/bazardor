import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProduct } from "@/lib/api";
import { bn, unitBn } from "@/lib/format";
import { ChangeBadge } from "@/components/ProductCard";
import { MarketPrice, Product } from "@/types";



interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?redirected=1&next=${encodeURIComponent("/product/" + slug)}`);

  const p: Product | null = await getProduct(slug);
  if (!p) notFound();

  const ms = p.markets || [];
  const min = ms.length ? Math.min(...ms.map((m) => m.min)) : p.today;
  const max = ms.length ? Math.max(...ms.map((m) => m.max)) : p.today;
  const avg = ms.length ? Math.round(ms.reduce((s, m) => s + (m.min + m.max) / 2, 0) / ms.length) : p.today;
  
  const groups = ms.reduce<Record<string, MarketPrice[]>>((acc, m) => {
    (acc[m.division] ||= []).push(m);
    return acc;
  }, {});

  const stat = (label: string, v: number) => (
    <div className="stat bg-base-100 border border-base-300 rounded-box">
      <div className="stat-title">{label}</div>
      <div className="stat-value text-2xl">{bn(v)} টাকা</div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <section className="card bg-base-100 border border-base-300">
        <div className="card-body">
          <div className="flex items-center gap-3">
            <span className="text-5xl">{p.image}</span>
            <div>
              <h1 className="text-3xl font-bold">{p.nameBn}</h1>
              <p className="text-gray-500 text-sm">
                {p.nameBn}-এর আজকের গড় দাম {bn(p.today)} টাকা, {unitBn(p.unit)}।
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Link href={`/category/${p.category}`} className="badge badge-success badge-soft">
              {p.categoryIcon} {p.categoryNameBn}
            </Link>
            <span className="badge badge-ghost">{unitBn(p.unit)}</span>
            <ChangeBadge change={p.change} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {stat("সর্বনিম্ন দাম", min)}
            {stat("সর্বোচ্চ দাম", max)}
            {stat("গড় দাম", avg)}
            {stat("আজকের দাম", p.today)}
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm text-center mt-2 text-gray-600">
            <span>গতকাল: {bn(p.yesterday)} টাকা</span>
            <span>গত সপ্তাহ: {bn(p.lastWeek)} টাকা</span>
            <span>গত মাস: {bn(p.lastMonth)} টাকা</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">বাজারভিত্তিক আজকের দাম</h2>
        {Object.entries(groups).map(([div, list]) => (
          <div key={div} className="mb-6">
            <h3 className="font-semibold text-green-700 mb-2">📍 {div}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {list.map((m) => (
                <div key={m.market} className="card bg-base-100 border border-base-300 p-4">
                  <p className="font-medium">{m.market}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    সর্বনিম্ন <b className="text-green-700">{bn(m.min)}</b> — সর্বোচ্চ <b className="text-red-600">{bn(m.max)}</b> টাকা
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}