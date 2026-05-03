'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Thêm thư viện Image của Next.js
import { usePathname } from 'next/navigation';
import { Search, ShoppingCart, Menu, X, User as UserIcon, LogOut, Package, LayoutDashboard, Phone, Mail, MapPin, ChevronDown, Heart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { MobileMenuOverlay } from './MobileMenuOverlay';
import { SearchModal } from './SearchModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);
  
  const { items, openCart, syncWithBackend, clearCart, mergeGuestCart, lastSyncedUserId } = useCartStore();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (user && mounted) {
      if (lastSyncedUserId !== user.id) {
        if (items.length > 0) mergeGuestCart();
        else syncWithBackend();
      }
    }
  }, [user, mounted, lastSyncedUserId]);

  const handleLogout = () => {
    logout();
    clearCart();
    setIsProfileOpen(false);
  };

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      
      {/* Top Bar */}
      <div className={`bg-gray-50 transition-all duration-300 overflow-hidden hidden lg:block ${
        isScrolled ? 'h-0 opacity-0' : 'h-[40px] opacity-100 border-b border-gray-100'
      }`}>
        <div className="container mx-auto px-6 lg:px-12 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
              <MapPin size={14} className="text-[#CC0000]" />
              TP. Hồ Chí Minh, Việt Nam
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
              <Phone size={14} className="text-[#CC0000]" />
              090 123 4567
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-500">
              <Mail size={14} className="text-[#CC0000]" />
              cskh@hondadailoi.vn
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/orders" className="text-[11px] font-bold text-gray-500 hover:text-[#CC0000] transition-colors">Tra cứu đơn hàng</Link>
            <Link href="/about" className="text-[11px] font-bold text-gray-500 hover:text-[#CC0000] transition-colors">Hỗ trợ</Link>
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 cursor-pointer">
              VND ₫ <ChevronDown size={12} />
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 cursor-pointer">
              Tiếng Việt <ChevronDown size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`bg-white transition-all duration-300 ${isScrolled ? 'shadow-xl' : 'border-b border-gray-50'}`}>
        <div className="container mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          
          {/* Logo đã được thay bằng Image */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <Image 
              src="/logo-dailoi.png" 
              alt="Honda Đại Lợi Logo" 
              width={48} 
              height={48} 
              className="object-contain transition-transform group-hover:rotate-12"
              priority // Tải ưu tiên cho logo
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">HONDA ĐẠI LỢI</span>
              <span className="text-[9px] font-black text-[#CC0000] tracking-[0.2em] uppercase">Phụ Tùng Chính Hãng</span>
            </div>
          </Link>

          {/* Navigation Links - Centered */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <NavLink href="/">Trang chủ</NavLink>
            <NavLink href="/parts">Phụ tùng</NavLink>
            <NavLink href="/categories">Danh mục</NavLink>
            <NavLink href="/vehicles">Dòng xe</NavLink>
            <NavLink href="/about">Giới thiệu</NavLink>
          </div >

          {/* Action Icons */}
          <div className="flex items-center gap-4 lg:gap-5">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-900 hover:text-[#CC0000] transition-all hover:scale-110"
            >
              <Search size={22} />
            </button>

            {mounted && user ? (
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 text-gray-900 hover:text-[#CC0000] transition-all hover:scale-110"
                >
                  <UserIcon size={22} />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-5 py-4 border-b border-gray-50 mb-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tài khoản</p>
                      <p className="text-xs text-gray-900 truncate font-black mt-0.5">{user.email}</p>
                    </div>
                    <div className="flex flex-col">
                      <ProfileLink href="/profile" icon={UserIcon} label="Hồ sơ cá nhân" onClick={() => setIsProfileOpen(false)} />
                      <ProfileLink href="/orders" icon={Package} label="Đơn mua của tôi" onClick={() => setIsProfileOpen(false)} />
                      {user.role !== 'CUSTOMER' && (
                        <ProfileLink href="http://localhost:3002" icon={LayoutDashboard} label="Trang quản trị (Admin)" onClick={() => setIsProfileOpen(false)} />
                      )}
                    </div>
                    <div className="h-px bg-gray-50 my-2 mx-4" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-red-600 hover:bg-red-50 rounded-2xl transition-all">
                      <LogOut size={16} /> ĐĂNG XUẤT
                    </button>
                  </div>
                )}
              </div>
            ) : (
               <Link href="/login" className="hidden lg:flex p-2 text-gray-900 hover:text-[#CC0000] transition-all hover:scale-110">
                 <UserIcon size={22} />
               </Link>
            )}

           
            <button 
              onClick={openCart}
              className="relative p-2 text-gray-900 hover:text-[#CC0000] transition-all hover:scale-110 group"
            >
              <ShoppingCart size={22} />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#CC0000] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg group-hover:scale-110 transition-transform">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button className="lg:hidden p-2 text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} openCart={openCart} user={user} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link 
      href={href} 
      className={`text-[13px] font-black uppercase tracking-[0.1em] transition-all relative group
        ${isActive ? 'text-[#CC0000]' : 'text-gray-900 hover:text-[#CC0000]'}
      `}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#CC0000] transition-all duration-300 
        ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}
      `} />
    </Link>
  );
}

function ProfileLink({ href, icon: Icon, label, onClick }: any) {
  return (
    <Link href={href} onClick={onClick} className="flex items-center gap-3 px-4 py-3 text-[11px] font-black text-gray-600 hover:text-black hover:bg-gray-50 rounded-2xl transition-all uppercase tracking-tight">
      <Icon size={16} className="text-gray-400" /> {label}
    </Link>
  );
}