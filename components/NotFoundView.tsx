import Link from "next/link";
export default function NotFoundView({ text = "দুঃখিত, এই পেজটি খুঁজে পাওয়া যায়নি।" }) {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-3">🛒</div>
      <h1 className="text-3xl font-bold mb-2">৪০৪</h1>
      <p className="text-gray-600 mb-6">{text}</p>
      <Link href="/" className="btn btn-success text-white">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
