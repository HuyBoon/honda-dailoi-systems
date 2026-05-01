'use client';

import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock,
  MessageCircle
} from 'lucide-react';
// Import logo thương hiệu từ react-icons
import { FaFacebook, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-[#cc0000]/20 relative overflow-hidden">
      {/* Vệt sáng trang trí góc trên bên phải */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#cc0000] opacity-5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* CỘT 1: Thông tin thương hiệu */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-lg shadow-[#cc0000]/10">
                <img src="/logo.png" alt="Honda Đại Lợi" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-black tracking-wider text-white uppercase">Đại Lợi</h3>
                <p className="text-[#CC0000] text-[10px] font-black uppercase tracking-[0.2em]">Phụ Tùng Xe Máy</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Đại lý chuyên cung cấp phụ tùng xe máy Honda chính hãng. Chúng tôi cam kết chất lượng, độ bền bỉ và dịch vụ hậu mãi tận tâm nhất cho xế yêu của bạn.
            </p>
            
            {/* Social Icons - Sử dụng icon từ react-icons */}
            <div className="flex gap-4 pt-2">
              <SocialIcon href="#" icon={<FaFacebook size={18} />} />
              <SocialIcon href="#" icon={<FaYoutube size={18} />} />
              <SocialIcon href="#" icon={<MessageCircle size={18} />} /> {/* Dùng MessageCircle tạm cho Zalo */}
            </div>
          </div>

          {/* CỘT 2: Liên kết nhanh */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-bold mb-6 uppercase tracking-wider text-white">Mua sắm</h4>
            <ul className="space-y-3.5">
              <FooterLink href="/parts">Tất cả phụ tùng</FooterLink>
              <FooterLink href="/categories">Danh mục sản phẩm</FooterLink>
              <FooterLink href="/vehicles">Tìm theo dòng xe</FooterLink>
              <FooterLink href="/promotion">Khuyến mãi mới</FooterLink>
            </ul>
          </div>

          {/* CỘT 3: Hỗ trợ khách hàng */}
          <div className="lg:col-span-2">
            <h4 className="text-base font-bold mb-6 uppercase tracking-wider text-white">Hỗ trợ</h4>
            <ul className="space-y-3.5">
              <FooterLink href="/shipping">Chính sách giao hàng</FooterLink>
              <FooterLink href="/warranty">Chính sách bảo hành</FooterLink>
              <FooterLink href="/return">Quy định đổi trả</FooterLink>
              <FooterLink href="/privacy">Bảo mật thông tin</FooterLink>
            </ul>
          </div>

          {/* CỘT 4: Liên hệ & Bản tin */}
          <div className="lg:col-span-4 space-y-8">
            <div>
              <h4 className="text-base font-bold mb-6 uppercase tracking-wider text-white">Thông tin liên hệ</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 text-sm group cursor-pointer">
                  <MapPin className="text-[#CC0000] shrink-0 mt-0.5 group-hover:animate-bounce" size={18} />
                  <span className="group-hover:text-white transition-colors">123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm group cursor-pointer">
                  <Phone className="text-[#CC0000] shrink-0 group-hover:animate-pulse" size={18} />
                  <span className="group-hover:text-white transition-colors">090 123 4567 - 091 987 6543</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 text-sm group cursor-pointer">
                  <Clock className="text-[#CC0000] shrink-0 group-hover:rotate-90 transition-transform duration-300" size={18} />
                  <span className="group-hover:text-white transition-colors">Thứ 2 - Chủ Nhật: 08:00 - 20:00</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
              <h5 className="text-sm font-bold text-white mb-2">Đăng ký nhận khuyến mãi</h5>
              <p className="text-xs text-gray-400 mb-4">Nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên.</p>
              <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Nhập email của bạn..."
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl py-2.5 pl-4 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#CC0000] focus:ring-1 focus:ring-[#CC0000] transition-all"
                />
                <button 
                  type="submit" 
                  className="absolute right-1.5 p-1.5 bg-[#CC0000] hover:bg-red-700 text-white rounded-lg transition-colors group"
                >
                  <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>© 2024 HONDA ĐẠI LỢI. Đã đăng ký bản quyền.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#CC0000] cursor-pointer transition-colors">Sitemap</span>
            <span className="hover:text-[#CC0000] cursor-pointer transition-colors">Điều khoản dịch vụ</span>
            <span className="font-bold tracking-widest text-gray-600">DESIGN BY HUYBOON.TECH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-components
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-gray-400 hover:text-[#CC0000] hover:translate-x-1 transition-all inline-flex items-center text-sm font-medium group">
        <span className="w-1.5 h-1.5 rounded-full bg-[#CC0000] mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#CC0000] hover:text-white hover:border-[#CC0000] transition-all hover:-translate-y-1"
    >
      {icon}
    </a>
  );
}