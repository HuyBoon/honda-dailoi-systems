import Link from 'next/link';
import { ShoppingCart, User as UserIcon, X, ChevronRight, Phone, Mail, MapPin } from 'lucide-react';

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  openCart: () => void;
  user: any; 
}

export function MobileMenuOverlay({ isOpen, onClose, openCart, user }: MobileMenuOverlayProps) {
  return (
    <div className={`fixed inset-0 z-[60] lg:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      <div className={`absolute top-0 left-0 bottom-0 w-[85%] max-w-[400px] bg-white flex flex-col shadow-2xl transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* HEADER MENU */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#CC0000] rounded-xl flex items-center justify-center">
              <span className="text-white font-black italic text-sm">ĐL</span>
            </div>
            <span className="text-base font-black tracking-tighter text-gray-900 uppercase">Honda Đại Lợi</span>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 bg-gray-50 text-gray-500 rounded-full hover:bg-red-50 hover:text-[#CC0000] transition-colors active:scale-95"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-5 flex flex-col gap-1 bg-white">
          <MobileNavLink href="/parts" onClick={onClose}>Phụ tùng</MobileNavLink>
          <MobileNavLink href="/categories" onClick={onClose}>Danh mục</MobileNavLink>
          <MobileNavLink href="/vehicles" onClick={onClose}>Dòng xe</MobileNavLink>
          <MobileNavLink href="/promotion" onClick={onClose}>Khuyến mãi</MobileNavLink>
          <MobileNavLink href="/about" onClick={onClose}>Giới thiệu</MobileNavLink>

          <div className="h-px bg-gray-100 my-4" />

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => { openCart(); onClose(); }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group active:scale-[0.98]"
            >
              <div className="flex items-center gap-3 font-bold text-gray-700 group-hover:text-[#CC0000]">
                <ShoppingCart size={20} />
                <span>Giỏ hàng của bạn</span>
              </div>
              <ChevronRight size={18} className="text-gray-400 group-hover:text-[#CC0000]" />
            </button>

            <Link 
              href={user ? "/profile" : "/login"}
              onClick={onClose}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors group active:scale-[0.98]"
            >
              <div className="flex items-center gap-3 font-bold text-gray-700 group-hover:text-[#CC0000]">
                <UserIcon size={20} />
                <span>{user ? "Tài khoản của tôi" : "Đăng nhập / Đăng ký"}</span>
              </div>
              <ChevronRight size={18} className="text-gray-400 group-hover:text-[#CC0000]" />
            </Link>
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-100 shrink-0">
          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Hỗ trợ khách hàng</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-[#CC0000]">
                <Phone size={14} />
              </div>
              <span>090 123 4567</span>
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-[#CC0000]">
                <Mail size={14} />
              </div>
              <span>cskh@hondadailoi.vn</span>
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-gray-700">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-[#CC0000]">
                <MapPin size={14} />
              </div>
              <span className="line-clamp-1 leading-relaxed">123 Đường ABC, Quận XYZ, TP.HCM</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="flex items-center justify-between py-4 border-b border-transparent text-[15px] font-black uppercase tracking-wide text-gray-800 hover:text-[#CC0000] active:text-[#CC0000] transition-colors"
    >
      <span>{children}</span>
      <ChevronRight size={18} className="text-gray-300" />
    </Link>
  );
}