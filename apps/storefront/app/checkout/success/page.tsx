'use client';

import { CheckCircle2, ArrowRight, Package, Home } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8"
      >
        <CheckCircle2 size={48} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4 mb-12"
      >
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase">
          ĐẶT HÀNG THÀNH CÔNG!
        </h1>
        <p className="text-lg text-gray-500 max-w-lg mx-auto font-medium">
          Cảm ơn bạn đã tin tưởng Honda Đại Lợi. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12"
      >
        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 text-left">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#CC0000]">
            <Package size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Trạng thái</p>
            <p className="font-black text-gray-900 uppercase">Đang chờ xác nhận</p>
          </div>
        </div>
        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6 text-left">
          <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#CC0000]">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thời gian dự kiến</p>
            <p className="font-black text-gray-900 uppercase">24-48 Giờ</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link href="/parts" className="honda-btn flex items-center justify-center gap-2">
          TIẾP TỤC MUA SẮM <ArrowRight size={20} />
        </Link>
        <Link href="/" className="px-8 py-4 border border-gray-200 text-gray-600 font-black rounded-full hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
          <Home size={20} /> QUAY VỀ TRANG CHỦ
        </Link>
      </motion.div>
    </div>
  );
}
