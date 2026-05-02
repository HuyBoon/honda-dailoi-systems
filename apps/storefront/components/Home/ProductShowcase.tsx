import { getParts } from '@/lib/api';
import PartCard from '../PartCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function ProductShowcase() {
  const partsData = await getParts({ limit: 12 });
  const parts = partsData.items || [];

  return (
    <section className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-[2px] bg-[#CC0000]" />
            <span className="text-[10px] font-black text-[#CC0000] uppercase tracking-[0.3em]">Phụ tùng nổi bật</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-[0.9]">
            Khám phá <span className="text-[#CC0000]">Sản phẩm</span> <br />
            Bán chạy nhất.
          </h2>
        </div>
        
        <Link 
          href="/parts" 
          className="group flex items-center gap-3 px-8 py-4 bg-gray-50 hover:bg-black hover:text-white rounded-2xl transition-all duration-300"
        >
          <span className="text-xs font-black uppercase tracking-widest">Xem tất cả</span>
          <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {parts.map((part: any) => (
          <PartCard 
            key={part.id}
            id={part.id}
            name={part.name}
            partNumber={part.partNumber}
            price={Number(part.price)}
            imageUrl={part.imageUrl}
            isNew={true}
          />
        ))}
      </div>

      <div className="mt-16 p-8 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#CC0000] shadow-sm">
            <Sparkles size={32} />
          </div>
          <div>
            <h4 className="text-lg font-black text-gray-900 uppercase">Cam kết chính hãng</h4>
            <p className="text-sm text-gray-500 font-medium">100% phụ tùng Honda Đại Lợi cung cấp là hàng chính hãng nhập khẩu.</p>
          </div>
        </div>
        <button className="px-10 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#CC0000] transition-colors">
          Kiểm tra mã phụ tùng
        </button>
      </div>
    </section>
  );
}
