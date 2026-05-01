'use client';

import { ShoppingCart, Eye, Star } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

interface PartCardProps {
  id: string;
  name: string;
  partNumber: string;
  price: number;
  imageUrl?: string;
  rating?: number;
  isNew?: boolean;
}

export default function PartCard({ 
  id,
  name, 
  partNumber, 
  price, 
  imageUrl, 
  rating = 5,
  isNew = false 
}: PartCardProps) {
  const { addItem } = useCartStore();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ id, name, price, imageUrl, partNumber });
  };

  return (
    <div className="honda-card group overflow-hidden">
      {/* Image Container */}
      <Link href={`/parts/${id}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        <img 
          src={imageUrl || 'https://images.unsplash.com/photo-1581235720704-06d3acfcba80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-[#CC0000] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-red-500/20">
              Mới
            </span>
          )}
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-100 shadow-sm">
            Chính hãng
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-[#CC0000] hover:text-white transition-all shadow-xl">
            <Eye size={20} />
          </div>
          <button 
            onClick={handleAddToCart}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-[#CC0000] hover:text-white transition-all shadow-xl"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex justify-between items-start">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{partNumber}</p>
            <Link href={`/parts/${id}`}>
              <h3 className="text-lg font-black text-gray-900 truncate group-hover:text-[#CC0000] transition-colors">{name}</h3>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={i < rating ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
          ))}
          <span className="text-[10px] font-bold text-gray-400 ml-1">(12)</span>
        </div>

        <div className="pt-2 flex justify-between items-center border-t border-gray-50">
          <span className="text-xl font-black text-[#CC0000]">{formatCurrency(price)}</span>
          <Link href={`/parts/${id}`} className="text-[10px] font-black uppercase tracking-widest text-gray-900 hover:text-[#CC0000] transition-colors border-b-2 border-gray-900 hover:border-[#CC0000]">
            Chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
