'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { items, openCart } = useCartStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'py-3' : 'py-6'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`
          flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500
          ${isScrolled ? 'glass shadow-xl' : 'bg-transparent'}
        `}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#CC0000] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <span className="text-white font-black italic text-xl">ĐL</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tighter text-gray-900">HONDA ĐẠI LỢI</span>
              <span className="text-[10px] font-bold text-[#CC0000] tracking-widest uppercase opacity-80">Parts & Services</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink href="/parts">Phụ tùng</NavLink>
            <NavLink href="/categories">Danh mục</NavLink>
            <NavLink href="/vehicles">Dòng xe</NavLink>
            <NavLink href="/about">Giới thiệu</NavLink>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <input 
                type="text" 
                placeholder="Tìm phụ tùng..."
                className="pl-10 pr-4 py-2 w-48 bg-gray-100 border-none rounded-full text-sm focus:w-64 transition-all focus:ring-2 focus:ring-[#CC0000]/20"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors" size={18} />
            </div>

            <button 
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-[#CC0000] transition-colors"
            >
              <ShoppingCart size={22} />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#CC0000] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <Link href="/login" className="hidden md:flex p-2 text-gray-700 hover:text-[#CC0000] transition-colors">
              <User size={22} />
            </Link>

            <button 
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        fixed inset-0 bg-white z-40 transition-transform duration-500 lg:hidden
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl font-black uppercase tracking-widest">
          <Link href="/parts" onClick={() => setIsMenuOpen(false)}>Phụ tùng</Link>
          <Link href="/categories" onClick={() => setIsMenuOpen(false)}>Danh mục</Link>
          <Link href="/vehicles" onClick={() => setIsMenuOpen(false)}>Dòng xe</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>Giới thiệu</Link>
          <div className="flex gap-6 mt-8">
            <Link href="/cart" className="p-4 bg-gray-50 rounded-2xl"><ShoppingCart size={32} /></Link>
            <Link href="/login" className="p-4 bg-gray-50 rounded-2xl"><User size={32} /></Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-sm font-bold text-gray-600 hover:text-[#CC0000] transition-colors uppercase tracking-wider relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#CC0000] transition-all group-hover:w-full" />
    </Link>
  );
}
