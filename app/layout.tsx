import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { getCategories, getProducts } from "@/lib/api";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html lang="bn" data-theme="light">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar categories={categories} />
        <Ticker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Providers />
      </body>
    </html>
  );
}