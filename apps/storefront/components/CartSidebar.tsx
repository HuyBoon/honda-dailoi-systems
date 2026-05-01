'use client';

import { useCartStore } from '@/store/useCartStore';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CartSidebar() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#CC0000]/10 rounded-xl flex items-center justify-center text-[#CC0000]">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Giỏ hàng</h2>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{items.length} sản phẩm</p>
                </div>
              </div>
              <button 
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                    <ShoppingBag size={40} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-gray-900">Giỏ hàng đang trống</p>
                    <p className="text-sm text-gray-500">Hãy tiếp tục mua sắm để tìm thấy phụ tùng ưng ý.</p>
                  </div>
                  <button 
                    onClick={closeCart}
                    className="honda-btn !py-3 !px-8 text-sm"
                  >
                    MUA SẮM NGAY
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                      <img 
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1581235720704-06d3acfcba80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.partNumber}</p>
                        <h4 className="font-black text-gray-900 group-hover:text-[#CC0000] transition-colors line-clamp-1">{item.name}</h4>
                        <p className="text-sm font-bold text-[#CC0000] mt-1">{formatCurrency(item.price)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center hover:text-[#CC0000]"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center hover:text-[#CC0000]"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 bg-gray-50 space-y-6">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Tổng cộng</p>
                  <p className="text-3xl font-black text-gray-900 tracking-tighter">{formatCurrency(subtotal)}</p>
                </div>
                <div className="space-y-3">
                  <Link 
                    href="/checkout" 
                    onClick={closeCart}
                    className="w-full honda-btn !py-4 flex items-center justify-center gap-3"
                  >
                    TIẾN HÀNH THANH TOÁN <ArrowRight size={20} />
                  </Link>
                  <button 
                    onClick={closeCart}
                    className="w-full text-center text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors py-2"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
