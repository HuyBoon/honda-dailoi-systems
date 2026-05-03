'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CC0000]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="w-14 h-14 bg-white rounded-2xl p-2 flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg shadow-white/5">
                <img src="/logo-dailoi.png" alt="Honda Đại Lợi" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-black tracking-tighter text-white uppercase">HONDA ĐẠI LỢI</h3>
                <span className="text-[10px] font-black text-[#CC0000] tracking-[0.3em] uppercase">Phụ Tùng Chính Hãng</span>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-medium">
              Hệ thống phân phối phụ tùng xe máy Honda chính hãng hàng đầu. Cam kết chất lượng, độ bền bỉ và dịch vụ hậu mãi tận tâm nhất cho khách hàng.
            </p>

            <div className="flex gap-4">
              <SocialIcon href="#" icon={<FaFacebookF size={18} />} />
              <SocialIcon href="#" icon={<FaYoutube size={18} />} />
              <SocialIcon href="#" icon={<FaInstagram size={18} />} />
              <SocialIcon href="#" icon={<FaTwitter size={18} />} />
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#CC0000]">Cửa hàng</h4>
            <ul className="space-y-4">
              <FooterLink href="/parts">Phụ tùng</FooterLink>
              <FooterLink href="/categories">Danh mục</FooterLink>
              <FooterLink href="/vehicles">Dòng xe</FooterLink>
              <FooterLink href="/about">Về chúng tôi</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#CC0000]">Hỗ trợ</h4>
            <ul className="space-y-4">
              <FooterLink href="/faq">Câu hỏi thường gặp</FooterLink>
              <FooterLink href="/shipping-policy">Chính sách giao hàng</FooterLink>
              <FooterLink href="/return-policy">Chính sách đổi trả</FooterLink>
              <FooterLink href="/contact">Liên hệ</FooterLink>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#CC0000]">Liên hệ</h4>
            <div className="space-y-6">
              <ContactInfo icon={<MapPin size={20} />} label="Địa chỉ">
                507-Union Trade Center, TP. Hồ Chí Minh
              </ContactInfo>
              <ContactInfo icon={<Phone size={20} />} label="Hotline">
                (+84) 9876-543-210
              </ContactInfo>
              <ContactInfo icon={<Mail size={20} />} label="Email">
                cskh@hondadailoi.vn
              </ContactInfo>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
            © {currentYear} HONDA ĐẠI LỢI. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <Link href="/privacy-policy" className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-[13px] font-black text-gray-500 hover:text-white transition-all flex items-center gap-2 group uppercase tracking-tight"
      >
        <ChevronRight size={14} className="text-[#CC0000] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#CC0000] hover:text-white transition-all hover:scale-110 active:scale-95"
    >
      {icon}
    </a>
  );
}

function ContactInfo({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#CC0000] shrink-0">
        {icon}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{label}</p>
        <p className="text-sm font-black text-white uppercase tracking-tight leading-tight">{children}</p>
      </div>
    </div>
  );
}