'use client';

import { motion } from 'framer-motion';
import { RotateCcw, ShieldCheck, AlertCircle } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <section className="relative py-24 bg-black overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <span className="text-[10px] font-black text-[#CC0000] uppercase tracking-[0.4em]">Returns & Refunds</span>
            <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter">
              Chính sách <br />
              <span className="text-[#CC0000]">Đổi trả.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-gray-600 prose-p:font-medium">
            <h3>1. Điều kiện đổi trả</h3>
            <p>Sản phẩm được đổi trả trong vòng 7 ngày kể từ ngày nhận hàng nếu đáp ứng các điều kiện sau:</p>
            <ul>
              <li>Sản phẩm còn nguyên tem đỏ Honda, chưa có dấu hiệu bóc xé bao bì (đối với hàng xé bịch).</li>
              <li>Sản phẩm chưa qua sử dụng, chưa lắp đặt lên xe.</li>
              <li>Sản phẩm bị lỗi kỹ thuật từ phía nhà sản xuất hoặc giao sai mã hàng.</li>
            </ul>

            <h3>2. Quy trình đổi trả</h3>
            <p>Bước 1: Liên hệ hotline hoặc Zalo hỗ trợ để thông báo tình trạng hàng hóa.</p>
            <p>Bước 2: Gửi hàng về địa chỉ của Honda Đại Lợi theo hướng dẫn của nhân viên.</p>
            <p>Bước 3: Sau khi kiểm tra hàng đạt yêu cầu, chúng tôi sẽ gửi sản phẩm thay thế hoặc hoàn tiền trong vòng 2-3 ngày làm việc.</p>

            <div className="p-8 bg-red-50 rounded-3xl border border-red-100 flex gap-6 items-start mt-12">
              <AlertCircle className="text-[#CC0000] shrink-0" size={24} />
              <p className="text-sm font-bold text-red-900 leading-relaxed uppercase tracking-tight">
                Lưu ý: Chúng tôi không chấp nhận đổi trả đối với các trường hợp sản phẩm đã được lắp đặt lên xe hoặc bị hư hại do quá trình lắp đặt sai kỹ thuật của khách hàng.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
