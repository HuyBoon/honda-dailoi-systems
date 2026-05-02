import { ShoppingCart, Star, Zap } from 'lucide-react';

export default function FeaturedProduct() {
  return (
    <section className="container mx-auto px-4 lg:px-8">
      <div className="bg-white rounded-[4rem] p-8 md:p-16 border border-gray-100 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] group-hover:bg-red-500/10 transition-colors duration-1000" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-900/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-10">
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-black text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <Star size={12} className="text-yellow-400 fill-yellow-400" /> TOP RATED
              </span>
              <span className="px-4 py-1.5 bg-[#CC0000]/10 text-[#CC0000] rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                NEW ARRIVAL
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[0.85] tracking-tighter uppercase">
                Bugi NGK <br />
                <span className="text-[#CC0000]">Laser Iridium.</span>
              </h3>
              <p className="text-base lg:text-lg text-gray-500 font-medium leading-relaxed max-w-lg">
                Đỉnh cao công nghệ đánh lửa từ Nhật Bản. Tăng hiệu suất động cơ, tiết kiệm nhiên liệu và bền bỉ gấp 3 lần bugi thông thường.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Giá ưu đãi</span>
                <span className="text-4xl font-black text-gray-900">250.000<span className="text-lg ml-1 text-[#CC0000]">VNĐ</span></span>
              </div>
              <button className="h-16 px-10 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#CC0000] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10">
                <ShoppingCart size={18} /> THÊM VÀO GIỎ HÀNG
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#CC0000]" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tăng tốc nhanh</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#CC0000]" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tiết kiệm xăng</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative group/img">
            <div className="absolute inset-0 bg-[#CC0000]/10 rounded-[3rem] blur-3xl opacity-0 group-hover/img:opacity-100 transition-opacity duration-1000" />
            <img 
              src="https://images.unsplash.com/photo-1581235720704-06d3acfcba80?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Featured Part" 
              className="relative z-10 w-full rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-1000 group-hover/img:scale-105 group-hover/img:-rotate-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
