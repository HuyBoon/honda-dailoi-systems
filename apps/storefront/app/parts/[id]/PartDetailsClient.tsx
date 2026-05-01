'use client';

import { useState } from 'react';
import { 
  ShieldCheck, Truck, RotateCcw, 
  ShoppingCart, ArrowRight, Star, 
  CheckCircle2, Package, Info, Settings,
  Plus, Minus
} from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

export default function PartDetailsClient({ part }: { part: any }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, updateQuantity, items } = useCartStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleAddToCart = () => {
    // Add multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({ 
        id: part.id, 
        name: part.name, 
        price: Number(part.price), 
        imageUrl: part.imageUrl, 
        partNumber: part.partNumber 
      });
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
        <Link href="/" className="hover:text-[#CC0000]">Trang chủ</Link>
        <ArrowRight size={10} />
        <Link href="/parts" className="hover:text-[#CC0000]">Phụ tùng</Link>
        <ArrowRight size={10} />
        <span className="text-gray-900">{part.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-xl aspect-square relative group">
            <img 
              src={part.imageUrl || 'https://images.unsplash.com/photo-1581235720704-06d3acfcba80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'} 
              alt={part.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <span className="px-4 py-1.5 bg-[#CC0000] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl shadow-red-500/20">Chính hãng</span>
              {part.stockQuantity < 10 && (
                <span className="px-4 py-1.5 bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl shadow-amber-500/20">Sắp hết hàng</span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-[#CC0000] cursor-pointer transition-all bg-gray-50">
                <img 
                  src={part.imageUrl || 'https://images.unsplash.com/photo-1581235720704-06d3acfcba80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'} 
                  alt="Gallery" 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="lg:col-span-5 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#CC0000] font-black uppercase tracking-[0.2em] text-[10px]">
              <Package size={14} /> {part.category.name}
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
              {part.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-400">4.8 (156 đánh giá)</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Giá bán lẻ</p>
            <div className="text-5xl font-black text-[#CC0000] tracking-tighter">
              {formatCurrency(Number(part.price))}
            </div>
          </div>

          <div className="p-6 bg-gray-50 rounded-3xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-500">Tình trạng:</span>
              <span className={`flex items-center gap-1.5 text-sm font-black uppercase ${part.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {part.stockQuantity > 0 ? <><CheckCircle2 size={16} /> Còn hàng ({part.stockQuantity})</> : 'Hết hàng'}
              </span>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center bg-white rounded-2xl border border-gray-100 p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center font-bold text-gray-400 hover:text-black"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-black">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center font-bold text-gray-400 hover:text-black"
                >
                  <Plus size={18} />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 honda-btn py-4 flex items-center justify-center gap-3"
              >
                <ShoppingCart size={20} /> Thêm vào giỏ
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FeatureSmall icon={<Truck size={18} />} label="Ship 2h" />
            <FeatureSmall icon={<ShieldCheck size={18} />} label="Chính hãng" />
            <FeatureSmall icon={<RotateCcw size={18} />} label="Đổi trả 7d" />
          </div>

          <div className="space-y-6 pt-6 border-t border-gray-100">
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Info size={14} className="text-[#CC0000]" /> Thông số kỹ thuật
              </h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                <SpecItem label="Mã phụ tùng" value={part.partNumber} />
                <SpecItem label="Thương hiệu" value="Honda VN" />
                <SpecItem label="Xuất xứ" value="Việt Nam" />
                <SpecItem label="Bảo hành" value="6 tháng" />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Settings size={14} className="text-[#CC0000]" /> Dòng xe tương thích
              </h4>
              <div className="flex flex-wrap gap-2">
                {part.vehicles.map((v: any) => (
                  <span key={v.id} className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-lg uppercase">
                    {v.modelName} ({v.year})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureSmall({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-50 text-center space-y-1">
      <div className="text-[#CC0000]">{icon}</div>
      <span className="text-[10px] font-bold uppercase text-gray-500">{label}</span>
    </div>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-gray-50 pb-2">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-bold text-gray-900 font-mono">{value}</span>
    </div>
  );
}
