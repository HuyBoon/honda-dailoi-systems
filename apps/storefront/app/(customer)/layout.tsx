'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, Package, Settings, LogOut, ChevronRight, LayoutDashboard, CreditCard, Bell } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';

const CUSTOMER_MENUS = [
  { 
    name: 'Tổng quan', 
    path: '/dashboard', 
    icon: LayoutDashboard,
    desc: 'Xem nhanh hoạt động'
  },
  { 
    name: 'Hồ sơ cá nhân', 
    path: '/profile', 
    icon: User,
    desc: 'Quản lý thông tin của bạn'
  },
  { 
    name: 'Đơn hàng', 
    path: '/orders', 
    icon: Package,
    desc: 'Lịch sử mua hàng'
  },
  { 
    name: 'Cài đặt', 
    path: '/settings', 
    icon: Settings,
    desc: 'Bảo mật & Thông báo'
  },
];

export default function CustomerLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, _hasHydrated, logout } = useAuthStore();
  const { clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  const isAuthPage = pathname === '/login' || pathname === '/register';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && _hasHydrated) {
      if (!user && !isAuthPage) {
        router.replace('/login');
      }
      if (user && isAuthPage) {
        router.replace('/');
      }
    }
  }, [mounted, _hasHydrated, user, isAuthPage, router]);

  const handleLogout = () => {
    logout();
    clearCart();
    router.push('/login');
  };

  if (!mounted || !_hasHydrated) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[#CC0000] rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Đang khởi tạo...</p>
      </div>
    );
  }

  if (isAuthPage) return <>{children}</>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Mobile Navigation - Scrollable */}
        <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 mb-6 no-scrollbar">
          {CUSTOMER_MENUS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-black text-white shadow-lg shadow-black/10' 
                    : 'bg-white text-gray-500 border border-gray-100'
                }`}
              >
                <item.icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 shrink-0 sticky top-32">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-gray-100">
              
              {/* User Identity Card */}
              <div className="flex items-center gap-4 mb-10 group cursor-pointer">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    {user.email[0].toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">Khách hàng</p>
                  <p className="text-sm text-gray-900 truncate font-black tracking-tight">{user.email.split('@')[0].toUpperCase()}</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                {CUSTOMER_MENUS.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-red-50' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                          isActive ? 'bg-[#CC0000] text-white shadow-lg shadow-red-200' : 'bg-gray-50 text-gray-400 group-hover:bg-white group-hover:text-gray-900'
                        }`}>
                          <item.icon size={18} />
                        </div>
                        <div>
                          <p className={`text-sm font-black transition-colors ${isActive ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900'}`}>
                            {item.name}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium">{item.desc}</p>
                        </div>
                      </div>
                      <ChevronRight size={14} className={`transition-all duration-300 ${isActive ? 'text-[#CC0000] opacity-100 translate-x-0' : 'text-gray-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                    </Link>
                  );
                })}
                
                <div className="pt-6 mt-6 border-t border-gray-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-black text-sm group"
                  >
                    <div className="p-2.5 bg-red-50 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-all">
                      <LogOut size={18} />
                    </div>
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Quick Support Card */}
            <div className="mt-6 p-6 bg-black rounded-[2rem] text-white overflow-hidden relative group">
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-2">Hỗ trợ khách hàng</p>
                <p className="text-sm font-bold leading-relaxed mb-4">Bạn cần hỗ trợ với đơn hàng?</p>
                <button className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-4 py-2 rounded-lg hover:bg-[#CC0000] hover:text-white transition-all">
                  Liên hệ ngay
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Bell size={100} />
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 w-full">
            <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] border border-gray-100 min-h-[700px] animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          </main>
          
        </div>
      </div>
    </div>
  );
}