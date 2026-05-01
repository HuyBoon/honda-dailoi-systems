import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-[#111111]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1558981403-c5f91cbba527?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-60 scale-105" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        <div className="max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CC0000]/10 border border-[#CC0000]/20 text-[#CC0000] text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-left-4 duration-700">
            <ShieldCheck size={14} />
            Phụ tùng chính hãng 100%
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-left-4 duration-1000 delay-100">
            SỨC MẠNH <br />
            <span className="text-[#CC0000]">TỪ CHI TIẾT.</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-xl animate-in fade-in slide-in-from-left-4 duration-1000 delay-200">
            Nâng tầm trải nghiệm lái xe với hệ thống phụ tùng Honda chính hãng. Độ bền vượt trội, an tâm trên mọi cung đường.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
            <button className="honda-btn flex items-center justify-center gap-2 text-lg">
              Mua sắm ngay <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all">
              Tìm theo dòng xe
            </button>
          </div>
        </div>
      </div>

      {/* Floating Stat Card */}
      <div className="absolute bottom-10 right-10 hidden lg:block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
        <div className="glass p-6 rounded-3xl space-y-1">
          <p className="text-3xl font-black text-gray-900">+15.000</p>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sản phẩm có sẵn</p>
        </div>
      </div>
    </section>
  );
}
