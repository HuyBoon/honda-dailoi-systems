'use client';

import { motion } from 'framer-motion';

export default function TermsOfServicePage() {
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
              Điều khoản <br />
              <span className="text-[#CC0000]">Dịch vụ.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="prose prose-lg max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-gray-600 prose-p:font-medium">
            <p>Chào mừng bạn đến với hệ thống thương mại điện tử của Honda Đại Lợi. Bằng việc truy cập và sử dụng website này, bạn đồng ý tuân thủ các điều khoản sau đây.</p>
            
            <h3>1. Sử dụng Website</h3>
            <p>Khách hàng phải từ 18 tuổi trở lên hoặc có sự giám sát của người giám hộ khi sử dụng các dịch vụ đặt hàng trực tuyến của chúng tôi.</p>

            <h3>2. Giá cả & Sản phẩm</h3>
            <p>Chúng tôi luôn cố gắng cung cấp thông tin giá cả chính xác nhất. Tuy nhiên, nếu có sai sót kỹ thuật, chúng tôi có quyền từ chối hoặc hủy bỏ đơn hàng của bạn sau khi đã thông báo.</p>

            <h3>3. Bản quyền</h3>
            <p>Mọi nội dung, hình ảnh và logo trên website này thuộc sở hữu của Honda Đại Lợi. Nghiêm cấm mọi hành vi sao chép hoặc sử dụng cho mục đích thương mại khi chưa được sự đồng ý bằng văn bản.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
