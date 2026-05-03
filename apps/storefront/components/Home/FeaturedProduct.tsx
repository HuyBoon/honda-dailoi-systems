'use client';

import { useState } from 'react';
import { ShoppingCart, Star, Zap, Plus, Minus, ShieldCheck, Award } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeaturedProduct() {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const product = {
    id: '4b26e2fb-b471-414a-889e-a6f81a61a918',
    name: 'Bugi NGK Laser Iridium',
    price: 250000,
    partNumber: 'NGK-IZFR6K-11NS',
    imageUrl: '/honda_parts_background.png'
  };

  const handleAddToCart = async () => {
    try {
      await addItem(product, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (error) {
      console.error('Failed to add featured product to cart:', error);
      // Optional: add a toast or error state here
    }
  };

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <section className="container mx-auto px-4 lg:px-8">
      <div className="bg-white rounded-[4rem] p-8 md:p-16 border border-gray-100 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.12)] relative overflow-hidden group">
        {/* Cinematic Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#CC0000]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] group-hover:bg-[#CC0000]/10 transition-colors duration-1000" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-900/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[100px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* Content Section */}
          <div className="flex-1 space-y-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <Star size={12} className="text-yellow-400 fill-yellow-400" /> TOP RATED
              </span>
              <span className="px-4 py-1.5 bg-[#CC0000]/10 text-[#CC0000] rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                NEW ARRIVAL
              </span>
              <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <ShieldCheck size={12} /> IN STOCK
              </span>
            </div>

            <div className="space-y-6">
              <h3 className="text-6xl lg:text-[5.5rem] font-black text-gray-900 leading-[0.8] tracking-tighter uppercase">
                Bugi NGK <br />
                <span className="text-[#CC0000]">Laser Iridium.</span>
              </h3>
              <p className="text-lg text-gray-500 font-medium leading-relaxed max-w-xl">
                Đỉnh cao công nghệ đánh lửa từ Nhật Bản. Tăng hiệu suất động cơ, tiết kiệm nhiên liệu và bền bỉ gấp 3 lần bugi thông thường. Sản phẩm được tin dùng trên toàn thế giới.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#CC0000]">
                  <Zap size={20} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest leading-none">Tăng tốc nhanh</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#CC0000]">
                  <Award size={20} strokeWidth={2.5} />
                </div>
                <span className="text-xs font-black text-gray-900 uppercase tracking-widest leading-none">Bền bỉ vượt trội</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-8 border-t border-gray-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Giá ưu đãi</span>
                <span className="text-5xl font-black text-gray-900 leading-none">
                  {product.price.toLocaleString('vi-VN')}
                  <span className="text-lg ml-2 text-[#CC0000] font-black uppercase">₫</span>
                </span>
              </div>

              <div className="flex items-center h-16 bg-gray-50 rounded-2xl p-2 min-w-[140px]">
                <button 
                  onClick={decrement}
                  className="w-12 h-full flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                >
                  <Minus size={20} strokeWidth={3} />
                </button>
                <span className="flex-1 text-center font-black text-xl text-gray-900">{quantity}</span>
                <button 
                  onClick={increment}
                  className="w-12 h-full flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`
                  flex-1 lg:flex-none h-16 px-12 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl
                  ${isAdded 
                    ? 'bg-green-600 text-white shadow-green-200' 
                    : 'bg-black text-white shadow-black/10 hover:bg-[#CC0000] hover:scale-105 active:scale-95'
                  }
                `}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.span 
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <ShieldCheck size={18} /> ĐÃ THÊM
                    </motion.span>
                  ) : (
                    <motion.span 
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart size={18} /> THÊM VÀO GIỎ
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex-1 relative group/img w-full lg:w-auto">
            <div className="absolute inset-0 bg-[#CC0000]/10 rounded-[4rem] blur-3xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-1000" />
            <div className="relative z-10 w-full aspect-square rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-gray-50 border border-gray-100 transition-all duration-1000 group-hover/img:scale-[1.02] group-hover/img:-rotate-1">
              <img 
                src="/honda_parts_background.png" 
                alt="Featured Product" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
