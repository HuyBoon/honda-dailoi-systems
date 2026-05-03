'use client';

import { ShieldCheck, Award, Heart, Phone, Mail, ChevronRight, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Cinematic Hero Header */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-[url('/hero_showroom.png')] bg-cover bg-center animate-slow-zoom" />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <span className="text-[10px] font-black text-[#CC0000] uppercase tracking-[0.4em] block">Our Brand Story</span>
            <h1 className="text-6xl lg:text-[7vw] font-black text-white uppercase tracking-tighter leading-[0.85]">
              CÂU CHUYỆN <br />
              <span className="text-[#CC0000]">ĐẠI LỢI.</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto">
              Hành trình xây dựng niềm tin từ những chi tiết nhỏ nhất, mang đến sự an tâm tuyệt đối cho mọi khách hàng Honda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-[#CC0000] uppercase tracking-[0.2em]">Sứ mệnh & Tầm nhìn</span>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-tight">
                TẬN TÂM PHỤC VỤ <br /> 
                VÌ SỰ AN TOÀN CỦA BẠN.
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-gray-500 font-medium leading-relaxed">
              <p>
                Tại Honda Đại Lợi, chúng tôi hiểu rằng mỗi chi tiết nhỏ nhất trên chiếc xe của bạn đều đóng vai trò quan trọng trong việc đảm bảo an toàn và trải nghiệm lái xe tuyệt vời.
              </p>
              <p>
                Được thành lập với sứ mệnh mang đến nguồn phụ tùng Honda chính hãng tin cậy nhất, chúng tôi đã không ngừng nỗ lực để xây dựng hệ thống phân phối chuyên nghiệp, đáp ứng nhu cầu khắt khe của hàng nghìn khách hàng trên khắp cả nước.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 pt-6">
              <StatItem count="15+" label="Năm kinh nghiệm" />
              <StatItem count="100k+" label="Khách hàng tin dùng" />
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute -inset-6 bg-[#CC0000]/5 rounded-[4rem] blur-3xl transition-all group-hover:bg-[#CC0000]/10" />
            <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border border-gray-100">
              <img 
                src="/hero_service.png" 
                alt="Storefront" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Bento Grid */}
      <section className="py-32 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-24 space-y-4">
            <span className="text-[10px] font-black text-[#CC0000] uppercase tracking-[0.2em]">Giá trị cốt lõi</span>
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter">NIỀM TIN TỪ <span className="text-[#CC0000]">CHẤT LƯỢNG.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={<ShieldCheck size={32} />}
              title="Chất lượng tuyệt đối"
              desc="Mọi sản phẩm đều trải qua quy trình kiểm tra nghiêm ngặt, đảm bảo 100% chính hãng Honda."
            />
            <ValueCard 
              icon={<Zap size={32} />}
              title="Phản hồi siêu tốc"
              desc="Đội ngũ kỹ thuật giàu kinh nghiệm luôn sẵn sàng tư vấn giải pháp tối ưu nhất cho bạn."
            />
            <ValueCard 
              icon={<Target size={32} />}
              title="Chính xác 100%"
              desc="Hỗ trợ check mã phụ tùng chuẩn xác theo từng đời xe, đảm bảo lắp ráp hoàn hảo."
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 container mx-auto px-6 lg:px-12">
        <div className="bg-black rounded-[4rem] p-12 lg:p-24 text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#CC0000]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] transition-all group-hover:bg-[#CC0000]/20" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.85]">
                Bạn cần tư vấn <br />
                <span className="text-[#CC0000]">Kỹ thuật?</span>
              </h2>
              <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-lg">
                Đừng ngần ngại liên hệ với chúng tôi. Đội ngũ chuyên gia của Đại Lợi sẽ phản hồi bạn nhanh nhất có thể.
              </p>
              <div className="flex flex-wrap gap-12">
                <ContactInfo icon={<Phone size={20} />} label="Hotline" value="090 123 4567" />
                <ContactInfo icon={<Mail size={20} />} label="Email" value="cskh@hondadailoi.vn" />
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <Link 
                href="/contact"
                className="h-20 px-16 bg-[#CC0000] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-red-500/20"
              >
                LIÊN HỆ NGAY <ChevronRight size={20} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatItem({ count, label }: { count: string; label: string }) {
  return (
    <div className="space-y-2">
      <p className="text-5xl font-black text-gray-900 tracking-tighter leading-none">{count}</p>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-12 rounded-[3.5rem] bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 space-y-8 group">
      <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#CC0000] transition-all group-hover:bg-[#CC0000] group-hover:text-white group-hover:scale-110 shadow-sm">{icon}</div>
      <div className="space-y-4">
        <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">{title}</h3>
        <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function ContactInfo({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-[#CC0000]">{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-1">{label}</p>
        <p className="text-lg font-black tracking-tight text-white">{value}</p>
      </div>
    </div>
  );
}
