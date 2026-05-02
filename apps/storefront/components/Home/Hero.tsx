import { ArrowRight, ShieldCheck, Sparkles, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent z-10" />
        <div 
          className="w-full h-full bg-[url('/heros.png')] bg-cover bg-center transition-transform duration-[10s] hover:scale-110 scale-105" 
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-2 h-2 bg-[#CC0000] rounded-full animate-pulse" />
            Phụ tùng Honda chính hãng
          </div>
          
          <h1 className="text-[12vw] lg:text-[7vw] font-black text-white tracking-tighter leading-[0.85] mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            ENGINEERED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CC0000] to-red-500">FOR PERFORMANCE.</span>
          </h1>
          
          <p className="text-lg lg:text-xl text-gray-400 max-w-xl font-medium leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            Trải nghiệm sự khác biệt từ những chi tiết nhỏ nhất. Hệ thống phụ tùng chính hãng được tinh chỉnh tối ưu cho mọi dòng xe Honda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link 
              href="/parts"
              className="h-16 px-10 bg-[#CC0000] text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-red-500/20"
            >
              KHÁM PHÁ NGAY <ArrowRight size={18} />
            </Link>
            <Link 
              href="/vehicles"
              className="h-16 px-10 bg-white/10 backdrop-blur-xl text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all"
            >
              TÌM THEO DÒNG XE <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Decorative Stats */}
      <div className="absolute right-8 bottom-32 hidden xl:flex flex-col gap-4 z-20">
        <StatCard icon={Zap} label="GIAO HÀNG" value="SIÊU TỐC" delay="delay-500" />
        <StatCard icon={ShieldCheck} label="BẢO HÀNH" value="12 THÁNG" delay="delay-700" />
        <StatCard icon={Sparkles} label="CHẤT LƯỢNG" value="PREMIUM" delay="delay-1000" />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent" />
        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">SCROLL</span>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, label, value, delay }: any) {
  return (
    <div className={`glass-dark p-6 rounded-[2rem] border border-white/5 min-w-[200px] transform hover:-translate-x-4 transition-transform duration-500 animate-in fade-in slide-in-from-right-8 ${delay}`}>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-[#CC0000] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{label}</p>
          <p className="text-sm font-black text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}
