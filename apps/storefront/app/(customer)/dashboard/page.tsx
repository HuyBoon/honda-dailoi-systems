'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useCartStore } from '@/store/useCartStore';
import { ShoppingBag, Package, Heart, Clock, ChevronRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { items } = useCartStore();

  const stats = [
    { name: 'Đơn hàng', value: '0', icon: Package, color: 'bg-blue-50 text-blue-600' },
    { name: 'Giỏ hàng', value: items.length.toString(), icon: ShoppingBag, color: 'bg-red-50 text-[#CC0000]' },
    { name: 'Yêu thích', value: '0', icon: Heart, color: 'bg-pink-50 text-pink-600' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">
            Chào mừng trở lại, {user?.email.split('@')[0]}!
          </h1>
          <p className="text-gray-500 font-medium">
            Hôm nay bạn muốn tìm phụ tùng gì cho xế yêu?
          </p>
        </div>
        <Link 
          href="/parts" 
          className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#CC0000] transition-all group"
        >
          Tiếp tục mua sắm
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-gray-50/50 border border-gray-100 p-6 rounded-[2rem] flex items-center gap-5 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 group">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.name}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Promotions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Placeholder */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
              <Clock size={20} className="text-[#CC0000]" /> Đơn hàng gần đây
            </h3>
            <Link href="/orders" className="text-[10px] font-black text-[#CC0000] uppercase tracking-widest hover:underline">
              Xem tất cả
            </Link>
          </div>
          <div className="bg-gray-50 rounded-[2rem] p-8 text-center border border-dashed border-gray-200">
            <Package size={40} className="mx-auto text-gray-300 mb-4" />
            <p className="text-sm font-bold text-gray-500">Bạn chưa có đơn hàng nào.</p>
            <p className="text-xs text-gray-400 mt-1">Hãy bắt đầu mua sắm để nhận nhiều ưu đãi!</p>
          </div>
        </div>

        {/* Promotions Card */}
        <div className="bg-gradient-to-br from-[#CC0000] to-red-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-red-200">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 leading-tight">
              Giảm ngay 10% <br /> cho đơn hàng đầu tiên
            </h3>
            <p className="text-white/70 font-medium mb-8 text-sm leading-relaxed max-w-[200px]">
              Sử dụng mã WELCOME khi thanh toán để nhận ưu đãi đặc biệt.
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
              Nhận mã ngay
            </button>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/20 rounded-full -ml-10 -mb-10 blur-2xl" />
        </div>
      </div>
    </div>
  );
}
