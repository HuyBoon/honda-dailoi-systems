import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Honda Đại Lợi - Phụ tùng chính hãng',
  description: 'Hệ thống quản lý và bán lẻ phụ tùng xe máy Honda chính hãng',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Toaster position="top-right" />
        <Navbar />
        <CartSidebar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
