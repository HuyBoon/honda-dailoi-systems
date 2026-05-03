'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
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
            <span className="text-[10px] font-black text-[#CC0000] uppercase tracking-[0.4em]">Legal</span>
            <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter">
              Bảo mật <br />
              <span className="text-[#CC0000]">Thông tin.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-gray-600 prose-p:font-medium">
            <p>Tại Honda Đại Lợi, chúng tôi tôn trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân mà bạn cung cấp cho chúng tôi.</p>
            
            <h3>1. Thu thập thông tin</h3>
            <p>Chúng tôi thu thập các thông tin như tên, số điện thoại, địa chỉ và email khi bạn đặt hàng hoặc đăng ký nhận tin từ chúng tôi.</p>

            <h3>2. Mục đích sử dụng</h3>
            <p>Thông tin của bạn được sử dụng để xử lý đơn hàng, cung cấp dịch vụ hỗ trợ khách hàng và gửi các thông báo khuyến mãi quan trọng (nếu bạn cho phép).</p>

            <h3>3. Bảo mật thông tin</h3>
            <p>Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn để đảm bảo an toàn cho dữ liệu cá nhân của bạn, không chia sẻ hoặc bán thông tin cho bất kỳ bên thứ ba nào ngoại trừ các đơn vị vận chuyển để phục vụ việc giao hàng.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
