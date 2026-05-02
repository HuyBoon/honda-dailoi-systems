'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, Menu, X, User as UserIcon, LogOut, Package, Settings } from 'lucide-react';
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
  
  const profileRef = useRef<HTMLDivElement>(null);
  
  const { items, openCart, syncWithBackend, clearCart, mergeGuestCart, lastSyncedUserId } = useCartStore();
  const { user, logout } = useAuthStore();

  // Merge or sync cart when user logs in
  useEffect(() => {
    if (user && mounted) {
      if (lastSyncedUserId !== user.id) {
        if (items.length > 0) {
          mergeGuestCart();
        } else {
          syncWithBackend();
        }
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
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cartItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:pt-6 sm:px-8">
      <div className={`
        container mx-auto max-w-7xl px-6 py-3 rounded-[2rem] transition-all duration-500
        ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-2xl border border-white/20' : 'bg-white shadow-xl border border-gray-100'}
      `}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#CC0000] rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg shadow-red-200">
              <span className="text-white font-black italic text-xl">ĐL</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-black tracking-tighter text-gray-900">HONDA ĐẠI LỢI</span>
              <span className="text-[10px] font-bold text-[#CC0000] tracking-widest uppercase opacity-80">Genuine Excellence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            <NavLink href="/parts">Phụ tùng</NavLink>
            <NavLink href="/categories">Danh mục</NavLink>
            <NavLink href="/vehicles">Dòng xe</NavLink>
            <NavLink href="/about">Giới thiệu</NavLink>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-3 pl-4 pr-3 py-2 w-48 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group border border-transparent hover:border-gray-200"
            >
              <Search className="text-gray-400 group-hover:text-[#CC0000] transition-colors" size={16} />
              <span className="text-xs font-bold text-gray-400">Tìm kiếm...</span>
              <kbd className="ml-auto flex items-center gap-1 px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[9px] font-black text-gray-400">
                /
              </kbd>
            </button>

            <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block" />

            <button 
              onClick={openCart}
              className="relative p-2.5 bg-gray-50 text-gray-900 rounded-xl hover:bg-[#CC0000] hover:text-white transition-all shadow-sm group"
            >
              <ShoppingCart size={18} className="group-hover:scale-110 transition-transform" />
              {mounted && cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#CC0000] text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {mounted && user ? (
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 outline-none"
                >
                  <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center text-sm font-black hover:bg-[#CC0000] transition-all shadow-lg shadow-black/10">
                    {user.email[0].toUpperCase()}
                  </div>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-5 py-4 border-b border-gray-50 mb-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tài khoản của bạn</p>
                      <p className="text-xs text-gray-900 truncate font-black mt-0.5">{user.email}</p>
                    </div>
                    <div className="flex flex-col">
                      <ProfileLink href="/dashboard" icon={LayoutDashboard} label="Tổng quan" onClick={() => setIsProfileOpen(false)} />
                      <ProfileLink href="/profile" icon={UserIcon} label="Hồ sơ cá nhân" onClick={() => setIsProfileOpen(false)} />
                      <ProfileLink href="/orders" icon={Package} label="Đơn mua hàng" onClick={() => setIsProfileOpen(false)} />
                    </div>
                    <div className="h-px bg-gray-50 my-2 mx-4" />
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-red-600 hover:bg-red-50 rounded-2xl transition-all">
                      <LogOut size={16} /> ĐĂNG XUẤT
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#CC0000] transition-all shadow-lg shadow-black/10">
                <UserIcon size={14} /> <span>Đăng nhập</span>
              </Link>
            )}

            <button className="lg:hidden p-2 text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} openCart={openCart} user={user} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link 
      href={href} 
      className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
        isActive ? 'bg-white text-[#CC0000] shadow-sm' : 'text-gray-500 hover:text-gray-900'
      }`}
    >
      {children}
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