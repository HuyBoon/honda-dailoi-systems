import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function CategoryGrid() {
  const categories = [
    { title: "Dàn Nhựa", count: "1,240+", img: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
    { title: "Động Cơ", count: "3,500+", img: "https://images.unsplash.com/photo-1449495169669-7b118f96023b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
    { title: "Hệ Thống Phanh", count: "850+", img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
    { title: "Điện & Đèn", count: "1,120+", img: "https://images.unsplash.com/photo-1544923246-77307dd654ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CC0000]/10 border border-[#CC0000]/20 text-[#CC0000] text-[10px] font-black uppercase tracking-widest">
            Hệ sinh thái phụ tùng
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter uppercase leading-[0.85]">
            DANH MỤC <br />
            <span className="text-gray-400">PHỔ BIẾN.</span>
          </h2>
        </div>
        <Link 
          href="/categories" 
          className="group flex items-center gap-3 px-8 py-4 bg-gray-50 hover:bg-black hover:text-white rounded-2xl transition-all duration-300"
        >
          <span className="text-xs font-black uppercase tracking-widest">Xem tất cả danh mục</span>
          <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-[#CC0000] group-hover:text-white transition-colors">
            <ChevronRight size={18} />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, i) => (
          <CategoryCard key={i} {...cat} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ title, count, img }: { title: string; count: string; img: string }) {
  return (
    <Link href="/parts" className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 translate-x-4">
        <div className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white">
          <ArrowRight size={20} />
        </div>
      </div>

      <div className="absolute bottom-10 left-8 right-8">
        <div className="w-12 h-1.5 bg-[#CC0000] mb-6 group-hover:w-20 transition-all duration-500" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-2">{count} Sản phẩm</p>
        <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-[#CC0000] transition-colors">{title}</h3>
      </div>
    </Link>
  );
}
