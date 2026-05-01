import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Honda Đại Lợi | Phụ tùng xe máy chính hãng',
  description: 'Chuyên cung cấp phụ tùng xe máy Honda chính hãng, uy tín hàng đầu.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-[#F5F5F7] text-gray-900 font-sans antialiased`}>
        <Navbar />
        <CartSidebar />
        <main className="min-h-screen pt-24">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
