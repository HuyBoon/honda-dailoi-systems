'use client';

import { useState } from 'react';
import { ShoppingCart, Minus, Plus, CheckCircle2, Truck, ShieldCheck, RotateCcw } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

interface PartPricingCardProps {
  part: any;
}

export default function PartPricingCard({ part }: PartPricingCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleAddToCart = () => {
    addItem({ 
      id: part.id, 
      name: part.name, 
      price: Number(part.price), 
      imageUrl: part.imageUrl, 
      partNumber: part.partNumber 
    }, quantity);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Giá bán lẻ niêm yết</p>
        <div className="flex items-baseline gap-2">
          <div className="text-6xl font-black text-[#CC0000] tracking-tighter">
            {formatCurrency(Number(part.price))}
          </div>
          <span className="text-gray-400 font-bold line-through text-lg">{formatCurrency(Number(part.price) * 1.2)}</span>
        </div>
      </div>

      <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-8 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm font-black text-gray-500 uppercase tracking-widest">Tình trạng kho:</span>
          <span className={`flex items-center gap-1.5 text-sm font-black uppercase ${part.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {part.stockQuantity > 0 ? <><CheckCircle2 size={18} /> Còn hàng ({part.stockQuantity})</> : 'Hết hàng'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center bg-white rounded-2xl border border-gray-200 p-1 shadow-sm">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-12 flex items-center justify-center font-bold text-gray-400 hover:text-black transition-colors"
            >
              <Minus size={20} />
            </button>
            <span className="w-12 text-center font-black text-lg">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-12 flex items-center justify-center font-bold text-gray-400 hover:text-black transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          <button 
            disabled={part.stockQuantity <= 0}
            onClick={handleAddToCart}
            className={`flex-1 h-14 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all
              ${part.stockQuantity > 0 
                ? 'bg-black text-white hover:bg-[#CC0000] shadow-xl shadow-black/10' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'}
            `}
          >
            <ShoppingCart size={20} /> Thêm vào giỏ hàng
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <FeatureSmall icon={<Truck size={18} />} label="Ship 2h" />
          <FeatureSmall icon={<ShieldCheck size={18} />} label="Chính hãng" />
          <FeatureSmall icon={<RotateCcw size={18} />} label="Đổi trả 7d" />
        </div>
      </div>
    </div>
  );
}

function FeatureSmall({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 text-center space-y-2 group hover:border-[#CC0000] transition-colors">
      <div className="text-[#CC0000] group-hover:scale-110 transition-transform">{icon}</div>
      <span className="text-[9px] font-black uppercase text-gray-500 tracking-wider">{label}</span>
    </div>
  );
}
