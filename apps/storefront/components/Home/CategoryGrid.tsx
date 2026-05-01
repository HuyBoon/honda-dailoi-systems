import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CategoryGrid() {
  return (
    <section className="container mx-auto px-4 lg:px-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase">Danh mục phụ tùng</h2>
          <div className="w-20 h-1.5 bg-[#CC0000]" />
        </div>
        <Link href="/categories" className="text-sm font-bold text-[#CC0000] flex items-center gap-2 hover:gap-3 transition-all">
          XEM TẤT CẢ <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <CategoryCard 
          title="Dàn Nhựa" 
          count="1,240+" 
          img="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
        />
        <CategoryCard 
          title="Động Cơ" 
          count="3,500+" 
          img="https://images.unsplash.com/photo-1449495169669-7b118f96023b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
        />
        <CategoryCard 
          title="Hệ Thống Phanh" 
          count="850+" 
          img="https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
        />
        <CategoryCard 
          title="Điện & Đèn" 
          count="1,120+" 
          img="https://images.unsplash.com/photo-1544923246-77307dd654ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
        />
      </div>
    </section>
  );
}

function CategoryCard({ title, count, img }: { title: string; count: string; img: string }) {
  return (
    <Link href="/parts" className="group relative h-80 rounded-[32px] overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">{count} sản phẩm</p>
          <h3 className="text-xl font-black uppercase tracking-tighter">{title}</h3>
        </div>
        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0 -translate-x-4">
          <ArrowRight size={20} />
        </div>
      </div>
    </Link>
  );
}
