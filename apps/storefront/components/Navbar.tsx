'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, User as UserIcon, LogOut, Package, Settings } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { MobileMenuOverlay } from './MobileMenuOverlay';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const [mounted, setMounted] = useState(false);
  
  const profileRef = useRef<HTMLDivElement>(null);
  
  const { items, openCart, syncWithBackend, clearCart } = useCartStore();
  const { user, logout } = useAuthStore();

  // Sync cart when user logs in
  useEffect(() => {
    if (user) {
      syncWithBackend();
    }
  }, [user, syncWithBackend]);

  const handleLogout = () => {
    logout();
    clearCart();
    setIsProfileOpen(false);
  };

  // Xử lý scroll và click outside cho profile dropdown
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'py-3' : 'py-6'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className={`
          flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500
          ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-xl' : 'bg-transparent'}
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
            
            {/* Search Input */}
            <div className="hidden md:flex relative group w-56">
              <input 
                type="text" 
                placeholder="Tìm phụ tùng..."
                className="pl-10 pr-4 py-2 w-full bg-gray-100 border border-transparent rounded-full text-sm outline-none transition-all focus:bg-white focus:border-[#CC0000]/30 focus:shadow-sm focus:ring-2 focus:ring-[#CC0000]/10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors" size={18} />
            </div>

            <button 
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-[#CC0000] transition-colors"
            >
              <ShoppingCart size={22} />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CC0000] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {mounted && user ? (
              // KHU VỰC AVATAR & DROPDOWN MỚI
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 outline-none"
                >
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-sm font-black text-gray-900 hover:bg-[#CC0000] hover:text-white transition-all shadow-sm ring-2 ring-transparent hover:ring-[#CC0000]/20">
                    {user.email[0].toUpperCase()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    
                    {/* Thông tin User */}
                    <div className="px-5 py-3 border-b border-gray-100 mb-2">
                      <p className="text-sm font-bold text-gray-900 truncate">Xin chào!</p>
                      <p className="text-xs text-gray-500 truncate font-medium mt-0.5">{user.email}</p>
                    </div>
                    
                    {/* Các đường link */}
                    <div className="flex flex-col px-2">
                      <Link 
                        href="/profile" 
                        onClick={() => setIsProfileOpen(false)} 
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#CC0000] hover:bg-red-50 rounded-xl transition-all"
                      >
                        <UserIcon size={18} className="text-gray-400" />
                        Thông tin tài khoản
                      </Link>
                      
                      <Link 
                        href="/orders" 
                        onClick={() => setIsProfileOpen(false)} 
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#CC0000] hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Package size={18} className="text-gray-400" />
                        Đơn mua của tôi
                      </Link>
                      
                      <Link 
                        href="/settings" 
                        onClick={() => setIsProfileOpen(false)} 
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:text-[#CC0000] hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Settings size={18} className="text-gray-400" />
                        Cài đặt
                      </Link>
                    </div>

                    <div className="h-px bg-gray-100 my-2 mx-4" />
                    
                    {/* Nút Đăng xuất */}
                    <div className="px-2">
                      <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <LogOut size={18} />
                        Đăng xuất
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">
                <UserIcon size={16} />
                <span>Đăng nhập</span>
              </Link>
            )}

            <button 
              className="lg:hidden p-2 text-gray-700 hover:text-[#CC0000] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        openCart={openCart} 
        user={user} 
      />
      
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
      <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-[#CC0000] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}