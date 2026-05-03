'use client';

import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="relative py-24 lg:py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero_showroom.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <span className="text-[10px] font-black text-[#CC0000] uppercase tracking-[0.4em]">Get in Touch</span>
            <h1 className="text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              Liên hệ với <br />
              <span className="text-[#CC0000]">Đại Lợi.</span>
            </h1>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy để lại lời nhắn hoặc liên hệ trực tiếp qua hotline.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-black uppercase tracking-tight text-gray-900">Thông tin liên hệ</h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                Đội ngũ chăm sóc khách hàng của chúng tôi sẽ phản hồi bạn trong vòng 24 giờ làm việc.
              </p>
            </div>

            <div className="space-y-8">
              <ContactCard 
                icon={<MapPin size={24} />} 
                label="Địa chỉ trụ sở"
                value="507-Union Trade Center, TP. Hồ Chí Minh"
              />
              <ContactCard 
                icon={<Phone size={24} />} 
                label="Đường dây nóng"
                value="(+84) 9876-543-210"
              />
              <ContactCard 
                icon={<Mail size={24} />} 
                label="Email hỗ trợ"
                value="cskh@hondadailoi.vn"
              />
              <ContactCard 
                icon={<MessageCircle size={24} />} 
                label="Zalo hỗ trợ"
                value="0987.654.321"
              />
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-gray-50 rounded-[3rem] p-8 md:p-12 border border-gray-100">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Họ và tên" placeholder="Nguyễn Văn A" />
                <InputGroup label="Số điện thoại" placeholder="0901 234 567" />
              </div>
              <InputGroup label="Email" placeholder="email@example.com" />
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lời nhắn của bạn</label>
                <textarea 
                  rows={6}
                  placeholder="Tôi cần tư vấn về phụ tùng..."
                  className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-[#CC0000] focus:ring-1 focus:ring-[#CC0000] transition-all"
                />
              </div>
              <button className="h-16 px-12 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#CC0000] hover:scale-[1.02] active:scale-95 transition-all w-full shadow-2xl shadow-black/10">
                GỬI LỜI NHẮN <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[500px] w-full bg-gray-100 grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.6697269378953!2d106.66488127595392!3d10.7599170893878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1c00000001%3A0x6d97262c5b3c5e88!2zQ2jhu6MgVMOibiBUaMOgbmggLSBQaOG7pSBUw7luZyBYZSBNw6F5!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
        />
      </section>
    </div>
  );
}

function ContactCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-6 items-center group">
      <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-[#CC0000] transition-all group-hover:bg-[#CC0000] group-hover:text-white group-hover:scale-110">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-xl font-black text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type="text" 
        placeholder={placeholder}
        className="w-full bg-white border border-gray-100 rounded-2xl h-14 px-6 text-sm focus:outline-none focus:border-[#CC0000] focus:ring-1 focus:ring-[#CC0000] transition-all"
      />
    </div>
  );
}
