'use client';

import { motion } from 'framer-motion';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function ShippingPolicyPage() {
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
            <span className="text-[10px] font-black text-[#CC0000] uppercase tracking-[0.4em]">Delivery Info</span>
            <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter">
              Chính sách <br />
              <span className="text-[#CC0000]">Giao hàng.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-gray-600 prose-p:font-medium">
              <h3>1. Phạm vi giao hàng</h3>
              <p>Honda Đại Lợi hỗ trợ giao hàng trên toàn quốc thông qua các đối tác vận chuyển uy tín như Giao Hàng Tiết Kiệm, Viettel Post, và các đơn vị vận chuyển hỏa tốc trong nội thành.</p>
              
              <h3>2. Thời gian xử lý đơn hàng</h3>
              <p>Đơn hàng đặt trước 16:00 mỗi ngày sẽ được đóng gói và bàn giao cho đơn vị vận chuyển ngay trong ngày. Đơn hàng sau 16:00 sẽ được xử lý vào ngày làm việc tiếp theo.</p>

              <h3>3. Phí vận chuyển</h3>
              <ul>
                <li>Nội thành TP.HCM: Đồng giá 25,000 VNĐ (Giao thường) hoặc theo app (Giao hỏa tốc).</li>
                <li>Tỉnh thành khác: Theo biểu phí của đơn vị vận chuyển (Dao động 35,000 - 60,000 VNĐ tùy trọng lượng).</li>
                <li>Miễn phí vận chuyển cho đơn hàng từ 2,000,000 VNĐ trở lên (Áp dụng giao thường).</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <PolicyCard icon={<Truck />} title="Hỏa tốc 2H" desc="Áp dụng cho khu vực nội thành TP. Hồ Chí Minh." />
            <PolicyCard icon={<Clock />} title="24/7 Xử lý" desc="Hệ thống tự động ghi nhận đơn hàng mọi lúc." />
            <PolicyCard icon={<ShieldCheck />} title="Bao vỡ/móp" desc="Đền bù 100% nếu hàng hỏng hóc do vận chuyển." />
          </div>
        </div>
      </section>
    </div>
  );
}

function PolicyCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex gap-6 items-center">
      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#CC0000] shadow-sm shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-1">{title}</h4>
        <p className="text-xs text-gray-500 font-medium">{desc}</p>
      </div>
    </div>
  );
}
