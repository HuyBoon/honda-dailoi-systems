'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, Package, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const CUSTOMER_MENUS = [
  { name: 'Thông tin tài khoản', path: '/profile', icon: User },
  { name: 'Đơn mua của tôi', path: '/orders', icon: Package },
  { name: 'Cài đặt', path: '/settings', icon: Settings },
];

export default function CustomerLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, _hasHydrated } = useAuthStore();
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

  // Trong khi chờ mounted hoặc hydrate, không render gì để tránh nháy
  if (!mounted || !_hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CC0000]"></div>
      </div>
    );
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-100/50 border border-gray-100 sticky top-32">
            {/* Header User */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6 mb-6">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-xl font-black text-[#CC0000] shadow-sm">
                {user.email[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-gray-400 truncate uppercase tracking-widest">Tài khoản của</p>
                <p className="text-xs text-gray-900 truncate font-bold mt-1">{user.email}</p>
              </div>
            </div>

            {/* Menu Links */}
            <nav className="flex flex-col gap-2">
              {CUSTOMER_MENUS.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm ${
                      isActive 
                        ? 'bg-red-50 text-[#CC0000]' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'text-[#CC0000]' : 'text-gray-400'} />
                    {item.name}
                  </Link>
                );
              })}
              
              <div className="h-px bg-gray-100 my-2" />

              <button
                onClick={() => {
                  useAuthStore.getState().logout();
                  router.push('/login');
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-bold text-sm text-red-600 hover:bg-red-50 active:scale-[0.98]"
              >
                <LogOut size={20} />
                Đăng xuất
              </button>
            </nav>
          </div>
        </aside>

        {/* NỘI DUNG ĐỘNG BÊN PHẢI (children) */}
        <main className="flex-1">
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-gray-100/50 border border-gray-100 min-h-[600px]">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
}